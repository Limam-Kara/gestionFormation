import { HttpClient } from '@angular/common/http';
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
export class ListBeneficiaiaresComponent implements OnInit{
  apiData: Utilisateur[] = [];
  selectedUtilisateur:Utilisateur= {};
  constructor(private utilisateurService: UserService,private toastr: ToastrService,private router: Router) {}
  onUtilisateurAdded(): void {
    // Refresh the list after adding a thematique
    // this.load();
    $('#CT').modal('hide');

    // Remove the modal backdrop manually
    $('.modal-backdrop').remove();

    // Optionally, you can also reset the body class to remove the modal-open class
    $('body').removeClass('modal-open');

    this.toastr.success('Utilisateur ajouté avec succès', 'Succès');
    this.ngOnInit();
  }
  onUtilisateurUpdated(): void {
    // Refresh the list after adding a thematique
    // this.load();
    $('#MT').modal('hide');

    // Remove the modal backdrop manually
    $('.modal-backdrop').remove();

    // Optionally, you can also reset the body class to remove the modal-open class
    $('body').removeClass('modal-open');

    this.toastr.success('Utilisateur mise à jour avec succès', 'Succès');
    this.ngOnInit();
  }
  onUtilisateurDeleted(): void {
    // Refresh the list after adding a thematique
    // this.load();
    $('#ST').modal('hide');

    // Remove the modal backdrop manually
    $('.modal-backdrop').remove();

    // Optionally, you can also reset the body class to remove the modal-open class
    $('body').removeClass('modal-open');

    this.toastr.success('Utilisateur supprimée avec succès', 'Succès');
    this.ngOnInit();
  }
    // Static data definition
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
        (utilisateur: Utilisateur[]) => {
          this.apiData = utilisateur;
          console.log('Utilisateur:', this.apiData);
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
