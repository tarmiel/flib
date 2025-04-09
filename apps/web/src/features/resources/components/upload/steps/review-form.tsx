import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { useFormContext } from 'react-hook-form';
import type { ResourceUploadFormData } from '../schemas';
import { Checkbox } from '@/components/ui/checkbox';

interface ReviewFormProps {}

export function ReviewForm({}: ReviewFormProps) {
  const form = useFormContext<ResourceUploadFormData>();

  return (
    <div className="mt-8 p-4 border rounded-md bg-muted/20">
      <FormField
        control={form.control}
        name="authorRightsConfirmation"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormDescription className="text-sm">
                Я підтверджую, що я або є автором цього ресурсу, або отримав чіткий дозвіл від
                автора (авторів) на завантаження цієї роботи. Я розумію, що завантаження матеріалів,
                захищених авторським правом, без відповідного дозволу може порушувати закони про
                інтелектуальну власність.
              </FormDescription>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}
