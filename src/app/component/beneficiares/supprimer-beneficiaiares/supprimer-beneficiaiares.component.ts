import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Utilisateur } from 'src/app/modeles/Utilisateur';
import { UserService } from './../../services/User/user.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;


@Component({
  selector: 'app-supprimer-beneficiaiares',
  templateUrl: './supprimer-beneficiaiares.component.html',
  styleUrls: ['./supprimer-beneficiaiares.component.scss']
})
export class SupprimerBeneficiaiaresComponent {
  @Input() selectedUtilisateur: Utilisateur ={
    idRole: {
      id: 2,
      nom: 'user',
      description: 'User role'
    }
  };
  constructor(private utilisateurService: UserService,private toastr: ToastrService,private router: Router) {}
  @Output() utilisateurDelete: EventEmitter<void> = new EventEmitter<void>();
  onSubmit(): void {


    if (this.selectedUtilisateur?.id !== undefined) {
      this.utilisateurService.deleteUtilisateur(this.selectedUtilisateur.id).subscribe(
        (response) => {
          console.log('Thématique supprimée avec succès.');
          // this.toastr.success('Thématique mise à jour avec succès', 'Succès');
          this.selectedUtilisateur = {}; // Reset the thematique object
          $('#ST').modal('hide');
          this.utilisateurDelete.emit(); // Notify parent component

        },
        (error) => {
          console.error('Erreur lors de la suppression de la thématique:', error);
          this.toastr.error('Erreur lors de la suppression de la thématique', 'Erreur');
        }
      );
    } else {
      console.warn('ID de thématique est indéfini.');
    }
  }
}
