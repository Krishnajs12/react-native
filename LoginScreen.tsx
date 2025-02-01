import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import styles from '../styles/loginStyles';

const db = SQLite.openDatabase(
    {
        name: 'UserDatabase.db',
        location: 'default',
    },
    () => { console.log('Database opened'); },
    error => { console.log('Error: ' + error); }
);

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM Users WHERE email = ? AND password = ?',
                [email, password],
                (tx, results) => {
                    if (results.rows.length > 0) {
                        navigation.navigate('Home');
                    } else {
                        Alert.alert('Invalid email or password');
                        navigation.navigate('Registration');
                    }
                },
                error => { console.log('Error: ' + error); }
            );
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter email"
            />
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter password"
                secureTextEntry
            />
            <View style={styles.buttonContainer}>
                <Button title="Login" onPress={handleLogin} color="#841584" />
            </View>
        </View>
    );
};

export default LoginScreen;