import FlashBox from "@/components/FlashBox";
import ForYouBox from "@/components/ForYouBox";
import RecentlyViewd from "@/components/RecentlyViewd";
import Stories from "@/components/stories";
import Button from "@/components/ui/Button";
import CategoryCard from "@/components/ui/CategoryCard";
import { Icon } from "@/components/ui/IconSymbol";
import PopularProductCard from "@/components/ui/PopularProductCard";
import ProductCard from "@/components/ui/ProductCard";
import { ThemeContext } from "@/context/ThemeProvider";
import { announcement, banners, categories, products, stories } from "@/data/Data";
import { Link } from "expo-router";
import { useContext, useState } from "react";
import {
  Image,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const profile = require("@/assets/images/profile.jpg");

export default function Profile() {
  const themeContext = useContext(ThemeContext);
  if (!themeContext)
    throw new Error("ThemeContext must be used within a ThemeProvider");

  const { theme, colorScheme } = themeContext;

  const parseDate = (date: any) => {
    if (typeof date === "number") return new Date(date);
    if (typeof date === "string") {
      // for "6/18/25" format
      const [month, day, year] = date.split("/").map(Number);
      return new Date(2000 + year, month - 1, day);
    }
    return new Date(); // fallback
  };
  const today = new Date();

  const sortedProducts = [...products].sort((a, b) => {
    const dateA = parseDate(a.createdAt);
    const dateB = parseDate(b.createdAt);
    return Math.abs(dateA - today) - Math.abs(dateB - today);
  });

  const nearestProducts = sortedProducts.slice(0, 6);

  const popularProducts = [...products]
    .sort((a, b) => b.totalSold - a.totalSold)
    .slice(0, 6); // take top 6

  const [announce, setAnnounce] = useState([]);
  useState(() => {
    const fetchAnnounce = announcement;
    setAnnounce(fetchAnnounce);
  }, [announce]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const [category, setCategory] = useState(categories);

  const styles = createStyle(theme, colorScheme);
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
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
              marginTop: 5
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
            <View style={{
              position:'absolute',
              top: 8,
              right: 10
            }}>
              <Icon name="camera-alt" size={24} color={theme.primary} />
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          {banners.map((item)=>{
            return(
              <View key={item.id} style={{
                backgroundColor: item.bg,
                width: '100%',
                position: 'relative',
                padding: 20,
                flexDirection: 'column'
              }}>
                <Text style={{
                  fontSize: 40,
                  fontFamily: 'Raleway_700Bold'
                }}>{item.title}</Text>
                <Text style={{
                  fontSize: 20,
                  fontFamily: 'Raleway_700Bold'
                }}>{item.descountDesc}</Text>
                <Text style={{
                  fontSize: 30,
                  fontFamily: 'Raleway_700Bold'
                }}>{item.shortTitle}</Text>
                <Image src={item.image.url} style={{
                  position: 'absolute',
                  top: 10,
                  right: 10
                }} />
              </View>
            )
          })}
        </View>
        {announce &&
          announce.length > 0 &&
          announce.map((data) => (
            <View
              key={data.id}
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
                  fontSize: 26,
                  fontFamily: "Raleway_800ExtraBold",
                }}
              >
                {data.title}
              </Text>

              <View
                style={{
                  flexDirection: "column",
                  gap: 5,
                  alignItems: "flex-start",
                }}
              >
                <Text
                  style={{
                    color: theme.text,
                    fontSize: 18,
                    fontFamily: "Raleway_400Regular",
                  }}
                >
                  {data.description && data.description.length > 90
                    ? `${data.description.slice(0, 90)}...`
                    : data.description}
                </Text>

                {data.description.length > 90 && (
                  <TouchableOpacity onPress={() => openModal(data)}>
                    <Text style={{ color: "#007bff", fontWeight: "bold" }}>
                      Read More
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        {/* modal after click in announce */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedItem?.title}</Text>
              <Text style={styles.modalDescription}>
                {selectedItem?.description}
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <RecentlyViewd />
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
        {/* {story && story.length > 0 && <Stories theme={theme} story={story} />} */}
        {stories.length > 0 && (
          <View
            style={{
              marginVertical: 10,
            }}
          >
            <Stories story={stories} theme={theme} />
          </View>
        )}
        <View
          style={{
            width: "100%",
            flexDirection: "column",
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
              New Items
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Link
                style={{
                  color: theme.text,
                  fontWeight: "bold",
                  fontSize: 22,
                }}
                href={"/"}
              >
                See All
              </Link>
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
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View
              style={{
                flexDirection: "row",
                gap: 15,
                paddingHorizontal: 5,
                overflow: "visible",
              }}
            >
              {nearestProducts.map((item, index) => (
                <ProductCard
                  key={index}
                  img={item.image[0]}
                  description={item.description}
                  title={item.title}
                  price={item.price}
                />
              ))}
            </View>
          </ScrollView>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "column",
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
              Most Popular
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Link
                style={{
                  color: theme.text,
                  fontWeight: "bold",
                  fontSize: 22,
                }}
                href={"/"}
              >
                See All
              </Link>
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
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View
              style={{
                flexDirection: "row",
                gap: 15,
                paddingHorizontal: 5,
                overflow: "visible",
                paddingVertical: 15,
              }}
            >
              {popularProducts.map((item, index) => (
                <PopularProductCard
                  key={index}
                  img={item.image[0]}
                  totalSold={item.totalSold}
                />
              ))}
            </View>
          </ScrollView>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "column",
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
              Category
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Link
                style={{
                  color: theme.text,
                  fontWeight: "bold",
                  fontSize: 22,
                }}
                href={"/"}
              >
                See All
              </Link>
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
              flexDirection: "row",
              flexWrap: "wrap",

              paddingHorizontal: 5,
              overflow: "visible",
              paddingVertical: 15,
            }}
          >
            {category &&
              category.length > 0 &&
              category.map((item, index) => (
                <CategoryCard
                  key={index}
                  img={item.imageUrl}
                  name={item.name}
                  slug={item.slug}
                  totalProduct={item.totalProduct}
                />
              ))}
          </View>
        </View>
        <FlashBox />
        <ForYouBox />
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
      paddingTop: Platform.OS === "android" ? 40 : 0,
      paddingBottom: 40,
      backgroundColor: theme.bg,
      gap: 20,
      overflow: "visible",
    },
    modalOverlay: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: "rgba(0,0,0,0.6)",
      padding: 20,
    },
    modalContent: {
      backgroundColor: "#fff",
      borderRadius: 20,
      padding: 20,
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 10,
    },
    modalDescription: {
      fontSize: 16,
      color: "#444",
    },
    closeButton: {
      marginTop: 20,
      alignSelf: "flex-end",
      backgroundColor: "#007bff",
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
    },
  });
}
