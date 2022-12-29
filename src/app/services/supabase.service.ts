import { Injectable } from '@angular/core';
import { isPlatform, Platform } from '@ionic/angular';
import { BehaviorSubject, EMPTY, from, Observable, throwError } from 'rxjs';
import { catchError, map, pluck } from 'rxjs/operators';
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  OAuthResponse,
  Provider,
  Session,
  SupabaseClient,
  User
} from '@supabase/supabase-js';
import { FeatureCollection, LineString, Point, Polygon } from 'geojson';

import { environment } from '@env/environment';
import { Database } from '@app/interfaces/database-definitions';
import { Artist, Asset, Favorite, FavoriteEntity, MapIcon, Profile } from '@app/interfaces/database-entities';
import { ArtistViewModel } from '@app/interfaces/artist';
import { DayEvent } from '@app/interfaces/day-event';
import { MapSource } from '@app/interfaces/map-layer';
import { DayEventStageTimetable } from '@app/interfaces/day-event-stage-timetable';
import { EntityDistanceSearchResult, EntityFreeTextSearchResult } from '@app/interfaces/entity-search-result';
import { EventWithRelations } from '@app/interfaces/event';
import { DeviceStorageService } from './device-storage.service';
import { TransformOptions } from '@app/shared/models/imageSize'

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  private _session$ = new BehaviorSubject<AuthSession | null>(null);
  session$: Observable<AuthSession | null> = this._session$.asObservable();

  constructor(
    private deviceStorage: DeviceStorageService,
    private platform: Platform
  ) {
    this.supabase = createClient<Database>(
      environment.supabaseUrl,
      environment.supabaseAnonKey,
      {
        // auth: {
        //   storage: this.deviceStorage,
        //   autoRefreshToken: true,
        //   persistSession: true,
        //   detectSessionInUrl: !this.platform.is('capacitor')
        // }
      }

    );
  }

  authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  externalSetSession(access_token: string, refresh_token: string) {
    return this.supabase.auth.setSession({ access_token, refresh_token })
  }


  setSession(session: Session): void {
    this._session$.next(session);
  }

  signIn(email: string) {
    return from(
      this.supabase.auth.signInWithOtp({ email })
    ).pipe(
      map(({ data, error }) => error ? throwError(error) : data),
      catchError(err => EMPTY)
    );
  }

  signInWithProvider(provider: Provider, redirectTo: string = '/'): Observable<OAuthResponse['data']> {
    return from(
      this.supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: isPlatform('capacitor') ? 'distortion://login' : `${window.location.origin}${redirectTo}`
        }
      })
    ).pipe(
      map(({ data, }) => data)
    )
  }

  signOut() {
    return this.supabase.auth.signOut();
  }

  async signUp(credentials: { email: string, password: string }) {
    return new Promise(async (resolve, reject) => {

      const { error, data } = await this.supabase.auth.signUp(credentials);

      if (error) {
        reject(error);
      } else {
        this._session$.next(data.session);
        resolve(data.session);
      }

    });

  }

  profile$(userId: User['id']): Observable<Pick<Profile, 'username' | 'avatar_url'>> {
    return from(
      this.supabase
        .from('profile')
        .select(`username, avatar_url`)
        .eq('id', userId)
        .single()
    ).pipe(
      pluck('data')
    );
  }

  get artists$(): Observable<ArtistViewModel[]> {
    return from(
      this.supabase
        .from('artist')
        .select(`
          id,
          name,
          description,
          bandcamp,
          spotify,
          tidal,
          apple_music,
          soundcloud,
          youtube,
          instagram,
          facebook,
          webpage,
          bandcamp_iframe,
          storage_path,
          timetable(
            start_time,
            end_time,
            day(
              name,
              day
            ),
            stage(
              name,
              geom
            )
          )
        `)
        .order('name')
    ).pipe(
      // TODO: Trouble with type, hence this cast
      map(({ data, }) => data as ArtistViewModel[])
    );
  }

  get dayMaskBounds$(): Observable<any[]> {
    return from(
      this.supabase
        .from('day_event_mask')
        .select(`
          id,
          bounds
        `)
    ).pipe(
      map(res => res.data)
    );
  }

  get days$(): Observable<DayEvent[]> {
    return from(
      this.supabase
        .from('day')
        .select(`
          id,
          day,
          name,
          day_event(
            event(
              id,
              name,
              bounds
            )
          )
      `)
    ).pipe(
      pluck('data'),
      map(days => {
        return days.map(({ day_event, ...rest }) => {
          return {
            ...rest,
            event: (day_event as any[]).map(events => events.event)
          }
        })
      })
    );
  }

  get events$(): Observable<EventWithRelations[]> {
    return from(
      this.supabase
        .from('event')
        .select(`
          id,
          name,
          description,
          storage_path,
          bounds,
          event_type(
            id,
            name,
            description,
            color
          ),
          day_event(
            day(
              name
            )
          ),
          stage(
            timetable(
              artist(
                name,
                id
              )
            )
          )
        `)
        .order('name')
    ).pipe(
      // TODO: Trouble with type, hence this cast
      map(({ data, }) => data as EventWithRelations[])
    )
  }

  get timetables$(): Observable<DayEventStageTimetable[]> {
    return from(
      this.supabase
        .from('day_event_stage_timetable')
        .select()
    ).pipe(
      pluck('data')
    )
  }

  get assets$(): Observable<Asset[]> {
    return from<any>(
      this.supabase
        .from('asset')
        .select(`
          id,
          name,
          description,
          asset_type(
            name
          )
        `)
    ).pipe(
      pluck('data')
    )
  }

  artist(id: string): Observable<Artist> {
    return from(
      this.supabase
        .from('artist')
        .select()
        .filter('id', 'eq', id)
        .single()
    ).pipe(
      pluck('data')
    );
  }

  searchArtist(searchTerm: string) {
    return from(
      this.supabase
        .from('artist')
        .select()
        .textSearch('ts', searchTerm, {
          config: 'english',
          type: 'plain'
        })
    );
  }

  stageTimeTable(stageId: string) {
    return from(
      this.supabase
        .from('timetable')
        .select(`
          start_time,
          end_time,
          artist(
            id,
            name
          ),
          stage(
            name
          )
        `)
        .filter('stage_id', 'eq', stageId)
        .order('start_time')
    ).pipe(
      pluck('data')
    );
  }

  get favorites$(): Observable<Favorite[]> {
    return from(
      this.supabase
        .from('favorite')
        .select()
    ).pipe(
      pluck('data')
    )
  }

  // Couldn't make supabase client upsert() work on composite primary keys hence this RPC
  upsertFavorites(entity: FavoriteEntity, ids: string[]): Observable<any> {
    return from(
      this.supabase.rpc('upsert_favorite', { 
        _user_id: this._session$.value?.user.id, 
        _entity: entity, 
        _ids: ids 
      })
    ).pipe(
      pluck('data')
    );
  }

  downloadFile(bucket: string, path: string) {
    return from(
      this.supabase
        .storage
        .from(bucket)
        .download(path)
    ).pipe(
      pluck('data')
    );
  }

  listBucketFiles(bucket: string) {
    return from(
      this.supabase
        .storage
        .from(bucket)
        .list()
    )
  }

  publicImageUrl(bucket: string, path: string, imageSize?: TransformOptions): string {
    const { data } = this.supabase
      .storage
      .from(bucket)
      .getPublicUrl(path, {
        transform: imageSize,
      })

    return data.publicUrl
  }

  get mapIcons$(): Observable<MapIcon[]> {
    return from(
      this.supabase
        .from('map_icon')
        .select()
    ).pipe(
      pluck('data')
    )
  }

  //RPC
  tableAsGeojson(table: MapSource): Observable<FeatureCollection<Point | LineString | Polygon>> {
    return from(
      this.supabase.rpc('table_as_geojson', { _tbl: table })
    ).pipe(
      pluck('data', 'geojson')
    );
  }

  distanceTo(coords: [number, number], withinDistance: number): Observable<EntityDistanceSearchResult[]> {
    return from(
      this.supabase.rpc('distance_to', { lng: coords[0], lat: coords[1], search_radius: withinDistance })
    ).pipe(
      pluck('data')
    );
  }

  textSearch(searchTerm: string): Observable<EntityFreeTextSearchResult[]> {
    return from(
      this.supabase
        .rpc('text_search', { 'search_term': searchTerm })
        .or(
          'rank.gt.0,similarity.gt.0.1'
        )
        .limit(10)
    ).pipe(
      pluck('data')
    );
  }

}
