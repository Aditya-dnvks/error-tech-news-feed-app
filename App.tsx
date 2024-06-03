import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NewsFeed from './src/components/NewsFeed'; // Importing the NewsFeed component

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <NewsFeed /> 
    </View>
  );
};
//NewsFeed Renders the NewsFeed Component

// Styles for the App component
const styles = StyleSheet.create({
  container: {
    flex: 1, // Makes the container take up the full height of the screen
    backgroundColor: '#fff', // Sets the background color to white
    alignItems: 'center', // Centers the children horizontally
    justifyContent: 'center', // Centers the children vertically
  },
});

export default App; // Exporting the App component as default
