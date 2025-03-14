import { Head } from '@/components/seo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UpdateProfile } from '@/features/users/components/update-profile';
import { useUser } from '@/lib/auth';

const ProfileRoute = () => {
  const user = useUser();

  if (!user.data) return null;

  return (
    <>
      <Head title={'Browse'} />
      <div className="py-3 md:py-6">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">Profile</h1>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="personal">Personal Information</TabsTrigger>
            <TabsTrigger value="account">Account Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <UpdateProfile />
          </TabsContent>

          <TabsContent value="account">
            <div className="bg-muted/50 rounded-lg p-8 text-center">
              <h3 className="text-lg font-medium mb-2">Account Settings</h3>
              <p className="text-muted-foreground">
                Account settings will be available in a future update.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default ProfileRoute;
