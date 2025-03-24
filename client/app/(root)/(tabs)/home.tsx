import { Logo } from "@/components/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { onboardingData } from "@/constants";
import { LinearGradient } from "expo-linear-gradient";
import { View, Image, Text } from "react-native"; // Fixed import
import { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import SwipeView from "@/components/Swiper";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import NavTabs from "@/components/NavTabs";
import ProductCard from "@/components/ProductCard";

export default function Home() {

  const [value, setValue] = useState('account');

  return (
    <SafeAreaView style={{ flex: 1 }} className="gap-2 px-5">
      <View className="h-[320px]">
        <SwipeView data={onboardingData}/>
      </View>
      <NavTabs/>
      <ProductCard/>
    </SafeAreaView>
  );
}
