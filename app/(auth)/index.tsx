import React from 'react';
import { Link } from 'expo-router';
import { Button, TextInput } from 'react-native-paper';
import { StyleSheet, Image } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';


export default function LoginScreen() {
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = () => {
    // TODO: Implement login logic
    console.log("Login with phone: ", phone, " and password: ", password);
    // Replace with actual login logic when ready
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.stepContainer}>
        <TextInput
          label="Phone number"
          value={phone}
          onChangeText={text => setPhone(text)}
        />
        <TextInput
          mode="outlined"
          label="Password"
          placeholder="Type your password"
          value={password}
          right={<TextInput.Affix text="/100" />}
          onChangeText={text => setPassword(text)}
        />
        <Button mode="contained" onPress={handleLogin}>Login</Button>
        <Link href="/register" style={{
          color: 'white', textDecorationLine: 'underline'
          }}>Not registered yet? Do it here!
        </Link>
        <Link href="/forgot-password" style={{
          color: 'white', textDecorationLine: 'underline'
          }}>Forgot your password?
        </Link>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
