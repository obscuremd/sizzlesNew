import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useColorScheme } from "@/lib/useColorScheme";
import { Stack, Tabs } from "expo-router";
import { History, HomeIcon, MessageCircle, Text } from "lucide-react-native";
import { View } from "react-native";

const GITHUB_AVATAR_URI = "https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg?semt=ais_hybrid";

export default function () {

  const { isDarkColorScheme } = useColorScheme();

  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => <HomeIcon size={focused?25:20} color={focused?"#F37147":'#fff' } />,
          title:""
        }}
      />
      <Tabs.Screen
        name="rides"
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => <History size={focused?25:20} color={focused?"#F37147":'#fff'} />,
          title:""
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => <MessageCircle size={focused?25:20} color={focused?"#F37147":'#fff'} />,
          title:""
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Avatar alt="Zach Nugent's Avatar">
              <AvatarImage source={{ uri: GITHUB_AVATAR_URI }} />
              <AvatarFallback>
                <View>
                  <Text>ZN</Text>
                </View>
              </AvatarFallback>
            </Avatar>
          ),
          title:""
        }}
      />
    </Tabs>
  );
}
