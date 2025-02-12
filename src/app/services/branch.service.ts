import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BranchType} from '../types/branch.type';
import {UrlType} from '../types/url.type';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  private apiUrl = 'http://localhost:8090/branchByUrl/';

  constructor(private httpClient: HttpClient) {

  }


  getBranch(url: string): Observable<BranchType> {

    url = '?url=' + encodeURIComponent(url);

    return this.httpClient.get<BranchType>(this.apiUrl + url);
  }


}
