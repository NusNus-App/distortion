export interface Environment {
  production: boolean;
  festivalName: string;
  supabaseUrl: string;
  supabaseAnonKey: string;
  maptilerStyleJson: string;
  oneSignalAppId: string;
  mapView: {
    center: [number, number];
    zoom: number;
    pitch: number;
  };
}

export const environment: Environment = {
  production: true,
  festivalName: 'Distortion Festival',
  supabaseUrl: 'https://kutgkjqbdasprmpugfyi.supabase.co',
  supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1dGdranFiZGFzcHJtcHVnZnlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTU2MjExNDQsImV4cCI6MTk3MTE5NzE0NH0.d_DBRZQaIrQDgRhTC8LB35YHy279FVn4vs1L4uTp11k',
  maptilerStyleJson: 'https://api.maptiler.com/maps/decadbf9-1a07-4b7b-9726-fed2f003b673/style.json?key=MZCjtFvEvhy0zEdhtmhp',
  mapView: {
    center: [12.547927, 55.667071],
    zoom: 14,
    pitch: 0
  },
  oneSignalAppId: '0ac7afcb-7e95-4642-8d66-f149d173cc5b'
};
