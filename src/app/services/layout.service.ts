import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LayoutType} from '../types/layout.type';
import {MessageType} from '../types/message.type';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  apiUrl = 'http://localhost:8090';

  constructor(private httpClient: HttpClient) { }

  getLayout() {
    return this.httpClient.get<LayoutType>(this.apiUrl + '/layout/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    });
  }

  updateLayout(layout: LayoutType) {
    return this.httpClient.put<MessageType>(this.apiUrl + '/layout/', layout, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    });
  }

  getLayoutPublic() {
    const alias = localStorage.getItem('alias')
    return this.httpClient.get<LayoutType>(this.apiUrl + '/public/layout/?alias=' + alias);
  }
}
