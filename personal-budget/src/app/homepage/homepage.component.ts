import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  public dataSource = {
    datasets: [
      {
          data: [],
          backgroundColor: [
              '#ffcd56',
              '#ff6384',
              '#36a2eb',
              '#fd6b19',
              '#c12200',
              '#000cc1',
              '#00c11e',
              '#5e3a0c'
          ],
      }
  ],
  labels: []
  };


  constructor(private http: HttpClient) {
   }

   ngOnInit(): void {
    this.http.get('http://localhost:3000/budget').subscribe((res: any) => {
      this.dataSource.datasets[0].data = res.budget;
      this.dataSource.labels = res.title;
      this.createChart()
    });
  }

/*
    this.http.get('http://localhost:3000/budget')
    .subscribe((res: any) => {
      for (let i = 0; i < res.length; i++) {
        this.dataSource.datasets[0].data[i] = res.budget[i];
        this.dataSource.labels[i] = res.title[i];
      }
    });
    this.createChart();
  }*/

  createChart() {
    let ctx = document.getElementById('myChart');
    let myPieChart = new Chart (ctx, {
        type: 'pie',
        data: this.dataSource
    });
}

}
