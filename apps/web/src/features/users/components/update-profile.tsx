import { Camera } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from '@/components/ui/form';
import { useUser } from '@/lib/auth';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { UserRole } from '@/types/api';
import { cn } from '@/utils';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { updateProfileInputSchema, useUpdateProfile } from '../api/update-profile';
import { ROLES } from '@/lib/authorization';

export const UpdateProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const user = useUser();
  const updateProfileMutation = useUpdateProfile({
    mutationConfig: {
      onSuccess: () => {
        toast.success('Профіль оновлено');

        setIsEditing(false);
      },
    },
  });

  const handleAvatarClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }

      setAvatarFile(file);

      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const isAdmin = user.data?.role === ROLES.ADMIN;
  const isEditor = user.data?.role === ROLES.EDITOR || isAdmin;

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative">
            <Avatar
              className={cn('h-24 w-24', {
                'cursor-pointer': isEditing,
              })}
              onClick={handleAvatarClick}
            >
              {avatarPreview || user.data?.avatarUrl ? (
                <div className="relative h-full w-full">
                  <img
                    src={avatarPreview || user.data?.avatarUrl}
                    alt={`${user.data?.firstName} ${user.data?.lastName}`}
                    className="object-cover rounded-full"
                  />
                </div>
              ) : (
                <AvatarFallback className="text-2xl">
                  {user.data?.firstName.charAt(0)}
                  {user.data?.lastName.charAt(0)}
                </AvatarFallback>
              )}
              {isEditing && (
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Camera className="h-8 w-8 text-white" />
                </div>
              )}
            </Avatar>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleAvatarChange}
              disabled={!isEditing}
            />
          </div>
          <div>
            <CardTitle>{isEditing ? 'Редагування профілю' : 'Інформація профілю'}</CardTitle>
            <CardDescription>
              {isEditing
                ? 'Оновіть вашу особисту інформацію'
                : 'Перегляньте та керуйте деталями вашого профілю'}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form
          id="update-profile"
          onSubmit={(values) => {
            updateProfileMutation.mutate({ data: values });
          }}
          options={{
            defaultValues: {
              firstName: user.data?.firstName ?? '',
              lastName: user.data?.lastName ?? '',
              email: user.data?.email ?? '',
              additionalInfo: user.data?.additionalInfo,
              role: user.data?.role as UserRole,
            },
          }}
          schema={updateProfileInputSchema}
        >
          {({ register, formState, reset, control }) => (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Ім'я"
                  placeholder={"Ім'я"}
                  error={formState.errors['firstName']}
                  registration={register('firstName')}
                  disabled={!isEditing}
                />
                <Input
                  label="Прізвище"
                  placeholder={'Прізвище"'}
                  error={formState.errors['lastName']}
                  registration={register('lastName')}
                  disabled={!isEditing}
                />
              </div>

              <Input
                label="Email"
                type="email"
                placeholder="m@example.com"
                error={formState.errors['email']}
                registration={register('email')}
                disabled={!isEditing}
              />

              <Textarea
                label="Додаткова інформація"
                error={formState.errors['additionalInfo']}
                registration={register('additionalInfo')}
                disabled={!isEditing}
              />

              {(isEditor || isAdmin) && (
                <FormField
                  control={control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Роль</FormLabel>
                      <Select
                        disabled={!isEditing || !isAdmin}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Оберіть роль" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={ROLES.USER}>Користувач</SelectItem>
                          <SelectItem value={ROLES.EDITOR}>Редактор</SelectItem>
                          {isAdmin && <SelectItem value={ROLES.ADMIN}>Адміністратор</SelectItem>}
                        </SelectContent>
                      </Select>
                      {isEditor && !isAdmin && (
                        <FormDescription>
                          У вас є права доступу редактора. Тільки адміністратори можуть змінювати
                          роль.
                        </FormDescription>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {isEditing && (
                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      setAvatarPreview(null);
                      reset({
                        firstName: user.data?.firstName,
                        lastName: user.data?.lastName,
                        email: user.data?.email,
                        additionalInfo: user.data?.additionalInfo,
                        role: user.data?.role as UserRole,
                      });
                    }}
                  >
                    Скасувати
                  </Button>
                  <Button
                    type="submit"
                    onClick={() => console.log(formState)}
                    isLoading={updateProfileMutation.isPending}
                  >
                    Зберегти зміни
                  </Button>
                </div>
              )}
            </>
          )}
        </Form>
      </CardContent>
      {!isEditing && (
        <CardFooter>
          <Button onClick={() => setIsEditing(true)}>Редагувати профіль</Button>
        </CardFooter>
      )}
    </Card>
  );
};
