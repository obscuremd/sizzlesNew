import { router, Stack } from 'expo-router';
import { Tabs } from 'expo-router/tabs';
import { View, Text, Pressable } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className="flex-1 items-center justify-center p-5">
        <Text className="text-xl font-bold">This screen doesn't exist.</Text>
        <Pressable onPress={() => router.push('/(root)/(tabs)/home')} className="mt-4 py-4">
          <Text className="text-blue-500">Go to home screen!</Text>
        </Pressable>
      </View>
    </>
  );
}


