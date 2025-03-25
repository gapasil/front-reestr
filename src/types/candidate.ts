import { z } from 'zod';

export interface CandidateType {
  id: string; // Уникальный идентификатор
  links?: string[]; // Массив строк для ссылок
  description: string;
  name: string;
  admin: boolean;
}

export interface CreateCandidate {
  name: string;
  description: string;
  links: string[]; // Массив строк для ссылок
}

// Обновленная схема валидации
export const CandidateSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Введите текст' })
    .max(2000, { message: 'Максимальное количество 2000 символов' }),
  description: z
    .string()
    .min(15, { message: 'Напишите подробное описание минимум 15 символов' })
    .max(2000, { message: 'Максимальное количество 2000 символов' }),
  links: z
    .array(z.string().url({ message: 'Некорректная ссылка' })) // Массив строк, каждая из которых должна быть корректной ссылкой
    .max(15, { message: 'Не более 15 ссылок' }), // Ограничение на количество ссылок
});
