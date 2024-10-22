import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView, Platform, Text, Dimensions, Pressable } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Header from './Header';
import Footer from './Footer';
import sqlite from 'react-native-sqlite-storage';
import { Api } from './Api';
const { width, height } = Dimensions.get('window')

const Expense = ({ navigation }) => {
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);

    // Handle save expense
    async function SaveExpense() {
        // Generate a random color
        const randomColor = () => Math.floor(Math.random() * 256);
        const color = `#${((1 << 24) + (randomColor() << 16) + (randomColor() << 8) + randomColor()).toString(16).slice(1)}`;

        // SQLite database save
        let db = await sqlite.openDatabase({
            name: 'SmartBudget.db',
            location: 'default',
            createFromLocation: '~SmartBudget.db'
        });

        db.transaction(function (t) {
            t.executeSql(
                'INSERT INTO Expenses (Category,Amount,Date,color) VALUES (?, ?, ?, ?)',
                [category, amount, date, color],
                (tx, resultSet) => {
                    console.log('Expense saved successfully in SQLite');
                    setCategory(''); // Reset form fields
                    setAmount('');
                    setDate(new Date());
                },
                e => {
                    console.log('Error saving expense to SQLite: ', e);
                }
            );
        });

        // API save
        try {
            const response = await fetch(`${Api}/expenses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    category: category,
                    amount: amount,
                    date: date,
                    color: color
                })
            });

            if (response.ok) {
                const jsonResponse = await response.json();
                console.log('Expense saved successfully in database:', jsonResponse);
            } else {
                console.log('Error saving expense in database:', response.statusText);
            }
        } catch (error) {
            console.log('Error saving expense in database: ', error);
        }
    }


    return (
        <View style={styles.container}>
            <Header navigation={navigation} title='Add expense' />

            <View style={styles.inputView}>
                <Text style={styles.label}>Category</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter category"
                    value={category}
                    onChangeText={setCategory}
                />
            </View>
            <View style={styles.inputView}>
                <Text style={styles.label}>Amount</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter amount"
                    keyboardType="numeric"
                    value={amount}
                    onChangeText={setAmount}
                />
            </View>
            <View style={styles.inputView}>
                <Text style={styles.label}>Select Date</Text>
                <Pressable onPress={() => setOpen(true)} style={styles.input}>
                    <Text style={styles.dateText} >{date.toLocaleDateString()}</Text>
                </Pressable>
                <DatePicker
                    modal
                    open={open}
                    date={date}
                    onConfirm={(selectedDate) => {
                        setOpen(false);
                        setDate(selectedDate);
                    }}
                    onCancel={() => {
                        setOpen(false);
                    }}
                    mode="date" // "time" or "datetime" for other options
                />
            </View>
            <Pressable style={styles.button} onPress={SaveExpense}>
                <Text style={styles.buttonText}>Save </Text>
            </Pressable>
            <Footer name='expense' navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8C5CB3',
    },
    inputView: {
        // backgroundColor:'red',
        width: '95%',
        marginBottom: height * 0.02,
        height: height * 0.15,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        //backgroundColor:'white',
        width: '95%',
        height: '35%',
        fontSize: width * 0.055,
        fontWeight: 'bold',
        color: 'black'
    },
    input: {
        backgroundColor: 'white',
        width: '95%',
        height: '50%',
        borderWidth: 2,
        borderColor: 'grey',
        borderRadius: width * 0.03,
        fontSize: width * 0.05,
        paddingHorizontal: width * 0.03,
        color: 'black',
        fontWeight: '600',
    },
    dateText: {
        fontSize: width * 0.05,
        paddingVertical: width * 0.03,
        fontWeight: '600',
        color: 'black'
    },
    button: {
        width: '40%',
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

export default Expense;
