import { z } from 'zod';
// import { phoneRegex } from '../regex';

// Schema for Login
export const schemaLogin = z.object({
  email: z.string().email({ message: 'Некорректный email' }),
  password: z
    .string()
    .min(6, { message: 'Пароль должен содержать минимум 6 символов' }),
});

// Schema for Registration
export const schemaRegistration = z
  .object({
    email: z.string().email({ message: 'Некорректный email' }),
    password: z
      .string()
      .min(6, { message: 'Пароль должен содержать минимум 6 символов' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'Необходимо подтвердить пароль' }),
    name: z
      .string()
      .min(4, { message: 'Имя должно содержать минимум 4 символа' })
      .optional(),
    // phone: z
    //   .string()
    //   .regex(phoneRegex, { message: 'Некорректный номер телефона' })
    //   .optional(),
    code: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });
