import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import styles from '../styles/transactionStyle';

const db = SQLite.openDatabase(
    {
        name: 'TransactionDatabase.db',
        location: 'default',
    },
    () => { console.log('Database opened'); },
    error => { console.log('Error: ' + error); }
);

const TransactionScreen = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Transactions (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, amount REAL, date TEXT)',
                [],
                () => { console.log('Table created successfully'); },
                error => { console.log('Error: ' + error); }
            );
        });
    }, []);

    const handleSave = () => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO Transactions (title, amount, date) VALUES (?, ?, ?)',
                [title, parseFloat(amount), date],
                () => {
                    Alert.alert('Transaction saved successfully');
                    navigation.goBack();
                },
                error => { console.log('Error: ' + error); }
            );
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Transaction</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter title"
            />
            <TextInput
                style={styles.input}
                value={amount}
                onChangeText={setAmount}
                placeholder="Enter amount"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                value={date}
                onChangeText={setDate}
                placeholder="Enter date"
            />
            <View style={styles.buttonContainer}>
                <Button title="Save Transaction" onPress={handleSave} color="#841584" />
            </View>
        </View>
    );
};

export default TransactionScreen;