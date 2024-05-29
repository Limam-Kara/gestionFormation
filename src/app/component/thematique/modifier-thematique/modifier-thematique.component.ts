import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Thematique } from 'src/app/modeles/Thematique';
import { ThematiqueService } from '../../services/Thematique/thematique.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-modifier-thematique',
  templateUrl: './modifier-thematique.component.html',
  styleUrls: ['./modifier-thematique.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class ModifierThematiqueComponent {
  thematiques = {
    dateDebut: 0,
    dateFin:0
  };
  @Input() selectedThematique: Thematique ={};
  @Output() thematiqueUpdate: EventEmitter<void> = new EventEmitter<void>();
  constructor(private thematiqueService: ThematiqueService,private toastr: ToastrService,private router: Router) {}
  dateFinControl = new FormControl('', Validators.min(this.thematiques.dateDebut));
  validateDates() {
    // Update dateFinControl validity
    if (this.thematiques.dateDebut) {
      this.dateFinControl.setValidators([Validators.min(this.thematiques.dateDebut)]);
    }
    this.dateFinControl.updateValueAndValidity();
  }

  isDateFinDisabled() {
    return !this.selectedThematique.dateDebut;
  }

  onSubmit(): void {
    if (!this.selectedThematique.coutLogistique || !this.selectedThematique.coutPedagogique || !this.selectedThematique.dateDebut ||
      !this.selectedThematique.dateFin || !this.selectedThematique.domaineFormation  ||
      !this.selectedThematique.intitule || !this.selectedThematique.nbrFormateurExtr|| !this.selectedThematique.nbrFormateurIntr || !this.selectedThematique.nbrGroupe ||
      !this.selectedThematique.nbrJoursFormation || !this.selectedThematique.objectif|| !this.selectedThematique.populationCible|| !this.selectedThematique.prestataire) {
    this.toastr.warning('Veuillez remplir tous les champs obligatoires', 'Champs requis manquants');
    return; // Stop further execution
  }else{
     if (this.selectedThematique?.id !== undefined) {
      this.thematiqueService.updateThematique(this.selectedThematique.id, this.selectedThematique).subscribe(
        (response) => {
          console.log('Thématique updated successfully:', response);
          // this.toastr.success('Thématique mise à jour avec succès', 'Succès');
          this.selectedThematique = {}; // Reset the thematique object
          this.thematiqueUpdate.emit(); // Notify parent component
        },
        (error) => {
          console.error('Error updating Thématique:', error);
          this.toastr.error('Erreur lors de la mise à jour de la thématique', 'Erreur');
        }
      );
    } else {
      console.warn('ID de thématique est indéfini.');
    }
  }

  }
}
