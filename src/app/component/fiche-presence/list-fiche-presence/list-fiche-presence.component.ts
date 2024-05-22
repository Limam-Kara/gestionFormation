import { Role } from './../../../modeles/Role';
import { AbsenceService } from './../../services/absence/absence.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Thematique } from 'src/app/modeles/Thematique';
import { Beneficiaire } from 'src/app/modeles/beneficiaire';
import { ToastrService } from 'ngx-toastr';
import { ThematiqueService } from '../../services/Thematique/thematique.service';
import { GroupService } from '../../services/Group/group.service';
import { Utilisateur } from 'src/app/modeles/Utilisateur';
import { Absence } from 'src/app/modeles/Absence';
import { Group } from 'src/app/modeles/Groupe';
import { UserService } from '../../services/User/user.service';
import { firstValueFrom } from 'rxjs';
declare var $: any;
interface Them {
  id: number;
  ppr: string | undefined;
  nom: any;
  prenom: any;
  intitule: any;
  groupe: any;
  isPresent: boolean;
  idabsence: number;
  role?: any[];
}
@Component({
  selector: 'app-list-fiche-presence',
  templateUrl: './list-fiche-presence.component.html',
  styleUrls: ['./list-fiche-presence.component.scss'],
})
export class ListFichePresenceComponent {
  // apiData: Formation[];
  apiDatafr: Utilisateur = {};

  formationForm!: FormGroup;

  joursFormation: string[] = [];
  selectedThematique!: Thematique;
  selectedGroupe: any;
  selecteddate!: Date;
  apiData: Thematique[] = [];
  absents!: Absence;
  absentss: Absence[] = [];
  apiDatagroup: Group[] = [];
  absences: Absence[] = [];
  absencesfltr: Absence[] = [];
  title = '';
  them: Them[] = [];
  themfltr: Them[] = [];
  user: Them = {
    ppr: '',
    nom: '',
    prenom: '',
    intitule: '',
    groupe: '',
    isPresent: true,
    id: 0,
    idabsence: 0,
  };

  thematique_choisi!: Thematique;

  constructor(
    private thematiqueService: ThematiqueService,
    private groupservice: GroupService,
    private absenceService: AbsenceService,
    private utilisateurService: UserService,
    private toastr: ToastrService
  ) {}
  onThematiqueChange() {
    if (this.selectedThematique) {
      this.selectedGroupe = this.selectedThematique.groupes; // Assuming you want to select the first groupe by default
    }
    this.selecteddate = new Date();
    this.themfltr = [];
  }
  ngOnInit(): void {
    this.loadThematiques();
    // this.loadgroup();
    this.getAllAbsences();
  }
  ff() {
    this.selecteddate = new Date();
    this.themfltr = [];

    console.log(this.selectedGroupe);
  }
  // loadgroup(): void {
  //   // Call the service method to get all groups
  //   let i = 1;
  //   this.groupservice.getAllGroups().subscribe(
  //     (Group: Group[]) => {
  //       // Assign the fetched groups to the local variable apiDatagroup
  //       this.apiDatagroup = Group;

  //       // Iterate over each group
  //       this.apiDatagroup.forEach((group) => {
  //         // Iterate over each user within the current group
  //         group.utilisateurs.forEach((utilisateur) => {
  //           // For each user, fetch the associated thematique by group ID
  //           this.thematiqueService
  //             .getThematiqueByGroupeId(group.id)
  //             .subscribe((int: Thematique) => {
  //               // Add the user information along with thematique and group details to the them list
  //               this.them.push({
  //                 id: utilisateur.id || 0,
  //                 ppr: utilisateur.ppr,
  //                 nom: utilisateur.nom,
  //                 prenom: utilisateur.prenom,
  //                 intitule: int.intitule,
  //                 groupe: group.numGroupe,
  //                 isPresent: false,
  //                 idabsence: i + group.id + (utilisateur.id || 0),
  //                 // Default value
  //               });
  //               // Optional: log the details for debugging purposes
  //               console.log(
  //                 `PPR: ${utilisateur.ppr}, Nom: ${utilisateur.nom}, Prénom: ${utilisateur.prenom}, Thématique: ${int.intitule}, Groupe: ${group.numGroupe}`
  //               );
  //               console.log(this.them.length);
  //               // Optional: initialize data tables or other UI components if necessary
  //               // this.initializeDataTables();
  //             });
  //         });
  //       });
  //     },
  //     (error) => {
  //       // Handle any errors that occur during the fetching process
  //       console.error('Erreur lors du chargement des thématiques:', error);
  //     }
  //   );
  // }
  filterJoursFormation(): void {
    this.thematique_choisi = this.selectedThematique;
    if (!this.thematique_choisi) {
      // this.apiDatafr = [];
      this.joursFormation = [];
    }
    if (this.thematique_choisi) {
      const selectedFormation = this.apiData.find(
        (data) => data.id === this.selectedThematique.id
      );

      // //console.log(
      //   selectedFormation?.dateDebut + '  ' + selectedFormation?.dateFin
      // );
      if (selectedFormation?.dateDebut && selectedFormation.dateFin) {
        // Récupérer les jours entre la startDate et la endDate
        const startDate = new Date(selectedFormation.dateDebut);
        const endDate = new Date(selectedFormation.dateFin);
        const joursArray = [];

        for (
          let date = startDate;
          date <= endDate;
          date.setDate(date.getDate() + 1)
        ) {
          joursArray.push(date.toISOString().split('T')[0]); // Convertir la date en format ISO (YYYY-MM-DD)
        }

        this.joursFormation = joursArray;
      }
    } else {
      this.joursFormation = []; // Réinitialiser la liste des jours de formation si aucune thématique n'est sélectionnée
    }
  }
  loadThematiques(): void {
    this.thematiqueService.getAllThematiques().subscribe(
      (thematiques: Thematique[]) => {
        this.apiData = thematiques;
        // //console.log('Thematiques:', this.apiDatathematique);
      },
      (error) => {
        console.error('Erreur lors du chargement des thématiques:', error);
      }
    );
  }
  //  getuserbygroupe() {
  //     if (this.selectedGroupe && this.selectedThematique && this.selecteddate) {
  //       let i = 0;
  //       this.themfltr = [];
  //       this.title =""
  //       this.absences.forEach((absence) => {
  //         if (
  //           this.selectedThematique.id == absence.thematique.id &&
  //           this.selecteddate == absence.dateAbsence
  //         ) {

  //             this.title = 'Déja existe cette list ';
  //           absence.thematique.groupes!.forEach((groupe) => {
  //             if (groupe.id == this.selectedGroupe.id  ) {
  //               i++;
  //               this.user = {
  //                 id: absence.utilisateur.id || 0,
  //                 ppr: absence.utilisateur.ppr,
  //                 nom: absence.utilisateur.nom,
  //                 prenom: absence.utilisateur.prenom,
  //                 intitule: absence.thematique.intitule,
  //                 groupe: groupe.numGroupe,
  //                 isPresent: absence.etatAbsence,
  //                 idabsence: absence.id||0 ,
  //               };
  //               console.log('deja existe',
  //                 `PPR: ${absence.utilisateur.ppr}, Nom: ${ absence.utilisateur.nom},
  //                  Prénom: ${absence.utilisateur.prenom},
  //                  thrmatique: ${absence.thematique.intitule},Groupe: ${groupe.numGroupe},
  //                  idabsence:${this.user.idabsence} isPresent: ${absence.etatAbsence}`
  //               );              console.log(i);
  //               this.themfltr.push(this.user)
  //             }
  //           }); }

  //       });

  //       if (i == 0) {

  //         this.themfltr = [];
  //         this.title = 'Nouvelle fiche absence';
  //         this.groupservice.getAllGroups().subscribe(
  //           (Group: Group[]) => {
  //             this.apiDatagroup = Group;

  //             // //console.log('Group:', this.apiDatagroup);
  //             this.apiDatagroup.forEach((group) => {
  //               // Iterate over utilisateurs array within each group
  //               group.utilisateurs.forEach((utilisateur) => {
  //                 this.thematiqueService
  //                   .getThematiqueByGroupeId(group.id)
  //                   .subscribe((int: Thematique) => {
  //                     // Log the required properties
  //                     if (
  //                       this.selectedThematique.id == int.id &&
  //                       this.selectedGroupe.id == group.id
  //                     ) {
  //                       this.themfltr.push({
  //                         id: utilisateur.id || 0,
  //                         ppr: utilisateur.ppr,
  //                         nom: utilisateur.nom,
  //                         prenom: utilisateur.prenom,
  //                         intitule: int.intitule,
  //                         groupe: group.numGroupe,
  //                         idabsence: i + group.id + (utilisateur.id || 0),
  //                         isPresent: true,
  //                       });
  //                       console.log(
  //                         `PPR: ${utilisateur.ppr}, Nom: ${utilisateur.nom}, Prénom: ${utilisateur.prenom}, thrmatique: ${int.intitule},Groupe: ${group.numGroupe}`
  //                       );
  //                       console.log(i);
  //                     }
  //                     //console.log(this.them.length);
  //                     // this.initializeDataTables();
  //                   });
  //               });
  //             });
  //           },
  //           (error) => {
  //             console.error('Erreur lors du chargement des thématiques:', error);
  //           }
  //         );
  //       }
  //     }
  //   }
  getuserbygroupe() {
    if (this.selectedGroupe && this.selectedThematique && this.selecteddate) {
      let i = 0;
      this.themfltr = [];
      this.title = '';
      const absencePromises = this.absences.map(async (absence) => {
        if (
          this.selectedThematique.id == absence.thematique.id &&
          this.selecteddate == absence.dateAbsence
        ) {
          this.title = 'Déja existe cette list';
          const groupPromises = absence.thematique.groupes!.map(
            async (groupe) => {
              if (groupe.id == this.selectedGroupe.id) {
                i++;
                this.user = {
                  id: absence.utilisateur.id || 0,
                  ppr: absence.utilisateur.ppr,
                  nom: absence.utilisateur.nom,
                  prenom: absence.utilisateur.prenom,
                  intitule: absence.thematique.intitule,
                  groupe: groupe.numGroupe,
                  isPresent: absence.etatAbsence,
                  idabsence: absence.id || 0,
                };
                console.log(
                  'deja existe',
                  `PPR: ${absence.utilisateur.ppr}, Nom: ${absence.utilisateur.nom},
               Prénom: ${absence.utilisateur.prenom},
               thrmatique: ${absence.thematique.intitule}, Groupe: ${groupe.numGroupe},
               idabsence: ${this.user.idabsence}, isPresent: ${absence.etatAbsence}`
                );
                console.log(i);
                this.themfltr.push(this.user);
              }
            }
          );
          await Promise.all(groupPromises);
        }
      });

      Promise.all(absencePromises)
        .then(() => {
          if (i == 0) {
            this.themfltr = [];
            this.title = 'Nouvelle fiche absence';
            this.groupservice.getAllGroups().subscribe(
              (Group: Group[]) => {
                this.apiDatagroup = Group;

                const userPromises = this.apiDatagroup.map((group) => {
                  const utilisateurPromises = group.utilisateurs.map(
                    (utilisateur) => {
                      return firstValueFrom(
                        this.thematiqueService.getThematiqueByGroupeId(group.id)
                      ).then((int: Thematique) => {
                        if (
                          this.selectedThematique.id == int.id &&
                          this.selectedGroupe.id == group.id
                        ) {
                          this.themfltr.push({
                            id: utilisateur.id || 0,
                            ppr: utilisateur.ppr,
                            nom: utilisateur.nom,
                            prenom: utilisateur.prenom,
                            intitule: int.intitule,
                            groupe: group.numGroupe,
                            idabsence: i + group.id + (utilisateur.id || 0),
                            isPresent: true,
                          });
                          console.log(
                            `PPR: ${utilisateur.ppr}, Nom: ${utilisateur.nom}, Prénom: ${utilisateur.prenom}, thrmatique: ${int.intitule}, Groupe: ${group.numGroupe}`
                          );
                          console.log(i);
                        }
                      });
                    }
                  );
                  return Promise.all(utilisateurPromises);
                });

                Promise.all(userPromises)
                  .then(() => {
                    console.log('All users processed');

                    // Optionally: Initialize data tables or any other operations after all users are processed
                  })
                  .catch((error) => {
                    console.error('Error processing users:', error);
                  });
              },
              (error) => {
                console.error(
                  'Erreur lors du chargement des thématiques:',
                  error
                );
              }
            );
          }
        })
        .catch((error) => {
          console.error('Error processing absences:', error);
        });
    }
  }
  toggleAttendance(id: string | undefined) {
    if (!id) {
      return; // Exit the function if 'id' is undefined
    }

    const beneficiaryIndexAbsentss = this.absentss.findIndex(
      (b) => b.utilisateur.ppr == id
    );
    const beneficiaryIndexFltr = this.themfltr.findIndex((b) => b.ppr == id);

    // Check if the beneficiary is found in the absentss list
    if (beneficiaryIndexAbsentss !== -1) {
      this.absentss[beneficiaryIndexAbsentss].etatAbsence =
        !this.absentss[beneficiaryIndexAbsentss].etatAbsence;
    }

    // Check if the beneficiary is found in the themfltr list
    if (beneficiaryIndexFltr !== -1) {
      this.themfltr[beneficiaryIndexFltr].isPresent =
        !this.themfltr[beneficiaryIndexFltr].isPresent;
    }

    console.log(this.themfltr[beneficiaryIndexFltr], id);
    console.log(this.absentss[beneficiaryIndexAbsentss], id);
  }
  getAllAbsences(): void {
    this.absenceService.getAllAbsences().subscribe(
      (absences: Absence[]) => {
        this.absences = absences;

        // //console.log('Absences:', this.absences);
      },
      (error) => {
        console.error('Error fetching absences:', error);
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
  saveabsence() {
    // if (this.themfltr.length > 0) {
    //   this.absentss = [];
    //   this.themfltr.forEach((data) => {
    //     // //console.log(data.id);
    //     this.utilisateurService
    //       .getUtilisateurById(data.id)
    //       .subscribe((data1) => {
    //         // const ben: Utilisateur = data1;
    //         // this.apiDatafr?.push(ben);
    //         const abs: Absence = {
    //           id: data.idabsence,
    //           etatAbsence: data.isPresent,
    //           dateAbsence: this.selecteddate,
    //           utilisateur: { id: data1.id },
    //           thematique: { id: this.selectedThematique.id },
    //         };
    //         this.absentss.push(abs);

    //         //console.log(this.themfltr)
    //       });
    //   });
    //   // console.log('ooooooooooooooooooooooooo', this.absentss);
    // } else {
    //   console.log('list vide');
    // }
    // console.log('save:', this.absentss);
    let ab: Absence = {
      etatAbsence: false,
      dateAbsence: new Date(),
      utilisateur: {},
      thematique: {},
      id_group: 0,
    };
    const abs: Absence[] = [];
    let role: Utilisateur[] = [];
    role = this.selectedGroupe.Utilisateur;
    // this.themfltr.forEach((dt) => {
    //  const t= role.find(rl=>rl.id==dt.id);
    //   ab = {
    //     id: dt.idabsence,
    //     etatAbsence: dt.isPresent,
    //     dateAbsence: this.selecteddate,
    //     utilisateur: { id: dt.id ,idRole:t?.idRole },
    //     thematique: {id:this.selectedThematique.id },
    //   };
    //   abs.push(ab);
    // });
    // if (role && role.length > 0) {
    this.themfltr.forEach((dt) => {
      ab = {
        id: dt.idabsence,
        etatAbsence: dt.isPresent,
        dateAbsence: this.selecteddate,
        utilisateur: {
          id: dt.id,
          idRole: {
            id: 2,
            nom: 'USER',
            description: 'GFGFG',
          },
        },
        thematique: { id: this.selectedThematique.id },
        id_group: this.selectedGroupe.id,
      };
      abs.push(ab);
    });
    //  else {
    //     console.error('Role array is empty or undefined.');
    // }
    console.info(' list :', this.themfltr);

    console.info(' add list :', abs);

    this.absenceService.saveAbsences(abs).subscribe(
      (response) => {
        this.toastr.success('Liste enregister avec succès !', 'Succès');
        // console.info('response:', response);
        // console.info('from data base *:', this.absentss);
        console.info(' add list :', abs);
      },
      (error) => {
        console.error('Error adding Thématique:', error);
        this.toastr.error("Erreur lors de l'enregistrement ", error.error);
      }
    );
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      $('#example').DataTable({
        lengthMenu: [
          [5, 8],
          [5, 8],
        ], // Customize the number of entries shown
      });
    }, 0);
  }
  // printSection() {
  //   const printContent = document.getElementById('prt')?.innerHTML;
  //   const originalContents = document.body.innerHTML;
  //   if (printContent) {
  //     const printWindow = window.open('', '', 'height=600,width=800');
  //     if (printWindow) {
  //       printWindow.document.write('<html><head><title>Print</title>');
  //       printWindow.document.write('<style>');
  //       printWindow.document.write(`.text-warning { color: #ffc107; }
  //                                     .font-medium { font-weight: 500; }
  //                                     .fs-4 { font-size: 1.5rem; }
  //                                     .card-title { margin-bottom: 1rem; }
  //                                     .form-check-input { margin-right: 0.5rem; }
  //                                     .form-check-label { margin-left: 0.5rem; }`);
  //       printWindow.document.write('</style>');
  //       printWindow.document.write('</head><body >');
  //       printWindow.document.write(printContent);
  //       printWindow.document.write('</body></html>');
  //       printWindow.document.close();
  //       printWindow.print();
  //     }
  //   }
  // }
  printSection() {
    const printWindow = window.open('', '', 'height=600,width=800');
    if (printWindow) {
      // Construct the table HTML
      let tableHTML = `
        <div class="print-header">List Absence</div>
        <table id="lexample" class="display nowrap cell-border" style="width: 100%">
          <thead>
            <tr>
              <th class="text-warning font-medium fs-4">PPR</th>
              <th class="text-warning font-medium fs-4">Nom</th>
              <th class="text-warning font-medium fs-4">Prénom</th>
              <th class="text-warning font-medium fs-4">Thématique</th>
              <th class="text-warning font-medium fs-4">Groupe</th>
              <th class="text-warning font-medium fs-4">Actions</th>
            </tr>
          </thead>
          <tbody>
      `;

      this.themfltr.forEach((utilisateur) => {
        let etat;
        if (utilisateur.isPresent == true) {
          etat = 'Present';
        } else {
          etat = 'Absent';
        }
        tableHTML += `
          <tr>
            <td>${utilisateur.ppr}</td>
            <td>${utilisateur.nom}</td>
            <td>${utilisateur.prenom}</td>
            <td>${utilisateur.intitule}</td>
            <td>${utilisateur.groupe}</td>
            <td>
              <div class="form-check form-switch">
                <label class="form-check-label">

                ${etat}</label>
              </div>
            </td>
          </tr>
        `;
      });

      tableHTML += `
          </tbody>
        </table>
      `;

      // Write the constructed HTML into the print window
      printWindow.document.write('<html><head><title>Print</title>');
      printWindow.document.write('<style>');
      printWindow.document.write(`
        body {
          font-family: Arial, sans-serif;
          margin: 20px;
        }
        .text-warning { color: #ffc107; }
        .font-medium { font-weight: 500; }
        .fs-4 { font-size: 1.5rem; }
        .card-title { margin-bottom: 1rem; }
        .form-check-input { margin-right: 0.5rem; }
        .form-check-label { margin-left: 0.5rem; }
        .print-header {
          text-align: center;
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 20px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        th, td {
          border: 1px solid #000;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
        }
      `);
      printWindow.document.write('</style>');
      printWindow.document.write('</head><body>');
      printWindow.document.write(tableHTML);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    }
  }
}
