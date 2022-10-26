import { StatusBar } from "expo-status-bar";
import { PropsWithChildren } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PageContainer: React.FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <>
      <SafeAreaView>
        <StatusBar style="dark" />
        <View style={{ padding: 30, height: "100%" }}>{children}</View>
      </SafeAreaView>
    </>
  );
};

export default PageContainer;
