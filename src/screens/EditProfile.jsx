import { View, Text, StyleSheet, Dimensions, TextInput, Image, Pressable, Animated } from 'react-native'
import React, { useState, useRef, useEffect } from 'react';
const { width, height } = Dimensions.get('window')
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Api from './Api';
const EditProfile = () => {
    const [passView, setPassView] = useState(false);
    const [imagePath, setImagePath] = useState(null);
    const [imgData, setImageData] = useState('');
    const [uname, setUname] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('')
    const [error, setError] = useState('');
    const [uid, setUId] = useState('');
    useEffect(() => {
        getUserData();
    }, []);

    //Function to get data from AsyncStorage and save it in userData
    const getUserData = async () => {
        try {
            const value = await AsyncStorage.getItem('user');
            if (value !== null) {
                const parsedData = JSON.parse(value);
                setUId(parsedData.u_id)
                setUname(parsedData.uname);
                setEmail(parsedData.email);
                setPassword(parsedData.password);
                setImagePath(parsedData.img);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Function to select image from the gallery
    const getImageGallery = () => {
        let options = { 'mediaType': 'photo' };
        launchImageLibrary(options, response => {
            setImagePath(response.assets[0].uri);
            setImageData({
                'uri': response.assets[0].uri,
            });
        });
        console.log(imgData);
    }
    // Form data for updating profile
    const formdata = new FormData()
    formdata.append('uname', uname)
    formdata.append('email', email)
    formdata.append('password', password)
    formdata.append('img', imgData)

    // Function to handle profile update
    const updateProfile = async () => {
        try {
            const response = await fetch(`${Api}/updateProfile/${uid}`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'
                },
                body: formdata
            });
            const data = await response.json()
            console.log(formdata);
            if (response.ok) {
                console.log("Success: ", data);
                // Save updated data back to AsyncStorage
                const updatedData = { uname, email, password, img: imgData.uri };
                await AsyncStorage.setItem('user', JSON.stringify(updatedData));
                setEmail(''), setImageData(''), setError(''), setPassword(''),
                    setUname(''), setImagePath('')
                navigation.navigate('profile')
            }
            else {
                console.log("error: ", data);
                setError(data)
            }
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    return (
        <View style={styles.main}>
            <Text style={styles.heading}>Update my profile</Text>

            <View style={styles.profView}>
                {imagePath ? (
                    <Image source={{ uri: imagePath }} style={styles.img} />
                ) : (
                    <Image
                        source={require('../assets/user.png')}
                        style={styles.profImg}
                    />
                )}
                <Pressable style={styles.btn} onPress={getImageGallery} >
                    <Text style={styles.btnText}>
                        Select Image
                    </Text>
                </Pressable>
            </View>
            <TextInput
                placeholder='enter your username'
                style={styles.input}
                value={uname}
                onChangeText={setUname}
            />
            {error ? <Text>{error.uname}</Text> : null}
            <TextInput
                placeholder='enter your email'
                style={styles.input}
                value={email}
                onChangeText={setEmail}
            />
            {error ? <Text>{error.email}</Text> : null}
            <TextInput
                placeholder='enter your password'
                secureTextEntry={passView ? false : true}
                style={styles.input}
                value={password}
                onChangeText={setPassword}
            />
            {error ? <Text>{error.password}</Text> : null}
            {passView ? (
                <Pressable onPress={() => setPassView(false)}>
                    <Image
                        source={require('../assets/hide.png')}
                        style={styles.icon}
                    />
                </Pressable>
            ) : (
                <Pressable onPress={() => [setPassView(true)]}>
                    <Image
                        source={require('../assets/view.png')}
                        style={styles.icon}
                    />
                </Pressable>
            )}
            <Pressable style={styles.loginButton} onPress={updateProfile}>
                <Text style={styles.loginText}>Update</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#8C5CB3',
        alignItems: 'center',
    },
    heading: {
        fontSize: width * 0.075,
        color: 'white',
        fontWeight: '500',
        marginTop: height * 0.03,
    },
    googleView: {
        width: width * 0.75,
        height: height * 0.07,
        backgroundColor: 'black',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: width * 0.02,
        marginVertical: height * 0.02,
        borderRadius: width * 0.1,
    },
    googleImg: {
        width: width * 0.07,
        height: height * 0.035,
    },
    googleText: {
        fontSize: width * 0.053,
        color: 'white',
        width: '70%',
        height: height * 0.04,
        textAlign: 'center',
    },
    otherOption: {
        fontSize: width * 0.045,
        color: 'black',
        fontWeight: '600',
        marginBottom: height * 0.05,
    },
    profView: {
        //backgroundColor: 'black',
        width: width * 0.8,
        height: height * 0.08,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: height * 0.02,
        paddingHorizontal: width * 0.02,
    },
    profImg: {
        alignSelf: 'center',
        width: '40%',
        height: "90%",
        resizeMode: 'contain'
    },
    btn: {
        alignSelf: 'center',
        width: '60%',
        height: '60%',
        backgroundColor: 'lightgrey',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: width * 0.03
    },
    btnText: {
        fontSize: width * 0.05,
        color: 'black',
        fontWeight: '600'
    },
    input: {
        width: width * 0.8,
        fontSize: width * 0.05,
        backgroundColor: 'white',
        height: height * 0.065,
        borderRadius: width * 0.06,
        paddingHorizontal: width * 0.03,
        marginBottom: height * 0.02,
        //position:'relative'
    },
    icon: {
        width: width * 0.07,
        height: height * 0.035,
        position: 'absolute',
        top: -height * 0.065,
        //backgroundColor: 'red',
        right: -width * 0.35,
        tintColor: 'red'
    },
    loginButton: {
        backgroundColor: 'black',
        width: width * 0.4,
        height: height * 0.055,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: width * 0.06,
    },
    loginText: {
        color: 'white',
        fontSize: width * 0.055,
    },
    signupButton: {
        width: width * 0.45,
        height: height * 0.06,
        marginTop: height * 0.01,
        alignItems: 'center',
    },
    signupText: {
        color: 'white',
        fontSize: width * 0.045,
    },
    imgView: {
        width: width * 0.9,
        height: height * 0.2,
        overflow: 'hidden',
        position: 'static',
        marginRight: -width * 0.5,
        bottom: height * 0.06,
        zIndex: -1
    },
    img: {
        width: '100%',
        height: '100%',
        opacity: 0.5
    },
})


export default EditProfile