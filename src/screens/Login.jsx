import { View, Text, StyleSheet, Dimensions, TextInput, Image, Pressable, Animated } from 'react-native'
import React, { useState, useRef, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('window');

const Login = ({ navigation }) => {
  const [passView, setPassView] = useState(false);
  const [uname, setUname] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError]=useState('');
  const handleLogin = async () => {
    try {
      const response = await fetch(`${Api}/Login?uname=${uname}&password=${password}`);
      const data = await response.json();
     // const pid=data.Pid;
      if (response.ok) {
        // Save player information in async storage
         try {
          await AsyncStorage.setItem('user', JSON.stringify(data));
          navigation.navigate('main')
          //console.log('stored with id:',data.Pid);
           } catch (e) {
          console.log(e)
         } 
      } else {
        console.log('Error', data);
        setError(data)
        console.log(error);
        
      }
      
    } catch (error) {
      console.log('Error', 'An error occurred while logging in.');
      console.error('Login Error:', error);
    }
  };
  return (
    <View style={styles.main}>
      <Text style={styles.heading}>Login Here</Text>
      <Pressable style={styles.googleView}>
        <Image source={require('../assets/google.png')} style={styles.googleImg} />
        <Text style={styles.googleText}>Log in with Google</Text>
      </Pressable>
      <Text style={styles.otherOption}>--------- or continue with username ---------</Text>
      <View style={styles.inputView}>
      {error ? <Text style={{fontSize:15,color:'red',textAlign:'center'}}>{error}</Text> : null}
        <Text style={styles.inputText}>Username</Text>
        <TextInput
          placeholder='enter ur username'
          style={styles.input}
          value={uname}
          onChangeText={setUname}
        />
      </View>
      <View style={styles.inputView}>
        <Text style={styles.inputText}>Password</Text>
        <TextInput
          placeholder='enter ur password'
          secureTextEntry={!passView}
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      {passView ? (
        <Pressable onPress={() => setPassView(false)}>
          <Image
            source={require('../assets/hide.png')}
            style={styles.icon}
          />
        </Pressable>
      ) : (
        <Pressable onPress={() => setPassView(true)}>
          <Image
            source={require('../assets/view.png')}
            style={styles.icon}
          />
        </Pressable>
      )}
      <Pressable style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Log in</Text>
      </Pressable>
      <Pressable style={styles.signupButton} onPress={() => navigation.navigate('signup')}>
        <Text style={styles.signupText}>Don't have account?</Text>
        <Text style={[styles.signupText, { color: 'red' }]}>Sign up</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#8C5CB3',
    alignItems: 'center',
    //justifyContent: 'center'
  },
  heading: {
    fontSize: width * 0.08,
    color: 'white',
    fontWeight: '500',
    marginTop:height*0.06
  },
  googleView: {
    width: width * 0.7,
    height: height * 0.07,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: width * 0.02,
    marginVertical: height * 0.02,
    borderRadius: width * 0.1
  },
  googleImg: {
    width: width * 0.07,
    height: height * 0.035,
  },
  googleText: {
    fontSize: width * 0.053,
    color: 'white',
    // backgroundColor:'red',
    width: '70%',
    height: height * 0.04,
    textAlign: 'center'
  },
  otherOption: {
    fontSize: width * 0.045,
    color: 'black',
    fontWeight: '600',
    marginBottom: height * 0.02,
  },
  inputView: {
    width: width * 0.9,
    height: height * 0.13,
    justifyContent: 'center',
    paddingHorizontal: width * 0.05,
    borderRadius: width * 0.1,
    gap:5,
    //backgroundColor:'red'
  },
  inputText: {
    width: width * 0.45,
    fontSize: width * 0.06,
    height: '30%',
    paddingHorizontal: width * 0.02,
    color: 'black',
    fontWeight: '600'
  },
  input: {
    width: width * 0.8,
    fontSize: width * 0.047,
    backgroundColor: 'white',
    height: '50%',
    borderRadius: width * 0.06,
    paddingHorizontal: width * 0.02,
  },
  icon: {
    width: width*0.08,
    height: height * 0.04,
    position:'absolute',
    top: -height*0.06,
    //backgroundColor: 'red',
    right:-width*0.35,
    tintColor:'red'
  },
  loginButton: {
    backgroundColor: 'black',
    width: width * 0.4,
    height: height * 0.055,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: width * 0.06,
    marginTop:height*0.01
  },
  loginText: {
    color: 'white',
    fontSize: width * 0.055
  },
  signupButton: {
    width: width * 0.45,
    height: height * 0.06,
    marginTop: height * 0.01,
    alignItems: 'center',
  },
  signupText: {
    color: 'white',
    fontSize: width * 0.045
  },
  imgView: {
   // backgroundColor:'red',
    width: width * 0.9,
    height: height * 0.3,
    overflow: 'hidden',
    position: 'static',
    marginRight: -width * 0.5,
    bottom:height*0.05,
    zIndex:-1
  },
  img: {
    width: '100%',
    height: '100%',
    opacity:0.5
  },
});

export default Login;
