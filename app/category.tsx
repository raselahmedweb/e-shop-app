import CategoryAll from "@/components/CategoryAll";
import { Icon } from "@/components/ui/IconSymbol";
import { ThemeContext } from "@/context/ThemeProvider";
import { useContext } from "react";
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Category() {
  const { theme, colorScheme } = useContext(ThemeContext);

  const styles = createStyle(theme, colorScheme);
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 30,
                fontFamily: "Raleway_700Bold",
              }}
            >
              Shop
            </Text>
          </View>
          <View
            style={{
              position: "relative",
              flexDirection: "row",
              alignItems: "center",
              flex: 1,
              marginTop: 5,
            }}
          >
            <View style={{ width: "100%" }}>
              <TextInput
                placeholder="Search"
                placeholderTextColor="gray"
                style={{
                  height: 40,
                  backgroundColor: "#f8f8f8",
                  marginBottom: 10,
                  paddingHorizontal: 20,
                  borderRadius: 100,
                  width: "100%",
                }}
              />
            </View>
            <View
              style={{
                position: "absolute",
                top: 8,
                right: 10,
              }}
            >
              <Icon name="camera-alt" size={24} color={theme.primary} />
            </View>
          </View>
        </View>
        <CategoryAll theme={theme} isCategory={true} />
      </View>
    </SafeAreaView>
  );
}

function createStyle(theme, colorScheme) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.bg,
    },
    container: {
      // flex: 1,
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      paddingHorizontal: 24,
      paddingTop: Platform.OS === "android" ? 40 : 0,
      paddingBottom: 40,
      backgroundColor: theme.bg,
      gap: 20,
      overflow: "visible",
    },
  });
}
