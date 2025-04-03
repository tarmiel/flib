import { useRef } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { type ResourceUploadFormData } from '../schemas';

import { Plus, X } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { MOCK_CATEGORIES, MOCK_RESOURCE_TYPES } from '@/features/resources/lib/resources';
import { useCategories } from '@/features/resource-categories/api/get-resource-categories';
import { useResourceTypes } from '@/features/resource-types/api/get-resource-types';

export function BaseInfoForm() {
  const keywordInputRef = useRef<HTMLInputElement>(null);
  const { data: categories = [] } = useCategories();
  const { data: resourceTypes = [] } = useResourceTypes();

  const form = useFormContext<ResourceUploadFormData>();

  const {
    control,
    getValues,
    formState: { errors },
    watch,
    setValue,
  } = form;

  const {
    fields: authorFields,
    append: appendAuthor,
    remove: removeAuthor,
  } = useFieldArray({
    control,
    name: 'authors',
  });

  const keywords = watch('keywords') || [];

  const addKeyword = (keyword: string) => {
    if (!keyword.trim()) return;

    const currentKeywords = getValues('keywords') || [];
    if (!currentKeywords.includes(keyword.trim())) {
      setValue('keywords', [...currentKeywords, keyword.trim()]);
      return true;
    }
    return false;
  };

  const removeKeyword = (keyword: string) => {
    const currentKeywords = getValues('keywords') || [];
    setValue(
      'keywords',
      currentKeywords.filter((k) => k !== keyword),
    );
  };

  const handleKeywordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();

      const input = e.currentTarget;
      const value = input.value.trim();

      if (value && addKeyword(value)) {
        input.value = '';
      }
    }
  };

  const handleAddKeyword = () => {
    const input = keywordInputRef.current;
    if (!input || !input.value.trim()) return;

    addKeyword(input.value.trim());
    input.value = '';
    input.focus();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Загальна інформація</h2>

        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Назва <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Введіть назву ресурсу" {...field} />
              </FormControl>
              <FormDescription>Повна назва ресурсу.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="authors"
          render={() => (
            <div className="space-y-4">
              <FormLabel>
                Автори <span className="text-destructive">*</span>
              </FormLabel>
              <FormDescription>Додайте всіх авторів ресурсу.</FormDescription>

              {authorFields.map((field, index) => (
                <FormField
                  key={field.id}
                  control={control}
                  name={`authors.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input placeholder={`Author ${index + 1}`} {...field} />
                        </FormControl>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeAuthor(index)}
                          disabled={authorFields.length <= 1}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

              <FormMessage />

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  appendAuthor({
                    name: '',
                  })
                }
                className="mt-2 space-x-0"
                icon={<Plus className="mr-2 h-4 w-4" />}
              >
                Додати автора
              </Button>
            </div>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={control}
            name="resourceType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Тип ресурсу <span className="text-destructive">*</span>
                </FormLabel>
                <Select
                  onValueChange={(value) => {
                    const resourceType =
                      resourceTypes.find((type) => type.name == value) ?? undefined;
                    if (resourceType) {
                      field.onChange(resourceType);
                      form.setValue('resourceTypeName', resourceType.name);
                      form.clearErrors('additionalInfo');
                      form.resetField('additionalInfo');
                    }
                  }}
                  value={field.value?.name}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Виберіть тип ресурсу" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {resourceTypes.map((type) => (
                      <SelectItem key={type.id} value={type.name}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Тип ресурсу, який ви завантажуєте.</FormDescription>
                <FormMessage>
                  {errors.resourceTypeName && <span>Неправильне значення типу ресурсу</span>}
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Категорія <span className="text-destructive">*</span>
                </FormLabel>
                <Select
                  onValueChange={(value) =>
                    field.onChange(categories.find((type) => type.name == value) ?? undefined)
                  }
                  value={field.value?.name}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Оберіть категорію" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Головна категорія ресурсу.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name="publicationDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Дата публікації <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Опис</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Введіть детальний опис ресурсу"
                  className="resize-none"
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormDescription>Короткий опис вмісту ресурсу.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormLabel>Ключові слова</FormLabel>
          <FormDescription>
            Додайте ключові слова, щоб допомогти користувачам знайти ваш ресурс.
          </FormDescription>

          <div className="flex gap-2 items-center">
            <Input
              ref={keywordInputRef}
              id="keyword-input"
              placeholder="Введіть слово..."
              onKeyDown={handleKeywordKeyDown}
            />
            <Button type="button" onClick={handleAddKeyword}>
              Додати
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {keywords.map((keyword, index) => (
              <Badge key={index} variant="secondary" className="gap-1 text-sm">
                {keyword}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => removeKeyword(keyword)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove keyword</span>
                </Button>
              </Badge>
            ))}
          </div>
        </div>

        <FormField
          control={control}
          name="citation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Для цитування</FormLabel>
              <FormControl>
                <Input placeholder="Введіть цитування" {...field} />
              </FormControl>
              <FormDescription>Додайте формат цитування ресурсу.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
