import theme from '@/Lib/theme';
import { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Alert } from 'react-native';

interface GeizhalsInputProps {
    onUrlChange: (url: string) => void
}

const GeizhalsInput = (props: GeizhalsInputProps) => {
    const geizhalsURLstart = 'https://geizhals.de/';
    const [url, setUrl] = useState("");
    const [isValid, setIsValid] = useState(true);

    function validateURL(inputUrl: string) {
        const isValidUrl = inputUrl.startsWith(geizhalsURLstart);
        setIsValid(isValidUrl);
        setUrl(inputUrl);
        if (isValid) {
            props.onUrlChange(inputUrl)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Enter Geizhals Product URL:</Text>
            <TextInput
                style={[styles.input, !isValid && styles.inputError]}
                keyboardType='url'
                value={url}
                onChangeText={validateURL}
                placeholder='https://geizhals.de/...'
                autoCapitalize='none'
                autoCorrect={false}
            />
            {!isValid && <Text style={styles.errorText}>Invalid Geizhals URL</Text>}
        </View>
    );
};

export default GeizhalsInput;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: theme.colors.background.verylight,
        borderRadius: 8,
        elevation: 3,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: theme.colors.text.verylight,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        marginTop: 4,
        fontSize: 12,
    }
});
