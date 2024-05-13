import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../services/User/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Utilisateur } from 'src/app/modeles/Utilisateur';
import { FormationService } from '../../services/formation/formation.service';
import { Formation } from 'src/app/modeles/Formations';
declare var $: any;
@Component({
  selector: 'app-create-formation',
  templateUrl: './create-formation.component.html',
  styleUrls: ['./create-formation.component.scss']
})
export class CreateFormationComponent {
  constructor(private formationService: FormationService,private utilisateurService: UserService, private toastr: ToastrService, private router: Router) { }
  apiData: Utilisateur[] = [];
  formation: Formation = {};
  ngOnInit(): void {
    this.loadBeneficiaiares();
  }

  loadBeneficiaiares(): void {
    this.utilisateurService.getAllUtilisateurs().subscribe(
      (utilisateur: Utilisateur[]) => {
        this.apiData = utilisateur;
        console.log('Utilisateur:', this.apiData);
      },
      (error) => {
        console.error('Erreur lors du chargement des Utilisateur:', error);
      }
    );
  }
  @Output() formationAdded: EventEmitter<void> = new EventEmitter<void>();
  onSubmit(): void {
    if (!this.formation.utilisateur || !this.formation.diplome || !this.formation.niveauEtude || !this.formation.specialite) {
      this.toastr.warning('Veuillez remplir tous les champs requis.', 'Champs requis manquants');
      return;
    }

    const formationPayload:Formation = {
      specialite: this.formation.specialite,
      diplome: this.formation.diplome,
      niveauEtude: this.formation.niveauEtude,
      utilisateur: {
        id: this.formation.utilisateur.id}
    };
    console.log(formationPayload)
    this.formationService.saveFormation(formationPayload).subscribe(
      (response) => {
        console.log('Formation created successfully:', response);
        this.toastr.success('Formation ajoutée avec succès.', 'Succès');
        this.formation = {};
        this.formationAdded.emit();
      },
      (error) => {
        console.error('Error creating Formation:', error);
        if (error.status === 400) {
          this.toastr.error('La formation existe déjà avec les mêmes critères.', 'Erreur');
        } else {
          this.toastr.error('Une erreur s\'est produite lors de l\'ajout de la Formation.', 'Erreur');
        }
      }
    );
  }
}
