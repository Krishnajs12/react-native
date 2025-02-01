import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Alert, TouchableOpacity } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import styles from '../styles/transactionListStyle';

const db = SQLite.openDatabase(
    {
        name: 'TransactionDatabase.db',
        location: 'default',
    },
    () => { console.log('Database opened'); },
    error => { console.log('Error: ' + error); }
);

const TransactionListScreen = ({ navigation }) => {
    const [transactions, setTransactions] = useState([]);

    const fetchTransactions = () => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM Transactions',
                [],
                (tx, results) => {
                    let rows = [];
                    for (let i = 0; i < results.rows.length; i++) {
                        rows.push(results.rows.item(i));
                    }
                    setTransactions(rows);
                },
                error => { console.log('Error: ' + error); }
            );
        });
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    const handleDelete = (id) => {
        db.transaction(tx => {
            tx.executeSql(
                'DELETE FROM Transactions WHERE id = ?',
                [id],
                () => {
                    Alert.alert('Transaction deleted successfully');
                    fetchTransactions(); // Refresh the list
                },
                error => { console.log('Error: ' + error); }
            );
        });
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={transactions}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.title}>Title: {item.title}</Text>
                        <Text style={styles.amount}>Amount: {item.amount}</Text>
                        <Text style={styles.date}>Date: {item.date}</Text>
                        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
                            <Text style={styles.deleteButtonText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
            <View style={styles.buttonContainer}>
                <Button title="Back to Home" onPress={() => navigation.navigate('Home')} color="#841584" />
            </View>
        </View>
    );
};

export default TransactionListScreen;