import { Component, OnInit } from '@angular/core';
import { StatsService } from '../../services/stats-service';
import * as d3 from 'd3';

@Component({
  selector: 'app-standings',
  templateUrl: './standings-component.html'
})

export class StandingsComponent implements OnInit {
  public margin = {top: 20, right: 80, bottom: 30, left: 50};
  public width = 800 - this.margin.left - this.margin.right;
  public height = 400 - this.margin.top - this.margin.bottom;

  constructor(private statsService: StatsService){

  }

  ngOnInit() {
    this.initChart();
  }

  initChart() {
    // http://bl.ocks.org/wdickerson/64535aff478e8a9fd9d9facccfef8929
    const x = d3.scaleTime().range([0, this.width]);
    const y = d3.scaleLinear().range([this.height, 0]);

    const svg = d3.select('#chart').append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
    .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    x.domain([1, 16]);
    y.domain([0, 155]);

    svg.append('g').attr('transform', 'translate(0,' + this.height + ')').call(d3.axisBottom(x));
    svg.append('g').call(d3.axisLeft(y));
  }
}
