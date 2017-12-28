import { Component, OnInit } from '@angular/core';
import { StatsService } from '../../services/stats-service';
import * as d3 from 'd3';

@Component({
  selector: 'app-standings',
  templateUrl: './standings-component.html'
})

export class StandingsComponent implements OnInit {
  public svg: any = d3.select('#chart');
  public margin = {top: 20, right: 80, bottom: 30, left: 50};
  public width = window.innerWidth - this.margin.left - this.margin.right;
  public height = window.innerHeight - this.margin.top - this.margin.bottom;
  public g = this.svg.append('g').attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

  constructor(private statsService: StatsService){

  }

  ngOnInit() {

  }

  initChart() {
    // navigate here for time series chart d3 version 4
    // https://bl.ocks.org/pstuffa/26363646c478b2028d36e7274cedefa6
  }
}
