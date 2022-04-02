import { FlatList, Text, StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useEffect, useState } from "react";
import axios from "axios";

export function Posts() {
  const [post, setPost] = useState("");
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    solicitarPosts();
  }, []);
  async function solicitarPosts() {
    const { data } = await axios.get("/posts");
    console.log(data);
    setPosts(data);
  }
  async function createPost() {
    const { data } = await axios.post("/posts", { content: post });

    console.log(data);
  }
  return (
    <View style={styles.container}>
      <TextInput
        multiline
        style={{ backgroundColor: "#f3f3f3" }}
        label={"Post"}
        value={post}
        onChangeText={setPost}
      />
      <Button onPress={createPost}>Crear</Button>
      <FlatList
        data={posts}
        keyExtractor={(e) => e.id}
        renderItem={({ item }) => <Text>{item.content}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },
});
