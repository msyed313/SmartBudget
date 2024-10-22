import React from 'react';
import { View, StyleSheet, Text, Dimensions, Pressable, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';
import Footer from './Footer';
const { width, height } = Dimensions.get('window')
const Profile = ({ navigation }) => {
    // Mock user data (replace this with real user data from your state or API)
    const [userData, setUserData] = useState({});


    useEffect(() => {
        _retrieveData();
    }, []);
    

    // Function to retrieve data from AsyncStorage and save it in userData
    const _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('user');
            const parsedPlayer = await JSON.parse(value);

            if (parsedPlayer !== null) {
                // Save the retrieved data to userData state
                setUserData(parsedPlayer);
                console.log('User data fetched and saved:', parsedPlayer);
            } else {
                console.log('No user data found in AsyncStorage');
            }
        } catch (error) {
            console.log('Error retrieving data:', error);
        }
    };



    return (
        <View style={styles.container}>
            <Header navigation={navigation} title='profile' />
            {/* Profile Header */}
            <View style={styles.profileHeader}>
                <Image style={styles.profimg} source={userData.profilePic} />
                <Text style={styles.userName}>{userData.uname}</Text>
                <Text style={styles.email}>{userData.email}</Text>
            </View>

            {/* Edit Profile Button */}
            <Pressable
                mode="outlined"
                onPress={()=>navigation.navigate('editprofile')}
                style={styles.editButton}
            >
                <Text style={styles.editButtonText}> Edit Profile</Text>
            </Pressable>

            <Footer navigation={navigation} name='profile' />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8C5CB3',
    },
    profileHeader: {
        //backgroundColor:'red',
        width: '100%',
        height: height * 0.25,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: height * 0.02,
    },
    profimg: {
        width: width * 0.3,
        height: height * 0.15
    },
    userName: {
        marginVertical: height * 0.01,
        fontSize: width * 0.06,
        fontWeight: 'bold',
        color: 'black',
    },
    email: {
        fontSize: width * 0.04,
        color: 'white',
        fontWeight: '600',
    },
    editButton: {
        width: '50%',
        height: height * 0.055,
        backgroundColor: 'black',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: width * 0.05
    },
    editButtonText: {
        fontSize: width * 0.05,
        color: 'white'
    },
    card: {
        backgroundColor: 'white',
        width: '90%',
        height: height * 0.2,
        marginVertical: height * 0.02,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    infoText: {
        fontSize: 16,
        marginVertical: 5,
    },
    logoutButton: {
        backgroundColor: '#6200ee',
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 20,
    },
});

export default Profile;
