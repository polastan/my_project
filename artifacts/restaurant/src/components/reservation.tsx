import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { CalendarIcon, Clock, Users, Loader2 } from "lucide-react";
import { useCreateReservation, useCheckAvailability } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  email: z.string().email("Некорректный адрес электронной почты"),
  phone: z.string().min(10, "Введите корректный номер телефона"),
  date: z.date({
    required_error: "Выберите дату.",
  }),
  time: z.string({
    required_error: "Выберите время.",
  }),
  guests: z.string().transform((val) => parseInt(val, 10)),
  specialRequests: z.string().optional(),
});

const timeSlots = [
  "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"
];

export function Reservation() {
  const { toast } = useToast();
  const createReservation = useCreateReservation();
  const [checkingAvailability, setCheckingAvailability] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      specialRequests: "",
      time: "",
      guests: 2 as any,
    },
  });

  const watchDate = form.watch("date");
  const watchTime = form.watch("time");
  const watchGuests = form.watch("guests");

  const { refetch: checkAvail } = useCheckAvailability(
    {
      date: watchDate ? format(watchDate, "yyyy-MM-dd") : "",
      time: watchTime || "",
      guests: watchGuests as unknown as number,
    },
    {
      query: {
        enabled: false,
      }
    }
  );

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setCheckingAvailability(true);
    
    try {
      const availResult = await checkAvail();
      if (availResult.data && !availResult.data.available) {
        toast({
          title: "Нет свободных мест",
          description: availResult.data.message || "На это время столики недоступны.",
          variant: "destructive"
        });
        setCheckingAvailability(false);
        return;
      }
      
      createReservation.mutate({
        data: {
          name: values.name,
          email: values.email,
          phone: values.phone,
          date: format(values.date, "yyyy-MM-dd"),
          time: values.time,
          guests: values.guests,
          specialRequests: values.specialRequests || null,
        }
      }, {
        onSuccess: () => {
          toast({
            title: "Бронирование подтверждено",
            description: "Мы с нетерпением ждём вас в ресторане Noir.",
          });
          form.reset();
        },
        onError: () => {
          toast({
            title: "Ошибка",
            description: "Не удалось создать бронирование. Пожалуйста, попробуйте снова.",
            variant: "destructive"
          });
        }
      });
    } catch {
      toast({
        title: "Ошибка",
        description: "Что-то пошло не так.",
        variant: "destructive"
      });
    } finally {
      setCheckingAvailability(false);
    }
  }

  return (
    <section id="reservations" className="py-32 relative bg-background border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">
              Забронируйте свой <span className="italic text-primary">Столик.</span>
            </h2>
            <p className="text-muted-foreground font-light leading-relaxed mb-8">
              В связи с камерной атмосферой нашего заведения бронирование обязательно. Столики открываются за 30 дней. Для компаний более 6 человек просим связаться с нами напрямую.
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h4 className="text-white font-medium mb-1">Часы работы</h4>
                  <p className="text-sm text-muted-foreground">Вторник — Воскресенье</p>
                  <p className="text-sm text-muted-foreground">18:00 — 01:00</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Users className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h4 className="text-white font-medium mb-1">Дресс-код</h4>
                  <p className="text-sm text-muted-foreground">Smart elegant. Мужчинам обязателен пиджак. Спортивная одежда не допускается.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-black/50 p-8 border border-white/5"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/70 uppercase tracking-wider text-xs">Имя</FormLabel>
                        <FormControl>
                          <Input placeholder="Иван Иванов" className="bg-transparent border-white/10 text-white focus:border-primary rounded-none" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/70 uppercase tracking-wider text-xs">Эл. почта</FormLabel>
                        <FormControl>
                          <Input placeholder="ivan@example.com" type="email" className="bg-transparent border-white/10 text-white focus:border-primary rounded-none" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-white/70 uppercase tracking-wider text-xs">Дата</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "bg-transparent border-white/10 text-left font-normal rounded-none h-10 px-3 hover:bg-white/5 hover:text-white",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? format(field.value, "d MMMM yyyy", { locale: ru }) : <span>Выберите дату</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 bg-background border-white/10 text-white" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date() || date < new Date("1900-01-01")
                              }
                              initialFocus
                              className="bg-black text-white"
                              locale={ru}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/70 uppercase tracking-wider text-xs">Время</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-transparent border-white/10 text-white rounded-none">
                              <SelectValue placeholder="Выбрать" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-background border-white/10 text-white">
                            {timeSlots.map(time => (
                              <SelectItem key={time} value={time}>{time}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="guests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/70 uppercase tracking-wider text-xs">Гости</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                          <FormControl>
                            <SelectTrigger className="bg-transparent border-white/10 text-white rounded-none">
                              <SelectValue placeholder="Кол-во" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-background border-white/10 text-white">
                            {[1, 2, 3, 4, 5, 6].map(num => (
                              <SelectItem key={num} value={num.toString()}>{num} {num === 1 ? 'гость' : num < 5 ? 'гостя' : 'гостей'}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70 uppercase tracking-wider text-xs">Номер телефона</FormLabel>
                      <FormControl>
                        <Input placeholder="+7 (999) 000-00-00" type="tel" className="bg-transparent border-white/10 text-white focus:border-primary rounded-none" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="specialRequests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70 uppercase tracking-wider text-xs">Особые пожелания / Аллергии</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Необязательно" 
                          className="bg-transparent border-white/10 text-white focus:border-primary rounded-none resize-none h-24" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-black font-bold tracking-widest uppercase rounded-none h-12"
                  disabled={createReservation.isPending || checkingAvailability}
                >
                  {(createReservation.isPending || checkingAvailability) ? <Loader2 className="w-5 h-5 animate-spin" /> : "Забронировать"}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
