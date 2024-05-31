import { Component, OnInit } from '@angular/core';
import { ThematiqueService } from '../../services/Thematique/thematique.service';
import { Thematique } from 'src/app/modeles/Thematique';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as moment from 'moment'; // Importer moment.js pour manipuler les dates
declare var $: any; // Déclarer jQuery

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  apiData: Thematique[] = [];
  selectedThematique: Thematique = {};

  constructor(private thematiqueService: ThematiqueService, private toastr: ToastrService, private router: Router) {}

  ngOnInit(): void {
    this.loadThematiques();
  }

  setSelectedThematiqueCode(id: number | undefined): void {
    if (id !== undefined) {
      this.thematiqueService.getThematiqueById(id).subscribe(
        (thematique: Thematique) => {
          this.selectedThematique = thematique;
          console.log(this.selectedThematique);
        },
        (error) => {
          console.error('Erreur lors du chargement de la thématique:', error);
        }
      );
    } else {
      console.warn('ID de thématique est indéfini.');
    }
  }

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
    const table = $('#example').DataTable();

    if (table && $.fn.DataTable.isDataTable('#example')) {
      // DataTable instance exists, destroy it before reinitializing
      table.destroy();
    }
    // Utiliser setTimeout pour garantir que DataTables est initialisé après le rendu de la vue Angular
    setTimeout(() => {
      $('#example').DataTable({
        lengthMenu: [
          [5, 8],
          [5, 8],
        ],
      });
    }, 0);
  }

  onThematiqueAdded(): void {
    this.hideModal('#CT');
    this.toastr.success('Thématique ajoutée avec succès', 'Succès', { closeButton: false, timeOut: 3300 });
    setTimeout(() => {
      location.reload();
    }, 3300);
  }

  onThematiqueUpdated(): void {
    this.hideModal('#MT');
    this.toastr.success('Thématique mise à jour avec succès', 'Succès', { closeButton: false, timeOut: 3300 });
    setTimeout(() => {
      location.reload();
    }, 3300);
  }

  onThematiqueDeleted(): void {
    this.hideModal('#ST');
    this.toastr.success('Thématique supprimée avec succès', 'Succès', { closeButton: false, timeOut: 3300 });
    setTimeout(() => {
      location.reload();
    }, 3300);
  }

  hideModal(modalId: string): void {
    $(modalId).modal('hide');
    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open');
    $(modalId).on('hidden.bs.modal', () => {
      $(modalId).off('hidden.bs.modal');
    });
  }

  shouldDisableDeleteButton(thematique: Thematique): boolean {
    const today = moment(); // Obtenir la date actuelle
    const dateDebut = moment(thematique.dateDebut); // Convertir la date de début en objet moment.js

    return today.isAfter(dateDebut); // Retourner true si la date actuelle est après la date de début
  }
}
