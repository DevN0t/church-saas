import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LayoutType} from '../types/layout.type';
import {MessageType} from '../types/message.type';
import {MissionsType} from '../types/missions.type';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  apiUrl = 'http://localhost:8090';

  constructor(private httpClient: HttpClient) { }

  getMission() {
    return this.httpClient.get<MissionsType>(this.apiUrl + '/mission/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    });
  }

  getMissionList() {
    return this.httpClient.get<MissionsType[]>(this.apiUrl + '/missions/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    });
  }

  updateMission(layout: MissionsType) {
    return this.httpClient.put<MissionsType>(this.apiUrl + '/mission/', layout, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    });
  }

  getMissionPublic() {
    const alias = localStorage.getItem('alias')
    return this.httpClient.get<MissionsType>(this.apiUrl + '/public/mission/?alias=' + alias);
  }
}
