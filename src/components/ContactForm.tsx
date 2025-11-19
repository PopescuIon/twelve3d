import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useLanguage } from '@/contexts/LanguageContext';

const contactSchema = z.object({
  user_name: z
    .string()
    .trim()
    .min(1, 'Numele este obligatoriu')
    .max(100, 'Numele trebuie să aibă maxim 100 caractere'),
  user_email: z
    .string()
    .trim()
    .min(1, 'Email-ul este obligatoriu')
    .email('Format email invalid (ex: nume@domeniu.ro)')
    .max(255, 'Email-ul trebuie să aibă maxim 255 caractere'),
  user_phone: z
    .string()
    .trim()
    .min(1, 'Telefonul este obligatoriu')
    .regex(/^[0-9]+$/, 'Telefonul trebuie să conțină doar cifre')
    .min(8, 'Telefonul trebuie să aibă minim 8 cifre')
    .max(20, 'Telefonul trebuie să aibă maxim 20 caractere'),
  message: z
    .string()
    .trim()
    .min(5, 'Mesajul trebuie să aibă minim 5 caractere')
    .max(1000, 'Mesajul trebuie să aibă maxim 1000 caractere'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const ContactForm = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      // Send email using explicit template parameters
      await emailjs.send(
        'service_twelve',
        'template_ilqjnou',
        {
          from_name: data.user_name,
          user_name: data.user_name,
          user_email: data.user_email,
          from_email: data.user_email,
          user_phone: data.user_phone,
          phone: data.user_phone,
          message: data.message,
          to_email: 'twelve.ceasuri.perete@gmail.com',
        },
        'qnNq8OVcXOQrbk9AO'
      );

      toast({
        title: t('messageSent'),
        description: t('messageDescription'),
        duration: 4000,
      });

      reset();
    } catch (error) {
      console.error('Contact form error:', error);
      toast({
        title: t('error'),
        description: t('errorDescription') || 'A apărut o eroare. Încearcă din nou mai târziu.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 fade-in">
      <div>
        <input
          type="text"
          {...register('user_name')}
          placeholder={t('name')}
          className="w-full px-4 py-3 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        {errors.user_name && (
          <p className="text-destructive text-sm mt-1">{errors.user_name.message}</p>
        )}
      </div>

      <div>
        <input
          type="email"
          {...register('user_email')}
          placeholder={t('email')}
          className="w-full px-4 py-3 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        {errors.user_email && (
          <p className="text-destructive text-sm mt-1">{errors.user_email.message}</p>
        )}
      </div>

      <div>
        <input
          type="tel"
          {...register('user_phone')}
          placeholder={t('phone')}
          className="w-full px-4 py-3 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        {errors.user_phone && (
          <p className="text-destructive text-sm mt-1">{errors.user_phone.message}</p>
        )}
      </div>

      <div>
        <textarea
          {...register('message')}
          placeholder={t('message')}
          rows={5}
          className="w-full px-4 py-3 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none min-h-[120px]"
        />
        {errors.message && (
          <p className="text-destructive text-sm mt-1">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? t('sending') : t('send')}
      </button>
    </form>
  );
};
