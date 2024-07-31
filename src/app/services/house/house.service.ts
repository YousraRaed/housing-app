import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HouseModel, HouseResponse } from '../../models/house.model';

@Injectable({
  providedIn: 'root',
})
export class HouseService {
  private apiUrl = `${environment.apiUrl}/houses`;
  private houseModelsUrl = `${environment.apiUrl}/house_models`;

  constructor(private http: HttpClient) {}
  getHouses(): Observable<HouseResponse> {
    return this.http.get<HouseResponse>(this.apiUrl);
  }

  getHouseModels(): Observable<HouseResponse> {
    return this.http.get<HouseResponse>(this.houseModelsUrl);
  }

  addHouse(house: Partial<HouseModel>): Observable<{ data: HouseModel }> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/vnd.api+json',
      authentication: localStorage.getItem('authToken') || '',
    });

    return this.http.post<{ data: HouseModel }>(
      this.apiUrl,
      { data: house },
      { headers }
    );
  }

  updateHouse(house: Partial<HouseModel>): Observable<{ data: HouseModel }> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/vnd.api+json',
      authentication: localStorage.getItem('authToken') || '',
    });

    return this.http.patch<{ data: HouseModel }>(
      `${this.apiUrl}/${house.id}`,
      { data: house },
      { headers }
    );
  }
}
