import { View, Text, StyleSheet, Dimensions, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
const { width, height } = Dimensions.get('window')
const Footer = ({ navigation, name }) => {
    const [active, setActive] = useState(name)
    const handlePress = (screen) => {
        setActive(name); 
        navigation.navigate(screen);
    }
    return (
        <View style={styles.footer}>
            <Pressable style={styles.footerView} onPress={() => handlePress('main')}>
                <Image source={require('../assets/home.png')} style={active == 'home' ? [styles.footerImage, { tintColor: 'red' }] : styles.footerImage} />
                <Text style={active == 'home' ? [styles.footerText, { color: 'blue' }] : styles.footerText} >home</Text>
            </Pressable>
            <Pressable style={styles.footerView} onPress={() => handlePress('expenses')}>
                <Image source={require('../assets/expense.png')} style={active == 'expense' ? [styles.footerImage, { tintColor: 'red' }] : styles.footerImage} />
                <Text style={active == 'expense' ? [styles.footerText, { color: 'blue' }] : styles.footerText} >expense</Text>
            </Pressable>
            <Pressable style={styles.footerView} onPress={() => handlePress('statistics')}>
                <Image source={require('../assets/stats.png')} style={active == 'statistics' ? [styles.footerImage, { tintColor: 'red' }] : styles.footerImage} />
                <Text style={active == 'statistics' ? [styles.footerText, { color: 'blue' }] : styles.footerText} >statistics</Text>
            </Pressable>
            <Pressable style={styles.footerView} onPress={() => handlePress('profile')}>
                <Image source={require('../assets/user.png')} style={active == 'profile' ? [styles.footerImage, { tintColor: 'red' }] : styles.footerImage} />
                <Text style={active == 'profile' ? [styles.footerText, { color: 'blue' }] : styles.footerText} >profile</Text>
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
    footer: {
        width: '100%',
        height: height * 0.07,
        backgroundColor: '#9D7DD8',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: width * 0.05,
        borderTopRightRadius: width * 0.05,
        flexDirection: 'row',
        alignItems: 'center'
    },
    footerView: {
        height: '100%',
        width: '25%',
        // backgroundColor:'red',
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerImage: {
        width: width * 0.07,
        height: height * 0.035
    },
    footerText: {
        fontSize: width * 0.037,
        color: 'white',
        fontWeight: '600'
    }
})
export default Footer