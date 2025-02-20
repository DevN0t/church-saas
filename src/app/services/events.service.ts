import { Injectable } from '@angular/core';
import {EventsType} from '../types/events.type';
import {HttpClient} from '@angular/common/http';
import {MessageType} from '../types/message.type';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  apiUrl = 'http://localhost:8090';
  constructor(private httpClient: HttpClient) { }

  getEventsList() {
    return this.httpClient.get<EventsType[]>(this.apiUrl + '/events/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    });
  }

  deleteEvents(id: string) {
    return this.httpClient.delete<MessageType>(this.apiUrl + '/event/?id=' + id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    });
  }

  createNewEventService(event: EventsType) {
    return this.httpClient.post<MessageType>(this.apiUrl + '/event/', event, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    });
  }

  updateEventService(id: string, event: EventsType) {
    return this.httpClient.put<MessageType>(this.apiUrl + '/event/?id=' + id, event, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    });  }

  getEventById(id: string) {
    return this.httpClient.get<EventsType>(this.apiUrl + '/event/?id=' + id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }});
  }}
