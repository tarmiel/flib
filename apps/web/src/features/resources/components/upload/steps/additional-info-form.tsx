import { useFormContext } from 'react-hook-form';
import { type ResourceUploadFormData } from '../schemas';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function AdditionalInfoForm() {
  const form = useFormContext<ResourceUploadFormData>();

  const { control, watch } = form;

  const resourceTypeName = watch('resourceTypeName');

  const renderFields = () => {
    switch (resourceTypeName) {
      case 'Книга':
        return (
          <>
            <FormField
              control={control}
              name="additionalInfo.edition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Видання</FormLabel>
                  <FormControl>
                    <Input placeholder="наприклад, 3-те видання" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="additionalInfo.ISBN"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ISBN</FormLabel>
                  <FormControl>
                    <Input placeholder="номер ISBN" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="additionalInfo.language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Мова</FormLabel>
                  <FormControl>
                    <Input placeholder="Мова" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="additionalInfo.publisher"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Видавець</FormLabel>
                  <FormControl>
                    <Input placeholder="Видавець" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="additionalInfo.numberOfPages"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Кількість сторінок</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Загальна кількість сторінок" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
      case 'Стаття':
        return (
          <>
            <FormField
              control={control}
              name="additionalInfo.journalName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Назва журналу</FormLabel>
                  <FormControl>
                    <Input placeholder="Назва журналу" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="additionalInfo.volume"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Том</FormLabel>
                  <FormControl>
                    <Input placeholder="Том №" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="additionalInfo.issue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Номер випуску</FormLabel>
                  <FormControl>
                    <Input placeholder="Номер випуску" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="additionalInfo.pages"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Сторінки</FormLabel>
                  <FormControl>
                    <Input placeholder="номер(-и) сторінки або від - до" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="additionalInfo.DOI"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>DOI</FormLabel>
                  <FormControl>
                    <Input placeholder="Цифровий ідентифікатор об'єкта" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
      case 'Посібник':
        return (
          <>
            <FormField
              control={control}
              name="additionalInfo.version"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Версія</FormLabel>
                  <FormControl>
                    <Input placeholder="Версія" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="additionalInfo.publisher"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Видавець</FormLabel>
                  <FormControl>
                    <Input placeholder="Видавець" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="additionalInfo.language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Мова</FormLabel>
                  <FormControl>
                    <Input placeholder="Мова" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
      case 'Конференційний матеріал':
        return (
          <>
            <FormField
              control={control}
              name="additionalInfo.conferenceName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Назва конференції</FormLabel>
                  <FormControl>
                    <Input placeholder="Назва конференції" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="additionalInfo.location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Місце проведення</FormLabel>
                  <FormControl>
                    <Input placeholder="Місце проведення" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="additionalInfo.conferenceDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Дата конференції</FormLabel>
                  <FormControl>
                    <Input type={'date'} placeholder="Дата конференції" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
      case 'Дисертація':
        return (
          <>
            <FormField
              control={control}
              name="additionalInfo.degree"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ступінь</FormLabel>
                  <FormControl>
                    <Input placeholder="Ступінь" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="additionalInfo.advisor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Науковий керівник</FormLabel>
                  <FormControl>
                    <Input placeholder="Науковий керівник" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="additionalInfo.institution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Установа</FormLabel>
                  <FormControl>
                    <Input placeholder="Установа" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="additionalInfo.defenseDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Дата захисту</FormLabel>
                  <FormControl>
                    <Input type={'date'} placeholder="Дата захисту" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
      case 'Реферат':
        return (
          <>
            <FormField
              control={control}
              name="additionalInfo.topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Тема</FormLabel>
                  <FormControl>
                    <Input placeholder="Тема" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="additionalInfo.summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Анотація</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Анотація" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
      case 'Звіт':
        return (
          <>
            <FormField
              control={control}
              name="additionalInfo.organization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Організація</FormLabel>
                  <FormControl>
                    <Input placeholder="Організація" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="additionalInfo.reportNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Номер звіту</FormLabel>
                  <FormControl>
                    <Input placeholder="Номер звіту" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="additionalInfo.reportDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Дата звіту</FormLabel>
                  <FormControl>
                    <Input type={'date'} placeholder="Дата звіту" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
      case 'Методичні матеріали':
        return (
          <>
            <FormField
              control={control}
              name="additionalInfo.courseName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Назва курсу</FormLabel>
                  <FormControl>
                    <Input placeholder="Назва курсу" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="additionalInfo.subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Предмет</FormLabel>
                  <FormControl>
                    <Input placeholder="Предмет" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="additionalInfo.academicYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Навчальний рік</FormLabel>
                  <FormControl>
                    <Input placeholder="Навчальний рік" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Деталі ресурсу</h2>
        <p className="text-muted-foreground">
          Будь ласка, надайте додаткові деталі про ресурс типу: {resourceTypeName}.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{renderFields()}</div>
      </div>
    </div>
  );
}
