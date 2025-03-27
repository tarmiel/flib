'use client';

import { useState } from 'react';

import { useNavigate } from 'react-router';
// import {
//   resourceFormSchema,
//   resourceFormSteps,
//   type ResourceFormValues,
// } from './resource-upload-form';

interface ResourceEditFormProps {
  resourceId: string;
  initialData: any;
}

export function ResourceEditForm({ resourceId, initialData }: ResourceEditFormProps) {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize the form with the initial data
  // const form = useForm<ResourceFormValues>({
  //   resolver: zodResolver(resourceFormSchema),
  //   defaultValues: {
  //     title: initialData.title || '',
  //     authors: initialData.authors?.map((author: string) => ({ name: author })) || [
  //       {
  //         name: '',
  //       },
  //     ],
  //     type: initialData.type,
  //     category: initialData.category || '',
  //     description: initialData.description || '',
  //     keywords: initialData.keywords || [],
  //     publisher: initialData.publisher || '',
  //     publishDate: initialData.publishDate || '',
  //     edition: initialData.edition || '',
  //     isbn: initialData.isbn || '',
  //     doi: initialData.doi || '',
  //     language: initialData.language || 'English',
  //     pages: initialData.pages || '',
  //     volume: initialData.volume || '',
  //     issue: initialData.issue || '',
  //     conference: initialData.conference || '',
  //     conferenceDate: initialData.conferenceDate || '',
  //     conferenceLocation: initialData.conferenceLocation || '',
  //     university: initialData.university || '',
  //     department: initialData.department || '',
  //     degree: initialData.degree || '',
  //     file: undefined, // File can't be pre-populated
  //     // accessLevel: initialData.accessLevel || 'open',
  //   },
  //   mode: 'onChange',
  // });

  // // Calculate progress percentage
  // const progress = ((currentStep + 1) / resourceFormSteps.length) * 100;

  // // Handle next step
  // const handleNext = async () => {
  //   const fieldsToValidate = getFieldsToValidateForStep(currentStep);

  //   const result = await form.trigger(fieldsToValidate as any);
  //   if (!result) return;

  //   if (currentStep < resourceFormSteps.length - 1) {
  //     setCurrentStep(currentStep + 1);
  //   }
  // };

  // // Handle previous step
  // const handlePrevious = () => {
  //   if (currentStep > 0) {
  //     setCurrentStep(currentStep - 1);
  //   }
  // };

  // // Get fields to validate for the current step
  // const getFieldsToValidateForStep = (step: number) => {
  //   switch (step) {
  //     case 0: // Basic Info
  //       return ['title', 'authors', 'type', 'category'];
  //     case 1: // Resource Details
  //       return getDetailsFieldsForType(form.getValues('type'));
  //     case 2: // File Upload
  //       return ['accessLevel']; // File is optional for editing
  //     default:
  //       return [];
  //   }
  // };

  // // Get details fields based on resource type
  // const getDetailsFieldsForType = (type?: string) => {
  //   const commonFields = ['publisher', 'publishDate', 'language'];

  //   switch (type) {
  //     case 'book':
  //       return [...commonFields, 'edition', 'isbn', 'pages'];
  //     case 'journal':
  //       return [...commonFields, 'volume', 'issue', 'doi'];
  //     case 'article':
  //       return [...commonFields, 'doi'];
  //     case 'thesis':
  //       return [...commonFields, 'university', 'department', 'degree'];
  //     case 'conference_paper':
  //       return [...commonFields, 'conference', 'conferenceDate', 'conferenceLocation'];
  //     default:
  //       return commonFields;
  //   }
  // };

  // // Handle form submission
  // const onSubmit = async (data: ResourceFormValues) => {
  //   setIsSubmitting(true);

  //   try {
  //     // In a real app, you would send this data to your backend
  //     console.log('Updating resource:', resourceId, data);

  //     // Simulate API call
  //     await new Promise((resolve) => setTimeout(resolve, 2000));

  //     // toast.success("Resource updated successfully")
  //   } catch (error) {
  //     console.error('Error updating resource:', error);
  //     // toast.error("Failed to update resource")
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  // return (
  //   <div className="space-y-6">
  //     <div className="space-y-2">
  //       <Progress value={progress} className="h-2" />
  //       <div className="flex justify-between text-sm text-muted-foreground">
  //         <span>
  //           Step {currentStep + 1} of {resourceFormSteps.length}
  //         </span>
  //         <span>{resourceFormSteps[currentStep]?.label}</span>
  //       </div>
  //     </div>

  //     <Card className="p-6">
  //       <FormProvider {...form}>
  //         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
  //           {currentStep === 0 && <BasicInfoForm form={form} />}

  //           {currentStep === 1 && <ResourceDetailsForm form={form} />}

  //           {currentStep === 2 && <FileUploadForm form={form} isEditing={true} />}

  //           {currentStep === 3 && <ReviewForm form={form} isEditing={true} />}

  //           <div className="flex justify-between pt-4">
  //             <Button
  //               type="button"
  //               variant="outline"
  //               onClick={handlePrevious}
  //               disabled={currentStep === 0}
  //             >
  //               <span className={'flex items-center'}>
  //                 <ChevronLeft className="mr-2 h-4 w-4" />
  //                 Previous
  //               </span>
  //             </Button>

  //             {currentStep < resourceFormSteps.length - 1 ? (
  //               <Button type="button" onClick={handleNext}>
  //                 <span className={'flex items-center'}>
  //                   Next
  //                   <ChevronRight className="ml-2 h-4 w-4" />
  //                 </span>
  //               </Button>
  //             ) : (
  //               <Button type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
  //                 {isSubmitting ? 'Updating...' : 'Update Resource'}
  //               </Button>
  //             )}
  //           </div>
  //         </form>
  //       </FormProvider>
  //     </Card>
  //   </div>
  // );
}
