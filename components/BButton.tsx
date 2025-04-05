import { PreStyle } from '@/Lib/theme';
import * as React from 'react';
import { Text, TouchableOpacity, StyleProp, ViewStyle, TextStyle } from 'react-native';

interface BButtonProps {
    buttonStyle?: StyleProp<ViewStyle>,
    textStyle?: StyleProp<TextStyle>,
    text?: string,
    onClick?: () => void,
}

const BButton = (props: BButtonProps) => {
    return (
        <TouchableOpacity style={props.buttonStyle ? props.buttonStyle : PreStyle.button} onPress={() => { if (props.onClick) { props.onClick(); } }}>
            <Text style={props.textStyle ? props.textStyle : PreStyle.buttonText}>{props.text}</Text>
        </TouchableOpacity>
    );
};

export default BButton;
