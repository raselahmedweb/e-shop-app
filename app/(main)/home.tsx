import Button from "@/components/ui/Button";
import { Icon } from "@/components/ui/IconSymbol";
import { ThemeContext } from "@/context/ThemeProvider";
import { useContext } from "react";
import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const profile = require("@/assets/images/profile.jpg");
const story1 = require("@/assets/images/story/story1.png");
const story2 = require("@/assets/images/story/story2.png");
const story3 = require("@/assets/images/story/story3.png");

export default function home() {
  const { theme, colorScheme } = useContext(ThemeContext);

  const styles = createStyle(theme, colorScheme);
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Image
              source={profile}
              style={{
                width: 50,
                height: 50,
                borderRadius: 100,
                borderWidth: 5,
                borderColor: "#dedede",
              }}
            />
            <Pressable
              style={{
                backgroundColor: theme.primary,
                height: 40,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 15,
                borderRadius: 30,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontFamily: "Raleway_400Regular",
                  fontSize: 18,
                }}
              >
                My activity
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: 40,
                height: 40,
                borderRadius: 100,
                backgroundColor: "#004CFF25",
              }}
            >
              <Icon name="receipt-long" color={theme.primary} size={24} />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: 40,
                height: 40,
                borderRadius: 100,
                backgroundColor: "#004CFF25",
              }}
            >
              <Icon name="menu" color={theme.primary} size={24} />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: 40,
                height: 40,
                borderRadius: 100,
                backgroundColor: "#004CFF25",
              }}
            >
              <Icon name="settings" color={theme.primary} size={24} />
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <Text
            style={{
              color: theme.text,
              fontSize: 30,
              fontFamily: "Raleway_800ExtraBold",
            }}
          >
            Hello Rasel
          </Text>
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
          }}
        >
          <Text
            style={{
              color: theme.text,
              fontSize: 26,
              fontFamily: "Raleway_800ExtraBold",
            }}
          >
            Announcement
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 15,
            }}
          >
            <Text
              style={{
                color: theme.text,
                fontSize: 18,
                fontFamily: "Raleway_400Regular",
                flex: 1,
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum
              possimus
            </Text>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 100,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: theme.primary,
              }}
            >
              <Icon name="arrow-right-alt" color="#fff" size={28} />
            </View>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "column",
            // justifyContent: 'flex-start',
            // alignItems: 'flex-start',
            gap: 15,
          }}
        >
          <Text
            style={{
              color: theme.text,
              fontSize: 26,
              fontFamily: "Raleway_800ExtraBold",
            }}
          >
            Recently viewed
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Image
              source={profile}
              style={{
                width: 60,
                height: 60,
                borderRadius: 100,
                borderWidth: 5,
                borderColor: "#dedede",
              }}
            />
            <Image
              source={profile}
              style={{
                width: 60,
                height: 60,
                borderRadius: 100,
                borderWidth: 5,
                borderColor: "#dedede",
              }}
            />
            <Image
              source={profile}
              style={{
                width: 60,
                height: 60,
                borderRadius: 100,
                borderWidth: 5,
                borderColor: "#dedede",
              }}
            />
            <Image
              source={profile}
              style={{
                width: 60,
                height: 60,
                borderRadius: 100,
                borderWidth: 5,
                borderColor: "#dedede",
              }}
            />
            <Image
              source={profile}
              style={{
                width: 60,
                height: 60,
                borderRadius: 100,
                borderWidth: 5,
                borderColor: "#dedede",
              }}
            />
          </View>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "column",
            gap: 15,
          }}
        >
          <Text
            style={{
              color: theme.text,
              fontSize: 26,
              fontFamily: "Raleway_800ExtraBold",
            }}
          >
            My Orders
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Button
              txt="To Pay"
              width={90}
              paddingVertical={10}
              press={console.log("object")}
              bg="#007bff10"
              color={theme.primary}
              radius={100}
            />
            <Button
              txt="To Receive"
              width={120}
              paddingVertical={10}
              press={console.log("object")}
              bg="#007bff10"
              color={theme.primary}
              radius={100}
            />
            <Button
              txt="To Review"
              width={120}
              paddingVertical={10}
              press={console.log("object")}
              bg="#007bff10"
              color={theme.primary}
              radius={100}
            />
          </View>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "column",
            gap: 15,
          }}
        >
          <Text
            style={{
              color: theme.text,
              fontSize: 26,
              fontFamily: "Raleway_800ExtraBold",
            }}
          >
            Stories
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 5,
            }}
          >
            {[story1, story2, story3].map((story, index) => (
              <View
                key={index}
                style={{
                  width: 104,
                  height: 175,
                  position: "relative",
                  overflow: "hidden",
                  backgroundColor: "red",
                }}
              >
                <Image
                  source={story}
                  style={{
                    width: "auto",
                    height: 190,
                  }}
                />
                <View
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginLeft: -20,
                    marginTop: -20,
                    backgroundColor: "#ffffff25",
                    width: 40,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 100,
                  }}
                >
                  <Icon name="play-arrow" color="#fff" size={28} />
                </View>
              </View>
            ))}
          </View>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "column",
            gap: 15,
          }}
        >
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: theme.text,
                fontSize: 26,
                fontFamily: "Raleway_800ExtraBold",
              }}
            >
              Stories
            </Text>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 100,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: theme.primary,
              }}
            >
              <Icon name="arrow-right-alt" color="#fff" size={28} />
            </View>
          </View>
          <View>
             {/* <Animated.FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        itemLayoutAnimation={LinearTransition}
        renderItem={({ item }) => (
          <View style={styles.listContainer}>
            <Pressable
            onPress={()=>handleRouteTodo(item.id)}
            onLongPress={() => handleReadTodo(item.id)}
            >
            <Text
              style={[item.completed ? styles.completedText : styles.text, styles.title]}
            >
              {item.title}
            </Text>
            </Pressable>
            <Pressable
              onPress={() => handleDeleteTodo(item.id)}
              style={styles.deleteButton}
            >
              <MaterialIcons name="delete" size={24} color="#000" />
            </Pressable>
          </View>
        )}
      /> */}
          </View>
        </View>
      </ScrollView>
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
      paddingTop: Platform.OS === "android" ? 40 : 20,
      paddingBottom: 40,
      backgroundColor: theme.bg,
      gap: 20,
    },
  });
}
