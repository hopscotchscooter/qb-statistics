import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()

export class StatsService {

  constructor(private http: Http) {}

  getData() {
  // fetch data
    return this.http.get('../../assets/data.json').map(res => res.json());
  }
}
