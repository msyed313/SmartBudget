import { View, Text, Image, StyleSheet, Animated, StatusBar, Dimensions } from 'react-native';
import React, {useEffect } from 'react';

const { width, height } = Dimensions.get('window');

const Splash = ({ navigation }) => {
    useEffect(()=>{
        setTimeout(() => {
           navigation.navigate('login')
        }, 2000);
        return () => clearTimeout(timer);
     },[navigation])
    return (
        <View style={styles.main}>
            <StatusBar backgroundColor='#8C5CB3' barStyle='dark-content' />
            <Text style={styles.heading}>Smart Budget</Text>
            <Image
                source={require('../assets/budget.png')}
                style={styles.logo} // Apply fade animation to the logo
            />

        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#8C5CB3',
        alignItems: 'center',
        justifyContent: 'center'
    },
    heading: {
        fontSize: width * 0.09,
        color: 'white',
        marginVertical: height * 0.05,
        fontWeight: '400',
    },
    logo: {
        width: width * 0.4,
        height: height * 0.2,
    },
});

export default Splash;
