import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

import * as mapboxgl from 'mapbox-gl';
import { ReportsService } from '../reports.service';
import { Report } from '../report';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  myChart: any = []
  reportsArr: Report[] = []




  countryName: string = ''

  reportConfirmedCases: any = []
  reportDeathsCases: any = []
  reportDate: string[] = []

  reportLastTenDays: Report[] = [{
    Confirmed: 0,
    Country: '',
    Deaths: 0,
    Recovered: 0,
    Date: ''
  }]

  constructor(private _ReportsService: ReportsService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {

    const reportChart = document.getElementById('reportChart');

    const closeReportChart = document.getElementById('closeReportChart');
    //Initialize the map
    const map = new mapboxgl.Map({
      accessToken: environment.mapBoxKey,
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [30.033333, 31.233334],
      zoom: 3
    })


    closeReportChart?.addEventListener('click', () => {
      if (reportChart) {
        reportChart.style.display = "none"
      }
    })
    reportChart?.addEventListener('click', (e) => {
      console.log(e.currentTarget)
      console.log(e.target)
      if (e.target == e.currentTarget) {
        reportChart.style.display = "none"
      }
    })

    // Set an event listener
    map.on('click', (e) => {

      //object(document) can be undefined
      if (reportChart) {
        reportChart.style.display = "block"
      }


      const features = map.queryRenderedFeatures(e.point);
      const displayProperties = ['properties']

      const displayFeatures: any = features.map((feat: any) => {
        const displayFeat: any = {};
        displayProperties.forEach((prop) => {
          displayFeat[prop] = feat[prop].name_en;
        });
        return displayFeat.properties;
      });

      this.countryName = displayFeatures

      this._ReportsService.getReports(displayFeatures).subscribe((response) => {

        this.reportsArr = response;

        this.reportLastTenDays = this.reportsArr.slice(-10)
        this.reportConfirmedCases = this.reportLastTenDays.map((report) => report.Confirmed)
        this.reportDeathsCases = this.reportLastTenDays.map((report) => report.Deaths)
        this.reportDate = this.reportLastTenDays.map((report) => report.Date).map((date) => new Date(date).toLocaleDateString('en-us', { day: "numeric", month: "short" }))

        updateChart(this.myChart, this.reportDate, 'Confirmed Cases', this.reportConfirmedCases, 'rgb(0,0,0)', 'Deaths Cases', this.reportDeathsCases, 'rgb(0,0,192)')

      },
        (error) => {
          console.log('error')
        })
    });



    function updateChart(chart: any, lables: any, label1: string, data1: any, color1: string, label2: string, data2: any, color2: string) {

      chart.data.labels = lables;
      chart.data.datasets.splice(0, 2, {
        label: label1,
        data: data1,
        borderColor: color1
      }, {

        label: label2,
        data: data2,
        borderColor: color2

      });

      chart.update();

    }

    this.myChart = new Chart("myChart", {
      type: 'line',
      data: {
        //last 10 days
        labels: this.reportDate,
        datasets: [{
          label: 'Confirmed Cases',
          data: this.reportConfirmedCases,
          fill: true,
          borderColor: 'rgb(0, 0, 0)',
          tension: 0.1
        } , {
          label: 'Deaths Cases',
          data: this.reportDeathsCases,
          fill: true,
          borderColor: 'rgb(0, 0, 192)',
          tension: 0.1
        }]
      }
    });
  }
}
