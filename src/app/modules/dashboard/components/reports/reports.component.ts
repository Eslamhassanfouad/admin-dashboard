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
} from 'ng-apexcharts';

@Component({
  selector: 'app-reports',
  standalone: false,
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
})
export class ReportsComponent implements OnInit {
  reportsData: any[] = [];
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

  private reports = [
    { date: '2024-06-19', revenue: 27000 },
    { date: '2024-06-20', revenue: 31000 },
    { date: '2024-06-21', revenue: 45000 },
    { date: '2024-06-22', revenue: 20000 },
    { date: '2024-06-23', revenue: 56000 },
    { date: '2024-06-24', revenue: 38000 },
    { date: '2024-06-25', revenue: 50000 },

    { date: '2024-06-14', revenue: 91000 },
    { date: '2024-06-08', revenue: 43000 },
    { date: '2024-06-03', revenue: 66000 },

    { date: '2024-05-27', revenue: 21000 },
    { date: '2024-05-21', revenue: 46000 },
    { date: '2024-05-14', revenue: 88000 },

    { date: '2024-04-24', revenue: 10000 },
    { date: '2024-04-18', revenue: 37000 },
    { date: '2024-04-12', revenue: 94000 },

    { date: '2024-03-27', revenue: 22000 },
    { date: '2024-03-22', revenue: 86000 },
    { date: '2024-03-15', revenue: 30000 },
    { date: '2024-03-10', revenue: 90000 },
    { date: '2024-03-04', revenue: 45000 },
  ];

  selectedFilter: string = 'week';
  selectedMetric: string = 'sales';

  ngOnInit() {
    this.reportsData = this.reports;
    console.log(this.reportsData);
    this.initChartData();

    this.filterData('week');
  }

  public initChartData(): void {
    if (!this.reportsData || this.reportsData.length === 0) return;

    this.series = [
      {
        name: 'Sales',
        data: this.reportsData.map((d) => [
          new Date(d.date).getTime(),
          d.revenue,
        ]),
      },
    ];

    this.chart = {
      type: 'area',
      stacked: false,
      height: 350,
      zoom: { enabled: false },
      toolbar: { show: false },
    };

    this.dataLabels = { enabled: false };

    this.markers = { size: 0 };

    this.fill = {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.3,
        opacityTo: 1,
        stops: [0, 100],
        colorStops: [
          { offset: 0, color: 'rgba(159, 193, 251, 1)', opacity: 0.3 },
          { offset: 100, color: 'rgba(159, 193, 251, 0.1)', opacity: 1 },
        ],
      },
    };

    this.yaxis = {
      labels: {
        formatter: function (val) {
          if (val >= 1000) {
            return `$${(val / 1000).toFixed(0)}K`;
          }
          return `$${val.toLocaleString()}`;
        },
        style: {
          colors: '#adb1b2',
          fontWeight: 700,
          fontSize: '12px',
        },
      },
      min: 0,
      max: 100000,
      title: { text: '' },
    };

    this.xaxis = {
      type: 'datetime',
      labels: { format: 'ddd' },
    };

    this.tooltip = {
      shared: false,
      y: {
        formatter: function (val) {
          return `$${val.toLocaleString()}`;
        },
      },
    };
  }

  filterData(range: string): void {
    this.selectedFilter = range;

    if (!this.reports || this.reports.length === 0) return;

    const latestDate = new Date(
      Math.max(...this.reports.map((d) => new Date(d.date).getTime()))
    );

    let startDate = new Date(latestDate);

    switch (range) {
      case 'day':
        startDate.setDate(latestDate.getDate() - 1);
        this.xaxis = {
          ...this.xaxis,
          labels: { ...this.xaxis.labels, format: 'HH:mm' },
        };
        break;
      case 'week':
        startDate.setDate(latestDate.getDate() - 7);
        this.xaxis = {
          ...this.xaxis,
          labels: { ...this.xaxis.labels, format: 'ddd' },
        };
        break;
      case 'month':
        startDate.setDate(latestDate.getDate() - 30);
        this.xaxis = {
          ...this.xaxis,
          labels: { ...this.xaxis.labels, format: 'dd MMM' },
        };
        break;
      case 'year':
        startDate.setDate(latestDate.getDate() - 365);
        this.xaxis = {
          ...this.xaxis,
          labels: { ...this.xaxis.labels, format: 'MMM yyyy' },
        };
        break;
      default:
        startDate = new Date(0);
        this.xaxis = {
          ...this.xaxis,
          labels: { ...this.xaxis.labels, format: 'yyyy' },
        };
    }

    // Filter the data based on the selected range
    const filteredData = this.reports.filter(
      (d) => new Date(d.date) >= startDate
    );

    this.series = [
      {
        name: 'Sales',
        data: filteredData.map((d) => [new Date(d.date).getTime(), d.revenue]),
      },
    ];
  }
}
