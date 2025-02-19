import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LayoutType} from '../types/layout.type';
import {MessageType} from '../types/message.type';
import {MissionsType} from '../types/missions.type';
import {MissionsServiceType} from '../types/missions-service.type';

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
    return this.httpClient.get<MissionsType[]>(this.apiUrl + '/missionServices/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    });
  }


  updateMission(mission: MissionsType) {
    return this.httpClient.put<MissionsType>(this.apiUrl + '/mission/', mission, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    });
  }

  getMissionListPublic() {
    const alias = localStorage.getItem('alias')
    return this.httpClient.get<MissionsServiceType[]>(this.apiUrl + '/public/missionServices/?alias=' + alias, {
    });
  }

  getMissionPublic() {
    const alias = localStorage.getItem('alias')
    return this.httpClient.get<MissionsType>(this.apiUrl + '/public/mission/?alias=' + alias);
  }

  createNewMissionService(mission: MissionsServiceType) {
    return this.httpClient.post<MessageType>(this.apiUrl + '/missionService/', mission, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    });
  }

  getMissionById(id: string) {
    return this.httpClient.get<MissionsServiceType>(this.apiUrl + '/missionService/?id=' + id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    });
  }

  updateMissionService(id: string, mission: MissionsServiceType) {
    return this.httpClient.put<MessageType>(this.apiUrl + '/missionService/?id=' + id, mission, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    });
  }

  deleteMissionService(id: string) {
    return this.httpClient.delete<MessageType>(this.apiUrl + '/missionService/?id=' + id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    });
  }
}
