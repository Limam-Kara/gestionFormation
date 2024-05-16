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
  selector: 'app-modifier-affectation',
  templateUrl: './modifier-affectation.component.html',
  styleUrls: ['./modifier-affectation.component.scss']
})
export class ModifierAffectationComponent {
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
    this.loadBeneficiaiares();
    this.loadThematiques();
    // console.log(this.user)
    console.log('User in parent component:', this.user);
  }

  loadBeneficiaiares(): void {
    this.utilisateurService.getAllUtilisateurs().subscribe(
      (utilisateur: Utilisateur[]) => {
        this.apiData = utilisateur;
        // console.log('Utilisateur:', this.apiData);
      },
      (error) => {
        console.error('Erreur lors du chargement des Utilisateur:', error);
      }
    );
  }
  loadThematiques(): void {
    this.thematiqueService.getAllThematiques().subscribe(
      (thematiques: Thematique[]) => {
        this.apiDatathematique = thematiques;

        // Ensure user.prenom and thematique.id are both strings for comparison
        if (this.user && this.user.prenom) {
          this.selectedThematique = this.apiDatathematique.find((thematique) =>
            thematique.id?.toString() === this.user.prenom.toString()
          );
        }

        if (this.selectedThematique) {
          console.log('Thematiques:', this.selectedThematique);
        } else {
          console.log('No matching thematique found for user prenom:', this.user?.prenom);
        }
      },
      (error) => {
        console.error('Erreur lors du chargement des thématiques:', error);
      }
    );
  }
  @Output() utilisateurUpdated: EventEmitter<void> = new EventEmitter<void>();
  onThematiqueChange() {
    this.selectedGroupe = this.selectedThematique.groupes[0]; // Assuming you want to select the first groupe by default
  }
  updateUserToGroup() {
    console.log(this.user.ppr.id,this.user.id_groupe)
    // if (
    //   !this.selectedGroupe ||
    //   !this.selectedThematique ||
    //   !this.selectedbeneficiare
    // ) {
    //   this.toastr.warning(
    //     'Veuillez remplir tous les champs requis.',
    //     'Champs requis manquants'
    //   );
    //   return;
    // }
    this.groupservice
      .updateGroupAndAssignUser(this.user.ppr.id, this.user.id_groupe)
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
            this.utilisateurUpdated.emit()

          }

        }
      );
  }
}
