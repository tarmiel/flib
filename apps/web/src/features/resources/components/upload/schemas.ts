import { z } from 'zod';
import { FILE_FORMAT } from '../../lib/resources';

export const baseInfoSchema = z.object({
  title: z
    .string({
      required_error: "Назва обов'язкова",
    })
    .min(3, 'Назва повинна містити не менше 3 символів'),
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
    name: z.string({
      required_error: "Назва типу ресурсу обов'язкова",
    }),
  }),
  publicationDate: z
    .string({ required_error: 'Необхідно вказати дату публікації' })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Невалідна дата публікації',
    }),
  description: z.string({
    required_error: 'Надайте опис ресурсу',
  }),
});

const bookSchema = z.object({
  ISBN: z.string({
    required_error: "Обов'язкове поле",
  }),
  publisher: z.string({
    required_error: "Обов'язкове поле",
  }),
  numberOfPages: z.coerce.number().min(1, 'Кількість сторінок має бути більше 0').default(0),
  language: z.string({
    required_error: "Обов'язкове поле",
  }),
  edition: z.string().optional(),
});

const articleSchema = z.object({
  journalName: z.string({
    required_error: "Назва журналу обов'язкова",
  }),
  volume: z
    .union([z.string(), z.number()], {
      required_error: "Том обов'язковий",
    })
    .refine((val) => val !== '', {
      message: "Том обов'язковий",
    }),
  issue: z
    .union([z.string(), z.number()], {
      required_error: "Номер випуску обов'язковий",
    })
    .refine((val) => val !== '', {
      message: "Номер випуску обов'язковий",
    }),
  pages: z.string({
    required_error: "Сторінки обов'язкові",
  }),
  DOI: z.string({
    required_error: "DOI обов'язковий",
  }),
});

const methodicalSchema = z.object({
  courseName: z.string({
    required_error: "Назва курсу обов'язкова",
  }),
  subject: z.string().optional(),
  academicYear: z.string().optional(),
});

const manualSchema = z.object({
  version: z.string().optional(),
  publisher: z.string().optional(),
  language: z.string().optional(),
});

const conferenceSchema = z.object({
  conferenceName: z.string({
    required_error: "Назва конференції обов'язкова",
  }),
  location: z.string({
    required_error: "Місце проведення обов'язкове",
  }),
  conferenceDate: z.string({
    required_error: "Дата конференції обов'язкова",
  }),
});

const dissertationSchema = z.object({
  degree: z.string({
    required_error: "Науковий ступінь обов'язковий",
  }),
  advisor: z.string({
    required_error: "Науковий керівник обов'язковий",
  }),
  institution: z.string({
    required_error: "Заклад обов'язковий",
  }),
  defenseDate: z.string({
    required_error: "Дата захисту обов'язкова",
  }),
});

const abstractSchema = z.object({
  topic: z.string({
    required_error: "Тема обов'язкова",
  }),
  summary: z.string().optional(),
});

const reportSchema = z.object({
  organization: z.string({
    required_error: "Організація обов'язкова",
  }),
  reportNumber: z.string().optional(),
  reportDate: z.string({
    required_error: "Дата звіту обов'язкова",
  }),
});

export const resourceFileUploadSchema = z.object({
  fileName: z
    .string({
      required_error: "Файл обов'язковий",
    })
    .optional()
    .refine((val) => Boolean(val), {
      message: "Файл обов'язковий",
    }),
  fileFormat: z
    .enum([FILE_FORMAT.PDF, FILE_FORMAT.DJVU])
    .optional()
    .refine((val) => Boolean(val), {
      message: "Формат файлу обов'язковий",
    }),
  fileSize: z
    .string({
      required_error: "Розмір файлу обов'язковий",
    })
    .optional()
    .refine((val) => Boolean(val), {
      message: "Розмір файлу обов'язковий",
    }),
});

export const resourcePreviewImageSchema = z.object({
  previewImageName: z.string().optional(),
  previewImageUrl: z.string().optional().nullable(),
});

export type BaseInfoFormData = z.infer<typeof baseInfoSchema>;
type BaseInfoSchemaKeys = keyof BaseInfoFormData;

export const baseInfoValidationKeys = Object.keys(baseInfoSchema.shape) as BaseInfoSchemaKeys[];

export type ResourceFileUploadFormData = z.infer<typeof resourceFileUploadSchema>;
type ResourceFileUploadSchemaKeys = keyof ResourceFileUploadFormData;

export const resourceFileUploadValidationKeys = Object.keys(
  resourceFileUploadSchema.shape,
) as ResourceFileUploadSchemaKeys[];

export const additionalInfoValidationKeys = ['additionalInfo'] as (keyof ResourceUploadFormData)[];

export type ResourcePreviewImageFormData = z.infer<typeof resourcePreviewImageSchema>;
type ResourcePreviewImageSchemaKeys = keyof ResourcePreviewImageFormData;

export const resourcePreviewImageValidationKeys = Object.keys(
  resourcePreviewImageSchema.shape,
) as ResourcePreviewImageSchemaKeys[];

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
  .and(resourceFileUploadSchema)
  .and(resourcePreviewImageSchema);

export type ResourceUploadFormData = z.infer<typeof resourceUploadSchema>;
