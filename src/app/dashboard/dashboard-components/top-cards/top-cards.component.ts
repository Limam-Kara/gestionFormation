import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ThematiqueService } from 'src/app/component/services/Thematique/thematique.service';
import { UserService } from 'src/app/component/services/User/user.service';
import { EvaluationService } from 'src/app/component/services/evaluation/evaluation.service';
import { Thematique } from 'src/app/modeles/Thematique';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
export interface Topcard {
  bgcolor: string;
  icon: string;
  title: string;
  subtitle: string;
}
@Component({
  selector: 'app-top-cards',
  templateUrl: './top-cards.component.html',animations: [
    trigger('fadeInAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class TopCardsComponent implements OnInit {
  apiData: Thematique[] = [];
  selectedThematique: Thematique = {};
  topcards: Topcard[] = [
    {
      bgcolor: 'success',
      icon: 'bi bi-wallet',
      title: '0',
      subtitle: 'Total Thematiques',
    },
    {
      bgcolor: 'info',
      icon: 'bi bi-people',
      title: '0',
      subtitle: 'Total Utilisateur',
    },
    {
      bgcolor: 'warning',
      icon: 'bi bi-list-check',
      title: '0',
      subtitle: 'Total Evaluations',
    },
  ];

  constructor(
    private thematiqueService: ThematiqueService,
    private utilisateurService: UserService,
    private evaluationService: EvaluationService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadThematiques();
    this.loadUserCount();
    this.loadEvaluationCount();
  }

  loadThematiques(): void {
    this.thematiqueService.getAllThematiques().subscribe(
      (thematiques: Thematique[]) => {
        this.apiData = thematiques;
        console.log('Thematiques:', this.apiData);
        this.topcards[0].title = thematiques.length.toString();
      },
      (error) => {
        console.error('Erreur lors du chargement des thématiques:', error);
      }
    );
  }

  loadUserCount(): void {
    this.utilisateurService.getAllUtilisateurs().subscribe(
      (count) => {
        this.topcards[1].title = count.length.toString();
      },
      (error) => {
        console.error('Erreur lors du chargement des utilisateurs:', error);
      }
    );
  }

  loadEvaluationCount(): void {
    this.evaluationService.getAllEvaluations().subscribe(
      (count) => {
        this.topcards[2].title = count.length.toString();
        console.log('evacfgggg', count.length.toString());
      },
      (error) => {
        console.error('Erreur lors du chargement des évaluations:', error);
      }
    );
  }
}
