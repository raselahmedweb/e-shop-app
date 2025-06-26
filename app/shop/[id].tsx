import { ThemeContext } from "@/context/ThemeProvider";
import { ITheme } from "@/type/type";
import React, { useContext } from "react";
import { Image, Platform, StyleSheet, View } from "react-native";

import { products } from "@/data/Data";
import { useLocalSearchParams } from "expo-router";

export default function ShopById() {
  const themeContext = useContext(ThemeContext);
  if (!themeContext)
    throw new Error("ThemeContext must be used within a ThemeProvider");

  const { theme, colorScheme } = themeContext;
  const { id }: any = useLocalSearchParams();
  const intId = parseInt(id);
  const originalProduct = intId - 1;

  const styles = createStyle(theme, colorScheme);
  return (
    <View style={styles.safeArea}>
      <View style={styles.container}>
        <View style={{ width: "100%" }}>
          <Image
            style={{
              width: "100%",
              height: 500,
            }}
            source={{ uri: products[originalProduct].image[0] }}
          />
        </View>
      </View>
    </View>
  );
}

function createStyle(theme: ITheme, colorScheme: string) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.bg,
      position: "relative",
    },
    container: {
      // flex: 1,
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      //   paddingHorizontal: 24,
      paddingTop: Platform.OS === "android" ? 40 : 0,
      paddingBottom: 40,
      backgroundColor: theme.bg,
      gap: 20,
      overflow: "visible",
    },
  });
}
