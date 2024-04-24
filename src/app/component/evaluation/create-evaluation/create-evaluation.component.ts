import { Component } from '@angular/core';
import { Formation } from 'src/app/modeles/formation';

@Component({
  selector: 'app-create-evaluation',
  templateUrl: './create-evaluation.component.html',
  styleUrls: ['./create-evaluation.component.scss']
})
export class CreateEvaluationComponent {
  formationdata:  Formation[] ;
  constructor() {
    // Static data definition
    this.formationdata = [
      {
        id: 1,
        title: 'Formation en Leadership',
        body: 'Description de la formation en leadership',
        startDate: '2024-04-21',
        endDate: '2024-04-30',
        thematique: 'Leadership',
      },
      {
        id: 2,
        title: 'Formation en Soft Skills',
        body: 'Description de la formation en soft skills',
        startDate: '2024-05-12',
        endDate: '2024-05-19',
        thematique: 'Soft Skills',
      },
      {
        id: 3,
        title: 'Formation en Management',
        body: 'Description de la formation en management',
        startDate: '2024-05-10',
        endDate: '2024-05-20',
        thematique: 'Management',
      },
      {
        id: 4,
        title: 'Formation en Communication interpersonnelle',
        body: 'Description de la formation en communication interpersonnelle',
        startDate: '2024-04-11',
        endDate: '2024-04-30',
        thematique: 'Communication interpersonnelle',
      },
      {
        id: 5,
        title: 'Formation en Développement personnel',
        body: 'Description de la formation en développement personnel',
        startDate: '2024-05-01',
        endDate: '2024-05-10',
        thematique: 'Développement personnel',
      },
      {
        id: 6,
        title: 'Formation en Gestion du temps',
        body: 'Description de la formation en gestion du temps',
        startDate: '2024-05-15',
        endDate: '2024-05-20',
        thematique: 'Gestion du temps',
      },
    
  
     
    ];


  }
}
