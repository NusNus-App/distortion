import { Injectable } from '@angular/core';
import { Map } from 'maplibre-gl';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map: Map;

  constructor() { }

  initMap(): void {
    this.map = new Map({
      container: 'map-container',
      style: environment.maptilerStyleJson,
      center: [12.547927, 55.667071],
      zoom: 15,
      attributionControl: false,
      hash: true
    });

    this.map.on('load', () => {
      this.map.resize();

      this.addIcon([12.547927, 55.667071]);
    });
  }

  addIcon(coords: [number, number]): void {
    this.map.loadImage('assets/map-icons/stage.png', (error, img) => {
      if (error) {
        throw error;
      };

      this.map.addImage('stage', img);

      this.map.addSource('stage', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {name: 'ComaClub'},
              geometry: {
                type: 'Point',
                coordinates: coords
              }
            }
          ]
        }
      });

      this.map.addLayer({
        id: 'stage',
        type: 'symbol',
        source: 'stage',
        minzoom: 13,
        layout: {
          'icon-image': 'stage',
          'icon-size': [
            'interpolate', ['linear'], ['zoom'],
            13, 0.02,
            22, 1.5
          ]
        }
      });

    });
  }
}
