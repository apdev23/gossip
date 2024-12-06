import React from 'react';
import { TextInput, StyleSheet, StyleProp, TextStyle, KeyboardTypeOptions } from 'react-native';

type TextInputProps = {
    onBlur: () => void;
    onChange: (text: string) => void; 
    inputStyle?: StyleProp<TextStyle>; 
    value?: string;
    placeholder?: string;
    keyboardType?: KeyboardTypeOptions; 
    secureTextEntry?: boolean; 
};

const TextInputComponent: React.FC<TextInputProps> = ({
    onBlur,
    onChange,
    inputStyle,
    value,
    placeholder,
    keyboardType = 'default', 
    secureTextEntry = false,
}) => {
    return (
        <TextInput
            style={[styles.input, inputStyle]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={placeholder}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            placeholderTextColor="gray"
        />
    );
};

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
        color: '#000000',
    },
});

export default TextInputComponent;
