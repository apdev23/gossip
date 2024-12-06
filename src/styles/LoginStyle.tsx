import { StyleSheet } from "react-native";
import { Fonts } from "../utils";

const LoginStyle = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: 'center',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#000000'
    },
    placeHolderStyle: {
        color: 'gray',
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
        color: '#000000'
    },
    errorInput: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    h1Style: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#000000'
    },
    orStyle: {
        fontSize: 15,
        textAlign: 'center',
        fontWeight: '400',
        color: 'gray',
        marginVertical: 10
    },
    signupTextStyle: {
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#000000',
    }

});

export default LoginStyle;