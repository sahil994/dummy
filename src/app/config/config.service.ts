import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Config {
  baseUrl: string;
}
@Injectable()
export class ConfigService {

 configUrl = 'http://localhost:3000/addLinkUser/';

 constructor(private http: HttpClient) { }

  getConfig() {
    return this.http.get(this.configUrl);
  }
}
