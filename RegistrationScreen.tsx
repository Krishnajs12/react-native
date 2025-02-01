import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import styles from '../styles/registrationScreenStyle';

const db = SQLite.openDatabase(
    {
        name: 'UserDatabase.db',
        location: 'default',
    },
    () => { console.log('Database opened'); },
    error => { console.log('Error: ' + error); }
);

const RegistrationScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, email TEXT, password TEXT)',
                [],
                () => { console.log('Table created successfully'); },
                error => { console.log('Error: ' + error); }
            );
        });
    }, []);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string) => {
        return password.length >= 6;
    };

    const handleEmailChange = (email: string) => {
        setEmail(email);
        if (!validateEmail(email)) {
            setEmailError('Invalid email address');
        } else {
            setEmailError('');
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const password = e.target.value;
        setPassword(password);
        if (!validatePassword(password)) {
            setPasswordError('Password must be at least 6 characters long');
        } else {
            setPasswordError('');
        }
    };

    const handleSubmit = () => {
        if (emailError || passwordError) {
            Alert.alert('Please fix the errors before submitting');
            return;
        }

        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO Users (username, email, password) VALUES (?, ?, ?)',
                [username, email, password],
                () => { Alert.alert('User registered successfully'); },
                error => { console.log('Error: ' + error); }
            );
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="Enter username"
            />
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={handleEmailChange}
                placeholder="Enter email"
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={handlePasswordChange}
                placeholder="Enter password"
                secureTextEntry
            />
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            <View style={styles.buttonContainer}>
                <Button title="Register" onPress={handleSubmit} color="#841584" />
            </View>
        </View>
    );
};

export default RegistrationScreen;