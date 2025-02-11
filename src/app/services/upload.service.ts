import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UploadsType } from '../types/uploads.types';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private apiUrl = 'http://localhost:8090/upload';

  constructor(private httpClient: HttpClient) {}

  upload(file: File): Observable<UploadsType> {
    if (!file) {
      throw new Error('File is undefined or null');
    }

    const token = localStorage.getItem('authToken');
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.httpClient.post<UploadsType>(this.apiUrl, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
