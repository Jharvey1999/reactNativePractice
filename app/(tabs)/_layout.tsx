import { Stack } from "expo-router";
import { ProfileProvider } from '@/components/profileContext';

export default function RootLayout() {
  return (
    <ProfileProvider>
      <Stack screenOptions={{headerShown: false}}/>
    </ProfileProvider>
  );
}
