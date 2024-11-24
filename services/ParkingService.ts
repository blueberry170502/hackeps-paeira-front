import { Parking, Historic, ParkingList } from '../types/parking';
import { fetchData } from '../api/api';

export const getParkingById = async (parkingId: number): Promise<Parking> => {
  return fetchData<Parking>(`/parking/${parkingId}`);
};

export const getHistoricByParkingId = async (parkingId: number): Promise<Historic> => {
  return fetchData<Historic>(`/historic/${parkingId}`);
};

export const getParkingList = async (): Promise<ParkingList[]> => {
    return fetchData<ParkingList[]>(`/list_parkings`);
  };