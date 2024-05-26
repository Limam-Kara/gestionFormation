import { trigger, transition, style, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Thematique } from 'src/app/modeles/Thematique';
import { Evaluation } from 'src/app/modeles/evaluation';
import { QReponse } from 'src/app/modeles/qreponse';
import { ThematiqueService } from '../../services/Thematique/thematique.service';
import { EvaluationService } from '../../services/evaluation/evaluation.service';
import { UserAuthService } from '../../services/Auth/user-auth.service';
declare var $: any;

@Component({
  selector: 'app-listevaluationuser',
  templateUrl: './listevaluationuser.component.html',
  styleUrls: ['./listevaluationuser.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s ease-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class ListevaluationuserComponent {
  evaluation: Evaluation | undefined;
  allevaluation: Evaluation[] = [];


  responses: QReponse[] = [];
  who: any;
  title: string = '';
  thematiques: Thematique[] = [];
  currentView: 'thematique' | 'evaluation' | 'responses' = 'evaluation';

  constructor(
    private evaluationService: EvaluationService,
    private toastr: ToastrService,
    private thematiqueService: ThematiqueService,
    private userAuthService: UserAuthService
  ) {}
  iduser = Number(this.userAuthService.getID());

  ngOnInit(): void {
    this.loadThematiques();
    this.loadevaluationflr(1,'e')
  }
  loadevaluationflr(id: number, titre: string) {
    this.title = titre;
    this.evaluationService.getAllEvaluations().subscribe(
      (evaluat: Evaluation[]) => {
        this.allevaluation = evaluat.filter(
          (response: Evaluation) =>
            // response.thematique.id === id
          response.beneficiare.id === this.iduser
        );
      },
      (error) => {
        console.error('Erreur lors du chargement des thématiques:', error);
      }
    );

    this.currentView = 'evaluation';
  }
  loadThematiques(): void {

    this.thematiqueService.getAllThematiques().subscribe(
      (thematiques: Thematique[]) => {
        this.thematiques = thematiques;
        console.log('Thematiques:', this.thematiques);
      },
      (error) => {
        console.error('Erreur lors du chargement des thématiques:', error);
      }
    );

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
          this.toastr.success('Bien évaluer', 'success');
        },
        error: (err) => {
          this.toastr.error(err.error, 'Erreur');
          console.error('Error adding evaluation:', err);
        },
      });
  }

  getResponses(evaluationId: number, user: any): void {
    this.who = user;
    this.evaluationService.getResponses(evaluationId).subscribe({
      next: (data) => {
        this.responses = data;
        console.log('Responses:', data);
      },
      error: (err) => console.error('Error fetching responses:', err),
    });
    this.currentView = 'responses';
  }
  backToThematique() {
    this.currentView = 'thematique';
  }

  backToEvaluation() {
    this.currentView = 'evaluation';
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
}
