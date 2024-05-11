import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ThematiqueService } from '../../services/Thematique/thematique.service';
import { Thematique } from 'src/app/modeles/Thematique';
declare var $: any; // Déclarer jQuery

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  apiData: Thematique[] = [];

  constructor(private thematiqueService: ThematiqueService) {}

  ngOnInit(): void {
    this.loadThematiques();
  }

  // ngAfterViewInit(): void {
  //   this.initializeDataTables();
  // }

  loadThematiques(): void {
    this.thematiqueService.getAllThematiques().subscribe(
      (thematiques: Thematique[]) => {
        this.apiData = thematiques;
        console.log('Thematiques:', this.apiData);
        // Réinitialiser DataTables une fois que les données sont chargées
        this.initializeDataTables();
      },
      (error) => {
        console.error('Erreur lors du chargement des thématiques:', error);
      }
    );
  }

  initializeDataTables(): void {
    // Utiliser setTimeout pour garantir que DataTables est initialisé après le rendu de la vue Angular
    setTimeout(() => {
      $('#example').DataTable({
        "lengthMenu": [[5, 8], [5, 8]],
      });
    }, 0);
  }
}
