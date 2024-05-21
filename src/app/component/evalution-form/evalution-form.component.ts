import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EvaluationService } from '../services/evaluation/evaluation.service';
import { Evaluation } from 'src/app/modeles/evaluation';
import { QReponse } from 'src/app/modeles/qreponse';

@Component({
  selector: 'app-evalution-form',
  templateUrl: './evalution-form.component.html',
  styleUrls: ['./evalution-form.component.scss'],
})
export class EvalutionFormComponent {
  evaluationQuestions: any[] = [
    {
      text: "Quelle est votre spécialité en ingénierie et pourquoi avez-vous choisi ce domaine ?",
      type: 'single-choice',
      options: [
        'Génie civil',
        'Génie électrique',
        'Génie mécanique',
        'Génie industriel',
        'Autre'
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
        'Autre'
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
        'Autre'
      ],
      selectedOption: '',
    },
    {
      text: "Comment intégrez-vous les considérations environnementales dans vos projets d'ingénierie ?",
      type: 'dropdown',
      options: [
        'Toujours',
        'Souvent',
        'Parfois',
        'Rarement',
        'Jamais'
      ],
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
        'Autre'
      ],
      selectedOption: '',
    },
    // Add more questions here...
  ];

  constructor(
    private evaluationService: EvaluationService,
    private toastr: ToastrService
  ) {}

  evaluation: Evaluation | undefined;
  responses: QReponse[] = [];

  submitEvaluation() {
    const userId = 1; // Replace with actual user ID
    const thematiqueId = 2; // Replace with actual thematique ID
    const responses = this.evaluationQuestions.map(q => q.selectedOption);

    this.addEvaluation(userId, thematiqueId, responses);
  }

  addEvaluation(userId: number, thematiqueId: number, responses: string[]): void {
    this.evaluationService.addEvaluation(userId, thematiqueId, responses).subscribe({
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
}
