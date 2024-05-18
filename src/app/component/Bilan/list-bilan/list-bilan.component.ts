import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Thematique } from 'src/app/modeles/Thematique';
import { ThematiqueService } from '../../services/Thematique/thematique.service';

@Component({
  selector: 'app-list-bilan',
  templateUrl: './list-bilan.component.html',
  styleUrls: ['./list-bilan.component.scss']
})
export class ListBilanComponent implements OnInit {
  apiData: Thematique[] = [];
  currentYearData: Thematique[] = [];
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
        this.filterCurrentYearData();
      },
      (error) => {
        console.error('Erreur lors du chargement des thématiques:', error);
      }
    );
  }

  filterCurrentYearData(): void {
    const currentYear = new Date().getFullYear();
    this.currentYearData = this.apiData.filter(thematique => {
      return new Date(thematique.dateDebut!).getFullYear() === currentYear;
    });

    this.totalCoutLogistique = this.currentYearData.reduce((sum, thematique) => sum + (thematique.coutLogistique || 0), 0);
    this.totalCoutPedagogique = this.currentYearData.reduce((sum, thematique) => sum + (thematique.coutPedagogique || 0), 0);
  }
  printSection() {
    const printWindow = window.open('', '', 'height=600,width=800');
    if (printWindow) {
      // Construct the table HTML
      let tableHTML = `
        <div class="print-header">Bilan de l’année en cour ${(new Date()).getFullYear()}

        </div>
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Cout Logistique</th>
              <th>Cout Pedagogique</th>
              <th>Nombre de Groupes</th>
              <th>Nombre de Jours de Formation</th>
              <th>Date Debut</th>
              <th>Date Fin</th>
              <th>Domaine de Formation</th>
              <th>Prestataire</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
      `;

      this.currentYearData.forEach(thematique => {
        tableHTML += `
          <tr>
            <td>${thematique.coutLogistique}</td>
            <td>${thematique.coutPedagogique}</td>
            <td>${thematique.nbrGroupe}</td>
            <td>${thematique.nbrJoursFormation}</td>
            <td>${new Date(thematique.dateDebut!).toLocaleDateString()}</td>
            <td>${new Date(thematique.dateFin!).toLocaleDateString()}</td>
            <td>${thematique.domaineFormation}</td>
            <td>${thematique.prestataire}</td>
            <td>${(thematique.coutLogistique ?? 0) +( thematique.coutPedagogique ?? 0)}</td>
          </tr>
        `;
      });

      tableHTML += `
          <tr>
            <td colspan="8">Total Logistique pour cette année :</td>
            <td>${this.totalCoutLogistique}</td>
          </tr>
          <tr>
            <td colspan="8">Total Pedagogique pour cette année :</td>
            <td>${this.totalCoutPedagogique}</td>
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
        .text-warning { color: #ffc107; }
        .font-medium { font-weight: 500; }
        .fs-4 { font-size: 1.5rem; }
        .card-title { margin-bottom: 1rem; }
        .form-check-input { margin-right: 0.5rem; }
        .form-check-label { margin-left: 0.5rem; }
        .print-header {
          text-align: center;
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 20px;
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
    }}
}
