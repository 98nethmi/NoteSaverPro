import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, StatusBar, Dimensions, ImageBackground, Image } from 'react-native';
import RoundIconBtn from '../components/RoundIconBtn';
import colors from '../misc/colors';
import backImage from '../image/loginimg.jpg'


const Intro = ({ onFinish }) => {
  const [name, setName] = useState('');
  const handleOnChangeText = text => setName(text);

  const handleSubmit = async () => {
    const user = { name: name };
    await AsyncStorage.setItem('user', JSON.stringify(user));
    if (onFinish) onFinish();
  };

  return (
    <ImageBackground source={backImage} style={styles.container}>

      <StatusBar hidden />

      <View style={styles.container}>

        <Image
          source={require("../image/icon.png")}
          style={{
            marginRight: 10,
            height: 300,
            width: 250,
            shadowColor: 'black',

          }}
        />

        <Text style={styles.inputTitle}>Enter Your Name to Continue</Text>
        <TextInput
          value={name}
          onChangeText={handleOnChangeText}
          placeholder='Enter Name Here'
          style={styles.textInput}
        />
        {name.trim().length >= 3 ? (
          <RoundIconBtn antIconName='arrowright' onPress={handleSubmit} />
        ) : null}


      </View>
    </ImageBackground>
  );
};

const width = Dimensions.get('window').width - 50;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    borderWidth: 2,
    borderColor: colors.WHITE,
    color: colors.WHITE,
    width,
    height: 60,
    borderRadius: 10,
    paddingLeft: 15,
    fontSize: 25,
    marginBottom: 15,

  },
  inputTitle: {
    alignSelf: 'flex-start',
    paddingLeft: 5,
    marginBottom: 5,
    color: colors.WHITE,
    fontSize: 18,

  },
});

export default Intro;
