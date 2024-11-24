import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ParkingList } from '../types/parking';
import { globalStyles } from '../styles/globalStyles';

interface ParkingSelectorProps {
  parkings: ParkingList[];
  selectedParkingId: number | null;
  onSelectParking: (parkingId: number) => void;
}

export const ParkingSelector: React.FC<ParkingSelectorProps> = ({
  parkings,
  selectedParkingId,
  onSelectParking,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedParking = parkings.find(p => p.parking_id === selectedParkingId);

  if (parkings.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={globalStyles.text}>No hay parkings disponibles</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={globalStyles.text}>
          {selectedParking ? selectedParking.name : 'Seleccionar parking'}
        </Text>
      </TouchableOpacity>
      {isOpen && (
        <ScrollView style={styles.dropdown}>
          {parkings.map((parking) => (
            <TouchableOpacity
              key={parking.parking_id}
              style={styles.option}
              onPress={() => {
                onSelectParking(parking.parking_id);
                setIsOpen(false);
              }}
            >
              <Text style={globalStyles.text}>{parking.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    zIndex: 1,
  },
  selector: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  dropdown: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    maxHeight: 200,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

