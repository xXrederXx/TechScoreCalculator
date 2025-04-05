import BButton from "@/components/BButton";
import { theme } from "@/Lib/theme";
import { Stack, useRouter } from "expo-router";
import { View } from "react-native";

function HeaderButtons() {
  const router = useRouter();

  return (
    <View style={{ flexDirection: "row", gap: 12, paddingRight: 8 }}>
      <BButton onClick={() => router.push("/PartCheckerScreen")} text="Part Checker"/>
      <BButton onClick={() => router.push("/PcCheckerScreen")} text="Pc Checker"/>
      <BButton onClick={() => router.push("/PcScoreScreen")} text="Pc Score"/>
    </View>
  );
}


export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary.normal,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          color: theme.colors.text.verylight
        },
        title: 'Tech Score Calculator', // default title
        headerRight: () => <HeaderButtons />,
      }}
    />
  );

}
