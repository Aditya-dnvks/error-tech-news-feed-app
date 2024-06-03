import React, { useRef } from 'react';
import { StyleSheet, Text, View, Animated, PanResponder } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Importing LinearGradient for gradient background

// Constants for button and container sizes
const BUTTON_SIZE = 60;
const CONTAINER_SIZE = 250;
const GRADIENT_COLORS = ['#06d6a0', '#1b9aaa'];

const SwipeButton = ({ onSwipeComplete }: { onSwipeComplete: () => void }) => {
  const translateX = useRef(new Animated.Value(0)).current; // Animated value for horizontal translation

  // Function to handle swipe completion
  const handleSwipeComplete = () => {
    onSwipeComplete(); // Trigger the onSwipeComplete callback
    Animated.spring(translateX, {
      toValue: 0, // Reset the button position
      useNativeDriver: false, // Disable native driver for better compatibility
    }).start();
  };

  // PanResponder to handle swipe gestures
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      // Limit the swipeable area within the container
      if (gestureState.dx <= CONTAINER_SIZE - BUTTON_SIZE && gestureState.dx >= 0) {
        translateX.setValue(gestureState.dx);
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      // Complete the swipe if button is swiped to the end
      if (gestureState.dx >= CONTAINER_SIZE - BUTTON_SIZE) {
        handleSwipeComplete();
      } else {
        // Reset the button position if swipe is not complete
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  return (
    <LinearGradient colors={GRADIENT_COLORS} style={styles.container}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.swipeable,
          {
            transform: [{ translateX }],
          },
        ]}
      >
      </Animated.View>
      <Text style={styles.buttonText}>Swipe to Fetch</Text>
    </LinearGradient>
  );
};

// Styles for the SwipeButton component
const styles = StyleSheet.create({
  container: {
    width: CONTAINER_SIZE, // Sets the width of the container
    height: BUTTON_SIZE, // Sets the height of the container
    borderRadius: BUTTON_SIZE / 2, // Adds rounded corners to the container
    backgroundColor: '#1b9aaa', // Sets the background color of the container
    justifyContent: 'center', // Centers the children vertically
    overflow: 'hidden', // Hides overflowed children
  },
  swipeable: {
    width: BUTTON_SIZE, // Sets the width of the swipeable button
    height: BUTTON_SIZE, // Sets the height of the swipeable button
    borderRadius: BUTTON_SIZE / 2, // Adds rounded corners to the button
    backgroundColor: '#fff', // Sets the background color of the button
    justifyContent: 'center', // Centers the children vertically
    alignItems: 'center', // Centers the children horizontally
    position: 'absolute', // Positions the button absolutely within the container
    left: 0, // Aligns the button to the left
  },
  buttonText: {
    color: '#fff', // Sets the text color to white
    fontSize: 16, // Sets the font size of the text
    fontWeight: 'bold', // Makes the text bold
    textAlign: "center" // Centers the text horizontally
  },
});

export default SwipeButton; // Exporting the SwipeButton component as default
