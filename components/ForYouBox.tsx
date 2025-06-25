import { ThemeContext } from '@/context/ThemeProvider';
import { products } from "@/data/Data";
import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import ProductCard from './ui/ProductCard';

export default function ForYouBox() {
  const { theme } = useContext(ThemeContext);

  const [userInterest, setUserInterest] = useState({
    search: ["shoes", "shirt", "bags"],
    visited: [1, 5, 6, 9, 19, 23],
    loved: [4, 5, 6, 20],
    cart: [6, 20],
  });

  const [suggestedProduct, setSuggestedProduct] = useState([]);

  useEffect(() => {
    const interestIds = new Set([
      ...userInterest.visited,
      ...userInterest.loved,
      ...userInterest.cart,
    ]);

    const matchedBySearch = products.filter((product) =>
      product.tags?.some((tag) =>
        userInterest.search.some((searchTerm) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );

    const matchedByIds = products.filter((product) => interestIds.has(product.id));

    // Combine and remove duplicates by product ID
    const combined = [...matchedByIds, ...matchedBySearch];
    const uniqueProducts = Array.from(
      new Map(combined.map((p) => [p.id, p])).values()
    );

    setSuggestedProduct(uniqueProducts);
  }, [userInterest]);

  return (
    <View style={{ width: "100%", flexDirection: "column" }}>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 10
        }}
      >
        <Text
          style={{
            color: theme.text,
            fontSize: 26,
            fontFamily: "Raleway_800ExtraBold",
          }}
        >
          For you
        </Text>
        
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 100,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: theme.primary,
            }}
          >
            <AntDesign name="hearto" color="#fff" size={20} />
          </View>
      
      </View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: 'wrap',
            gap: 15,
            paddingHorizontal: 5,
            overflow: "visible",
          }}
        >
          {suggestedProduct.map((item, index) => (
            <ProductCard
              key={index}
              w={'47%'}
              img={item.image[0]}
              description={item.description}
              title={item.title}
              price={item.price}
            />
          ))}
        </View>
    </View>
  );
}
