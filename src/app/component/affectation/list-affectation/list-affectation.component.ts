import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Group } from 'src/app/modeles/Groupe';
import { Thematique } from 'src/app/modeles/Thematique';
import { Utilisateur } from 'src/app/modeles/Utilisateur';
import { GroupService } from '../../services/Group/group.service';
import { ThematiqueService } from '../../services/Thematique/thematique.service';
import { UserService } from '../../services/User/user.service';
declare var $: any;
interface Them {
  ppr: any;
  nom: any;
  prenom: any;
  intitule: any;
  groupe: any;
}
@Component({
  selector: 'app-list-affectation',
  templateUrl: './list-affectation.component.html',
  styleUrls: ['./list-affectation.component.scss'],
})
export class ListAffectationComponent {
  // apiData : any= [];
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
  selectedUtilisateur: Utilisateur = {};
  apiData: Utilisateur[] = [];
  apiDatathematique: Thematique[] = [];
  apiDatagroup: Group[] = [];
  them: Them[] = [];
  user: Them = {
    ppr: '',
    nom: '',
    prenom: '',
    intitule: '',
    groupe: '',
  };
  setSelectedUtilisateurCode(id: any | undefined): void {
    if (id !== undefined) {
      this.user != this.them.find((data) => (data.ppr = id));
      console.log(this.user);
    }
  }
  onUtilisateurUpdated(): void {
    // Refresh the list after adding a thematique
    // this.load();
    $('#MT').modal('hide');

    // Remove the modal backdrop manually
    $('.modal-backdrop').remove();

    // Optionally, you can also reset the body class to remove the modal-open class
    $('body').removeClass('modal-open');

    this.toastr.success('Utilisateur mise à jour avec succès', 'Succès');
    this.ngOnInit();
  }
  ngOnInit(): void {
    this.loadgroup();
    this.loadBeneficiaiares();
    this.loadThematiques();
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
  loadThematiques(): void {
    this.thematiqueService.getAllThematiques().subscribe(
      (thematiques: Thematique[]) => {
        this.apiDatathematique = thematiques;

        console.log('Thematiques:', this.apiDatathematique);
      },
      (error) => {
        console.error('Erreur lors du chargement des thématiques:', error);
      }
    );

    console.log(this.them);
  }
  loadgroup(): void {
    this.groupservice.getAllGroups().subscribe(
      (Group: Group[]) => {
        this.apiDatagroup = Group;

        // console.log('Group:', this.apiDatagroup);
        this.apiDatagroup.forEach((group) => {
          // Iterate over utilisateurs array within each group
          group.utilisateurs.forEach((utilisateur) => {
            this.thematiqueService
              .getThematiqueByGroupeId(group.id)
              .subscribe((int: Thematique) => {
                // Log the required properties
                this.them.push({
                  ppr: utilisateur.ppr,
                  nom: utilisateur.nom,
                  prenom: utilisateur.prenom,
                  intitule: int.intitule,
                  groupe: group.numGroupe,
                });
                //  console.log(`PPR: ${utilisateur.ppr}, Nom: ${utilisateur.nom}, Prénom: ${utilisateur.prenom}, thrmatique: ${int.intitule},Groupe: ${group.numGroupe}`);
                console.log(this.them.length);
                // this.initializeDataTables();

              });

          });
        });

      },
      (error) => {
        console.error('Erreur lors du chargement des thématiques:', error);
      }
    );
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
  // ngAfterViewInit(): void {
  //   setTimeout(() => {
  //     $('#example').DataTable({
  //       "lengthMenu": [[5, 8], [5, 8]] // Customize the number of entries shown
  //     });
  //   }, 0);
  // }
}
