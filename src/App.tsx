import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RegistrationScreen from './components/RegistrationScreen';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import TransactionScreen from './components/TransactionScreen';
import TransactionListScreen from './components/TransactionListScreen';
import styles from './styles';


const Stack = createStackNavigator();

const App: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState<string | null>(null);

    useEffect(() => {
        const checkLoginState = async () => {
            const token = await AsyncStorage.getItem('userToken');
            setUserToken(token);
            setIsLoading(false);
        };

        checkLoginState();
    }, []);

    if (isLoading) {
        return null;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={userToken ? "Home" : "Login"}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Registration" component={RegistrationScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Transaction" component={TransactionScreen} />
                <Stack.Screen name="TransactionList" component={TransactionListScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
