import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Progress } from '@/components/ui/progress';

import { BasicInfoForm } from './steps/basic-info-form';
import { ResourceDetailsForm } from './steps/resource-details-form';
import { FileUploadForm } from './steps/file-upload-form';
import { ReviewForm } from './steps/review-form';
import { useNavigate } from 'react-router';
import { APP_PATH } from '@/config/paths';

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
  // accessLevel: z
  //   .enum(['open', 'restricted', 'private'], {
  //     required_error: 'Please select an access level.',
  //   })
  //   .default('open'),
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
  const form = useForm<ResourceFormValues>({
    resolver: zodResolver(resourceFormSchema),
    defaultValues: {
      title: '',
      authors: [
        {
          name: '',
        },
      ],
      type: undefined,
      category: '',
      description: '',
      keywords: [],
      publisher: '',
      publishDate: '',
      edition: '',
      isbn: '',
      doi: '',
      language: 'English',
      pages: '',
      volume: '',
      issue: '',
      conference: '',
      conferenceDate: '',
      conferenceLocation: '',
      university: '',
      department: '',
      degree: '',
      file: undefined,
      // accessLevel: 'open',
    },
    mode: 'onChange',
  });

  // Calculate progress percentage
  const progress = ((currentStep + 1) / resourceFormSteps.length) * 100;

  // Handle next step
  const handleNext = async () => {
    const fieldsToValidate = getFieldsToValidateForStep(currentStep);

    const result = await form.trigger(fieldsToValidate as any);
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
        return ['title', 'authors', 'type', 'category'];
      case 1: // Resource Details
        return getDetailsFieldsForType(form.getValues('type'));
      case 2: // File Upload
        return ['file', 'accessLevel'];
      default:
        return [];
    }
  };

  // Get details fields based on resource type
  const getDetailsFieldsForType = (type?: string) => {
    const commonFields = ['publisher', 'publishDate', 'language'];

    switch (type) {
      case 'book':
        return [...commonFields, 'edition', 'isbn', 'pages'];
      case 'journal':
        return [...commonFields, 'volume', 'issue', 'doi'];
      case 'article':
        return [...commonFields, 'doi'];
      case 'thesis':
        return [...commonFields, 'university', 'department', 'degree'];
      case 'conference_paper':
        return [...commonFields, 'conference', 'conferenceDate', 'conferenceLocation'];
      default:
        return commonFields;
    }
  };

  // Handle form submission
  const onSubmit = async (data: ResourceFormValues) => {
    setIsSubmitting(true);

    try {
      // In a real app, you would send this data to your backend
      console.log('Form data:', data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // toast.success('Resource uploaded successfully');
      navigate(APP_PATH.app.dashboard.resources.getHref());
    } catch (error) {
      console.error('Error submitting form:', error);
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
            Step {currentStep + 1} of {resourceFormSteps.length}
          </span>
          <span>{resourceFormSteps[currentStep]?.label}</span>
        </div>
      </div>

      <Card className="p-6">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {currentStep === 0 && <BasicInfoForm form={form} />}

            {currentStep === 1 && <ResourceDetailsForm form={form} />}

            {currentStep === 2 && <FileUploadForm form={form} />}

            {currentStep === 3 && <ReviewForm form={form} />}

            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
              >
                <span className={'flex items-center'}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </span>
              </Button>

              {currentStep < resourceFormSteps.length - 1 ? (
                <Button key={'next'} type="button" onClick={handleNext}>
                  <span className={'flex items-center'}>
                    Next
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
                  {isSubmitting ? 'Uploading...' : 'Upload Resource'}
                </Button>
              )}
            </div>
          </form>
        </FormProvider>
      </Card>
    </div>
  );
}
