import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProfileType} from '../types/profile.type';
import {MessageType} from '../types/message.type';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private httpClient: HttpClient
  ) { }

  private apiUrl = 'http://localhost:8090';

  getProfile() {
    return this.httpClient.get<ProfileType>(this.apiUrl + "/profile/",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
  }

  updateProfile(profile: ProfileType) {

    return this.httpClient.put<MessageType>(this.apiUrl + '/profile/', profile, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    });
  }
}
