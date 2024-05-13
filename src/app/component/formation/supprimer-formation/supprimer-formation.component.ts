import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../../services/User/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Utilisateur } from 'src/app/modeles/Utilisateur';
import { FormationService } from '../../services/formation/formation.service';
import { Formation } from 'src/app/modeles/Formations';
declare var $: any;
@Component({
  selector: 'app-supprimer-formation',
  templateUrl: './supprimer-formation.component.html',
  styleUrls: ['./supprimer-formation.component.scss']
})
export class SupprimerFormationComponent {
  @Input() selectedUtilisateur: Utilisateur ={};
  @Input() selectedFormationId: number =0
  @Input() formation: Formation = {};
  @Output() formationDeleted: EventEmitter<void> = new EventEmitter<void>();
  constructor(private formationService: FormationService,private utilisateurService: UserService, private toastr: ToastrService, private router: Router) { }
  onSubmit(): void {
    if (this.formation) {
      const formationPayload:Formation = {
        id: this.formation.id,
        specialite: this.formation.specialite,
        diplome: this.formation.diplome,
        niveauEtude: this.formation.niveauEtude,
        utilisateur: {
          id: this.selectedUtilisateur.id}
      };
      console.log('Selected Formation:', formationPayload);
      if (formationPayload.id) {
        this.formationService.deleteFormationById(formationPayload.id).subscribe(
          (response) => {
            console.log('Formation deleted successfully:', response);
            this.formation = {};
            this.formationDeleted.emit();
          },
          (error) => {
            console.error('Error deleted Formation:', error);
            if (error.status === 400) {
              this.toastr.error('La formation existe déjà avec les mêmes critères.', 'Erreur');
            } else {
              this.toastr.error('Une erreur s\'est produite lors de la suppresion de la Formation.', 'Erreur');
            }
          }
        );
      }


    } else {
      this.toastr.error('No formation selected.');
    }
  }
}
