import { Component, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip,
  ApexStroke,
  ApexPlotOptions,
} from 'ng-apexcharts';

@Component({
  selector: 'app-visits',
  standalone: false,
  templateUrl: './visits.component.html',
  styleUrl: './visits.component.scss',
})
export class VisitsComponent implements OnInit {
  visitsData: any[] = [];
  public series!: ApexAxisChartSeries;
  public chart!: ApexChart;
  public dataLabels!: ApexDataLabels;
  public markers!: ApexMarkers;
  public title!: ApexTitleSubtitle;
  public fill!: ApexFill;
  public yaxis!: ApexYAxis;
  public xaxis!: ApexXAxis;
  public tooltip!: ApexTooltip;
  public stroke!: ApexStroke;
  public plotOptions!: ApexPlotOptions;

  private visits = [
    { date: '2024-06-19', count: 270 },
    { date: '2024-06-20', count: 310 },
    { date: '2024-06-21', count: 450 },
    { date: '2024-06-22', count: 200 },
    { date: '2024-06-23', count: 560 },
    { date: '2024-06-24', count: 380 },
    { date: '2024-06-25', count: 500 },
    { date: '2024-06-14', count: 910 },
    { date: '2024-06-08', count: 430 },
    { date: '2024-06-03', count: 660 },
    { date: '2024-05-27', count: 210 },
    { date: '2024-05-21', count: 460 },
    { date: '2024-05-14', count: 880 },
    { date: '2024-04-24', count: 100 },
    { date: '2024-04-18', count: 370 },
    { date: '2024-04-12', count: 940 },
    { date: '2024-03-27', count: 220 },
    { date: '2024-03-22', count: 860 },
    { date: '2024-03-15', count: 300 },
    { date: '2024-03-10', count: 900 },
    { date: '2024-03-04', count: 450 },
  ];

  selectedFilter: string = 'week';

  ngOnInit() {
    this.visitsData = this.visits;
    console.log(this.visitsData);
    this.initChartData();
    this.filterData('week');
  }

  public initChartData(): void {
    if (!this.visitsData || this.visitsData.length === 0) return;

    this.series = [
      {
        name: 'Visits',
        data: this.visitsData.map((d) => [new Date(d.date).getTime(), d.count]),
      },
    ];

    this.chart = {
      type: 'bar',
      height: 350,
      zoom: { enabled: false },
      toolbar: { show: false },
    };

    this.plotOptions = {
      bar: {
        horizontal: false,
        columnWidth: '50%',
        borderRadius: 10,
      },
    };

    this.dataLabels = { enabled: false };

    this.yaxis = {
      show: false,
    };

    this.xaxis = {
      type: 'datetime',
      labels: { format: 'ddd' },
    };

    this.tooltip = {
      shared: false,
      y: {
        formatter: function (val) {
          return `${val.toLocaleString()} Visits`;
        },
      },
    };
  }

  filterData(range: string): void {
    this.selectedFilter = range;

    if (!this.visits || this.visits.length === 0) return;

    const latestDate = new Date(
      Math.max(...this.visits.map((d) => new Date(d.date).getTime()))
    );

    let startDate = new Date(latestDate);

    switch (range) {
      case 'day':
        startDate.setDate(latestDate.getDate() - 1);
        this.xaxis = { ...this.xaxis, labels: { format: 'HH:mm' } };
        break;
      case 'week':
        startDate.setDate(latestDate.getDate() - 7);
        this.xaxis = { ...this.xaxis, labels: { format: 'ddd' } };
        break;
      case 'month':
        startDate.setDate(latestDate.getDate() - 30);
        this.xaxis = { ...this.xaxis, labels: { format: 'dd MMM' } };
        break;
      case 'year':
        startDate.setDate(latestDate.getDate() - 365);
        this.xaxis = { ...this.xaxis, labels: { format: 'MMM yyyy' } };
        break;
      default:
        startDate = new Date(0);
        this.xaxis = { ...this.xaxis, labels: { format: 'yyyy' } };
    }

    const filteredData = this.visits.filter(
      (d) => new Date(d.date) >= startDate
    );

    this.series = [
      {
        name: 'Visits',
        data: filteredData.map((d) => [new Date(d.date).getTime(), d.count]),
      },
    ];
  }
}
