import { GroupService } from './../../services/Group/group.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { Utilisateur } from 'src/app/modeles/Utilisateur';
import { UserService } from '../../services/User/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ThematiqueService } from '../../services/Thematique/thematique.service';
import { Thematique } from 'src/app/modeles/Thematique';
import { Group } from 'src/app/modeles/Groupe';
declare var $: any;

@Component({
  selector: 'app-create-affectation',
  templateUrl: './create-affectation.component.html',
  styleUrls: ['./create-affectation.component.scss'],
})
export class CreateAffectationComponent {
  constructor(
    private thematiqueService: ThematiqueService,
    private utilisateurService: UserService,
    private groupservice: GroupService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  selectedbeneficiare: any;
  selectedThematique: any;
  selectedGroupe: any;
  apiData: Utilisateur[] = [];
  apiDatathematique: Thematique[] = [];
  apiDatagroup: Group[] = [];

  ngOnInit(): void {
    this.loadBeneficiaiares();
    this.loadThematiques();
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
        // console.log('Thematiques:', this.apiDatathematique);
      },
      (error) => {
        console.error('Erreur lors du chargement des thématiques:', error);
      }
    );
  }

  onThematiqueChange() {
    this.selectedGroupe = this.selectedThematique.groupes[0]; // Assuming you want to select the first groupe by default
  }
  @Output() utilisateurAdded: EventEmitter<void> = new EventEmitter<void>();
  afecterUserToGroup() {
    if (
      !this.selectedGroupe ||
      !this.selectedThematique ||
      !this.selectedbeneficiare
    ) {
      this.toastr.warning(
        'Veuillez remplir tous les champs requis.',
        'Champs requis manquants'
      );
      return;
    }

    this.groupservice
      .assignUserToGroup(this.selectedbeneficiare, this.selectedGroupe)
      .subscribe(
        (data) => {
          console.log('Bénéficiare affecté au groupe avec succès !', data);
          this.toastr.success(
            'Bénéficiare affecté au groupe avec succès !',
            'Succès'
          );
          this.utilisateurAdded.emit();
        },
        (error) => {
          console.error('Error during affectation:', error);
          if (error.status === 400) {
            this.toastr.error(error.error, 'Erreur');
          }
          if (error.status === 200) {
            this.toastr.success(
              'Bénéficiare affecté au groupe avec succès !',
              'Succès'
            );
          }
          // else {
          //   this.toastr.error(
          //     "Une erreur  lors de affectation.",
          //     'Erreur'
          //   );
          //   console.log('sdfsdfsdfsd')
          //   console.log(this.selectedGroupe)
          //   console.log(this.selectedbeneficiare)
          // }
        }
      );        this.initializeDataTables();

  }
  initializeDataTables(): void {
    const table = $('#example').DataTable();

    if (table && $.fn.DataTable.isDataTable('#example')) {
      // DataTable instance exists, destroy it before reinitializing
      table.destroy();
    }
    // Utiliser setTimeout pour garantir que DataTables est initialisé après le rendu de la vue Angular
    setTimeout(() => {
      $('#example').DataTable({
        lengthMenu: [
          [5, 8],
          [5, 8],
        ],
      });
    }, 0);
  }
}
