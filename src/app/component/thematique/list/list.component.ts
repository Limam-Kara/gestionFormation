import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ThematiqueService } from '../../services/Thematique/thematique.service';
import { Thematique } from 'src/app/modeles/Thematique';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
declare var $: any; // Déclarer jQuery

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  apiData: Thematique[] = [];
  selectedThematique:Thematique= {};
  constructor(private thematiqueService: ThematiqueService,private toastr: ToastrService,private router: Router) {}

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
    const table = $('#example').DataTable();

    if (table && $.fn.DataTable.isDataTable('#example')) {
      // DataTable instance exists, destroy it before reinitializing
      table.destroy();
    }
    // Utiliser setTimeout pour garantir que DataTables est initialisé après le rendu de la vue Angular
    setTimeout(() => {
      $('#example').DataTable({
        "lengthMenu": [[5, 8], [5, 8]],
      });
    }, 0);
  }
  onThematiqueAdded(): void {
    // Refresh the list after adding a thematique
    // this.load();
    $('#CT').modal('hide');

    // Remove the modal backdrop manually
    $('.modal-backdrop').remove();

    // Optionally, you can also reset the body class to remove the modal-open class
    $('body').removeClass('modal-open');

    this.toastr.success('Thématique ajoutée avec succès', 'Succès');
    this.ngOnInit();
  }
  onThematiqueUpdated(): void {
    // Refresh the list after adding a thematique
    // this.load();
    $('#MT').modal('hide');

    // Remove the modal backdrop manually
    $('.modal-backdrop').remove();

    // Optionally, you can also reset the body class to remove the modal-open class
    $('body').removeClass('modal-open');
    this.toastr.success('Thématique mise à jour avec succès', 'Succès');
    this.ngOnInit();
  }
  onThematiqueDeleted(): void {
    // Refresh the list after adding a thematique
    // this.load();
    // Hide the modal using jQuery
    $('#ST').modal('hide');

    // Remove the modal backdrop manually
    $('.modal-backdrop').remove();

    // Optionally, you can also reset the body class to remove the modal-open class
    $('body').removeClass('modal-open');

    this.toastr.success('Thématique supprimée avec succès', 'Succès');
    this.ngOnInit();
    // $('#ST').modal('hide');
  }
}
