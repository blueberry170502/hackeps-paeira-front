export interface Parking {
    parking_id: number;
    max_spots: number;
    occupied_spots: number;
    coordinates: string;
    name: string;
  }
  
  export interface HistoryEntry {
    hour: string;
    occupied_spot: number;
  }
  
  export interface Historic {
    parking_id: number;
    History: HistoryEntry[];
  }
  
  export interface ParkingList {
    parking_id: number;
    name: string;
  }