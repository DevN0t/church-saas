import { Injectable } from '@angular/core';
import {MissionsType} from '../types/missions.type';
import {HttpClient} from '@angular/common/http';
import {PastorType} from '../types/pastor.type';
import {MessageType} from '../types/message.type';
import {MissionsServiceType} from '../types/missions-service.type';

@Injectable({
  providedIn: 'root'
})
export class PastorsService {

  apiUrl = 'http://localhost:8090';
  constructor(private httpClient: HttpClient) { }

  getPastorsList() {
      return this.httpClient.get<PastorType[]>(this.apiUrl + '/pastors/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
  }

  deletePastors(id: string) {
    return this.httpClient.delete<MessageType>(this.apiUrl + '/pastor/?id=' + id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    });
  }

  createNewPastorService(pastor: PastorType) {
    return this.httpClient.post<MessageType>(this.apiUrl + '/pastor/', pastor, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    });
  }

  updatePastorService(id: string, pastor: PastorType) {
    return this.httpClient.put<MessageType>(this.apiUrl + '/pastor/?id=' + id, pastor, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    });  }

  getPastorById(id: string) {
    return this.httpClient.get<PastorType>(this.apiUrl + '/pastor/?id=' + id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }});
  }
}
