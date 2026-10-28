import { z } from 'zod';

export const contactSchema = z.object({
  user_name: z.string().trim().min(1, 'Numele este obligatoriu').max(100, 'Numele trebuie să aibă maxim 100 caractere'),
  user_email: z.string().trim().min(1, 'Email-ul este obligatoriu').email('Format email invalid (ex: nume@domeniu.ro)').max(255, 'Email-ul trebuie să aibă maxim 255 caractere'),
  user_phone: z.string().trim().min(1, 'Telefonul este obligatoriu').regex(/^[0-9]+$/, 'Telefonul trebuie să conțină doar cifre').min(8, 'Telefonul trebuie să aibă minim 8 cifre').max(20, 'Telefonul trebuie să aibă maxim 20 caractere'),
  message: z.string().trim().min(5, 'Mesajul trebuie să aibă minim 5 caractere').max(1000, 'Mesajul trebuie să aibă maxim 1000 caractere'),
});

export type ContactFormData = z.infer<typeof contactSchema>;