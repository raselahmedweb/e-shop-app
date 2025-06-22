import { banners } from "@/data/Data";
import { useRef, useState } from "react";
import {
  Animated,
  Image,
  PanResponder,
  Pressable,
  Text,
  View,
} from "react-native";

export default function SwipBanner() {
  //! Banner control
  const [currentBanner, setCurrentBanner] = useState<number>(0);
  //   const currentBannerData = banners[currentBanner];
  const animation = useRef(new Animated.Value(0)).current;

  const bannerController = (index: number) => {
    if (index === currentBanner) return; // Prevent unnecessary animations

    Animated.timing(animation, {
      toValue: index > currentBanner ? -300 : 300,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setCurrentBanner(index);
      animation.setValue(index > currentBanner ? 300 : -300);
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dx) > 20,

      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -50 && currentBanner < banners.length - 1) {
          slideTo(currentBanner + 1);
        } else if (gestureState.dx > 50 && currentBanner > 0) {
          slideTo(currentBanner - 1);
        }
      },
    })
  ).current;

  const slideTo = (newIndex: number) => {
    if (
      newIndex < 0 ||
      newIndex >= banners.length ||
      newIndex === currentBanner
    ) {
      return; // Prevent invalid slides
    }

    const direction = newIndex > currentBanner ? -300 : 300;

    Animated.timing(animation, {
      toValue: direction,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setCurrentBanner(newIndex);
      animation.setValue(-direction);
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  // const gestureDirection = (newIndex: number) => {
  //   return newIndex > currentBanner ? -300 : 300;
  // };

  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          borderRadius: 15,
          overflow: "hidden",
        }}
      >
        <Animated.View
          {...panResponder.panHandlers}
          style={{
            transform: [{ translateX: animation }],
            width: "100%",
            height: 160,
          }}
        >
          {[banners[currentBanner]].map((item) => (
            <View
              key={item.id}
              style={{
                backgroundColor: item.bg,
                width: "100%",
                height: 160,
                padding: 15,
                borderRadius: 15,
                overflow: "hidden",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 30,
                    fontFamily: "Raleway_700Bold",
                    color: item.text,
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "Raleway_400Regular",
                    color: item.text,
                  }}
                >
                  {item.descountDesc}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "Raleway_700Bold",
                  color: item.text,
                }}
              >
                {item.shortTitle}
              </Text>
              <Image
                source={{ uri: item.image.url }}
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 20,
                  zIndex: 1,
                  width: 130,
                  height: 130,
                }}
              />
            </View>
          ))}
        </Animated.View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
        }}
      >
        {banners.map((item, index) => {
          return (
            <Pressable
              key={item.id}
              style={{
                width: index === currentBanner ? 40 : 13,
                height: 13,
                borderRadius: 100,
                backgroundColor: index === currentBanner ? "#004CFF" : "gray",
              }}
              onPress={() => bannerController(index)} // Use index instead of item.id
            />
          );
        })}
      </View>
    </View>
  );
}
