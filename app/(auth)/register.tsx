import React from 'react';
import { Link } from 'expo-router';
import { Button, TextInput } from 'react-native-paper';
import { StyleSheet, Image } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';


export default function RegisterScreen() {
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isPassIdentical, setIsPassIdentical] = React.useState(false);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  const handleRegister = () => {
    // TODO: Implement login logic
    console.log("Login with phone: ", phone, " and password: ", password);
    // Replace with actual login logic when ready
  }

  const checkValidPhoneNumber = (phone: string) => {
    //TODO: Implement phone number validation logic
    if (true) {
      setPhone(phone);
    }
  }

  const checkValidPassword = (password: string) => {
    // TODO: Implement password validation logic
    if (true) {
      setPassword(password);
    }
  }

  const checkIdenticalConfirmedPass = (pass: string) => {
    setIsPassIdentical(pass === password);
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
          onChangeText={checkValidPhoneNumber}
        />
        <TextInput
          mode="outlined"
          label="Password"
          placeholder="Type your password"
          value={password}
          right={<TextInput.Affix text="/100" />}
          onChangeText={checkValidPassword}
        />
        <TextInput
          mode="outlined"
          error={!isPassIdentical}
          label="Confirm Password"
          placeholder="Type your password again"
          right={<TextInput.Affix text="/100" />}
          onChangeText={checkIdenticalConfirmedPass}
        />
        <TextInput
          mode="outlined"
          label="First name"
          placeholder="Type your first name"
          value={firstName}
          right={<TextInput.Affix text="/100" />}
          onChangeText={text => setFirstName(text)}
        />
        <TextInput
          mode="outlined"
          label="Last name"
          placeholder="Type your last name"
          value={lastName}
          right={<TextInput.Affix text="/100" />}
          onChangeText={text => setLastName(text)}
        />
        <Button mode="contained" onPress={handleRegister}>Register</Button>
        <Link href="/" style={{
          color: 'white', textDecorationLine: 'underline'
          }}>Have an account already?
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
