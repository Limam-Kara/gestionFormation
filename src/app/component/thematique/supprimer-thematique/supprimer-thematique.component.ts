import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Thematique } from 'src/app/modeles/Thematique';
import { ThematiqueService } from '../../services/Thematique/thematique.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-supprimer-thematique',
  templateUrl: './supprimer-thematique.component.html',
  styleUrls: ['./supprimer-thematique.component.scss']
})
export class SupprimerThematiqueComponent {
  @Input() selectedThematique: Thematique ={};
  @Output() thematiqueDelete: EventEmitter<void> = new EventEmitter<void>();
  constructor(private thematiqueService: ThematiqueService,private toastr: ToastrService,private router: Router) {}
  onSubmit(): void {
    if (this.selectedThematique?.id !== undefined) {
      this.thematiqueService.deleteThematiqueById(this.selectedThematique.id).subscribe(
        (response) => {
          console.log('Thématique supprimée avec succès.');
          // this.toastr.success('Thématique mise à jour avec succès', 'Succès');
          this.selectedThematique = {}; // Reset the thematique object
          $('#ST').modal('hide');
          this.thematiqueDelete.emit(); // Notify parent component

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
