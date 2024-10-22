import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import { Stack, useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";

import { useGetBlogBySlug } from "@/api/blog";
import Button from "../../components/ui/Button";

const ProductDetailScreen = () => {
  const router = useRouter();
  // get product from the router
  const { slug } = useLocalSearchParams();
  console.log("Got to slug");
  const { data: blogItem, isLoading, error } = useGetBlogBySlug(slug as string);

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error || !blogItem) {
    return <Text>Failed to fetch product</Text>;
  }
  // console.log("Blog Item", blogItem);
  // console.log("Author", blogItem.author);
  // console.log("Cover", blogItem.cover);
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: blogItem.title }} />
      <Image source={{ uri: blogItem.cover.formats.small.url }} style={styles.image} />
      <Text style={styles.title}>{blogItem.title}</Text>
      <Text style={styles.price}>{blogItem.publishedAt}</Text>

      <Button onPress={() => router.push("/(user)/profile")}> Hello for gags</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10
  },
  title: {},
  image: { width: "100%", aspectRatio: 1 },
  price: {},
  sizes: { flexDirection: "row", justifyContent: "space-between", marginVertical: 20 },
  size: { alignItems: "center", justifyContent: "center", width: 50, margin: 5, backgroundColor: "lightgray", padding: 10, borderRadius: 25 },
  sizeText: { fontSize: 20, fontWeight: 500 }
});

export default ProductDetailScreen;
