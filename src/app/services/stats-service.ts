import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { BehaviorSubject } from 'rxjs';

@Injectable()

export class StatsService {
  public compiledStats = new BehaviorSubject(null);
  public headersOptions = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type'
  }
  constructor(private http: Http) {}

  getData() {
    const requestOptions = {
      headers: new Headers(this.headersOptions)
    }
  // fetch data
  return this.http.get('../../assets/data.json').map(res => res.json());

  // the below request does not pass the CORS authorization and I'm not sure why. The request is successful using PostMan, but not through Angular 2 for some reason.
  // So I have stored the JSON file locally and mocked the async call
  // return this.http.get('http://web.profootballfocus.com.s3-website-us-east-1.amazonaws.com/quarterbacks.json', requestOptions).map(res => res.json());
  }
}
