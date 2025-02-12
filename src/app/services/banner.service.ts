import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BannerType} from '../types/banner.type';
import {MessageType} from '../types/message.type';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  private apiUrl = 'http://localhost:8090';


  constructor(private httpClient: HttpClient) {

  }

  getBanner() {
    return this.httpClient.get<BannerType>(this.apiUrl + '/banner/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    });
  }

  getBannerPublic() {

    const alias = localStorage.getItem('alias')
    return this.httpClient.get<BannerType>(this.apiUrl + '/public/banner/?alias=' + alias, {
    });
  }

  updateBanner(banner: BannerType) {
    return this.httpClient.put<MessageType>(this.apiUrl + '/banner/', banner, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    });
  }
}
