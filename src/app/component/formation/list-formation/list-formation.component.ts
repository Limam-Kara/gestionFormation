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
export class ListFormationComponent implements OnInit {
  selectedUtilisateur: Utilisateur = {};
  selectedFormationId: number = 0;
  formation: Formation = {};
  apiData: Utilisateur[] = [];

  constructor(private utilisateurService: UserService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.loadBeneficiaiares();
  }

  loadBeneficiaiares(): void {
    this.utilisateurService.getAllUtilisateurs().subscribe(
      (utilisateurs: Utilisateur[]) => {
        this.apiData = utilisateurs;
        this.initializeDataTables();
      },
      (error) => {
        console.error('Erreur lors du chargement des Utilisateurs:', error);
      }
    );
  }

  initializeDataTables(): void {
    const table = $('#example').DataTable();

    if (table && $.fn.DataTable.isDataTable('#example')) {
      // DataTable instance exists, destroy it before reinitializing
      table.destroy();
    }
    // Use setTimeout to ensure DataTables is initialized after Angular view rendering
    setTimeout(() => {
      $('#example').DataTable({
        lengthMenu: [
          [5, 8],
          [5, 8],
        ],
      });
    }, 0);
  }

  onFormationAdded(): void {
    this.hideModal('#CT');
    this.toastr.success('Formation ajoutée avec succès.', 'Succès', { closeButton: false, timeOut: 3300 });
    setTimeout(() => {
      location.reload();
    }, 3300);
  }

  onFormationUpdated(): void {
    this.hideModal('#MT');
    this.toastr.success('Formation mise à jour avec succès', 'Succès', { closeButton: false, timeOut: 3300 });
    setTimeout(() => {
      location.reload();
    }, 3300);
  }

  onFormationDeleted(): void {
    this.hideModal('#ST');
    this.toastr.success('Formation supprimée avec succès', 'Succès', { closeButton: false, timeOut: 3300 });
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

  setSelectedUtilisateurCode(id: number | undefined, idF: number | undefined): void {
    if (id !== undefined && idF !== undefined) {
      this.selectedFormationId = idF;
      this.utilisateurService.getUtilisateurById(id).subscribe(
        (utilisateur: Utilisateur) => {
          this.selectedUtilisateur = utilisateur;
          if (this.selectedUtilisateur.formations) {
            const selectedFormation = this.selectedUtilisateur.formations.find(
              (formation) => formation.id === this.selectedFormationId
            );
            if (selectedFormation) {
              this.formation = selectedFormation;
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
}
