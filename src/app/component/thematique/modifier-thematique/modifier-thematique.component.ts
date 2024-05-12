import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Thematique } from 'src/app/modeles/Thematique';
import { ThematiqueService } from '../../services/Thematique/thematique.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modifier-thematique',
  templateUrl: './modifier-thematique.component.html',
  styleUrls: ['./modifier-thematique.component.scss']
})
export class ModifierThematiqueComponent {
  @Input() selectedThematique: Thematique ={};
  @Output() thematiqueUpdate: EventEmitter<void> = new EventEmitter<void>();
  constructor(private thematiqueService: ThematiqueService,private toastr: ToastrService,private router: Router) {}
  onSubmit(): void {
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
