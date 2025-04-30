import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Meter {
  label: string;
  level: number;
}

interface Props {
  meters: Meter[];
};

const Feedometer = ({ meters }: Props) => {
  return (
    <View style={styles.container}>
      {meters.map(({ label, level }) => (
        <View key={label} style={styles.statusContainer}>
          <Text>{label}</Text>
          <View style={styles.statusMeter}>
            {[...Array(10)].map((_, i) => {
              let filledStyle = styles.empty;
              if (i < level) {
                if (level <= 3) filledStyle = styles.almostEmptyFilled;
                else if (level <= 5) filledStyle = styles.lowerFilled;
                else if (level <= 7) filledStyle = styles.mediumFilled;
                else filledStyle = styles.filled;
              }
              return (
                <View key={i} style={[styles.block, filledStyle]} />
              );
            })}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',

  },
  title: {
    paddingTop: 20,
    fontSize: 20
  },
  statusContainer: {
    flexDirection: 'column',
    gap: 5,
    marginBottom: 5
  },
  statusMeter:{
    flexDirection: 'row'
  },
  block: {
    width: 10,
    height: 15,
    margin: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#333',
    flexDirection: 'row'
  },
  filled: { backgroundColor: 'green' },
  mediumFilled: { backgroundColor: 'yellow' },
  lowerFilled: { backgroundColor: 'orange' },
  almostEmptyFilled: { backgroundColor: 'red' },
  empty: { backgroundColor: 'transparent' },
});

export default Feedometer;