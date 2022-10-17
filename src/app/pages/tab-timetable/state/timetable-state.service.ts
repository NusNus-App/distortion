import { Injectable } from '@angular/core';
import { DayEventStageTimetable, EventTimetable, TimetableWithStageName } from '@app/interfaces/day-event-stage-timetable';
import { FavoritesService } from '@app/services/favorites.service';
import { StoreService } from '@app/store/store.service';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { distinctUntilChanged, filter, map, pluck, shareReplay } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class TimetableStateService {

  private _selectedDayId$ = new BehaviorSubject<string>(null);
  selectedDayId$: Observable<string> = this._selectedDayId$.asObservable();

  private _selectedEventId$ = new BehaviorSubject<string>(null);
  selectedEventId$: Observable<string> = this._selectedEventId$.asObservable();

  days$: Observable<DayEventStageTimetable[]> = this.store.timetables$.pipe(
    filter(days => !!days),
    shareReplay()
  );

  events$: Observable<EventTimetable[]> = combineLatest([
    this.days$,
    this.selectedDayId$,
  ]).pipe(
    filter(([days, selectedDayId]) => !!days && !!selectedDayId),
    map(([days, selectedDayId]) => days.find(day => day.id === selectedDayId)),
    pluck('events'),
    distinctUntilChanged(),
    shareReplay()
  );

  selectedEvent$: Observable<EventTimetable> = combineLatest([
    this.events$,
    this.selectedEventId$,
    this.favoritesService.favorites$
  ]).pipe(
    filter(([events, selectedEventId, ]) => !!events && !!selectedEventId),
    map(([events, selectedEventId, ]) => events.find(event => event.event_id === selectedEventId)),
    filter(event => !!event),
    map(event => {
      // Add favorites
      const stages = event.stages.map(stage => ({
        ...stage,
        timetable: stage.timetable.map(timetable => ({
          ...timetable,
          isFavorite: this.favoritesService.isFavorite('artists', timetable.artist_id)
        }))
      }));

      return {
        ...event,
        stages
      }
    }),
    distinctUntilChanged(),
    shareReplay()
  )

  eventTimetableByTime$: Observable<TimetableWithStageName[]> = this.selectedEvent$.pipe(
    filter(event => !!event),
    map(event => event.stages
      .flatMap(stage => stage.timetable
        .flatMap(timetable => ({ stageName: stage.stage_name, ...timetable }))
      )
      .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime())
    )
  );

  constructor(
    private store: StoreService,
    private favoritesService: FavoritesService
  ) { }

  selectDayId(dayId: string): void {
    this._selectedDayId$.next(dayId);
  }

  selectEventId(eventId: string): void {
    this._selectedEventId$.next(eventId);
  }
}
