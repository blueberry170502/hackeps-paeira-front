import React from 'react';
import { View } from 'react-native';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { ParkingDataProvider } from '@/contexts/ParkingDataContext';
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  return (
    <ParkingDataProvider>
      <View style={{ flex: 1 }}>
        <Slot />
      </View>
    </ParkingDataProvider>
    
  );
}

