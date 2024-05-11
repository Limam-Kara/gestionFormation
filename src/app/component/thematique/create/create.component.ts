import { Component } from '@angular/core';
import { Thematique } from 'src/app/modeles/Thematique';
import { ThematiqueService } from '../../services/Thematique/thematique.service';

@Component({
  selector: 'app-create-thematiques',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateThematiquesComponent {
  thematique: Thematique ={ }// Initialize a new Thematique object

  constructor(private thematiqueService: ThematiqueService) {}

  onSubmit(): void {
    this.thematiqueService.saveThematique(this.thematique).subscribe(
      (response) => {
        console.log('Thématique added successfully:', response);
        this.thematique={}
        
        // Optionally, reset the form or perform other actions after successful submission
      },
      (error) => {
        console.error('Error adding Thématique:', error);
      }
    );
  }
}
