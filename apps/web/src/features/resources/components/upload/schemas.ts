import type { ResourceTypeName } from '@/types/api';
import { z } from 'zod';

export const baseInfoSchema = z.object({
  title: z.string().min(3, 'Назва повинна містити не менше 3 символів'),
  authors: z
    .array(z.object({ name: z.string().min(1, { message: 'Автор не може бути порожнім' }) }))
    .min(1, { message: 'Необхідно принаймно один автор' }),
  keywords: z.array(z.string()).default([]).optional(),
  citation: z.string().optional(),
  category: z.object({
    id: z.union([z.string(), z.number()]),
    name: z.string().min(1, "Назва категорії обов'язкова"),
  }),
  resourceTypeName: z.string().optional(),
  resourceType: z.object({
    id: z.union([z.string(), z.number()]),
    name: z.string().min(1, "Назва типу ресурсу обов'язкова"),
  }),
  publicationDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Невалідна дата публікації',
  }),
  description: z.string().optional(),
});

export type BaseInfoFormData = z.infer<typeof baseInfoSchema>; // { name: string; age: number; email: string }
type BaseInfoSchemaKeys = keyof BaseInfoFormData; // "name" | "age" | "email"

export const baseInfoKeys = Object.keys(baseInfoSchema.shape) as BaseInfoSchemaKeys[];

const bookSchema = z.object({
  ISBN: z.string(),
  publisher: z.string(),
  numberOfPages: z.coerce.number().min(1, 'Кількість сторінок має бути більше 0'),
  language: z.string(),
  edition: z.string().optional(),
});

const articleSchema = z.object({
  journalName: z.string().min(1, "Назва журналу обов'язкова"),
  volume: z.union([z.string(), z.number()]).refine((val) => val !== '', {
    message: "Том обов'язковий",
  }),
  issue: z.union([z.string(), z.number()]).refine((val) => val !== '', {
    message: "Номер випуску обов'язковий",
  }),
  pages: z.string().min(1, "Сторінки обов'язкові"),
  DOI: z.string().min(1, "DOI обов'язковий"),
});

const methodicalSchema = z.object({
  courseName: z.string().min(1, "Назва курсу обов'язкова"),
  subject: z.string().optional(),
  academicYear: z.string().optional(),
});

const manualSchema = z.object({
  version: z.string().optional(),
  publisher: z.string().optional(),
  language: z.string().optional(),
});

const conferenceSchema = z.object({
  conferenceName: z.string().min(1, "Назва конференції обов'язкова"),
  location: z.string().min(1, "Місце проведення обов'язкове"),
  conferenceDate: z.string().min(1, "Дата конференції обов'язкова"),
});

const dissertationSchema = z.object({
  degree: z.string().min(1, "Науковий ступінь обов'язковий"),
  advisor: z.string().min(1, "Науковий керівник обов'язковий"),
  institution: z.string().min(1, "Заклад обов'язковий"),
  defenseDate: z.string().min(1, "Дата захисту обов'язкова"),
});

const abstractSchema = z.object({
  topic: z.string().min(1, "Тема обов'язкова"),
  summary: z.string().optional(),
});

const reportSchema = z.object({
  organization: z.string().min(1, "Організація обов'язкова"),
  reportNumber: z.string().optional(),
  reportDate: z.string().min(1, "Дата звіту обов'язкова"),
});

export const resourceUploadSchema = z
  .discriminatedUnion('resourceTypeName', [
    baseInfoSchema.extend({
      resourceTypeName: z.literal('Книга'),
      additionalInfo: bookSchema.optional(),
    }),
    baseInfoSchema.extend({
      resourceTypeName: z.literal('Стаття'),
      additionalInfo: articleSchema.optional(),
    }),
    baseInfoSchema.extend({
      resourceTypeName: z.literal('Методичні матеріали'),
      additionalInfo: methodicalSchema.optional(),
    }),
    baseInfoSchema.extend({
      resourceTypeName: z.literal('Посібник'),
      additionalInfo: manualSchema.optional(),
    }),
    baseInfoSchema.extend({
      resourceTypeName: z.literal('Конференційний матеріал'),
      additionalInfo: conferenceSchema.optional(),
    }),
    baseInfoSchema.extend({
      resourceTypeName: z.literal('Дисертація'),
      additionalInfo: dissertationSchema.optional(),
    }),
    baseInfoSchema.extend({
      resourceTypeName: z.literal('Реферат'),
      additionalInfo: abstractSchema.optional(),
    }),
    baseInfoSchema.extend({
      resourceTypeName: z.literal('Звіт'),
      additionalInfo: reportSchema.optional(),
    }),
  ])
  .and(z.object({ fileName: z.string().optional(), fileFormat: z.string().optional() }))
  .and(z.object({ previewImageUrl: z.string().optional() }));

export type ResourceUploadFormData = z.infer<typeof resourceUploadSchema>;
