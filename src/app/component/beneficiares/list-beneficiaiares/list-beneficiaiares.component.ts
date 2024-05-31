import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utilisateur } from 'src/app/modeles/Utilisateur';
import { UserService } from './../../services/User/user.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-list-beneficiaiares',
  templateUrl: './list-beneficiaiares.component.html',
  styleUrls: ['./list-beneficiaiares.component.scss'],
})
export class ListBeneficiaiaresComponent implements OnInit {
  apiData: Utilisateur[] = [];
  selectedUtilisateur: Utilisateur = {};

  constructor(private utilisateurService: UserService, private toastr: ToastrService, private router: Router) { }

  onUtilisateurAdded(): void {
    this.hideModal('#CT');
    this.toastr.success('Utilisateur ajouté avec succès', 'Succès', { closeButton: false, timeOut: 3300 });
    setTimeout(() => {
      location.reload();
    }, 3300);
  }

  onUtilisateurUpdated(): void {
    this.hideModal('#MT');
    this.toastr.success('Utilisateur mise à jour avec succès', 'Succès', { closeButton: false, timeOut: 3300 });
    setTimeout(() => {
      location.reload();
    }, 3300);
  }

  onUtilisateurDeleted(): void {
    this.hideModal('#ST');
    this.toastr.success('Utilisateur supprimé avec succès', 'Succès', { closeButton: false, timeOut: 3300 });
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

  setSelectedUtilisateurCode(id: number | undefined): void {
    if (id !== undefined) {
      this.utilisateurService.getUtilisateurById(id).subscribe(
        (utilisateur: Utilisateur) => {
          this.selectedUtilisateur = utilisateur;
          console.log(this.selectedUtilisateur);
        },
        (error) => {
          console.error('Erreur lors du chargement de la thématique:', error);
        }
      );
    } else {
      console.warn('ID de thématique est indéfini.');
    }
  }

  ngOnInit(): void {
    this.loadBeneficiaiares();
  }

  loadBeneficiaiares(): void {
    this.utilisateurService.getAllUtilisateurs().subscribe(
      (utilisateurs: Utilisateur[]) => {
        this.apiData = utilisateurs.filter((z) => z.account === true);
        console.log('Utilisateurs:', this.apiData);
        // Réinitialiser DataTables une fois que les données sont chargées
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
}
