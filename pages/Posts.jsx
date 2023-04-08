npm i expo-updatesimport { Alert, FlatList, Text, StyleSheet, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { useEffect, useState } from 'react'
import axios from 'axios'

export function Posts() {
  const [cargando, setCargando] = useState(false)
  const [post, setPost] = useState('')
  const [posts, setPosts] = useState([])
  useEffect(() => {
    solicitarPosts()
  }, [])
  async function solicitarPosts() {
    setCargando(true)
    try {
      const { data } = await axios.get('/posts')
      setPosts(data)
    } catch (error) {
      console.log(error)
    }
    setCargando(false)
  }
  async function createPost() {
    setCargando(true)
    try {
      const { data } = await axios.post('/posts', { content: post })
      console.log(data)
    } catch (error) {
      console.log(error)
    }
    setPost('')
    solicitarPosts()
    setCargando(false)
  }
  return (
    <View style={styles.container}>
      <TextInput
        multiline
        style={{ backgroundColor: '#f3f3f3' }}
        label={'Post'}
        value={post}
        onChangeText={setPost}
      />
      <Button loading={cargando} onPress={createPost}>
        Crear
      </Button>
      <FlatList
        refreshing={cargando}
        onRefresh={solicitarPosts}
        data={posts}
        keyExtractor={(e) => e.id}
        renderItem={({ item }) => <Text>{item.content}</Text>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
})
