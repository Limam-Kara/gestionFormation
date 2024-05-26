import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EvaluationService } from '../services/evaluation/evaluation.service';
import { Evaluation } from 'src/app/modeles/evaluation';
import { QReponse } from 'src/app/modeles/qreponse';
import { Group } from 'src/app/modeles/Groupe';
import { Thematique } from 'src/app/modeles/Thematique';
import { GroupService } from '../services/Group/group.service';
import { ThematiqueService } from '../services/Thematique/thematique.service';
interface Them {
  ppr?: any;
  nom?: any;
  prenom?: any;
  intitule?: any;
  groupe?: any;
  id_groupe?: any;
  dateFin?: any;
}
import { animate, style, transition, trigger } from '@angular/animations';
import { switchMap, tap } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-evalution-form',
  templateUrl: './evalution-form.component.html',
  styleUrls: ['./evalution-form.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class EvalutionFormComponent {
  currentView: 'thematique' | 'evaluation' | 'responses' = 'thematique';
  thematiqueId = 0;
  them: Them[] = [];
  themT: Them[] = [];
  user: Them = {};
  evaluationQuestions: any[] = [
    {
      text: 'Quelle est votre spécialité en ingénierie et pourquoi avez-vous choisi ce domaine ?',
      type: 'single-choice',
      options: [
        'Génie civil',
        'Génie électrique',
        'Génie mécanique',
        'Génie industriel',
        'Autre',
      ],
      selectedOption: '',
    },
    {
      text: "Quels sont, selon vous, les défis actuels les plus pressants dans le domaine de l'ingénierie ?",
      type: 'single-choice',
      options: [
        'Changement climatique',
        'Urbanisation rapide',
        'Ressources énergétiques',
        'Technologie et innovation',
        'Autre',
      ],
      selectedOption: '',
    },
    {
      text: "Pouvez-vous décrire un projet d'ingénierie sur lequel vous avez travaillé récemment ?",
      type: 'single-choice',
      options: [
        'Infrastructure de transport',
        'Énergie renouvelable',
        'Bâtiment durable',
        'Technologie de l information et de la communication',
        'Autre',
      ],
      selectedOption: '',
    },
    {
      text: "Comment intégrez-vous les considérations environnementales dans vos projets d'ingénierie ?",
      type: 'dropdown',
      options: ['Toujours', 'Souvent', 'Parfois', 'Rarement', 'Jamais'],
      selectedOption: '',
    },
    {
      text: "Quelles compétences techniques et non techniques sont essentielles pour réussir dans le domaine de l'ingénierie ?",
      type: 'single-choice',
      options: [
        'Résolution de problèmes',
        'Communication',
        'Leadership',
        'Gestion de projet',
        'Autre',
      ],
      selectedOption: '',
    },
    // Add more questions here...
  ];
  dataTableInitialized = false;

  // constructor(
  //   private evaluationService: EvaluationService,
  //   private toastr: ToastrService
  // ) {}

  // evaluation: Evaluation | undefined;
  // responses: QReponse[] = [];

  // submitEvaluation() {
  //   const userId = 1; // Replace with actual user ID
  //   const thematiqueId = 2; // Replace with actual thematique ID
  //   const responses = this.evaluationQuestions.map(q => q.selectedOption);

  //   this.addEvaluation(userId, thematiqueId, responses);
  // }

  // addEvaluation(userId: number, thematiqueId: number, responses: string[]): void {
  //   this.evaluationService.addEvaluation(userId, thematiqueId, responses).subscribe({
  //     next: (data) => {
  //       this.evaluation = data;
  //       console.log('Evaluation added:', data);
  //       this.toastr.success('Evaluation submitted successfully', 'Success');
  //     },
  //     error: (err) => {
  //       this.toastr.error(err.error, 'Error');
  //       console.error('Error adding evaluation:', err);
  //     },
  //   });
  // }
  currentStep = 0;
  ngOnInit(): void {
    this.them = [];
    this.loadgroup();
  }
  constructor(
    private thematiqueService: ThematiqueService,
    private groupservice: GroupService,
    private evaluationService: EvaluationService,
    private toastr: ToastrService
  ) {}
  allevaluation: Evaluation[] = [];
  filteredThematiques: Thematique[] = [];

  evaluation: Evaluation | undefined;
  responses: QReponse[] = [];

  nextStep() {
    if (this.currentStep < this.evaluationQuestions.length - 1) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  submitEvaluation() {
    const userId = 1; // Replace with actual user ID
    // const thematiqueId = 1; // Replace with actual thematique ID
    const responses = this.evaluationQuestions.map((q) => q.selectedOption);

    this.addEvaluation(userId, this.thematiqueId, responses);
    this.backToThematique();
  }

  addEvaluation(
    userId: number,
    thematiqueId: number,
    responses: string[]
  ): void {
    this.evaluationService
      .addEvaluation(userId, thematiqueId, responses)
      .subscribe({
        next: (data) => {
          this.evaluation = data;
          console.log('Evaluation added:', data);
          this.toastr.success('Evaluation submitted successfully', 'Success');
        },
        error: (err) => {
          this.toastr.error(err.error, 'Error');
          console.error('Error adding evaluation:', err);
        },
      });
  }

//   loadgroup(): void {
//     this.groupservice.getAllGroups().subscribe(
//       (groups: Group[]) => {
//         this.them = []; // Clear existing data
//         this.themT = []; // Clear existing data
//         // Collect all promises from Thematique requests
//         const fetchPromises: any[] = [];
//         groups.forEach((group) => {
//           group.utilisateurs.forEach((utilisateur) => {
//             // if (utilisateur.id == 1) {
//               const fetchPromise = this.thematiqueService
//                 .getThematiqueByGroupeId(group.id)
//                 .toPromise();
//               fetchPromises.push(fetchPromise);
//             // }
//           });
//         });
//         this.evaluationService
//           .getAllEvaluations()
//           .subscribe((evaluat: Evaluation[]) => {
//             this.allevaluation = evaluat.filter(
//               (response: Evaluation) => response.beneficiare.id == 1
//             );console.log('rrrrrrrrr',this.allevaluation)
//           });
//         // Wait for all Thematique requests to complete
//         Promise.all(fetchPromises)
//           .then((thematiques: Thematique[]) => {
//             // Now populate this.them with user and thematique data
//             let index = 0;
//             groups.forEach((group) => {
//               group.utilisateurs.forEach((utilisateur) => {
//                 const int = thematiques[index];


//                 if (utilisateur.id == 1 ) {

//                     this.them.push({
//                       ppr: utilisateur.ppr,
//                       nom: utilisateur.nom,
//                       prenom: utilisateur.prenom,
//                       intitule: int.intitule,
//                       groupe: group.numGroupe,
//                       id_groupe: int.id,
//                     });
// }


//                 index++;
//               });
//             });
//             this.allevaluation.forEach((z) => {
//               this.them.forEach(r=>{
//                  if (z.thematique.id !== r.id_groupe) {
//                     this.them.push()
//                     console.log('xxxxxxxxxxxxxxxxx',r)
//               }
//               })
//              })
//             // Reinitialize DataTables if not initialized yet
//             // if (!this.dataTableInitialized) {
//             //   this.initializeDataTables();
//             //   this.dataTableInitialized = true;
//             // }
//           })
//           .catch((error) => {
//             console.error('Erreur lors du chargement des thématiques:', error);
//           });
//       },
//       (error) => {
//         console.error('Erreur lors du chargement des groupes:', error);
//       }
//     );

//   }
loadgroup(): void {
  this.allevaluation = []; // Clear existing data
  this.them = []; // Clear existing data
  this.themT = []; // Clear existing data

  // First, load evaluations
  this.evaluationService.getAllEvaluations().subscribe(
    (evaluat: Evaluation[]) => {
      this.allevaluation = evaluat.filter(
        (response: Evaluation) => response.beneficiare.id === 1
      );
      console.log('Evaluations for user 1:', this.allevaluation);

      // After evaluations are loaded, load groups
      this.groupservice.getAllGroups().subscribe(
        (groups: Group[]) => {
          // Collect all promises from Thematique requests
          const fetchPromises: any[] = [];
          groups.forEach((group) => {
            group.utilisateurs.forEach((utilisateur) => {
              if (utilisateur.id === 1) { // Only for utilisateur with id 1
                const fetchPromise = this.thematiqueService
                  .getThematiqueByGroupeId(group.id)
                  .toPromise();
                fetchPromises.push(fetchPromise);
              }
            });
          });

          // Wait for all Thematique requests to complete
          Promise.all(fetchPromises)
            .then((thematiques: Thematique[]) => {
              // Now populate this.them with user and thematique data
              let index = 0;
              groups.forEach((group) => {
                group.utilisateurs.forEach((utilisateur) => {
                  if (utilisateur.id === 1) { // Only for utilisateur with id 1
                    const int = thematiques[index];

                    if (int) {
                      this.them.push({
                        ppr: utilisateur.ppr,
                        nom: utilisateur.nom,
                        prenom: utilisateur.prenom,
                        intitule: int.intitule,
                        groupe: group.numGroupe,
                        id_groupe: int.id,
                        dateFin:int.dateFin
                      });
                    }

                    index++;
                  }
                });
              });

              // Filter the them list based on allevaluation
              const filteredThem = this.them.filter(r => {
                return !this.allevaluation.some(z => z.thematique.id === r.id_groupe);
              });

              console.log('Filtered them list:', filteredThem);
              filteredThem.forEach(r => {console.log('xxxxxxxxxxxxxxxxx', r),
              this.themT.push(r)
              });

              // Reinitialize DataTables if not initialized yet
              // if (!this.dataTableInitialized) {
              //   this.initializeDataTables();
              //   this.dataTableInitialized = true;
              // }
            })
            .catch((error) => {
              console.error('Erreur lors du chargement des thématiques:', error);
            });
        },
        (error) => {
          console.error('Erreur lors du chargement des groupes:', error);
        }
      );
    },
    (error) => {
      console.error('Erreur lors du chargement des évaluations:', error);
    }
  );
}


  change(idthem: any) {
    this.thematiqueId = idthem;
    this.currentView = 'evaluation';
  }
  backToThematique() {
    this.currentView = 'thematique';
  }
   // Ajouter la méthode pour vérifier si le bouton doit être désactivé
   shouldDisableDeleteButton(date: any): boolean {
    const today = moment(); // Get the current date
    const dateDebut = moment(date); // Convert the start date to a moment.js object

    return today.isBefore(dateDebut); // Return true if the current date is before the start date
  }

}
