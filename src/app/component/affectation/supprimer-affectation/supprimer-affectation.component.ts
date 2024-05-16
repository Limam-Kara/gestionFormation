import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Group } from 'src/app/modeles/Groupe';
import { Thematique } from 'src/app/modeles/Thematique';
import { Utilisateur } from 'src/app/modeles/Utilisateur';
import { GroupService } from '../../services/Group/group.service';
import { ThematiqueService } from '../../services/Thematique/thematique.service';
import { UserService } from '../../services/User/user.service';
interface Them {
  ppr?: any;
  nom?: any;
  prenom?: any;
  intitule?: any;
  groupe?: any;
  id_groupe?: any;
}
@Component({
  selector: 'app-supprimer-affectation',
  templateUrl: './supprimer-affectation.component.html',
  styleUrls: ['./supprimer-affectation.component.scss']
})

export class SupprimerAffectationComponent {
  constructor(
    private thematiqueService: ThematiqueService,
    private utilisateurService: UserService,
    private groupservice: GroupService,
    private toastr: ToastrService,
    private router: Router
  ) { }
  selectedbeneficiare: any;
  selectedThematique: any;
  selectedGroupe: any;
  apiData: Utilisateur[] = [];
  apiDatathematique: Thematique[] = [];
  apiDatagroup: Group[] = [];
  @Input() user: Them = {
    ppr: {
      id: 1,
      ppr: "12345",
      nom: "Doe",
      prenom: "John",
      fonction: "Developer",
      // Other properties...
    },
    nom: "Doe",
    prenom: "John",
    intitule: "Advanced Java Programming",
    groupe: "Groupe 1"
  };
  ngOnInit(): void {
    // console.log(this.user)
    console.log('User in parent component:', this.user);
  }
  @Output() utilisateurdeleted: EventEmitter<void> = new EventEmitter<void>();
  onThematiqueChange() {
    this.selectedGroupe = this.selectedThematique.groupes[0]; // Assuming you want to select the first groupe by default
  }
  removeUserFromGroup() {
    console.log(this.user.ppr.id,this.user.id_groupe)
    this.groupservice
      .removeUserFromGroup(this.user.ppr.id, this.user.id_groupe)
      .subscribe(
        (data) => {
          console.log('Bénéficiare affecté au groupe avec succès !', data);
          this.toastr.success(
            'Bénéficiare affecté au groupe avec succès !',
            'Succès'
          );
        },
        (error) => {
          console.error('Error during affectation:', error);
          if (error.status === 400) {
            this.toastr.error(error.error, 'Erreur');
          }
          if (error.status === 200) {
            this.utilisateurdeleted.emit();
          }

        }
      );
  }
}
