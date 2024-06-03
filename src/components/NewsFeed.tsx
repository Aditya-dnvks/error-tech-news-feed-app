import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import useSWR from 'swr'; // Importing the useSWR hook for data fetching
import SwipeButton from './SwipeButton'; // Importing the SwipeButton component

// Function to fetch data from a given URL
const fetcher = (url: string) => fetch(url).then(res => res.json());

const NewsFeed: React.FC = () => {
  const [index, setIndex] = useState(-1); // Initial state to indicate no news selected. Initial Index to be -1 where there is no news

  // Using useSWR to fetch news data from the API. Here used newsapi.org to fetch news with help of API key
  const { data, error } = useSWR(
    'https://newsapi.org/v2/top-headlines?country=us&apiKey=d643da2e83dd46bbbea7394653bdc9b6',
    fetcher
  );

  // Function to handle swipe action completion
  const handleNewsClick = () => {
    if (index < data.articles.length - 1) {
      setIndex(index + 1); // Show next news article
    } else {
      setIndex(0); // Reset to first news article if at the end
    }
  };

  if (error) return <Text>Error fetching news</Text>; // Display error message if fetching fails
  if (!data) return <Text>Loading...</Text>; // Display loading message while fetching data

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{index !== -1 ? 'Latest News' : 'Welcome to the news app'}</Text>
      {index !== -1 && (
        <View style={styles.newsContainer}>
          {data.articles[index].urlToImage && <Image source={{ uri: data.articles[index].urlToImage }} style={styles.image} />}
          <Text style={styles.title}>{data.articles[index].title}</Text>
          <Text style={styles.description}>{data.articles[index].content}</Text>
        </View>
      )}      
      <SwipeButton onSwipeComplete={handleNewsClick} /> 
    </View>
  );
};
//In above return statement Index = -1 for initial case and news container is empty. After First swipe, state is changed as index is updated.
//Rendering the SwipeButton component along with onSwipeComplete Prop. Whenever Swipe occurs, handleNewsClick is triggered and index moves to next nwes item



// Styles for the NewsFeed component
const styles = StyleSheet.create({
  container: {
    flex: 1, // Makes the container take up the full height of the screen
    backgroundColor: 'lightblue', // Sets the background color to light blue
    alignItems: 'center', // Centers the children horizontally
    justifyContent: 'center', // Centers the children vertically
    height: "100%",
    width: "100%",
    color: "black"
  },
  heading: {
    fontSize: 24, // Sets the font size for the heading
    fontWeight: 'bold', // Makes the heading bold
    marginBottom: 20, // Adds margin at the bottom of the heading
    color: "black",
    fontFamily: "Montserrat"
  },
  image: {
    width: '100%', // Makes the image take up the full width of the container
    height: 250, // Sets the height of the image
    borderRadius: 10 // Adds rounded corners to the image
  },
  title: {
    fontSize: 21, // Sets the font size for the title
    fontWeight: 'bold', // Makes the title bold
    marginTop: 15, // Adds margin at the top of the title
    color: "black", // Sets the color of the title text
    fontFamily: "Roboto" // Sets the font family for the title text
  },
  description: {
    fontSize: 19, // Sets the font size for the description
    marginTop: 10, // Adds margin at the top of the description
    color: "grey", // Sets the color of the description text
    fontFamily: "Roboto" // Sets the font family for the description text
  },
  newsContainer: {
    backgroundColor: '#fff', // Sets the background color of the news container to white
    padding: 15, // Adds padding inside the news container
    borderRadius: 10, // Adds rounded corners to the news container
    marginBottom: 20, // Adds margin at the bottom of the news container
    height: "75%", // Sets the height of the news container
    width: '90%', // Sets the width of the news container
    alignItems: 'flex-start', // Aligns the children to the start of the container
    color: "#000000", // Sets the text color inside the news container
    shadowColor: '#000', // Adds shadow color
    shadowOffset: { width: 0, height: 2 }, // Sets shadow offset
    shadowOpacity: 0.3, // Sets shadow opacity
    shadowRadius: 5, // Sets shadow radius
    elevation: 5, // Adds elevation for Android
    borderColor: '#ddd', // Adds border color
    borderWidth: 1, // Sets border width
  }
});

export default NewsFeed; // Exporting the NewsFeed component as default
