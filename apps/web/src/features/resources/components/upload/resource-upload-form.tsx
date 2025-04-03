import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FormProvider, useForm, type FieldPath } from 'react-hook-form';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { useCreateResource } from '../../api/create-resource';
import {
  additionalInfoValidationKeys,
  baseInfoValidationKeys,
  resourceFileUploadValidationKeys,
  resourcePreviewImageValidationKeys,
  resourceUploadSchema,
  type ResourceUploadFormData,
} from './schemas';
import { AdditionalInfoForm } from './steps/additional-info-form';
import { BaseInfoForm } from './steps/base-info-form';
import { PreviewFileUploadForm } from './steps/preview-file-upload-form';
import { ResourceFileUploadForm } from './steps/resource-file-upload-form';
import { APP_PATH } from '@/config/paths';

export const resourceFormSteps = [
  { id: 'basic-info', label: 'Основна інформація' },
  { id: 'details', label: 'Деталі ресурсу' },
  { id: 'file-upload', label: 'Завантаження файлу ресурсу' },
  { id: 'preview-image', label: "Завантаження прев'ю ресурсу" },
  { id: 'review', label: 'Готово' },
];

export function ResourceUploadForm() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<ResourceUploadFormData>({
    resolver: zodResolver(resourceUploadSchema),
    mode: 'onBlur',
  });

  const uploadResourceMutation = useCreateResource();

  const progress = ((currentStep + 1) / resourceFormSteps.length) * 100;

  const handleNext = async () => {
    const fieldsToValidate = getFieldsToValidateForStep(currentStep);
    const result = await form.trigger(fieldsToValidate);

    if (!result) return;

    if (currentStep < resourceFormSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getFieldsToValidateForStep = (
    step: number,
  ): FieldPath<ResourceUploadFormData> | FieldPath<ResourceUploadFormData>[] => {
    switch (step) {
      case 0: // Basic Info
        return baseInfoValidationKeys;
      case 1: // Resource Details
        return additionalInfoValidationKeys;
      case 2: // File Upload
        return resourceFileUploadValidationKeys;
      case 3: // Preview Image Upload
        return resourcePreviewImageValidationKeys;
      default:
        return [];
    }
  };

  const onSubmit = async (data: ResourceUploadFormData) => {
    uploadResourceMutation.mutate(
      {
        data: {
          title: data.title,
          description: data.description,
          citation: data.citation,
          resourceTypeId: data.resourceType.id,
          categoryId: data.category.id,
          publicationDate: data.publicationDate,
          authors: data.authors.map((author) => author.name) ?? [],
          keywords: data.keywords ?? [],
          additionalInfo: data.additionalInfo,
          fileName: data.fileName,
          fileFormat: data.fileFormat,
          fileSize: data.fileSize,
          previewImageName: data.previewImageName,
        },
      },
      {
        onSuccess: () => {
          toast.success('Ресурс успішно створено');
          navigate(APP_PATH.app.dashboard.resources.getHref());
        },
      },
    );
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
            {currentStep === 3 && <PreviewFileUploadForm />}
            {currentStep === 4 && null}

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
                  disabled={uploadResourceMutation.isPending}
                  isLoading={uploadResourceMutation.isPending}
                >
                  {uploadResourceMutation.isPending ? 'Завантаження...' : 'Завантажити ресурс'}
                </Button>
              )}
            </div>
          </form>
        </FormProvider>
      </Card>
    </div>
  );
}
