import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../../services/User/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Utilisateur } from 'src/app/modeles/Utilisateur';
import { FormationService } from '../../services/formation/formation.service';
import { Formation } from 'src/app/modeles/Formations';
declare var $: any;
@Component({
  selector: 'app-modifier-formation',
  templateUrl: './modifier-formation.component.html',
  styleUrls: ['./modifier-formation.component.scss']
})
export class ModifierFormationComponent {
  @Input() selectedUtilisateur: Utilisateur ={};
  @Input() selectedFormationId: number =0
  @Input() formation: Formation = {};
  @Output() formationUpdated: EventEmitter<void> = new EventEmitter<void>();

  constructor(private formationService: FormationService,private utilisateurService: UserService, private toastr: ToastrService, private router: Router) { }
  apiData: Utilisateur[] = [];


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
      this.formationService.saveFormation(formationPayload).subscribe(
        (response) => {
          console.log('Formation updated successfully:', response);
          this.formation = {};
          this.formationUpdated.emit();
        },
        (error) => {
          console.error('Error updating Formation:', error);
          if (error.status === 400) {
            this.toastr.error('La formation existe déjà avec les mêmes critères.', 'Erreur');
          } else {
            this.toastr.error('Une erreur s\'est produite lors de la modification de la Formation.', 'Erreur');
          }
        }
      );

    } else {
      this.toastr.error('No formation selected.');
    }
  }
}
