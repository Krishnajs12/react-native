import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/homeScreenStyle';

const HomeScreen = ({ navigation }) => {
    const handleLogout = async () => {
        await AsyncStorage.removeItem('userToken');
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home Screen</Text>
            <View style={styles.buttonContainer}>
                <Button title="Logout" onPress={handleLogout} color="grey" />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Add Transaction" onPress={() => navigation.navigate('Transaction')} color="grey" />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="View Transactions" onPress={() => navigation.navigate('TransactionList')} color="grey" />
            </View>
        </View>
    );
};

export default HomeScreen;