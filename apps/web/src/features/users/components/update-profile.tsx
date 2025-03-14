import { Camera, Pen } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDrawer,
  FormLabel,
  FormItem,
  FormField,
  Input,
  Textarea,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';
import { useUser } from '@/lib/auth';

import { updateProfileInputSchema, useUpdateProfile } from '../api/update-profile';
import { useRef, useState } from 'react';
import type { UserRole } from '@/types/api';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/utils';

export const UpdateProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const user = useUser();
  const { addNotification } = useNotifications();
  const updateProfileMutation = useUpdateProfile({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Profile Updated',
        });
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
        addNotification({
          type: 'error',
          title: 'Image size should be less than 5MB',
        });
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        addNotification({
          type: 'error',
          title: 'Please select an image file',
        });
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

  const isAdmin = user.data?.role === 'ADMIN';
  const isEditor = user.data?.role === 'EDITOR' || isAdmin;

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
            <CardTitle>{isEditing ? 'Edit Profile' : 'Profile Information'}</CardTitle>
            <CardDescription>
              {isEditing
                ? 'Update your personal information'
                : 'View and manage your profile details'}
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
                  label="First Name"
                  placeholder={'First Name'}
                  error={formState.errors['firstName']}
                  registration={register('firstName')}
                  disabled={!isEditing}
                />
                <Input
                  label="Last Name"
                  placeholder={'Last Name'}
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
                label="Additional Info"
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
                      <FormLabel>Role</FormLabel>
                      <Select
                        disabled={!isEditing || !isAdmin}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="USER">User</SelectItem>
                          <SelectItem value="EDITOR">Editor</SelectItem>
                          {isAdmin && <SelectItem value="ADMIN">Admin</SelectItem>}
                        </SelectContent>
                      </Select>
                      {isEditor && !isAdmin && (
                        <FormDescription>
                          You have editor privileges. Only admins can change roles.
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
                    Cancel
                  </Button>
                  <Button type="submit">Save Changes</Button>
                </div>
              )}
            </>
          )}
        </Form>
      </CardContent>
      {!isEditing && (
        <CardFooter>
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        </CardFooter>
      )}
    </Card>
  );
};
