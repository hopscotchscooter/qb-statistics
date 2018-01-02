import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { StatsService } from '../../services/stats-service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs';
import { extend as _extend, omit as _omit, find as _find, map as _map, forEach as _forEach, reduce as _reduce, merge as _merge, assign as _assign } from 'lodash';

@Component({
  selector: 'app-quarterbacks',
  templateUrl: './quarterbacks-component.html'
})

export class QuarterbacksComponent implements OnInit {
  public players: any;
  public stats: any;
  public ratings = [];

  constructor(private http: Http,
              private statsService: StatsService) {

    this.statsService.getData()
        .subscribe(data => {
          // subscribe to data
            this.players = data.players;
            this.stats = data.statistics;

         // merge data together based on player_id
            let findPlayer = player_id => this.players.find(player => player.player_id === player_id);
            this.stats.forEach(player => Object.assign(player, findPlayer(player.player_id)));
            this.statsService.compiledStats.next(this.stats);
      });
}

ngOnInit() {}

calculatePasserRating(completions: number, attempts: number, yards: number, tds: number, interceptions: number, last_name: string, week: string) {
  let rating = 0;
  let ratings = []

// calculate passer rating based off of https://en.wikipedia.org/wiki/Passer_rating ; Could potentially break this out to separate function calls
  let compPercentage = (completions / attempts - .3) * 5;
  let yardsPerAttempt = (yards / attempts - 3) * .25;
  let tdsPerAttempt = (tds / attempts) * 20;
  let intPerAttempt = 2.375 - (interceptions / attempts * 25);
  rating = ((compPercentage + yardsPerAttempt + tdsPerAttempt + intPerAttempt) / 6) * 100;

  return rating;
 }
}
