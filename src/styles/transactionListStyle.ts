import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    itemContainer: {
        backgroundColor: '#fff',
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        width: '90%',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    amount: {
        fontSize: 16,
        color: 'green',
    },
    date: {
        fontSize: 14,
        color: 'gray',
    },
    buttonContainer: {
        marginVertical: 10,
        width: '80%',
    },
    deleteButton: {
        marginTop: 10,
        backgroundColor: '#ff4d4d',
        padding: 10,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: '#fff',
        textAlign: 'center',
    },
});
