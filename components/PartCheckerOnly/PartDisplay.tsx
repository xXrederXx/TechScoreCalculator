import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import GeizhalsInput from '@/components/GeizhalsInput';
import { fetchDataGeizhals } from '@/Lib/DataFetcher';
import KeyValueDisplay from '../KeyValueDisplay';
import { NamedValue } from '@/Lib/Types';
import { PreStyle, theme } from '@/Lib/theme';
import BButton from '../BButton';

interface PartDisplayProps {
    PartName?: string,
    convertFunc?: (data: any) => any,
    scoreFunc?: (data: any) => string,
}

const PartDisplay = (props: PartDisplayProps) => {
    const [url, seturl] = useState("")
    const [scrapedData, setScrapedData] = useState<{ value: NamedValue<any> }>({ value: new NamedValue(0, "") })
    const [score, setScore] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        getData()
    }, []);


    async function getData() {
        setIsLoading(true)
        let response = await fetchDataGeizhals(url)
        try {
            if (props.convertFunc) {
                response = props.convertFunc(response);
                console.log(response);
            }
        } catch (err) {
            console.log("Convertion func not working. Error: " + err);
        }
        setScrapedData(response)
        if (props.scoreFunc) { setScore(props.scoreFunc(response)) }
        setIsLoading(false)
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.topContainer}>
                <Text style={[styles.title]}>{props.PartName} Lookup</Text>
                <Text style={[PreStyle.text, styles.subTitle]}>Enter Geizhals URL</Text>
            </View>
            <View style={styles.bottomContainer}>
                <GeizhalsInput onUrlChange={(val) => seturl(val)} />
                <View style={styles.subContainer}>
                    <BButton onClick={getData} text={"Update"} buttonStyle={[PreStyle.button, {width: 200}]} />
                    {isLoading ? <ActivityIndicator color={theme.colors.info.normal} size={25} /> : null}
                    <Text style={PreStyle.text}>{score}</Text>
                </View>
                <KeyValueDisplay data={scrapedData} />
            </View>
        </View>
    );
};
const cardHeight = Dimensions.get('window').height * 0.8


const styles = StyleSheet.create({
    mainContainer: {
        padding: theme.spacing.md,
        alignItems: 'center',
        flex: 1,
        minWidth: 650,
        maxWidth: 850,
        height: cardHeight
    },
    bottomContainer: {
        padding: theme.spacing.xs,
        backgroundColor: theme.colors.background.light,
        borderRadius: theme.borderRadius.md,
        alignItems: 'center',
        width: "100%",
        flex: 1
    },
    topContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: theme.spacing.xs,
        backgroundColor: theme.colors.background.light,
        borderRadius: theme.borderRadius.md,
        alignItems: 'center',
        width: "100%",
        margin: theme.spacing.sm
    },
    subContainer: {
        padding: theme.spacing.sm,
        paddingBottom: 0, 
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignContent:"space-between",
        justifyContent:"space-between",
        alignItems:"center"
    },
    title: {
        textAlign: "left",
        width: "100%",
        fontSize: theme.fontSizes.xl,
        fontWeight: theme.fontWeights.bold,
        color: theme.colors.text.light,
    },
    subTitle: {
        textAlign: "right",
        width: "100%",
        alignSelf: "flex-end"
    }
});

export default PartDisplay;
