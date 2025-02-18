import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UploadsType } from '../types/uploads.types';
import {MessageType} from '../types/message.type';
import {FileListType} from '../types/fileList.type';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private apiUrl = 'http://localhost:8090/';

  constructor(private httpClient: HttpClient) {}

  upload(file: File): Observable<UploadsType> {
    if (!file) {
      throw new Error('File is undefined or null');
    }

    const token = localStorage.getItem('authToken');
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.httpClient.post<UploadsType>(this.apiUrl + 'upload', formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  delete(id: string): Observable<void> {
    const token = localStorage.getItem('authToken');
    const body = {
      objects: [id.toString()]
    };

    let file : FileListType = {
      files: [
        id
      ]

    }
    return this.httpClient.put<void>(`${this.apiUrl}delete`, file, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  }
}
