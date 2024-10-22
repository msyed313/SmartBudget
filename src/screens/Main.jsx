import React, { useEffect, useState } from 'react';
import { View, ScrollView, Dimensions, StyleSheet, StatusBar, Pressable, Text } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import sqlite from 'react-native-sqlite-storage';
const { width, height } = Dimensions.get('window')
const Main = ({ navigation }) => {
    const [expenses, setExpenses] = useState()
    useEffect(() => {
        getExpenses()
    }, [navigation])

    async function getExpenses() {
        let db = await sqlite.openDatabase({
            name: 'SmartBudget.db',
            location: 'default',
            createFromLocation: '~SmartBudget.db'
        });
        db.transaction(function (t) {
            t.executeSql(
                'SELECT * FROM Expenses',
                [],
                (tx, resultSet) => {
                    let data = [];
                    for (let i = 0; i < resultSet.rows.length; i++) {
                        data.push(resultSet.rows.item(i));
                    }
                    setExpenses(data)
                    console.log(expenses);
                },
                e => {
                    console.log(JSON.stringify(e));
                },
            );
        });
    }
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#8C5CB3' barStyle='dark-content' />
            <Header navigation={navigation} title='Expenses' />

            {/* Recent Transactions Section */}
            <Text style={styles.subtitle}>Recent Transactions</Text>
            {expenses?.map((item, index) => {
                const date = new Date(item.Date); 
                return (
                    <View key={index} style={styles.transactionCard}>
                        <View style={styles.transactionRow}>
                            <Text style={styles.transactionCategory}>{item.Category}</Text>
                            <Text style={styles.transactionAmount}>{item.Amount} /-</Text>
                        </View>
                        <Text style={styles.transactionDate}>{date.toDateString()}</Text>
                    </View>
                );
            })}

            <Pressable style={styles.button} onPress={() => navigation.navigate('expenses')}>
                <Text style={styles.buttonText}>Add Expense</Text>
            </Pressable>
            <Footer name='home' navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8C5CB3',
    },
    subtitle: {
        width: '95%',
        // backgroundColor:'red',
        height: height * 0.05,
        alignSelf: 'center',
        fontSize: width * 0.06,
        marginVertical: height * 0.02,
        color: 'black',
        fontWeight: '600'
    },
    transactionCard: {
        width: '95%',
        backgroundColor: 'white',
        height: height * 0.09,
        alignSelf: 'center',
        marginBottom: height * 0.02,
        borderRadius: width * 0.03,
        alignItems: 'center'
    },
    transactionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '95%',
        // backgroundColor: 'red',
        height: '50%',
    },
    transactionCategory: {
        fontSize: width * 0.055,
        fontWeight: '800',
        color: 'black'
    },
    transactionAmount: {
        fontSize: width * 0.05,
        fontWeight: '700',
        color: 'black'
    },
    transactionDate: {
        width: '95%',
        // backgroundColor: 'red',
        height: '50%',
        fontSize: width * 0.045,
        color: 'blue',
        fontWeight: '700',
    },
    button: {
        width: '50%',
        height: height * 0.07,
        backgroundColor: 'black',
        borderRadius: width * 0.03,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: width * 0.05,
        color: 'white'
    }
});

export default Main;
