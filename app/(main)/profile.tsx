import { ThemeContext } from "@/context/ThemeProvider";
import { useContext } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function Profile() {
  const { theme, colorScheme } = useContext(ThemeContext);

  const styles = createStyle(theme, colorScheme);
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
            flex: 1,
          }}
        >
          <Text>Hello from Profile</Text>
        </View>
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
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
      paddingHorizontal: 24,
      paddingBottom: 40,
      backgroundColor: theme.bg,
    },
  });
}
