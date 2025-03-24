import { Text } from "@rn-primitives/label";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native";

interface ButtonGradientProps {
  text: string;
  onCLick?: () => void;
  flex?: boolean;
}

const ButtonGradient = ({
  text,
  onCLick,
  flex
}: ButtonGradientProps) => {
  return (
    <TouchableOpacity className={`rounded-md overflow-hidden ${flex && 'flex-1'}`} onPress={onCLick}>
      <LinearGradient
        colors={["#F37147", "#D1F347"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="h-[44px] w-full items-center justify-center rounded-md"
      >
        <Text className="text-t1 text-white font-BaiJamjureeMedium text-center">
          {text}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ButtonGradient;
