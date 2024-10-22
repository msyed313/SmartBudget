import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import React from 'react'
const { width, height } = Dimensions.get('window')
const Header = ({ navigation, title }) => {
    return (
        <View style={styles.header}>
            <Image source={require('../assets/budget.png')} style={styles.img} />
            <Text style={styles.text}>{title}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: height * 0.08,
        backgroundColor: '#9D7DD8',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: width * 0.02,
        //gap:width*0.15,
        borderRadius: width * 0.05,
    },
    img: {
        width: width * 0.1,
        height: height * 0.05,
        borderRadius: width * 0.05
    },
    text: {
        fontSize: width * 0.07,
        fontWeight:'600',
        color:'white',
        width:'80%',
        height: height * 0.06,
       // backgroundColor:'red',
        textAlign:'center'
    }
})
export default Header