import { Tables } from './database-definitions';
import { Ticket } from './event';

export interface Day {
  id: Tables<'day'>['id'];
  name: Tables<'day'>['name'];
  date: Tables<'day'>['day'];
}

export interface TimetableStage {
  start_time: Tables<'timetable'>['start_time'];
  end_time: Tables<'timetable'>['end_time'];
  name: Tables<'artist'>['name'];
  artist_id: Tables<'artist'>['id'];
}

export interface TimetableDay {
  day: Day;
  timetable: TimetableStage[];
}

export interface StageGeojsonProperties {
  id: Tables<'stage'>['id'];
  description: Tables<'stage'>['description'];
  name: Tables<'stage'>['name'];
  icon: Tables<'icon'>['name'];
  tickets: Ticket[];
  timetables: TimetableDay[];
  imgUrl?: string;
  tags?: Tables<'stage'>['tags'];
  url?: Tables<'stage'>['url'];
}
