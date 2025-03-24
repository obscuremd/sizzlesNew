import { useSignUp } from "@clerk/clerk-expo";
import { Alert } from "react-native";
import { router } from "expo-router";
import { fetchAPI } from "./fetch";
import axios from "axios";

interface signUpProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoaded: ReturnType<typeof useSignUp>["isLoaded"];
  signUp: ReturnType<typeof useSignUp>["signUp"];
  setPendingVerification?: (value: boolean) => void;
  emailAddress?: string;
  password?: string;
  setActive?: ReturnType<typeof useSignUp>["setActive"];
  code?: string;
}

export const register = async ({
  isLoaded,
  signUp,
  setPendingVerification,
  emailAddress,
  password,
  setLoading,
}: signUpProps) => {
  setLoading(true);
  if (!isLoaded || !signUp) {
    console.log("clerk isnt loaded");
    setLoading(false);
    return;
  }

  if (emailAddress === "") {
    setLoading(false);

    Alert.alert("Please Provide your email address");
    return;
  }
  if (password === "") {
    setLoading(false);

    Alert.alert("Please Provide your Password");
    return;
  }

  if (!setPendingVerification) return;

  try {
    await signUp.create({
      emailAddress,
      password,
    });

    await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
    setLoading(false);

    setPendingVerification(true);
  } catch (err: any) {
    console.error("Signup Error:", JSON.stringify(err, null, 2));
    console.log(err?.errors?.[0]?.message);
    Alert.alert(
      "Error",
      err?.errors?.[0]?.message || err?.message || "An unknown error occurred"
    );
    setLoading(false);
  }
};

// Handle submission of verification form
export const verifySignUpOtp = async ({
  emailAddress,
  isLoaded,
  signUp,
  setActive,
  code,
}: signUpProps) => {
  if (!isLoaded) return;
  if (!signUp) return;
  if (!setActive) return;
  if (!code) {
    Alert.alert("please provide your 6 digit OTP");
    return;
  }

  try {
    const signUpAttempt = await signUp.attemptEmailAddressVerification({
      code,
    });
    if (signUpAttempt.status === "complete") {
      const req = await axios.post("http://192.168.1.114:3000/user", {
        email: emailAddress,
        clerkId: signUpAttempt.createdUserId,
      });
      console.log(`request:${req}`);
      // await fetchAPI("/(api)/user", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     name: emailAddress,
      //     email: emailAddress,
      //     clerkId: signUpAttempt.createdUserId,
      //   }),
      // });
      await setActive({ session: signUpAttempt.createdSessionId });
      router.replace("/");
    } else {
      console.error(JSON.stringify(signUpAttempt, null, 2));
    }
  } catch (err) {
    console.error(JSON.stringify(err, null, 2));
  }
};
