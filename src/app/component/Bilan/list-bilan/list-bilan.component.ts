import { Component, OnInit } from '@angular/core';
import { Thematique } from 'src/app/modeles/Thematique';
import { ThematiqueService } from '../../services/Thematique/thematique.service';

@Component({
  selector: 'app-list-bilan',
  templateUrl: './list-bilan.component.html',
  styleUrls: ['./list-bilan.component.scss'],
})
export class ListBilanComponent implements OnInit {
  apiData: Thematique[] = [];
  currentYearData: Thematique[] = [];
  years: number[] = [];
  selectedYear: number = new Date().getFullYear();
  totalCoutLogistique: number = 0;
  totalCoutPedagogique: number = 0;

  constructor(private thematiqueService: ThematiqueService) {}

  ngOnInit(): void {
    this.loadThematiques();
  }

  loadThematiques(): void {
    this.thematiqueService.getAllThematiques().subscribe(
      (thematiques: Thematique[]) => {
        this.apiData = thematiques;
        console.log('Loaded thematiques:', this.apiData); // Debugging

        this.populateYears();
        this.filterDataByYear(this.selectedYear);
      },
      (error) => {
        console.error('Erreur lors du chargement des thématiques:', error);
      }
    );
  }

  populateYears(): void {
    const yearsSet = new Set<number>();
    this.apiData.forEach((thematique) => {
      const year = new Date(thematique.dateDebut!).getFullYear();
      yearsSet.add(year);
    });
    this.years = Array.from(yearsSet).sort((a, b) => b - a);
  }

  filterDataByYear(year: number): void {
    this.selectedYear = year;
    console.log('Filtering data for year:', year); // Debugging

    this.currentYearData = this.apiData.filter((thematique) => {
      return new Date(thematique.dateDebut!).getFullYear() == year;
    });
    console.log('Filtered data:', this.currentYearData); // Debugging

    this.totalCoutLogistique = this.currentYearData.reduce(
      (sum, thematique) => sum + (thematique.coutLogistique || 0),
      0
    );
    this.totalCoutPedagogique = this.currentYearData.reduce(
      (sum, thematique) => sum + (thematique.coutPedagogique || 0),
      0
    );
    console.log('Total Cout Logistique:', this.totalCoutLogistique); // Debugging
    console.log('Total Cout Pedagogique:', this.totalCoutPedagogique); // Debugging
  }

  // printSection() {
  //   const printWindow = window.open('', '', 'height=600,width=800');
  //   if (printWindow) {
  //     let tableHTML = `
  //       <div class="print-header">Bilan de l’année ${this.selectedYear}</div>
  //       <table class="table table-striped table-bordered">
  //         <thead>
  //           <tr>
  //             <th>Cout Logistique</th>
  //             <th>Cout Pedagogique</th>
  //             <th>Nombre de Groupes</th>
  //             <th>Jours de Formation</th>
  //             <th>Date Debut</th>
  //             <th>Date Fin</th>
  //             <th>Domaine de Formation</th>
  //             <th>Prestataire</th>
  //             <th >Total</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //     `;

  //     this.currentYearData.forEach((thematique) => {
  //       tableHTML += `
  //         <tr>
  //           <td>${thematique.coutLogistique} DH</td>
  //           <td>${thematique.coutPedagogique} DH</td>
  //           <td>${thematique.nbrGroupe}</td>
  //           <td>${thematique.nbrJoursFormation}</td>
  //           <td>${new Date(thematique.dateDebut!).toLocaleDateString()} Jrs</td>
  //           <td>${new Date(thematique.dateFin!).toLocaleDateString()} Jrs</td>
  //           <td>${thematique.domaineFormation}</td>
  //           <td>${thematique.prestataire}</td>
  //           <td>${
  //             (thematique.coutLogistique ?? 0) +
  //             (thematique.coutPedagogique ?? 0)
  //           } DH</td>
  //         </tr>
  //       `;
  //     });

  //     tableHTML += `
  //         <tr>
  //           <td colspan="7">Total Logistique pour cette année :</td>
  //           <td colspan="2">${this.totalCoutLogistique} DH</td>
  //         </tr>
  //         <tr>
  //           <td colspan="7">Total Pedagogique pour cette année :</td>
  //           <td colspan="2">${this.totalCoutPedagogique} DH</td>
  //         </tr>
  //         <tr>
  //         <td colspan="7">Total pour cette année :</td>
  //         <td colspan="2">${
  //           this.totalCoutPedagogique + this.totalCoutLogistique
  //         } DH</td>
  //       </tr>
  //       </tbody>
  //       </table>
  //     `;

  //     printWindow.document.write('<html><head><title>Print</title>');
  //     printWindow.document.write('<style>');
  //     printWindow.document.write(`
  //       body {
  //         font-family: Arial, sans-serif;
  //         margin: 20px;
  //       }
  //       .print-header {
  //         text-align: center;
  //         font-size: 2rem;
  //         font-weight: bold;
  //         margin-bottom: 20px;
  //       }
  //       table {
  //         width: 100%;
  //         border-collapse: collapse;
  //         margin-bottom: 20px;
  //       }
  //       th, td {
  //         border: 1px solid #000;
  //         padding: 8px;
  //         text-align: left;
  //       }
  //       th {
  //         background-color: #f2f2f2;
  //       }
  //     `);
  //     printWindow.document.write('</style>');
  //     printWindow.document.write('</head><body>');
  //     printWindow.document.write(tableHTML);
  //     printWindow.document.write('</body></html>');
  //     printWindow.document.close();
  //     printWindow.print();
  //   }
  // }
  printSection() {
    const printWindow = window.open('', '', 'height=600,width=800');
    if (printWindow) {
      let tableHTML = `
        <div class="print-header">
          <img src="/assets/images/logos/logo.png" alt="Logo" class="header-logo" />
          <h1 class="print-title">Bilan de l’année ${this.selectedYear}</h1>
        </div>
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th colspan="4" class="text-center">Détails de la Formation</th>
              <th colspan="2" class="text-center">Dates</th>
              <th colspan="2" class="text-center">Coûts</th>
              <th>Total</th>
            </tr>
            <tr>
              <th>Domaine de Formation</th>
              <th>Prestataire</th>
              <th>Nombre de Groupes</th>
              <th>Nombre de Jours</th>
              <th>Date Début</th>
              <th>Date Fin</th>
              <th>Coût Logistique</th>
              <th>Coût Pédagogique</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
      `;

      this.currentYearData.forEach((thematique) => {
        tableHTML += `
          <tr>
            <td>${thematique.domaineFormation}</td>
            <td>${thematique.prestataire}</td>
            <td>${thematique.nbrGroupe}</td>
            <td>${thematique.nbrJoursFormation}</td>
            <td>${new Date(thematique.dateDebut!).toLocaleDateString()}</td>
            <td>${new Date(thematique.dateFin!).toLocaleDateString()}</td>
            <td>${thematique.coutLogistique} DH</td>
            <td>${thematique.coutPedagogique} DH</td>
            <td>${
              (thematique.coutLogistique ?? 0) + (thematique.coutPedagogique ?? 0)
            } DH</td>
          </tr>
        `;
      });

      tableHTML += `
          <tr>
            <td colspan="7" >Total Logistique pour cette année :</td>
            <td colspan="2" class="text-right">${this.totalCoutLogistique} DH</td>
          </tr>
          <tr>
            <td colspan="7" >Total Pédagogique pour cette année :</td>
            <td colspan="2" class="text-right">${this.totalCoutPedagogique} DH</td>
          </tr>
          <tr>
            <td colspan="7" >Total pour cette année :</td>
            <td colspan="2" class="text-right">${
              this.totalCoutPedagogique + this.totalCoutLogistique
            } DH</td>
          </tr>
        </tbody>
        </table>
      `;

      // Write the constructed HTML into the print window
      printWindow.document.write('<html><head><title>Print</title>');
      printWindow.document.write('<style>');
      printWindow.document.write(`
        body {
          font-family: Arial, sans-serif;
          margin: 20px;
        }
        .print-header {
          text-align: center;
          margin-bottom: 20px;
        }
        .header-logo {
          max-width: 100%;
          margin-bottom: 10px;
        }
        .print-title {
          font-size: 2.5rem;
          font-weight: bold;
          margin: 10px 0;
        }
        .text-center {
          text-align: center;
        }
        .text-right {
          text-align: right;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        th, td {
          border: 1px solid #000;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
        }
      `);
      printWindow.document.write('</style>');
      printWindow.document.write('</head><body>');
      printWindow.document.write(tableHTML);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    }
  }

}
