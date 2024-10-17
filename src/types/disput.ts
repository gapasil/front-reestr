// types/disput.ts

import { z } from 'zod';

export interface Disput {
  id: string; // Уникальный идентификатор disput
  idCrud: string; // Идентификатор связанного Crud
  idUser: string; // Идентификатор пользователя, создавшего disput
  images: string[]; // Массив путей к изображениям
  videos: string[]; // Массив путей к видео
  link?: string; // Ссылка, если есть
  description: string;
}

export interface CreateDisput {
  description: string;
  link: string | File[]; // Ссылка или массив файлов
  videos: File[]; // Массив видеофайлов
  idCrud: string;
}

export const DisputSchema = z.object({
  description: z
    .string()
    .min(1, { message: 'Введите текст в 500 символов' })
    .max(2000, { message: 'Максимальное количество 2000 символов' })
    .optional(),
  idCrud: z
    .string()
    .min(1, { message: 'Выберите что хотите оспорить' })
    .optional(),
});
