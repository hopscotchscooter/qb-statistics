import { Component, OnInit } from '@angular/core';
import { StatsService } from '../../services/stats-service';
import { each as _each } from 'lodash';
import * as d3 from 'd3';

@Component({
  selector: 'app-standings',
  templateUrl: './standings-component.html'
})

export class StandingsComponent implements OnInit {
  public margin = {top: 20, right: 80, bottom: 30, left: 50};
  public width = 800 - this.margin.left - this.margin.right;
  public height = 300 - this.margin.top - this.margin.bottom;
  public compiledStats;
  public timeSeriesStats = [];

  constructor(private statsService: StatsService){
    this.statsService.compiledStats.subscribe(value => {
        this.compiledStats = value
        _each(this.compiledStats, (d: any) => {
          this.timeSeriesStats.push({
            'yards': d.yards,
            'player': d.last_name,
            'week': d.week});
        })
    })
  }

  ngOnInit() {
    this.initChart();
  }

  initChart() {
    const x = d3.scaleLinear().range([0, this.width]);
    const y = d3.scaleLinear().range([this.height, 0]);

    const svg = d3.select('#chart').append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
    .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    x.domain(d3.extent(this.timeSeriesStats, (d: any) => { return d.week; }));
    y.domain([0, d3.max(this.timeSeriesStats, (d: any) => { return d.yards; })]);

    svg.append('g').attr('transform', 'translate(0,' + this.height + ')').call(d3.axisBottom(x));
    svg.append('g').call(d3.axisLeft(y));

    let color = d3.scaleOrdinal(d3.schemeCategory10);
    let div = d3.select('#chart').append('div').attr('class', 'tooltip').style('opacity', 0);

    svg.selectAll('dot')
    .data(this.timeSeriesStats)
    .enter().append('circle')
    .attr('r', 5)
    .attr('cx', (d: any) => { return x(d.week); })
    .attr('cy', (d: any) => { return y(d.yards); })
    .style('fill', (d: any) => { return d.color = color(d.key)})
    .style('cursor', 'pointer')
    .on('mouseover', (d: any, i: any) => {
      div.transition().duration(200).style('opacity', .9);
      div.html(d.player + "<br/>" + d.yards + ' yards');
      div.style('left', (d3.event.pageX) + 'px');
      div.style('top', (d3.event.pageY - 28) + 'px');
    })
    .on('mouseout', (d: any) => {
      div.transition().duration(500).style('opacity', 0);
    })
  }
}
