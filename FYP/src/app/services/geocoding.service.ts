import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

  export interface GeocodeResponse {
    results: [{
      formatted_address: string;
    }];
    status: string;
  }
  

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  private apiKey = 'AIzaSyBamKmkAXbhYFW-cCxtAezM5xAON_-uv-0'; // Replace with your API key

  constructor(private http: HttpClient) {}

  getAdressByCoordinates(lat: number, lng: number): Observable<GeocodeResponse> {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${this.apiKey}`;
    return this.http.get<GeocodeResponse>(url); // Note the use of <GeocodeResponse> here
  }
}
