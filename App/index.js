// Filename: index.js
// Combined code from all files

import React from 'react';
import { SafeAreaView, StyleSheet, Text, FlatList, Image, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const stories = Array.from({ length: 100 }, (_, index) => ({
  id: `${index + 1}`,
  title: `Story ${index + 1}`,
  imageUrl: `https://picsum.photos/200/300?random=${index + 1}`,
  content: `This is the content of story ${index + 1}. Once upon a time...`,
}));

const StoryList = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Story', { story: item })}>
      <View style={styles.storyItem}>
        <Image source={{ uri: item.imageUrl }} style={styles.storyImage} />
        <Text style={styles.storyTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={stories}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
    />
  );
};

const StoryScreen = ({ route }) => {
  const { story } = route.params;

  return (
    <View style={styles.storyScreen}>
      <Image source={{ uri: story.imageUrl }} style={styles.fullImage} />
      <Text style={styles.storyContent}>{story.content}</Text>
    </View>
  );
};

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={StoryList} options={{ title: 'Bedtime Stories' }} />
          <Stack.Screen name="Story" component={StoryScreen} options={{ title: 'Story' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    alignItems: 'center',
  },
  storyItem: {
    margin: 10,
    alignItems: 'center',
  },
  storyImage: {
    width: 200,
    height: 300,
    borderRadius: 10,
  },
  storyTitle: {
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center',
  },
  storyScreen: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  fullImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  storyContent: {
    fontSize: 16,
    textAlign: 'center',
  },
});