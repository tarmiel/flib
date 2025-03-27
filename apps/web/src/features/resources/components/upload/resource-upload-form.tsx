import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

import { useNavigate } from 'react-router';
import { baseInfoKeys, resourceUploadSchema, type ResourceUploadFormData } from './schemas';
import { AdditionalInfoForm } from './steps/additional-info-form';
import { BaseInfoForm } from './steps/base-info-form';
import { ResourceFileUploadForm } from './steps/resource-file-upload-form';

// Define the form schema with zod
export const resourceFormSchema = z.object({
  // Basic Info
  title: z.string().min(3, { message: 'Title must be at least 3 characters.' }),
  authors: z
    .array(z.object({ name: z.string().min(1) }))
    .min(1, { message: 'At least one author is required.' }),
  type: z.enum(['book', 'journal', 'article', 'thesis', 'conference_paper'], {
    required_error: 'Please select a resource type.',
  }),
  category: z.string({
    required_error: 'Please select a category.',
  }),
  description: z.string().optional(),
  keywords: z.array(z.string()).optional(),

  // Resource Details (varies by type)
  publisher: z.string().optional(),
  publishDate: z.string().optional(),
  edition: z.string().optional(),
  isbn: z.string().optional(),
  doi: z.string().optional(),
  language: z.string().default('English'),
  pages: z.string().optional(),
  volume: z.string().optional(),
  issue: z.string().optional(),
  conference: z.string().optional(),
  conferenceDate: z.string().optional(),
  conferenceLocation: z.string().optional(),
  university: z.string().optional(),
  department: z.string().optional(),
  degree: z.string().optional(),

  // File Upload
  file: z.instanceof(File, { message: 'Please upload a file.' }).optional(),
});

// Infer the type from the schema
export type ResourceFormValues = z.infer<typeof resourceFormSchema>;

// Define the steps
export const resourceFormSteps = [
  { id: 'basic-info', label: 'Basic Info' },
  { id: 'details', label: 'Resource Details' },
  { id: 'file-upload', label: 'File Upload' },
  { id: 'review', label: 'Review' },
];

export function ResourceUploadForm() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize the form with default values
  const form = useForm<ResourceUploadFormData>({
    resolver: zodResolver(resourceUploadSchema),
    mode: 'onChange',
  });

  console.log({ values: form.getValues(), errors: form.formState.errors });

  // Calculate progress percentage
  const progress = ((currentStep + 1) / resourceFormSteps.length) * 100;

  // Handle next step
  const handleNext = async () => {
    const fieldsToValidate = getFieldsToValidateForStep(currentStep);
    const result = await form.trigger(fieldsToValidate as any);
    console.log({ fieldsToValidate, result });

    if (!result) return;

    if (currentStep < resourceFormSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Handle previous step
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Get fields to validate for the current step
  const getFieldsToValidateForStep = (step: number) => {
    switch (step) {
      case 0: // Basic Info
        return baseInfoKeys;
      case 1: // Resource Details
        return 'additionalInfo';
      case 2: // File Upload
        return 'fileName';
      case 3: // File Upload
        return 'previewImage';
      default:
        return [];
    }
  };

  // Handle form submission
  const onSubmit = async (data: ResourceUploadFormData) => {
    setIsSubmitting(true);

    try {
      // In a real app, you would send this data to your backend
      console.log('Form data:', data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // toast.success('Resource uploaded successfully');
      // navigate(APP_PATH.app.dashboard.resources.getHref());
    } catch (error) {
      console.error('Помилка при завантаженні ресурсу:', error);
      // toast.error('Failed to upload resource');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>
            Крок {currentStep + 1} з {resourceFormSteps.length}
          </span>
          <span>{resourceFormSteps[currentStep]?.label}</span>
        </div>
      </div>

      <Card className="p-6">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {currentStep === 0 && <BaseInfoForm />}
            {currentStep === 1 && <AdditionalInfoForm />}
            {currentStep === 2 && <ResourceFileUploadForm />}

            {/*

            {currentStep === 3 && <ReviewForm form={form} />} */}

            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
              >
                <span className={'flex items-center'}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Назад
                </span>
              </Button>

              {currentStep < resourceFormSteps.length - 1 ? (
                <Button key={'next'} type="button" onClick={handleNext}>
                  <span className={'flex items-center'}>
                    Далі
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </span>
                </Button>
              ) : (
                <Button
                  key={'upload'}
                  type="submit"
                  disabled={isSubmitting}
                  isLoading={isSubmitting}
                >
                  {isSubmitting ? 'Завантаження...' : 'Завантажити ресурс'}
                </Button>
              )}
            </div>
          </form>
        </FormProvider>
      </Card>
    </div>
  );
}

// import React, { useState } from 'react';
// import { useForm, useFieldArray, Controller } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { Label } from '@/components/ui/label';

// // Enums from your document
// const resourceTypeNames = [
//   'Книга',
//   'Стаття',
//   'Методичні матеріали',
//   'Посібник',
//   'Конференційний матеріал',
//   'Дисертація',
//   'Реферат',
//   'Звіт',
// ] as const;

// const categoryNames = [
//   'Алгоритми',
//   'Системне програмування',
//   'Мережеві технології',
//   'Бази даних',
//   'Штучний інтелект',
//   'Інформаційна безпека',
//   'Вбудовані системи',
//   'Розподілені системи',
//   'Фізика',
//   'Квантова фізика',
//   'Вища математика',
//   'Електроніка',
//   'Радіофізика',
//   "Комп'ютерні системи",
// ] as const;

// // Zod schemas for additional info (unchanged for brevity)
// const bookSchema = z.object({
//   ISBN: z.string().min(1, "ISBN обов'язковий"),
//   publisher: z.string().min(1, "Видавництво обов'язкове"),
//   numberOfPages: z.number().min(1, 'Кількість сторінок має бути більше 0'),
//   language: z.string().min(1, "Мова обов'язкова"),
//   edition: z.string().optional(),
// });

// // Add other schemas similarly...

// // Base schema with publicationDate
// const baseSchema = z.object({
//   title: z.string().min(1, "Назва обов'язкова"),
//   authors: z.array(z.string().min(1, 'Автор не може бути порожнім')),
//   keywords: z.array(z.string().min(1, 'Ключове слово не може бути порожнім')),
//   citation: z.string().min(1, "Цитата обов'язкова"),
//   publicationDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
//     message: 'Невалідна дата публікації',
//   }), // ISO string
//   categoryName: z.enum(categoryNames),
//   resourceTypeName: z.enum(resourceTypeNames),
// });

// const formSchema = z
//   .discriminatedUnion('resourceTypeName', [
//     baseSchema.extend({ additionalInfo: bookSchema, resourceTypeName: z.literal('Книга') }),
//     // Add other resource types...
//   ])
//   .and(
//     z.object({
//       file: z.instanceof(File).optional(),
//       previewImage: z.instanceof(File).optional(),
//     }),
//   );

// type FormData = z.infer<typeof formSchema>;

// const ResourceUploadForm: React.FC = () => {
//   const [step, setStep] = useState(1);
//   const {
//     register,
//     control,
//     handleSubmit,
//     watch,
//     formState: { errors },
//     setValue,
//   } = useForm<FormData>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       title: '',
//       authors: [''],
//       keywords: [''],
//       citation: '',
//       publicationDate: new Date().toISOString(), // Default to current date
//       categoryName: 'Алгоритми',
//       resourceTypeName: 'Книга',
//       additionalInfo: {},
//     },
//   });

//   // useFieldArray for authors
//   const {
//     fields: authorFields,
//     append: appendAuthor,
//     remove: removeAuthor,
//   } = useFieldArray({
//     control,
//     name: 'authors',
//   });

//   // useFieldArray for keywords
//   const {
//     fields: keywordFields,
//     append: appendKeyword,
//     remove: removeKeyword,
//   } = useFieldArray({
//     control,
//     name: 'keywords',
//   });

//   const resourceType = watch('resourceTypeName');

//   const onSubmit = (data: FormData) => {
//     console.log('Form Submitted:', data);
//     alert('Дані успішно відправлені!');
//   };

//   const renderAdditionalInfoFields = () => {
//     switch (resourceType) {
//       case 'Книга':
//         return (
//           <>
//             <div>
//               <Label>ISBN</Label>
//               <Input {...register('additionalInfo.ISBN')} />
//               {errors.additionalInfo?.ISBN && <p>{errors.additionalInfo.ISBN.message}</p>}
//             </div>
//             <div>
//               <Label>Видавництво</Label>
//               <Input {...register('additionalInfo.publisher')} />
//               {errors.additionalInfo?.publisher && <p>{errors.additionalInfo.publisher.message}</p>}
//             </div>
//             <div>
//               <Label>Кількість сторінок</Label>
//               <Input
//                 type="number"
//                 {...register('additionalInfo.numberOfPages', { valueAsNumber: true })}
//               />
//               {errors.additionalInfo?.numberOfPages && (
//                 <p>{errors.additionalInfo.numberOfPages.message}</p>
//               )}
//             </div>
//             <div>
//               <Label>Мова</Label>
//               <Input {...register('additionalInfo.language')} />
//               {errors.additionalInfo?.language && <p>{errors.additionalInfo.language.message}</p>}
//             </div>
//             <div>
//               <Label>Видання (опціонально)</Label>
//               <Input {...register('additionalInfo.edition')} />
//             </div>
//           </>
//         );
//       // Add other cases...
//       default:
//         return null;
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//       {step === 1 && (
//         <div>
//           <h2>Крок 1: Основна інформація</h2>
//           <div>
//             <Label>Назва</Label>
//             <Input {...register('title')} />
//             {errors.title && <p>{errors.title.message}</p>}
//           </div>
//           <div>
//             <Label>Автори</Label>
//             {authorFields.map((field, index) => (
//               <div key={field.id} className="flex space-x-2">
//                 <Input {...register(`authors.${index}` as const)} defaultValue={field} />
//                 <Button type="button" onClick={() => removeAuthor(index)}>
//                   Видалити
//                 </Button>
//               </div>
//             ))}
//             <Button type="button" onClick={() => appendAuthor('')}>
//               Додати автора
//             </Button>
//             {errors.authors && <p>{errors.authors.message}</p>}
//           </div>
//           <div>
//             <Label>Ключові слова</Label>
//             {keywordFields.map((field, index) => (
//               <div key={field.id} className="flex space-x-2">
//                 <Input {...register(`keywords.${index}` as const)} defaultValue={field} />
//                 <Button type="button" onClick={() => removeKeyword(index)}>
//                   Видалити
//                 </Button>
//               </div>
//             ))}
//             <Button type="button" onClick={() => appendKeyword('')}>
//               Додати ключове слово
//             </Button>
//             {errors.keywords && <p>{errors.keywords.message}</p>}
//           </div>
//           <div>
//             <Label>Цитата</Label>
//             <Input {...register('citation')} />
//             {errors.citation && <p>{errors.citation.message}</p>}
//           </div>
//           <div>
//             <Label>Дата публікації</Label>
//             <Input
//               type="date"
//               onChange={(e) => setValue('publicationDate', new Date(e.target.value).toISOString())}
//               defaultValue={new Date(watch('publicationDate')).toISOString().split('T')[0]}
//             />
//             {errors.publicationDate && <p>{errors.publicationDate.message}</p>}
//           </div>
//           <div>
//             <Label>Категорія</Label>
//             <Controller
//               name="categoryName"
//               control={control}
//               render={({ field }) => (
//                 <Select onValueChange={field.onChange} value={field.value}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Оберіть категорію" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {categoryNames.map((category) => (
//                       <SelectItem key={category} value={category}>
//                         {category}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               )}
//             />
//             {errors.categoryName && <p>{errors.categoryName.message}</p>}
//           </div>
//           <div>
//             <Label>Тип ресурсу</Label>
//             <Controller
//               name="resourceTypeName"
//               control={control}
//               render={({ field }) => (
//                 <Select onValueChange={field.onChange} value={field.value}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Оберіть тип ресурсу" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {resourceTypeNames.map((type) => (
//                       <SelectItem key={type} value={type}>
//                         {type}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               )}
//             />
//             {errors.resourceTypeName && <p>{errors.resourceTypeName.message}</p>}
//           </div>
//           <Button type="button" onClick={() => setStep(2)}>
//             Далі
//           </Button>
//         </div>
//       )}

//       {step === 2 && (
//         <div>
//           <h2>Крок 2: Додаткова інформація</h2>
//           {renderAdditionalInfoFields()}
//           <Button type="button" onClick={() => setStep(1)}>
//             Назад
//           </Button>
//           <Button type="button" onClick={() => setStep(3)}>
//             Далі
//           </Button>
//         </div>
//       )}

//       {step === 3 && (
//         <div>
//           <h2>Крок 3: Завантаження файлу</h2>
//           <div>
//             <Label>Файл (PDF/DJVU)</Label>
//             <Input type="file" {...register('file')} accept=".pdf,.djvu" />
//             {errors.file && <p>{errors.file.message}</p>}
//           </div>
//           <Button type="button" onClick={() => setStep(2)}>
//             Назад
//           </Button>
//           <Button type="button" onClick={() => setStep(4)}>
//             Далі
//           </Button>
//         </div>
//       )}

//       {step === 4 && (
//         <div>
//           <h2>Крок 4: Завантаження прев'ю</h2>
//           <div>
//             <Label>Зображення прев'ю</Label>
//             <Input type="file" {...register('previewImage')} accept="image/*" />
//             {errors.previewImage && <p>{errors.previewImage.message}</p>}
//           </div>
//           <Button type="button" onClick={() => setStep(3)}>
//             Назад
//           </Button>
//           <Button type="button" onClick={() => setStep(5)}>
//             Далі
//           </Button>
//         </div>
//       )}

//       {step === 5 && (
//         <div>
//           <h2>Крок 5: Підтвердження</h2>
//           <pre>{JSON.stringify(watch(), null, 2)}</pre>
//           <Button type="button" onClick={() => setStep(4)}>
//             Назад
//           </Button>
//           <Button type="submit">Підтвердити</Button>
//         </div>
//       )}
//     </form>
//   );
// };

// export { ResourceUploadForm };
