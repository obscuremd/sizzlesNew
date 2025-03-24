import React from "react";
import { Redirect, router } from "expo-router";
import { useAuth } from "@clerk/clerk-react";
import { Image, Text, View } from "react-native";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return (
      <View className="flex-1 justify-center gap-5 p-5">
        <Image
                  source={require("../../../assets/images/access denied.png")}
                  className="h-[310px] w-full"
                  resizeMode="contain"
                />
        <View className="gap-4">
          <Text className="text-h1 font-BaiJamjureeBold text-center text-foreground">
            OOPS
          </Text>
          <Text className="text-caption font-BaiJamjureeMedium text-center text-muted-foreground">
            Discover unbeatable deals on your favorite products! Shop now at
            Sizzles and save big!
          </Text>
        </View>
        <Button variant={"default"} onPress={() => router.push("/(auth)/welcome")}>
          <Text className="text-title2 font-BaiJamjureeMedium text-center text-background">Login</Text>
        </Button>
      </View>
    );
  }

  return (
    <View>
      <Text>Profile</Text>
    </View>
  )
}
