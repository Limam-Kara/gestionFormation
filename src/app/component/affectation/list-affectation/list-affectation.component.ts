import { Component, OnInit } from '@angular/core';
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
export class ListAffectationComponent implements OnInit {
  selectedbeneficiare: any;
  selectedThematique: any;
  selectedGroupe: any;
  selectedUtilisateur: Utilisateur = {};
  apiDatagroup: Group[] = [];
  them: Them[] = [];
  themT: Them[] = [];
  user: Them = {};
  dataTableInitialized = false;

  constructor(
    private thematiqueService: ThematiqueService,
    private groupservice: GroupService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.loadgroup();
  }

  loadgroup(): void {
    this.groupservice.getAllGroups().subscribe(
      (groups: Group[]) => {
        this.destroyDataTables(); // Destroy existing DataTable instance
        this.them = []; // Clear existing data
        this.themT = []; // Clear existing data

        const fetchPromises: any[] = [];
        groups.forEach((group) => {
          group.utilisateurs.forEach((utilisateur) => {
            const fetchPromise = this.thematiqueService.getThematiqueByGroupeId(group.id).toPromise();
            fetchPromises.push(fetchPromise);
          });
        });

        Promise.all(fetchPromises).then((thematiques: Thematique[]) => {
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
          this.reinitializeDataTables(); // Reinitialize DataTables
        }).catch((error) => {
          console.error('Erreur lors du chargement des thématiques:', error);
        });
      },
      (error) => {
        console.error('Erreur lors du chargement des groupes:', error);
      }
    );
  }

  destroyDataTables(): void {
    if (this.dataTableInitialized) {
      $('#example').DataTable().destroy();
      this.dataTableInitialized = false;
    }
  }

  reinitializeDataTables(): void {
    if (!this.dataTableInitialized) {
      setTimeout(() => {
        $('#example').DataTable({
          lengthMenu: [
            [5, 8],
            [5, 8],
          ],
        });
        this.dataTableInitialized = true;
      }, 0);
    }
  }

  onUtilisateurDeleted(): void {
    this.hideModal('#ST');
    this.toastr.success('Utilisateur retiré du groupe avec succès !', 'Succès', { closeButton: false, timeOut: 3300 });
    setTimeout(() => {
      location.reload();
    }, 3300);
  }

  onUtilisateurUpdated(): void {
    this.hideModal('#MT');
    this.toastr.success('Bénéficiare affecté au groupe avec succès !', 'Succès', { closeButton: false, timeOut: 3300 });
    setTimeout(() => {
      location.reload();
    }, 3300);
  }

  onUtilisateurAdded(): void {
    this.hideModal('#CT');
    this.toastr.success('Bénéficiare affecté au groupe avec succès !', 'Succès', { closeButton: false, timeOut: 3300 });
    setTimeout(() => {
      location.reload();
    }, 3300);
  }

  hideModal(modalId: string): void {
    $(modalId).modal('hide');
    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open');
    $(modalId).on('hidden.bs.modal', () => {
      $(modalId).off('hidden.bs.modal');
    });
  }

  setSelectedUtilisateurCode(groupe: any, intitule: any, ppr: any): void {
    if (groupe && intitule && ppr && this.themT.length > 0) {
      let foundUser: Them | undefined;
      for (const user of this.themT) {
        const userData = user as Them; // Cast user to the Them interface for type safety
        if (
          userData.groupe === groupe &&
          userData.intitule === intitule &&
          userData.ppr?.ppr === ppr
        ) {
          foundUser = userData;
          break;
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
}
