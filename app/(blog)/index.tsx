import { useBlogPostList } from "@/api/blog";
import BlogListItem from "@/components/blog/BlogListItem";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";

export default function BlogIndexScreen() {
  const { data: articles, isLoading, error } = useBlogPostList();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch blogs</Text>;
  }

  // console.log("Articles", articles);
  return <FlatList data={articles} renderItem={({ item }) => <BlogListItem blog={item} />} numColumns={2} contentContainerStyle={{ gap: 10, padding: 10 }} columnWrapperStyle={{ gap: 10 }} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%"
  }
});
