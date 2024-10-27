import { z } from 'zod';
import { Categories, Category } from './enumCategory';
import { phoneRegex } from './regex';

export type ExtendedCrud = Crud & {
  active: boolean;
  parent_id?: string;
  admin: boolean;
};

interface CrudProof {
  description: string;
  link: string;
}

export interface CrudCreate {
  id: string;
  name?: string;
  // age?: number;
  gender?: string;
  birthdate?: string;
  birthplace?: string;
  citizenship?: string;
  phone?: string;
  email?: string;
  address?: string;
  // socialmedia?: {
  //   facebook?: string;
  //   instagram?: string;
  // };
  photourl: string[];
  videourl: string[];
  categories: Category[];
  accusations: string;
  proof?: CrudProof[];
  userId: string | undefined;
}

export interface Crud {
  id: string;
  name?: string;
  // age?: number;
  gender?: string;
  birthdate?: string;
  birthplace?: string;
  citizenship?: string;
  phone?: string;
  email?: string;
  address?: string;
  // socialmedia?: {
  //   facebook?: string;
  //   instagram?: string;
  // };
  photourl: string[];
  videourl: string[];
  categories: Category[];
  accusations: string;
  proof?: CrudProof[];
  userId: string | undefined;
}

enum Gender {
  Male = 'Мужчина',
  Female = 'Женщина',
  Perforator = 'Перфоратор',
}

const phoneSchema = z.union([
  z.literal(''), // Пустая строка допустима
  z.string().regex(phoneRegex, { message: 'Некорректный номер телефона' }), // Валидация по regex
]);

const emailSchema = z.union([
  z.literal(''), // Пустая строка допустима
  z.string().email({ message: 'Некорректный email' }), // Валидация email
]);

export const CrudSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Введите имя' })
    .max(25, { message: 'Максимальное имя 25 символов' })
    .optional(),
  // age: z
  //   .number()
  //   .min(1, { message: 'Введите возраст' })
  //   .max(120, { message: 'Превышен максимальный возраст' })
  //   .optional(),
  gender: z
    .enum([Gender.Male, Gender.Female, Gender.Perforator])
    .or(z.literal('')) // Allow empty string as a valid input
    .refine((val) => val !== '', {
      message: 'Пожалуйста, выберите пол.',
    }),
  birthdate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: 'Дата должна быть в формате YYYY-MM-DD',
    })
    .refine(
      (date) => {
        const parsedDate = new Date(date);
        return !isNaN(parsedDate.getTime()); // проверка, является ли дата валидной
      },
      { message: 'Некорректная дата' },
    )
    .optional(),
  birthplace: z
    .string()
    .min(1, { message: 'Введите место рождения' })
    .max(25, { message: 'Максимальное количество символов 25' })
    .optional(),
  citizenship: z
    .string()
    .min(1, { message: 'Введите гражданство' })
    .max(100, { message: 'Максимальное количество символов 100' })
    .optional(),
  phone: phoneSchema.optional().nullable(), // Теперь phone может быть пустым или валидным номером
  email: emailSchema.optional().nullable(),
  address: z.string().optional(),
  // socialMedia: z
  //   .object({
  //     facebook: z.string().optional(),
  //     instagram: z.string().optional(),
  //   })
  //   .optional(),
  categories: z
    .array(z.enum(Object.values(Categories) as [string, ...string[]]))
    .min(1, { message: 'Выберите категорию' }),
  accusations: z
    .string()
    .min(50, { message: 'Минимум символов описания 50' })
    .max(10000, { message: 'Превышен лимит символов' }),
  proof: z
    .array(
      z.object({
        description: z.string().min(1, { message: 'Введите описание' }),
        link: z.string().url({ message: 'Некорректная ссылка' }),
      }),
    )
    .optional(),
});
