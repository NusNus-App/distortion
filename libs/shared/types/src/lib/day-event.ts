// import { Day, Event, EventType } from './database-entities';

import { Tables } from "supabaseOne";

export interface PartialEventType {
  id: EventType['id'];
  name: EventType['name'];
  color: EventType['color'];
  nw: Tables<''>
}

export interface PartialEvent {
  id: Event['id'];
  name: Event['name'];
  bounds: Event['bounds'];
  event_type: PartialEventType;
}

export interface DayEvent {
  id: string;
  day: string;
  name: string;
  event: PartialEvent[];
}
