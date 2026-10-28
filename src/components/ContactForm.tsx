import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactFormData } from '@/lib/contact-schema';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

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
    defaultValues: { user_name: '', user_email: '', user_phone: '', message: '' },
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
    } catch {
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
          maxLength={100}
          autoComplete="name"
          aria-label={t('name')}
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
          maxLength={255}
          autoComplete="email"
          aria-label={t('email')}
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
          maxLength={20}
          inputMode="numeric"
          autoComplete="tel"
          aria-label={t('phone')}
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
          maxLength={1000}
          aria-label={t('message')}
          {...register('message')}
          placeholder={t('message')}
          rows={5}
          className="w-full px-4 py-3 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none min-h-[120px]"
        />
        {errors.message && (
          <p className="text-destructive text-sm mt-1">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? t('sending') : t('send')}
      </Button>
    </form>
  );
};
