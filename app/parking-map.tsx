import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Header } from '../components/Header';
import { globalStyles } from '../styles/globalStyles';
import { Parking } from '../types/parking';

const SPACE_SIZE = 50;
const SPACE_MARGIN = 5;

interface ParkingMapProps {
  selectedParking: Parking | null;
}

export default function ParkingMap({ selectedParking }: ParkingMapProps) {
  if (!selectedParking) {
    return (
      <ScrollView style={globalStyles.container}>
        <Header title="Mapa del Parking" />
        <View style={styles.content}>
          <Text style={globalStyles.text}>Por favor, seleccione un parking.</Text>
        </View>
      </ScrollView>
    );
  }

  const coordinates = JSON.parse(selectedParking.coordinates);

  const { maxX, maxY, gridWidth, gridHeight } = useMemo(() => {
    const maxX = Math.max(...coordinates.map((coord: number[]) => coord[0]));
    const maxY = Math.max(...coordinates.map((coord: number[]) => coord[1]));
    const gridWidth = (maxX * (SPACE_SIZE + SPACE_MARGIN)) - SPACE_MARGIN;
    const gridHeight = (maxY * (SPACE_SIZE + SPACE_MARGIN)) - SPACE_MARGIN;
    return { maxX, maxY, gridWidth, gridHeight };
  }, [coordinates]);

  const screenWidth = Dimensions.get('window').width;
  const mapWidth = Math.min(gridWidth, screenWidth - 40); // 40 es el padding total

  return (
    <ScrollView style={globalStyles.container}>
      <Header title={`Mapa - ${selectedParking.name}`} />
      <View style={styles.content}>
        <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>
          <View style={[styles.mapContainer, { width: gridWidth, height: gridHeight }]}>
            {coordinates.map((coord: number[], index: number) => (
              <View
                key={index}
                style={[
                  styles.parkingSpace,
                  {
                    left: (coord[0] - 1) * (SPACE_SIZE + SPACE_MARGIN),
                    top: (coord[1] - 1) * (SPACE_SIZE + SPACE_MARGIN),
                    backgroundColor: index < selectedParking.occupied_spots ? '#FF5252' : '#4CAF50',
                  },
                ]}
              >
                <Text style={[globalStyles.text, styles.spaceText]}>{index + 1}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
        <Text style={[globalStyles.text, styles.legend]}>
          Verde: Disponible | Rojo: Ocupado
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    alignItems: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    position: 'relative',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  parkingSpace: {
    position: 'absolute',
    width: SPACE_SIZE,
    height: SPACE_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  spaceText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  legend: {
    marginTop: 10,
    textAlign: 'center',
  },
});

