import { Component, OnInit } from '@angular/core';
import { Evaluation } from 'src/app/modeles/evaluation';
import { QReponse } from 'src/app/modeles/qreponse';
import { EvaluationService } from '../../services/evaluation/evaluation.service';
import { ToastrService } from 'ngx-toastr';
import { Thematique } from 'src/app/modeles/Thematique';
import { ThematiqueService } from '../../services/Thematique/thematique.service';
import { Utilisateur } from 'src/app/modeles/Utilisateur';
import { animate, style, transition, trigger } from '@angular/animations';
declare var $: any;
export interface test {
  Utilisateur: Utilisateur[];
  ideva: number;
}
@Component({
  selector: 'app-list-evaluation',
  templateUrl: './list-evaluation.component.html',
  styleUrls: ['./list-evaluation.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s ease-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class ListEvaluationComponent implements OnInit {
  evaluation: Evaluation | undefined;
  allevaluation: Evaluation[] = [];
  responses: QReponse[] = [];
  who: any;
  title: string = '';
  thematiques: Thematique[] = [];
  currentView: 'thematique' | 'evaluation' | 'responses' = 'thematique';

  constructor(
    private evaluationService: EvaluationService,
    private toastr: ToastrService,
    private thematiqueService: ThematiqueService
  ) {}

  ngOnInit(): void {
    this.loadThematiques();
  }
  loadevaluationflr(id: number, titre: string) {
    this.title = titre;
    this.evaluationService.getAllEvaluations().subscribe(
      (evaluat: Evaluation[]) => {
        this.allevaluation = evaluat.filter(
          (response: Evaluation) => response.thematique.id === id
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
        // Réinitialiser DataTables une fois que les données sont chargées
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
