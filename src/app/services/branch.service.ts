import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BranchType} from '../types/branch.type';
import {UrlType} from '../types/url.type';
import {MessageType} from '../types/message.type';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  private apiUrl = 'http://localhost:8090';

  constructor(private httpClient: HttpClient) {

  }


  getBranchPublic(url: string): Observable<BranchType> {

    url = '?url=' + encodeURIComponent(url);

    return this.httpClient.get<BranchType>(this.apiUrl + "/branchByUrl/" + url);
  }


  getBranch() {

    return this.httpClient.get<BranchType>(this.apiUrl + "/userBranch/",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
  }

  updateBranch(branch: BranchType) {

    console.log(branch);
    return this.httpClient.put<MessageType>(this.apiUrl + '/branch/', branch, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    });
  }
}
