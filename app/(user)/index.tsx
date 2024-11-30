import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";

const UserBioScreen = () => {
  const screenHeight = Dimensions.get("window").height;
  const backgroundHeight = (2 / 3) * screenHeight;

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image
        source={{ uri: "https://example.com/background-image.jpg" }} // Replace with your background image URL
        style={[styles.backgroundImage, { height: backgroundHeight }]}
        resizeMode="cover"
      />

      {/* Profile Info */}
      <View style={styles.profileContainer}>
        {/* Avatar */}
        <Image
          source={{ uri: "https://example.com/user-avatar.jpg" }} // Replace with your avatar image URL
          style={styles.avatar}
        />

        {/* User Name */}
        <Text style={styles.username}>John Doe</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: "100%",
    position: "absolute",
    top: 0,
  },
  profileContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto", // Moves the profile container into the visible area
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "white",
    marginTop: -50, // Moves the avatar partially over the background
  },
  username: {
    marginTop: 16,
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});

export default UserBioScreen;
