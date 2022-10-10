export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      event: {
        Row: {
          name: string;
          description: string | null;
          geom: unknown | null;
          style: Json | null;
          id: string;
          inserted_at: string;
          public: boolean | null;
          bounds: number[] | null;
        };
        Insert: {
          name: string;
          description?: string | null;
          geom?: unknown | null;
          style?: Json | null;
          id?: string;
          inserted_at?: string;
          public?: boolean | null;
          bounds?: number[] | null;
        };
        Update: {
          name?: string;
          description?: string | null;
          geom?: unknown | null;
          style?: Json | null;
          id?: string;
          inserted_at?: string;
          public?: boolean | null;
          bounds?: number[] | null;
        };
      };
      day: {
        Row: {
          day: string;
          name: string | null;
          description: string | null;
          id: string;
          inserted_at: string;
          public: boolean | null;
        };
        Insert: {
          day: string;
          name?: string | null;
          description?: string | null;
          id?: string;
          inserted_at?: string;
          public?: boolean | null;
        };
        Update: {
          day?: string;
          name?: string | null;
          description?: string | null;
          id?: string;
          inserted_at?: string;
          public?: boolean | null;
        };
      };
      day_event: {
        Row: {
          day_id: string;
          event_id: string;
          id: string;
          inserted_at: string;
        };
        Insert: {
          day_id: string;
          event_id: string;
          id?: string;
          inserted_at?: string;
        };
        Update: {
          day_id?: string;
          event_id?: string;
          id?: string;
          inserted_at?: string;
        };
      };
      icon: {
        Row: {
          name: string;
          storage_path: string | null;
          id: string;
          inserted_at: string;
          public: boolean | null;
        };
        Insert: {
          name: string;
          storage_path?: string | null;
          id?: string;
          inserted_at?: string;
          public?: boolean | null;
        };
        Update: {
          name?: string;
          storage_path?: string | null;
          id?: string;
          inserted_at?: string;
          public?: boolean | null;
        };
      };
      stage: {
        Row: {
          name: string;
          description: string | null;
          icon_id: string | null;
          geom: unknown | null;
          event_id: string;
          id: string;
          inserted_at: string;
          public: boolean | null;
          ts: unknown | null;
        };
        Insert: {
          name: string;
          description?: string | null;
          icon_id?: string | null;
          geom?: unknown | null;
          event_id: string;
          id?: string;
          inserted_at?: string;
          public?: boolean | null;
          ts?: unknown | null;
        };
        Update: {
          name?: string;
          description?: string | null;
          icon_id?: string | null;
          geom?: unknown | null;
          event_id?: string;
          id?: string;
          inserted_at?: string;
          public?: boolean | null;
          ts?: unknown | null;
        };
      };
      artist: {
        Row: {
          name: string;
          description: string | null;
          storage_path: string | null;
          bandcamp: string | null;
          spotify: string | null;
          tidal: string | null;
          apple_music: string | null;
          soundcloud: string | null;
          youtube: string | null;
          instagram: string | null;
          facebook: string | null;
          webpage: string | null;
          bandcamp_iframe: string | null;
          id: string;
          inserted_at: string;
          public: boolean | null;
          ts: unknown | null;
        };
        Insert: {
          name: string;
          description?: string | null;
          storage_path?: string | null;
          bandcamp?: string | null;
          spotify?: string | null;
          tidal?: string | null;
          apple_music?: string | null;
          soundcloud?: string | null;
          youtube?: string | null;
          instagram?: string | null;
          facebook?: string | null;
          webpage?: string | null;
          bandcamp_iframe?: string | null;
          id?: string;
          inserted_at?: string;
          public?: boolean | null;
          ts?: unknown | null;
        };
        Update: {
          name?: string;
          description?: string | null;
          storage_path?: string | null;
          bandcamp?: string | null;
          spotify?: string | null;
          tidal?: string | null;
          apple_music?: string | null;
          soundcloud?: string | null;
          youtube?: string | null;
          instagram?: string | null;
          facebook?: string | null;
          webpage?: string | null;
          bandcamp_iframe?: string | null;
          id?: string;
          inserted_at?: string;
          public?: boolean | null;
          ts?: unknown | null;
        };
      };
      timetable: {
        Row: {
          day_id: string;
          start_time: string;
          end_time: string;
          artist_id: string;
          stage_id: string;
          id: string;
          inserted_at: string;
          public: boolean | null;
        };
        Insert: {
          day_id: string;
          start_time: string;
          end_time: string;
          artist_id: string;
          stage_id: string;
          id?: string;
          inserted_at?: string;
          public?: boolean | null;
        };
        Update: {
          day_id?: string;
          start_time?: string;
          end_time?: string;
          artist_id?: string;
          stage_id?: string;
          id?: string;
          inserted_at?: string;
          public?: boolean | null;
        };
      };
      asset_type: {
        Row: {
          name: string;
          description: string | null;
          id: string;
          inserted_at: string;
          public: boolean | null;
        };
        Insert: {
          name: string;
          description?: string | null;
          id?: string;
          inserted_at?: string;
          public?: boolean | null;
        };
        Update: {
          name?: string;
          description?: string | null;
          id?: string;
          inserted_at?: string;
          public?: boolean | null;
        };
      };
      asset: {
        Row: {
          description: string | null;
          geom: unknown | null;
          asset_type_id: string;
          icon_id: string | null;
          event_id: string;
          id: string;
          inserted_at: string;
          public: boolean | null;
        };
        Insert: {
          description?: string | null;
          geom?: unknown | null;
          asset_type_id: string;
          icon_id?: string | null;
          event_id: string;
          id?: string;
          inserted_at?: string;
          public?: boolean | null;
        };
        Update: {
          description?: string | null;
          geom?: unknown | null;
          asset_type_id?: string;
          icon_id?: string | null;
          event_id?: string;
          id?: string;
          inserted_at?: string;
          public?: boolean | null;
        };
      };
    };
    Views: {
      asset_geojson: {
        Row: {
          id: string | null;
          name: string | null;
          description: string | null;
          icon: string | null;
          geom: unknown | null;
        };
      };
      stage_geojson: {
        Row: {
          id: string | null;
          name: string | null;
          icon: string | null;
          timetables: Json | null;
          geom: unknown | null;
        };
      };
      entity_text_search: {
        Row: {
          entity: string | null;
          id: string | null;
          name: string | null;
          description: string | null;
          ts: unknown | null;
        };
      };
      entity_distance_search: {
        Row: {
          entity: string | null;
          id: string | null;
          name: string | null;
          geom: unknown | null;
        };
      };
      day_event_mask: {
        Row: {
          id: string | null;
          geom: unknown | null;
          bounds: number[] | null;
        };
      };
      day_event_stage_timetable: {
        Row: {
          id: string | null;
          name: string | null;
          first_start_time: string | null;
          last_end_time: string | null;
          events: Json | null;
        };
      };
    };
    Functions: {
      table_as_geojson: {
        Args: { _tbl: unknown; OUT: unknown };
        Returns: Json;
      };
      distance_to: {
        Args: { lng: number; lat: number; search_radius: number };
        Returns: Record<string, unknown>[];
      };
      text_search: {
        Args: { search_term: string };
        Returns: Record<string, unknown>[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

