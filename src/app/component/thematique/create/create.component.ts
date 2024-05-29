import { Component, EventEmitter, Output } from '@angular/core';
import { Thematique } from 'src/app/modeles/Thematique';
import { ThematiqueService } from '../../services/Thematique/thematique.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-thematiques',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateThematiquesComponent {
  thematique: Thematique = {}; // Initialize a new Thematique object
  thematiques = {
    dateDebut: 0,
    dateFin:0
  };
  constructor(
    private thematiqueService: ThematiqueService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  @Output() thematiqueAdded: EventEmitter<void> = new EventEmitter<void>();
  onSubmit(): void {
     // Check for required fields
     if (!this.thematique.coutLogistique || !this.thematique.coutPedagogique || !this.thematique.dateDebut ||
      !this.thematique.dateFin || !this.thematique.domaineFormation  ||
      !this.thematique.intitule || !this.thematique.nbrFormateurExtr|| !this.thematique.nbrFormateurIntr || !this.thematique.nbrGroupe ||
      !this.thematique.nbrJoursFormation || !this.thematique.objectif|| !this.thematique.populationCible|| !this.thematique.prestataire) {
    this.toastr.warning('Veuillez remplir tous les champs obligatoires', 'Champs requis manquants');
    return; // Stop further execution
  }else{
     this.thematiqueService.saveThematique(this.thematique).subscribe(
      (response) => {
        console.log('Thématique added successfully:', response);
        // this.toastr.success('Thématique ajoutée avec succès', 'Succès');

        // Optionally, reset the form or perform other actions after successful submission
        this.thematique = {}; // Reset the thematique object
        this.thematiqueAdded.emit();
      },
      (error) => {
        console.error('Error adding Thématique:', error);
        this.toastr.error("Erreur lors de l'ajout de la thématique", 'Erreur');
      }
    );
  }


  }
  dateFinControl = new FormControl('', Validators.min(this.thematiques.dateDebut));

  validateDates() {
    // Update dateFinControl validity
    if (this.thematique.dateDebut) {
      this.dateFinControl.setValidators([Validators.min(this.thematiques.dateDebut)]);
    }
    this.dateFinControl.updateValueAndValidity();
  }

  isDateFinDisabled() {
    return !this.thematique.dateDebut;
  }
}
