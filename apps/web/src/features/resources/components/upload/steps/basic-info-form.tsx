import type React from 'react';

import type { UseFormReturn } from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';
import { Plus, X } from 'lucide-react';

import type { ResourceFormValues } from '../resource-upload-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useRef } from 'react';

interface BasicInfoFormProps {
  form: UseFormReturn<ResourceFormValues>;
}

export function BasicInfoForm({ form }: BasicInfoFormProps) {
  const { control, setValue, getValues, watch } = form;
  const keywordInputRef = useRef<HTMLInputElement>(null);

  // Use useFieldArray for managing the authors array
  const {
    fields: authorFields,
    append: appendAuthor,
    remove: removeAuthor,
  } = useFieldArray({
    control,
    name: 'authors',
  });

  // Watch keywords to update UI
  const keywords = watch('keywords') || [];

  // Add a keyword
  const addKeyword = (keyword: string) => {
    if (!keyword.trim()) return;

    const currentKeywords = getValues('keywords') || [];
    if (!currentKeywords.includes(keyword.trim())) {
      setValue('keywords', [...currentKeywords, keyword.trim()]);
      return true;
    }
    return false;
  };

  // Remove a keyword
  const removeKeyword = (keyword: string) => {
    const currentKeywords = getValues('keywords') || [];
    setValue(
      'keywords',
      currentKeywords.filter((k) => k !== keyword),
    );
  };

  // Handle keyword input
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
        <h2 className="text-xl font-semibold">Basic Information</h2>

        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Title <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter resource title" {...field} />
              </FormControl>
              <FormDescription>The full title of the resource.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <FormLabel>
            Authors <span className="text-destructive">*</span>
          </FormLabel>
          <FormDescription>Add all authors of the resource.</FormDescription>

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
            Add Author
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Resource Type <span className="text-destructive">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select resource type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="book">Book</SelectItem>
                    <SelectItem value="journal">Journal</SelectItem>
                    <SelectItem value="article">Article</SelectItem>
                    <SelectItem value="thesis">Thesis</SelectItem>
                    <SelectItem value="conference_paper">Conference Paper</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>The type of resource you are uploading.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Category <span className="text-destructive">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="computer_science">Computer Science</SelectItem>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                    <SelectItem value="biology">Biology</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="medicine">Medicine</SelectItem>
                    <SelectItem value="economics">Economics</SelectItem>
                    <SelectItem value="psychology">Psychology</SelectItem>
                    <SelectItem value="literature">Literature</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>The main category of the resource.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter a detailed description of the resource"
                  className="resize-none"
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormDescription>A brief description of the resource content.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormLabel>Keywords</FormLabel>
          <FormDescription>Add keywords to help users find your resource.</FormDescription>

          <div className="flex gap-2 items-center">
            <Input
              ref={keywordInputRef}
              id="keyword-input"
              placeholder="Add keywords..."
              onKeyDown={handleKeywordKeyDown}
            />
            <Button type="button" onClick={handleAddKeyword}>
              Add
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {keywords.map((keyword, index) => (
              <Badge key={index} variant="secondary" className="gap-1">
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
      </div>
    </div>
  );
}
