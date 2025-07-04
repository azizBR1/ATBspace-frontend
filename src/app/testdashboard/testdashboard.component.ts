// testdashboard.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { CreditService }     from '../credit-admin/credit.service';
import { Credit }            from '../credit-admin/credit';
import { ChartConfiguration, ChartType } from 'chart.js';
import { NgChartsModule, BaseChartDirective } from 'ng2-charts';
import { CommonModule }      from '@angular/common';
import { HttpClientModule }  from '@angular/common/http';

@Component({
  selector: 'app-testdashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, NgChartsModule],
  templateUrl: './testdashboard.component.html',
  styleUrls: ['./testdashboard.component.css']
})
export class TestdashboardComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public pieChartType: ChartType = 'pie';
  public pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['En attente','Traité','Accepté'],
    datasets: [{
      data: [0,0,0],
      backgroundColor: [
        'rgb(255, 0, 55)',
        'rgba(255, 0, 55, 0.5)',
        'rgba(255, 0, 55, 0.32)'
      ],
      borderColor: 'rgb(0,0,0)',
      borderWidth: 1
    }]
  };
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { position: 'right' },
      tooltip: { enabled: true }
    }
  };

  credits: Credit[] = [];

  constructor(private creditService: CreditService) {}

  ngOnInit(): void {
    this.creditService.getcredits().subscribe(data => {
      this.credits = data.filter(r => r.type !== 'HBloqué' && r.type !== 'JBloqué');
      const nbEnAttente = this.credits.filter(c => c.statut === 'En Attente').length;
      const nbTraite   = this.credits.filter(c => c.statut === 'Traité').length;
      const nbAccepte  = this.credits.filter(c => c.statut === 'Accepté').length;
      this.pieChartData.datasets[0].data = [nbEnAttente, nbTraite, nbAccepte];
      setTimeout(() => this.chart?.update(), 0);
    });
  }
}
