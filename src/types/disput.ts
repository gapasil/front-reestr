import { z } from 'zod';

interface disputProof {
  description: string;
  link: string;
}

export interface Disput {
  id: string; // Уникальный идентификатор disput
  id_crud: string; // Идентификатор связанного Crud
  id_user: string; // Идентификатор пользователя, создавшего disput
  images: string[]; // Массив путей к изображениям
  videos: string[]; // Массив путей к видео
  link?: disputProof[]; // Ссылка, если есть
  description: string;
  status: string;
  admin: boolean;
}

export interface CreateDisput {
  description: string;
  link: disputProof[]; // Ссылка или массив файлов
  videos: File[]; // Массив видеофайлов
  images: File[];
  id_crud: string;
  id_user: string;
}

export const DisputSchema = z.object({
  description: z
    .string()
    .min(1, { message: 'Введите текст в 500 символов' })
    .max(2000, { message: 'Максимальное количество 2000 символов' })
    .optional(),
  id_crud: z
    .string()
    .min(1, { message: 'Выберите что хотите оспорить' })
    .optional(),
  link: z
    .array(
      z.object({
        description: z.string().min(1, { message: 'Введите описание' }),
        link: z.string().url({ message: 'Некорректная ссылка' }),
      }),
    )
    .optional(),
});
