import { PreStyle, theme } from '@/Lib/theme';
import { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Alert } from 'react-native';

interface GeizhalsInputProps {
    onUrlChange: (url: string) => void
}

const GeizhalsInput = (props: GeizhalsInputProps) => {
    const RegexValidator = /https:\/\/geizhals\.de\/[\w-]+\.html/;
    const [url, setUrl] = useState("");
    const [isValid, setIsValid] = useState(true);

    function validateURL(inputUrl: string) {
        const isValidUrl = RegexValidator.test(inputUrl)
        setIsValid(isValidUrl);
        setUrl(inputUrl);
        if (isValid) {
            props.onUrlChange(inputUrl)
        } else {
            console.log("URL not valid: " + inputUrl);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.errorText, styles.visibleError]}> </Text>
            <TextInput
                style={[PreStyle.input, !isValid && styles.inputError]}
                keyboardType='url'
                value={url}
                onChangeText={validateURL}
                placeholder='https://geizhals.de/...'
                autoCapitalize='none'
                autoCorrect={false}
            />
            <Text style={[styles.errorText, !isValid ? styles.visibleError : styles.hiddenError]}>
                Invalid Geizhals URL
            </Text>
        </View>
    );
};

export default GeizhalsInput;

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        elevation: 3,
        width: "100%"
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: theme.spacing.sm,
        backgroundColor: '#fff',
        width: "100%"
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        marginTop: 4,
        fontSize: 12,
    },
    visibleError: {
        color: 'red',
    },
    hiddenError: {
        color: 'transparent',
    },

});
