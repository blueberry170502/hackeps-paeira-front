import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useParkingData } from '../contexts/ParkingDataContext';
import { Header } from '../components/Header';
import { ParkingSelector } from '../components/ParkingSelector';
import { globalStyles } from '../styles/globalStyles';
import { getParkingById } from '@/services/ParkingService';
import { useInterval } from '@/hooks/useInterval';

export default function Dashboard() {
  const { parkings, selectedParking, setSelectedParking, isLoading, fetchParkings } = useParkingData();

  const handleSelectParking = async (parkingId: number) => {
    try {
      const parking = await getParkingById(parkingId);
      setSelectedParking(parking);
    } catch (error) {
      console.error('Error fetching parking details:', error);
    }
  };

  const availableSpaces = selectedParking
    ? selectedParking.max_spots - selectedParking.occupied_spots
    : 0;

  if (isLoading){
    return (
      <View>
        <Text>Loading</Text>
      </View>
    )
  }

  useInterval(fetchParkings, 2000);

  return (
    <ScrollView style={globalStyles.container}>
      <Header title="ParkSmart" showBackButton={false} />
      <View style={styles.content}>
        <Text style={[globalStyles.text, styles.subtitle]}>Tu asistente de estacionamiento inteligente</Text>
        <ParkingSelector
          parkings={parkings}
          selectedParkingId={selectedParking?.parking_id || null}
          onSelectParking={handleSelectParking}
        />
        {selectedParking && (
          <View style={styles.infoContainer}>
            <Text style={[globalStyles.text, styles.parkingName]}>{selectedParking.name}</Text>
            <Text style={[globalStyles.text, styles.availableText]}>Plazas disponibles:</Text>
            <Text style={[globalStyles.title, styles.availableNumber]}>{availableSpaces}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 30,
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginBottom: 30,
    elevation: 3,
  },
  parkingName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  availableText: {
    marginBottom: 10,
  },
  availableNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

