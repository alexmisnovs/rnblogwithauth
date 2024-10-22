import { StyleSheet, Text, Pressable, Image, ScrollView } from "react-native";

import { Link, useSegments } from "expo-router";
import { BlogItem } from "@/api/blog";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

type BlogListItemProps = {
  blog: BlogItem;
};

export default function BlogListItem({ blog }: BlogListItemProps) {
  // to understand are we on user or admin side (user) or (admin)
  const segments = useSegments();
  // console.log(segments);

  const relativeTime = dayjs(blog.publishedAt).fromNow();

  return (
    <ScrollView>
      <Link href={`/${segments[0]}/${blog.slug}` as any} asChild>
        <Pressable style={styles.container}>
          <Image source={{ uri: blog.cover.formats.thumbnail.url }} style={styles.image} />
          <Text style={styles.title}>{blog.title}</Text>
          <Text style={styles.title}>{blog.description}</Text>
          <Text style={styles.price}>{dayjs(blog.publishedAt).format("DD/MM/YYYY")}</Text>

          <Text style={styles.time}>{relativeTime}</Text>
        </Pressable>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // maxWidth: "50%",
    // margin: 5,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    borderColor: "black"
  },

  image: {
    width: "100%",
    aspectRatio: 1
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10
  },
  price: {
    color: "black",
    fontWeight: "bold"
  },
  time: {
    textAlign: "right",
    color: "teal"
  }
});
