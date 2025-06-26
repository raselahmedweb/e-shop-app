import { ThemeContext } from "@/context/ThemeProvider";
import { FontAwesome5 } from "@expo/vector-icons";
import { useContext } from "react";
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Cart() {
  const { theme, colorScheme } = useContext(ThemeContext);

  const styles = createStyle(theme, colorScheme);
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-start",
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
              Cart
            </Text>
          </View>
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 100,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#004CFF10",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Raleway_700Bold",
              }}
            >
              2
            </Text>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            backgroundColor: "#f2f2f2",
            padding: 15,
            borderRadius: 20,
            gap: 5,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              color: theme.text,
              fontSize: 22,
              fontFamily: "Raleway_800ExtraBold",
            }}
          >
            Shipping Address
          </Text>

          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
                
            <View style={{flex:1}}>
              <Text
              style={{
                color: theme.text,
                fontSize: 16,
                fontFamily: "Raleway_400Regular",
              }}
            >
              26, Duong So 2, Thao Dien Ward, An Phu, District 2, Ho Chi Minh
              city
            </Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => console.log("first")} style={{
              width: 40,
              height: 40,
              borderRadius: 100,
              backgroundColor: '#007bff',
              flexDirection:'row',
              justifyContent:'center',
              alignItems:'center'
            }}>
              
              <FontAwesome5 name="pen" size={20} color="white" />
            </TouchableOpacity>
            </View>
            

            
          </View>
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
