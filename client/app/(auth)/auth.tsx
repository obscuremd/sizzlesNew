/* eslint-disable import/no-unresolved */
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import ButtonGradient from "@/components/ui/button-gradient";
import { Input } from "@/components/ui/input";
import InputOTP from "@/components/ui/input-otp";
import { register, verifySignUpOtp } from "@/utils/auth";
import { useSignUp } from "@clerk/clerk-expo";
import { Separator } from "@rn-primitives/context-menu";
import { useState } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Modal from 'react-native-modal';
import { Facebook, Google, X as Twitter} from "iconoir-react-native";
import {ChevronLeft, X} from 'lucide-react-native'
import { useColorScheme } from "@/lib/useColorScheme";
import { router } from "expo-router";


export default function Auth() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [loading, setLoading] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [code, setCode] = useState("");
  const { isDarkColorScheme } = useColorScheme();

  return (
    <SafeAreaView className="flex-1 relative">
      
      <Modal isVisible={pendingVerification}>
        <View className="p-4 rounded-[0.5rem] bg-background gap-[1rem]">
          <Button
            variant={"outline"}
            className="inline-flex self-end rounded-full"
            onPress={()=>setPendingVerification(false)}
          >
            <X color={"#020617"} size={16} />
          </Button>
          <Text className="text-foreground text-title1 font-BaiJamjureeSemiBold">
            Verify OTP
          </Text>
          <Text className="text-muted-foreground text-body font-BaiJamjureeRegular">
            Verify the 6 Digit otp sent to your email
          </Text>
          <InputOTP length={3} setValue={setCode}/>
          <Text className="text-muted-foreground text-body font-BaiJamjureeRegular">
            didn’t recieve otp?{" "}
            <Text className="text-foreground text-body font-BaiJamjureeMedium">
              Send Again
            </Text>
          </Text>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <ButtonGradient text="Verify Otp" onCLick={()=>verifySignUpOtp({isLoaded,signUp, setActive, code, setLoading})} />
          )}
          
        </View>
      </Modal>
      <View className="flex-row">
        <Button variant="ghost" onPress={()=>router.push('/(root)/(tabs)/home')}>
          <ChevronLeft color={isDarkColorScheme?"white":'black'} height={30} width={30}/>
        </Button>
      </View>
      <Image
        source={require("../../assets/authhero.png")}
        className="w-[200px] h-[200px] self-center"
      />
      <View className="p-4 flex-1 pb-20 justify-between">
        <View className="h-[26px]" />
        <View className="gap-2">
          <View className='flex-row'>
            <Logo />
            <Text className="text-h5 font-BaiJamjureeBold text-foreground">
              SIZZLES
            </Text>
          </View>
          <Text className="text-t2 font-BaiJamjureeLight text-foreground">
          Discover unbeatable deals on your favorite products! Shop now at Sizzles and save big!
          </Text>
        </View>
        <View className="gap-4">
          <Input
            placeholder="Email"
            value={form.email}
            onChangeText={(text) => setForm({ ...form, email: text })}
            aria-labelledby="inputLabel"
            aria-errormessage="inputError"
            className="text-t2 font-BaiJamjureeRegular text-foreground"
          />
          <Input
            placeholder="Password"
            secureTextEntry={true}
            value={form.password}
            onChangeText={(text) => setForm({ ...form, password: text })}
            aria-labelledby="inputLabel"
            aria-errormessage="inputError"
            className="text-t2 font-BaiJamjureeRegular text-foreground"
          />
          <Text className="text-caption font-BaiJamjureeSemiBold text-foreground">
          Forgot Password ?
        </Text>
        </View>
        <View className="flex-row w-full gap-4">
          {loading ? (
            <ActivityIndicator />
          ) : (
            <>
              <ButtonGradient text="Login" flex />
              <Button
                variant="secondary"
                className="flex-1"
                onPress={() =>
                  register({
                    isLoaded,
                    signUp,
                    setPendingVerification,
                    emailAddress: form.email,
                    password: form.password,
                    setLoading,
                  })
                }
              >
                <Text className="text-t2 font-BaiJamjureeLight text-foreground">
                  Sign Up
                </Text>
              </Button>
            </>
          )}
        </View>
        
        <View className="flex-row items-center gap-4">
          <Text className="text-caption font-BaiJamjureeRegular text-foreground">
            Or Continue with
          </Text>
          <Separator className="flex-1 bg-foreground" />
        </View>
        <View className="flex-row gap-4">
          <Button variant="secondary">
            <Google color={isDarkColorScheme?"white":'black'} height={30} width={30}/>
          </Button>
          <Button variant="secondary">
            <Facebook color={isDarkColorScheme?"white":'black'} height={30} width={30}/>
          </Button>
          <Button variant="secondary">
            <Twitter color={isDarkColorScheme?"white":'black'} height={30} width={30}/>
          </Button>
          
        </View>
      </View>
    </SafeAreaView>
  );
}
