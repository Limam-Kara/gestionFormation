import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Group } from 'src/app/modeles/Groupe';
import { Thematique } from 'src/app/modeles/Thematique';
import { Utilisateur } from 'src/app/modeles/Utilisateur';
import { GroupService } from '../../services/Group/group.service';
import { ThematiqueService } from '../../services/Thematique/thematique.service';
declare var $: any;
interface Them {
  ppr?: any;
  nom?: any;
  prenom?: any;
  intitule?: any;
  groupe?: any;
  id_groupe?: any;
}
@Component({
  selector: 'app-list-affectation',
  templateUrl: './list-affectation.component.html',
  styleUrls: ['./list-affectation.component.scss'],
})
export class ListAffectationComponent {
  constructor(
    private thematiqueService: ThematiqueService,
    private groupservice: GroupService,
    private toastr: ToastrService,
  ) {}
  selectedbeneficiare: any;
  selectedThematique: any;
  selectedGroupe: any;
  selectedUtilisateur: Utilisateur = {};
  apiDatagroup: Group[] = [];
  them: Them[] = [];
  themT: Them[] = [];
  user: Them = {};
  dataTableInitialized = false;
  setSelectedUtilisateurCode(groupe: any, intitule: any, ppr: any): void {
    // Check if all parameters are defined and non-empty
    if (groupe && intitule && ppr && this.themT.length > 0) {
      let foundUser: Them | undefined;
      for (const user of this.themT) {
        const userData = user as Them; // Cast user to the Them interface for type safety
        // Check if user matches all specified criteria
        if (
          userData.groupe === groupe &&
          userData.intitule === intitule &&
          userData.ppr?.ppr === ppr
        ) {
          foundUser = userData;
          break; // Exit loop once user is found
        }
      }
      if (foundUser) {
        this.user = foundUser;
        console.log('User found:', this.user);
      } else {
        console.log(`User not found for groupe '${groupe}', intitule '${intitule}', ppr '${ppr}'.`);
      }
    } else {
      console.log('Invalid parameters provided or data is empty.');
    }
  }
  ngOnInit(): void {
    this.them= [];
    this.loadgroup();
  }
  loadgroup(): void {

    this.groupservice.getAllGroups().subscribe(
      (groups: Group[]) => {
        this.them = []; // Clear existing data
        this.themT = []; // Clear existing data
        // Collect all promises from Thematique requests
        const fetchPromises: any[] = [];
        groups.forEach((group) => {
          group.utilisateurs.forEach((utilisateur) => {
            const fetchPromise = this.thematiqueService.getThematiqueByGroupeId(group.id).toPromise();
            fetchPromises.push(fetchPromise);
          });
        });
        // Wait for all Thematique requests to complete
        Promise.all(fetchPromises).then((thematiques: Thematique[]) => {
          // Now populate this.them with user and thematique data
          let index = 0;
          groups.forEach((group) => {
            group.utilisateurs.forEach((utilisateur) => {
              const int = thematiques[index];
              this.them.push({
                ppr: utilisateur.ppr,
                nom: utilisateur.nom,
                prenom: utilisateur.prenom,
                intitule: int.intitule,
                groupe: group.numGroupe,
              });
              this.themT.push({
                ppr: utilisateur,
                nom: int.groupes,
                prenom: int.id,
                intitule: int.intitule,
                groupe: group.numGroupe,
                id_groupe: group.id,
              });
              index++;
            });
          });
            // Reinitialize DataTables if not initialized yet
            if (!this.dataTableInitialized) {
              this.initializeDataTables();
              this.dataTableInitialized = true;
            }
        }).catch((error) => {
          console.error('Erreur lors du chargement des thématiques:', error);
        });
      },
      (error) => {
        console.error('Erreur lors du chargement des groupes:', error);
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
  onUtilisateurDeleted(): void {
    // Refresh the list after adding a thematique
    // this.load();
    $('#ST').modal('hide');
    // Remove the modal backdrop manually
    $('.modal-backdrop').remove();
    // Optionally, you can also reset the body class to remove the modal-open class
    $('body').removeClass('modal-open');
    this.toastr.success(
      'Utilisateur retiré du groupe avec succès !',
      'Succès'
    );
    this.ngOnInit(); // Call the new method to refresh the data
  }
  onUtilisateurUpdated(): void {
    // Refresh the list after adding a thematique
    // this.load();
    $('#MT').modal('hide');
    // Remove the modal backdrop manually
    $('.modal-backdrop').remove();
    // Optionally, you can also reset the body class to remove the modal-open class
    $('body').removeClass('modal-open');
    this.toastr.success(
      'Bénéficiare affecté au groupe avec succès !',
      'Succès'
    );
    this.ngOnInit();
  }
  onUtilisateurAdded(): void {
    // Refresh the list after adding a thematique
    // this.load();
    $('#CT').modal('hide');
    // Remove the modal backdrop manually
    $('.modal-backdrop').remove();
    // Optionally, you can also reset the body class to remove the modal-open class
    $('body').removeClass('modal-open');
    this.toastr.success(
      'Bénéficiare affecté au groupe avec succès !',
      'Succès'
    );
    this.ngOnInit();
  }
}
