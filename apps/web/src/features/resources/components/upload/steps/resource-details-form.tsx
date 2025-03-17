'use client';

import type { UseFormReturn } from 'react-hook-form';

import type { ResourceFormValues } from '../resource-upload-form';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ResourceDetailsFormProps {
  form: UseFormReturn<ResourceFormValues>;
}

export function ResourceDetailsForm({ form }: ResourceDetailsFormProps) {
  const { control, watch } = form;
  const resourceType = watch('type');

  // Common fields for all resource types
  const commonFields = (
    <>
      <FormField
        control={control}
        name="publisher"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Publisher</FormLabel>
            <FormControl>
              <Input placeholder="Publisher name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="publishDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Publication Date</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="language"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Language</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Spanish">Spanish</SelectItem>
                <SelectItem value="French">French</SelectItem>
                <SelectItem value="German">German</SelectItem>
                <SelectItem value="Chinese">Chinese</SelectItem>
                <SelectItem value="Japanese">Japanese</SelectItem>
                <SelectItem value="Russian">Russian</SelectItem>
                <SelectItem value="Arabic">Arabic</SelectItem>
                <SelectItem value="Portuguese">Portuguese</SelectItem>
                <SelectItem value="Hindi">Hindi</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );

  // Book-specific fields
  const bookFields = resourceType === 'book' && (
    <>
      <FormField
        control={control}
        name="edition"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Edition</FormLabel>
            <FormControl>
              <Input placeholder="e.g., 3rd Edition" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="isbn"
        render={({ field }) => (
          <FormItem>
            <FormLabel>ISBN</FormLabel>
            <FormControl>
              <Input placeholder="ISBN number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="pages"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Number of Pages</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Total pages" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );

  // Journal-specific fields
  const journalFields = resourceType === 'journal' && (
    <>
      <FormField
        control={control}
        name="volume"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Volume</FormLabel>
            <FormControl>
              <Input placeholder="Volume number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="issue"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Issue</FormLabel>
            <FormControl>
              <Input placeholder="Issue number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="doi"
        render={({ field }) => (
          <FormItem>
            <FormLabel>DOI</FormLabel>
            <FormControl>
              <Input placeholder="Digital Object Identifier" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );

  // Article-specific fields
  const articleFields = resourceType === 'article' && (
    <FormField
      control={control}
      name="doi"
      render={({ field }) => (
        <FormItem>
          <FormLabel>DOI</FormLabel>
          <FormControl>
            <Input placeholder="Digital Object Identifier" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  // Thesis-specific fields
  const thesisFields = resourceType === 'thesis' && (
    <>
      <FormField
        control={control}
        name="university"
        render={({ field }) => (
          <FormItem>
            <FormLabel>University</FormLabel>
            <FormControl>
              <Input placeholder="University name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="department"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Department</FormLabel>
            <FormControl>
              <Input placeholder="Department name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="degree"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Degree</FormLabel>
            <FormControl>
              <Input placeholder="e.g., Ph.D., Master's" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );

  // Conference paper-specific fields
  const conferenceFields = resourceType === 'conference_paper' && (
    <>
      <FormField
        control={control}
        name="conference"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Conference Name</FormLabel>
            <FormControl>
              <Input placeholder="Conference name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="conferenceDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Conference Date</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="conferenceLocation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Conference Location</FormLabel>
            <FormControl>
              <Input placeholder="City, Country" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Resource Details</h2>
        <p className="text-muted-foreground">
          Please provide additional details about the {resourceType?.replace('_', ' ')}.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {commonFields}
          {bookFields}
          {journalFields}
          {articleFields}
          {thesisFields}
          {conferenceFields}
        </div>
      </div>
    </div>
  );
}
