import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { OccupancyRecord } from '../types/parking';

interface StatisticsProps {
  occupancyHistory: OccupancyRecord[];
}

const Statistics: React.FC<StatisticsProps> = ({ occupancyHistory }) => {
  const data = {
    labels: occupancyHistory.map(record => {
      const date = new Date(record.timestamp);
      return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    }),
    datasets: [{
      data: occupancyHistory.map(record => record.occupiedSpaces)
    }]
  };

  const peakHour = occupancyHistory.reduce((max, record) => 
    record.occupiedSpaces > max.occupiedSpaces ? record : max
  );
  const lowHour = occupancyHistory.reduce((min, record) => 
    record.occupiedSpaces < min.occupiedSpaces ? record : min
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estadísticas de Ocupación</Text>
      <LineChart
        data={data}
        width={Dimensions.get('window').width - 40}
        height={220}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#2196F3"
          }
        }}
        bezier
        style={styles.chart}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Hora pico: {new Date(peakHour.timestamp).toLocaleTimeString()} ({peakHour.occupiedSpaces} plazas)
        </Text>
        <Text style={styles.infoText}>
          Hora valle: {new Date(lowHour.timestamp).toLocaleTimeString()} ({lowHour.occupiedSpaces} plazas)
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
});

export default Statistics;

