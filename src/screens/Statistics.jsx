import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import Header from './Header';
import Footer from './Footer';
import sqlite from 'react-native-sqlite-storage';
const { width, height } = Dimensions.get('window');
import NetInfo from '@react-native-community/netinfo';
import { Api } from './Api';
const Statistics = ({ navigation }) => {
    const [expenses, setExpenses] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [mostSpentCategory, setMostSpentCategory] = useState('');
    useEffect(() => {
        checkInternetAndGetExpenses();
    }, []);
    //random color generator
    // Function to check internet and then get expenses accordingly
    const checkInternetAndGetExpenses = async () => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                // If connected, fetch from the API
                getExpensesFromDatabase();
            } else {
                // Otherwise, fetch from SQLite
                getExpensesFromSQLite();
            }
        });
    };

    // Fetch expenses from SQLite
    const getExpensesFromSQLite = async () => {
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
                    setExpenses(data);           // Save fetched expenses
                    calculateSummary(data);       // Calculate total and most spent category
                    formatChartData(data);        // Format data for Pie Chart
                },
                e => {
                    console.log(JSON.stringify(e));
                },
            );
        });
    };

    // Fetch expenses from API
    const getExpensesFromDatabase = async () => {
        try {
            const response = await fetch(`${Api}/expenses`);
            const data = await response.json();

            setExpenses(data);             // Set expenses from API
            calculateSummary(data);        // Calculate total and most spent category
            formatChartData(data);         // Format data for Pie Chart
        } catch (error) {
            console.error('Error fetching data from database:', error);
            // Fall back to SQLite if the API call fails
            getExpensesFromSQLite();
        }
    };
    // Function to format data for the PieChart
    const formatChartData = (data) => {
        // Map data directly from the database to PieChart format
        const formattedData = data.map((item) => ({
            name: item.Category,
            population: parseFloat(item.Amount),
            color: item.color, // Use color directly from the database
            legendFontColor: 'white',
            legendFontSize: width * 0.04,
        }));

        setChartData(formattedData);
    };

    // Function to calculate the total expenses and most spent category
    const calculateSummary = (data) => {
        let total = 0;
        let categoryTotals = {};

        data.forEach((item) => {
            const amount = parseFloat(item.Amount);
            total += amount;

            if (categoryTotals[item.Category]) {
                categoryTotals[item.Category] += amount;
            } else {
                categoryTotals[item.Category] = amount;
            }
        });

        // Find the category with the highest total amount
        let maxCategory = '';
        let maxAmount = 0;
        for (const [category, amount] of Object.entries(categoryTotals)) {
            if (amount > maxAmount) {
                maxAmount = amount;
                maxCategory = category;
            }
        }

        setTotalExpenses(total);
        setMostSpentCategory(maxCategory);
    };
    return (
        <View style={styles.container}>
            <Header navigation={navigation} title='Expense Statistics' />

            {/* Expense Summary Card */}
            <View style={styles.card}>
                <Text style={styles.summaryText}>Total Expenses: <Text style={{ fontSize: width * 0.045, color: 'white' }}>{totalExpenses.toFixed(2)}/-</Text> </Text>
                <Text style={styles.summaryText}>Most Spent On: <Text style={{ fontSize: width * 0.045, color: 'white' }}>{mostSpentCategory}</Text></Text>
            </View>

            {/* Pie Chart for Expenses by Category */}
            <View style={[styles.card, { width: '100%' }]}>
                <Text style={styles.chartTitle}>Expenses by Category</Text>
                <PieChart
                    data={chartData}
                    width={width} // Adjusting to screen width
                    height={220}
                    chartConfig={{
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    }}
                    accessor="population"
                    backgroundColor="transparent"
                    absolute
                />
            </View>
            <Footer name='statistics' navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8C5CB3',
    },
    card: {
        width: '95%',
        // backgroundColor:'red',
        marginVertical: height * 0.02,
        borderRadius: width * 0.03,
        alignSelf: 'center',
        paddingHorizontal: width * 0.03
    },
    summaryText: {
        fontSize: width * 0.05,
        //marginBottom: 5,
        fontWeight: '500',
        color: 'black'
    },
    chartTitle: {
        fontSize: width * 0.05,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black'
    },
});

export default Statistics;
