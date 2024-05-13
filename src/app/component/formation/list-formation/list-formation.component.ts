import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utilisateur } from 'src/app/modeles/Utilisateur';
import { UserService } from './../../services/User/user.service';
import { ToastrService } from 'ngx-toastr';
import { Formation } from 'src/app/modeles/Formations';
declare var $: any;

@Component({
  selector: 'app-list-formation',
  templateUrl: './list-formation.component.html',
  styleUrls: ['./list-formation.component.scss']
})
export class ListFormationComponent {
  selectedUtilisateur: Utilisateur = {};
  selectedFormationId : number = 0;
  // setSelectedFormationId (id: number | undefined): void {
  //   if (id !== undefined) {
  //     this.selectedFormationId=id;
  //     console.log(this.selectedFormationId);
  //     console.log(this.selectedUtilisateur)
  //     if (this.selectedUtilisateur.formations) {
  //       const selectedFormation = this.selectedUtilisateur.formations.find(
  //         (formation) => formation.id === this.selectedFormationId
  //       );
  //       if (selectedFormation) {
  //         this.formation = selectedFormation ;
  //       } else {
  //         this.toastr.error('Formation not found.');
  //       }
  //     } else {
  //       this.toastr.error('User or formations not provided.');
  //     }
  //   }

  // }
  formation: Formation = {};
  apiData: Utilisateur[] = [];
  onFormationAdded(): void {
    // Refresh the list after adding a thematique
    // this.load();
    $('#CT').modal('hide');

    // Remove the modal backdrop manually
    $('.modal-backdrop').remove();

    // Optionally, you can also reset the body class to remove the modal-open class
    $('body').removeClass('modal-open');

    this.toastr.success('Formation ajoutée avec succès.', 'Succès');
    this.ngOnInit();
  }
  setSelectedUtilisateurCode(id: number | undefined,idF: number | undefined): void {

    if (id !== undefined && idF !== undefined) {
      this.selectedFormationId=idF
      this.utilisateurService.getUtilisateurById(id).subscribe(
        (utilisateur: Utilisateur) => {
          this.selectedUtilisateur = utilisateur;
          console.log(this.selectedUtilisateur);
          if (this.selectedUtilisateur.formations) {
            const selectedFormation = this.selectedUtilisateur.formations.find(
              (formation) => formation.id === this.selectedFormationId
            );
            if (selectedFormation) {
              this.formation = selectedFormation ;
            } else {
              this.toastr.error('Formation not found.');
            }
          } else {
            this.toastr.error('User or formations not provided.');
          }
        },
        (error) => {
          console.error('Erreur lors du chargement de la thématique:', error);
        }
      );
    } else {
      console.warn('ID de thématique est indéfini.');
    }
  }
  onFormationUpdated(): void {
    // Refresh the list after adding a thematique
    // this.load();
    $('#MT').modal('hide');

    // Remove the modal backdrop manually
    $('.modal-backdrop').remove();

    // Optionally, you can also reset the body class to remove the modal-open class
    $('body').removeClass('modal-open');

    this.toastr.success('Formation mise à jour avec succès', 'Succès');
    this.ngOnInit();
  }
  onFormationDeleted(): void {
    // Refresh the list after adding a thematique
    // this.load();
    $('#ST').modal('hide');

    // Remove the modal backdrop manually
    $('.modal-backdrop').remove();

    // Optionally, you can also reset the body class to remove the modal-open class
    $('body').removeClass('modal-open');

    this.toastr.success('Formation supprimée avec succès', 'Succès');
    this.ngOnInit();
  }
  constructor(private utilisateurService: UserService, private toastr: ToastrService, private router: Router) { }
  ngOnInit(): void {
    this.loadBeneficiaiares();
  }

  loadBeneficiaiares(): void {
    this.utilisateurService.getAllUtilisateurs().subscribe(
      (utilisateur: Utilisateur[]) => {
        this.apiData = utilisateur;
        // console.log('Utilisateur:', this.apiData);
        // Réinitialiser DataTables une fois que les données sont chargées
        this.initializeDataTables();
      },
      (error) => {
        console.error('Erreur lors du chargement des Utilisateur:', error);
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
}
