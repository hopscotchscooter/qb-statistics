import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs';

@Injectable()

export class StatsService {
  public compiledStats = new BehaviorSubject(null);

  constructor(private http: Http) {}

  getData() {
  // fetch data
    return this.http.get('../../assets/data.json').map(res => res.json());
  }
}
