import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Header } from '../components/Header';
import { globalStyles } from '../styles/globalStyles';
import { getHistoricByParkingId } from '../services/ParkingService';
import { Historic } from '../types/parking';

export default function Statistics() {
  const [historic, setHistoric] = useState<Historic | null>(null);

  useEffect(() => {
    const fetchHistoric = async () => {
      if (selectedParking) {
        try {
          const data = await getHistoricByParkingId(selectedParking.parking_id);
          setHistoric(data);
        } catch (error) {
          console.error('Error fetching historic data:', error);
        }
      }
    };

    fetchHistoric();
  }, [selectedParking]);

  if (!selectedParking || !historic) {
    return (
      <ScrollView style={globalStyles.container}>
        <Header title="Estadísticas de Ocupación" />
        <View style={styles.content}>
          <Text style={globalStyles.text}>Por favor, seleccione un parking o espere mientras se cargan los datos.</Text>
        </View>
      </ScrollView>
    );
  }

  const chartData = {
    labels: historic.History.map(entry => entry.hour),
    datasets: [{
      data: historic.History.map(entry => entry.occupied_spot)
    }]
  };

  const peakHour = historic.History.reduce((max, entry) => 
    entry.occupied_spot > max.occupied_spot ? entry : max
  );
  const lowHour = historic.History.reduce((min, entry) => 
    entry.occupied_spot < min.occupied_spot ? entry : min
  );

  return (
    <ScrollView style={globalStyles.container}>
      <Header title={`Estadísticas - ${selectedParking.name}`} />
      <View style={styles.content}>
        <LineChart
          data={chartData}
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
          <Text style={globalStyles.text}>
            Hora pico: {peakHour.hour} ({peakHour.occupied_spot} plazas ocupadas)
          </Text>
          <Text style={globalStyles.text}>
            Hora valle: {lowHour.hour} ({lowHour.occupied_spot} plazas ocupadas)
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
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
});

