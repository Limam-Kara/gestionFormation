import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-list-evaluation',
  templateUrl: './list-evaluation.component.html',
  styleUrls: ['./list-evaluation.component.scss']
})
export class ListEvaluationComponent {

consulterevaluationparthematique(thematiquetitle:string) {

  // console.log(thematiqueid);
this.router.navigate(['/component/evaluationlist',{Thematiqueid:thematiquetitle}])


}
  apiData: any;

  constructor(private http: HttpClient,private router:Router) {
    // Static data definition
    this.apiData = [
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

  ngAfterViewInit(): void {
    setTimeout(() => {
      $('#example').DataTable({
        "lengthMenu": [[5, 8], [5, 8]] // Customize the number of entries shown
      });
    }, 0);
  }

}
