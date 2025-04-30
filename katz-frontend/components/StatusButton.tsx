import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

interface Meter {
    label: string;
    level: number;
    behavior: string;
}

interface Props {
    meters: Meter[];
    onFeed: (label: string) => void;
    color?: string;
}

const FeedButton = ({ meters, onFeed, color }: Props) => {
    return (
        <View style={styles.container}>
            {meters.map((meter) => {
                const isFull = meter.level >= 10;
                const isActionable = meter.behavior === 'decrease';

                return (
                    <View key={meter.label} style={styles.block}>
                        <Button
                            title={isFull ? `${meter.label}` : `${meter.label}`}
                            onPress={() => onFeed(meter.label)}
                            disabled={!isActionable || isFull}
                        />
                    </View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        justifyContent: 'center'
    },
    block: {
        width: 120,
        height: 40,
        margin: 2.5,
        borderRadius: 4,
        borderColor: '#333',
        backgroundColor: "#073ce1"
    }
});

export default FeedButton;