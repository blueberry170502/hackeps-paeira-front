import React, { createContext, useState, useEffect, useContext } from 'react';
import { Parking, ParkingList } from '../types/parking';
import { getParkingById, getParkingList } from '@/services/ParkingService';
import { useInterval } from '../hooks/useInterval';
import parkingList from '../data/parkingList.json'
import parking from '../data/parking.json'

interface ParkingDataContextType {
  parkings: ParkingList[];
  selectedParking: Parking | null;
  setSelectedParking: (parking: Parking | null) => void;
  isLoading: boolean;
  fetchParkings: () => void;
}

const ParkingDataContext = createContext<ParkingDataContextType | undefined>(undefined);

export const ParkingDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [parkings, setParkings] = useState<ParkingList[]>(parkingList);
  const [selectedParking, setSelectedParking] = useState<Parking | null>(parking);
  const [isLoading, setIsLoading] = useState(true);

  const fetchParkings = async () => {
    setIsLoading(true);
    try {
      const parkingList = await getParkingList();
      setParkings(parkingList);
      if (parkingList.length > 0) {
        const firstParking = await getParkingById(parkingList[0].parking_id);
        setSelectedParking(firstParking);
      }
    } catch (error) {
      console.error('Error fetching parking data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchParkings(); // Fetch initial data
  }, []);

  return (
    <ParkingDataContext.Provider
      value={{
        parkings,
        selectedParking,
        setSelectedParking,
        isLoading,
        fetchParkings
      }}
    >
      {children}
    </ParkingDataContext.Provider>
  );
};

export const useParkingData = () => {
  const context = useContext(ParkingDataContext);
  if (context === undefined) {
    throw new Error('useParkingData must be used within a ParkingDataProvider');
  }
  return context;
};
