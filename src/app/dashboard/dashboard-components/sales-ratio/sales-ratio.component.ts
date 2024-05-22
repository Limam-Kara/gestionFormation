import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexYAxis,
  ApexLegend,
  ApexXAxis,
  ApexTooltip,
  ApexTheme,
  ApexGrid,
  ApexPlotOptions,
  ApexStroke,

  // ChartComponent,
  // ApexAxisChartSeries,
  // ApexChart,
  // ApexXAxis,
  // ApexDataLabels,
  // ApexTooltip,
  // ApexStroke
} from 'ng-apexcharts';
import { ToastrService } from 'ngx-toastr';
import { ThematiqueService } from 'src/app/component/services/Thematique/thematique.service';
import { Thematique } from 'src/app/modeles/Thematique';

export type salesChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  xaxis: ApexXAxis | any;
  yaxis: ApexYAxis | any;
  stroke: any;
  theme: ApexTheme | any;
  tooltip: ApexTooltip | any;
  dataLabels: ApexDataLabels | any;
  legend: ApexLegend | any;
  colors: string[] | any;
  markers: any;
  grid: ApexGrid | any;
  plotOptions: ApexPlotOptions | any;
};

@Component({
  selector: 'app-sales-ratio',
  templateUrl: './sales-ratio.component.html',animations: [
    trigger('fadeInAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class SalesRatioComponent implements OnInit {
  apiData: Thematique[] = [];
  totalsByMonth: { month: string; logistique: number; pedagogique: number }[] =
    [];
  totalChargeCurrentyear: number = 0;
  totalChargeCurrentMonth: number = 0;
  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  public salesChartOptions!: Partial<salesChartOptions>;
  constructor(
    private thematiqueService: ThematiqueService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadThematiques();
  }

  loadThematiques(): void {
    this.thematiqueService.getAllThematiques().subscribe(
      (thematiques: Thematique[]) => {
        // Filter by current year
        const currentYear = new Date().getFullYear();
        this.apiData = thematiques.filter(
          (t) => new Date(t.dateDebut!).getFullYear() === currentYear
        );

        // Calculate totals by month
        this.totalsByMonth = this.calculateTotalsByMonth(this.apiData);

        this.remplirdata(this.totalsByMonth);

        // Calculate total charge for current month
        const currentMonthIndex = new Date().getMonth();
        const currentMonthTotal = this.totalsByMonth.find(
          (m) => new Date(m.month + ' 1, 2000').getMonth() === currentMonthIndex
        );
        this.totalChargeCurrentMonth = currentMonthTotal
          ? currentMonthTotal.logistique + currentMonthTotal.pedagogique
          : 0;
      },
      (error) => {
        console.error('Erreur lors du chargement des thématiques:', error);
      }
    );
  }

  calculateTotalsByMonth(
    thematiques: Thematique[]
  ): { month: string; logistique: number; pedagogique: number }[] {
    const totalsByMonthMap = new Map<
      number,
      { logistique: number; pedagogique: number }
    >();

    thematiques.forEach((t) => {
      const month = new Date(t.dateDebut!).toLocaleString('default', {
        month: 'long',
      });
      const monthIndex = new Date(t.dateDebut!).getMonth();
      const existingTotal = totalsByMonthMap.get(monthIndex) || {
        logistique: 0,
        pedagogique: 0,
      };
      existingTotal.logistique += t.coutLogistique || 0;
      existingTotal.pedagogique += t.coutPedagogique || 0;
      totalsByMonthMap.set(monthIndex, existingTotal);
    });

    // Convert map to array for easier template rendering
    const totalsByMonthArray: {
      month: string;
      logistique: number;
      pedagogique: number;
    }[] = [];
    totalsByMonthMap.forEach((value, key) => {
      totalsByMonthArray.push({
        month: new Date(2000, key).toLocaleString('default', { month: 'long' }),
        logistique: value.logistique,
        pedagogique: value.pedagogique,
      });
    });

    return totalsByMonthArray;
  }
  remplirdata(
    totalsByMonth: { month: string; logistique: number; pedagogique: number }[]
  ) {
    const logistique: number[] = [];
    const peda: number[] = [];
    const month: string[] = [];
    let t = 0;
    totalsByMonth.forEach((element) => {
      logistique.push(element.logistique);
      peda.push(element.pedagogique);
      month.push(element.month);
      const totalCharge = element.logistique + element.pedagogique;
      t += totalCharge;
      // if(element.month==monthIndex){
      //      this.Totalcchargepermonth
      // =element.logistique+element.pedagogique
      // }
    });
    this.totalChargeCurrentyear = t;
    this.salesChartOptions = {
      series: [
        {
          name: 'logistique',
          data: logistique,
        },
        {
          name: 'pedagogique',
          data: peda,
        },
      ],
      chart: {
        fontFamily: 'Montserrat,sans-serif',
        height: 290,
        type: 'area',
        toolbar: {
          show: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ['#0d6efd', '#009efb', '#6771dc'],
      stroke: {
        show: true,
        width: 4,
        colors: ['transparent'],
      },
      grid: {
        strokeDashArray: 3,
      },
      xaxis: {
        categories: month,
      },
      tooltip: {
        theme: 'dark',
      },
    };
  }
}
