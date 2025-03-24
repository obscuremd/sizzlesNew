/* eslint-disable import/no-unresolved */
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, Text, View } from "react-native";
import { Logo } from "@/components/Logo";
import ButtonGradient from "@/components/ui/button-gradient";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react-native";
import { useColorScheme } from "@/lib/useColorScheme";

export default function Welcome() {
    const { isDarkColorScheme } = useColorScheme();
  

  return (
    <SafeAreaView className="flex-1 p-4">
      <View className="flex-row">
              <Button variant="ghost" onPress={()=>router.push('/(root)/(tabs)/home')}>
                <ChevronLeft color={isDarkColorScheme?"white":'black'} height={30} width={30}/>
              </Button>
            </View>

      <View className=" flex-1 py-10 justify-between">
        <Image
          source={require("../../assets/authhero.png")}
          className="h-[310px] w-full"
          resizeMode="contain"
        />
        <View className="gap-4">
          <View className="flex-row justify-center items-center gap-3">
            <Image
              source={require("../../assets/icons/Logo.png")}
              className="h-[47px] w-[47px]"
              resizeMode="contain"
            />
            <Text className="text-h1 font-BaiJamjureeBold text-center text-foreground">
              Sizzles
            </Text>
          </View>
          <Text className="text-caption font-BaiJamjureeMedium text-center text-muted-foreground">
            Discover unbeatable deals on your favorite products! Shop now at
            Sizzles and save big!
          </Text>
        </View>
        <ButtonGradient
          text="Get Started"
          onCLick={() => {
            router.push("/(auth)/auth");
          }}
        />
      </View>
    </SafeAreaView>
  );
}
