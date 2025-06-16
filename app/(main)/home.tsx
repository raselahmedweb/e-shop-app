import { Icon } from "@/components/ui/IconSymbol";
import { ThemeContext } from "@/context/ThemeProvider";
import { useContext } from "react";
import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

const profile = require("@/assets/images/profile.jpg")

export default function home() {
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
            alignItems: "flex-start",
            gap: 10,
            flex: 1,
          }}
        >
          <View style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 10
          }}>
            <Image source={profile} style={{
              width: 40,
              height: 40,
              borderRadius: "100%",
            }} />
            <Pressable style={{
              backgroundColor: theme.primary,
              paddingHorizontal: 15,
              paddingVertical: 10 ,
              borderRadius: 30
            }}>
              <Text style={{
                color: "#fff",
                fontFamily: "Raleway_400Regular",
                fontSize: 18
              }}>My activity</Text>
            </Pressable>
          </View>
          <View style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 10
          }}>
            <View style={{
              flexDirection: "row",
              justifyContent: 'center',
              alignItems: 'center',
              width: 40,
              height: 40,
              borderRadius: "100%",
              backgroundColor: "#004CFF25"
            }}>
              <Icon name="receipt-long" color={theme.primary} size={24} />
            </View>
            <View style={{
              flexDirection: "row",
              justifyContent: 'center',
              alignItems: 'center',
              width: 40,
              height: 40,
              borderRadius: "100%",
              backgroundColor: "#004CFF25"
            }}>
              <Icon name="menu" color={theme.primary} size={24} />
            </View>
            <View style={{
              flexDirection: "row",
              justifyContent: 'center',
              alignItems: 'center',
              width: 40,
              height: 40,
              borderRadius: "100%",
              backgroundColor: "#004CFF25"
            }}>
              <Icon name="settings" color={theme.primary} size={24} />
            </View>
          </View>
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          flex: 1,
        }}>
          <Text style={{
            color: theme.text,
            fontSize: 26,
            fontFamily: "Raleway_500Medium"
          }}>
            Hello Rasel
          </Text>
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
      flexDirection: 'column',
      justifyContent: "flex-start",
      alignItems: "flex-start",
      paddingHorizontal: 24,
      paddingTop: 20,
      paddingBottom: 40,
      backgroundColor: theme.bg,
    },
  });
}
