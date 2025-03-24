import { onboardingData } from "@/constants";
import { LinearGradient } from "expo-linear-gradient";
import { View, Image, Text } from "react-native";
import { useRef, useState } from "react";
import Swiper from "react-native-swiper";
import { Button } from "./ui/button";
import { Heart } from "lucide-react-native";
import { Separator } from "./ui/separator";

interface Props {
  data:Shop[]
}

export default function SwipeView({data}:Props) {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Swiper
      ref={swiperRef}
      showsPagination={true}
      autoplay={true}
      paginationStyle={{ right:200 }}
      dot={ <View className="h-[5px] w-[15px] bg-muted-foreground rounded-full mx-1" /> }
      activeDot={ <View className="h-[5px] w-[20px] bg-foreground rounded-full mx-1" /> }
      onIndexChanged={(index) => setActiveIndex(index)}
      // className="bg-red-500"
      style={{ height: 320 }}
    >
      {data.map((item) => (
        <View key={item.id} className="items-center relative">
          <Image
            source={{
              uri: item.image,
            }}
            className="h-[270px] w-full rounded-2xl"
            resizeMode="cover"
          />
          <LinearGradient 
              colors={["rgba(10, 10, 11, 0)", "#0A0A0B"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }} // Matches CSS (top to bottom)
              className="p-2 items-center justify-end absolute h-full">

            <View className="flex-row justify-between items-center w-full">
              <View className="gap-2">
                <Text className="text-h5 font-BaiJamjureeBold text-foreground">
                  {item.Primary_Text}
                </Text>
                <Text className="text-T2 font-BaiJamjureeSemiBold text-muted-foreground">
                  {item.Secondary_Text}
                </Text>
                <View className="flex-row gap-4">
                  <View>
                    <Text className="text-body font-BaiJamjureeRegular text-muted-foreground">
                      Prep Time
                    </Text>
                    <Text className="text-body font-BaiJamjureeSemiBold text-muted-foreground">
                      {item.prep_time}
                    </Text>
                  </View>
                  <Separator orientation="vertical" />
                  <View>
                    <Text className="text-body font-BaiJamjureeRegular text-muted-foreground">
                      Rating
                    </Text>
                    <Text className="text-body font-BaiJamjureeSemiBold text-muted-foreground">
                      {item.rating} Stars
                    </Text>
                  </View>
                  <Separator orientation="vertical" />
                  <View>
                    <Text className="text-body font-BaiJamjureeRegular text-muted-foreground">
                      Delivery
                    </Text>
                    <Text className="text-body font-BaiJamjureeSemiBold text-muted-foreground">
                      {item.delivery_time}
                    </Text>
                  </View>
                </View>
              </View>
              <Button variant={"secondary"}>
                <Heart height={20} width={20} color={"white"} />
              </Button>
            </View>
          </LinearGradient>
        </View>
      ))}
    </Swiper>
  );
}
