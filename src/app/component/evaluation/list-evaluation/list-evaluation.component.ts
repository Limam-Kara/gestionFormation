import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Evaluation } from 'src/app/modeles/evaluation';
import { QReponse } from 'src/app/modeles/qreponse';
import { EvaluationService } from '../../services/evaluation/evaluation.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-list-evaluation',
  templateUrl: './list-evaluation.component.html',
  styleUrls: ['./list-evaluation.component.scss']
})
export class ListEvaluationComponent implements OnInit {

  evaluation: Evaluation | undefined;
  responses: QReponse[] = [];

  constructor(private evaluationService: EvaluationService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  addEvaluation(userId: number, thematiqueId: number, responses: string[]): void {
    this.evaluationService.addEvaluation(userId, thematiqueId, responses).subscribe({
      next: (data) => {
        this.evaluation = data;
        console.log('Evaluation added:', data);
        this.toastr.success("Bien évaluer", 'success');


      },
      error: (err) => {
        this.toastr.error(err.error, 'Erreur');
        console.error('Error adding evaluation:', err)}
    });
  }

  getResponses(evaluationId: number): void {
    this.evaluationService.getResponses(evaluationId).subscribe({
      next: (data) => {
        this.responses = data;
        console.log('Responses:', data);
      },
      error: (err) => console.error('Error fetching responses:', err)
    });
    

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      $('#example').DataTable({
        "lengthMenu": [[5, 8], [5, 8]] // Customize the number of entries shown
      });
    }, 0);
  }

}
// consulterevaluationparthematique(thematiquetitle:string) {

//   // console.log(thematiqueid);
// this.router.navigate(['/component/evaluationlist',{Thematiqueid:thematiquetitle}])


// }
//   apiData: any;

//   constructor(private http: HttpClient,private router:Router) {
//     // Static data definition
//     this.apiData = [
//       {
//         id: 1,
//         title: 'Formation en Leadership',
//         body: 'Description de la formation en leadership',
//         startDate: '2024-04-21',
//         endDate: '2024-04-30',
//         thematique: 'Leadership',
//       },
//       {
//         id: 2,
//         title: 'Formation en Soft Skills',
//         body: 'Description de la formation en soft skills',
//         startDate: '2024-05-12',
//         endDate: '2024-05-19',
//         thematique: 'Soft Skills',
//       },
//       {
//         id: 3,
//         title: 'Formation en Management',
//         body: 'Description de la formation en management',
//         startDate: '2024-05-10',
//         endDate: '2024-05-20',
//         thematique: 'Management',
//       },
//       {
//         id: 4,
//         title: 'Formation en Communication interpersonnelle',
//         body: 'Description de la formation en communication interpersonnelle',
//         startDate: '2024-04-11',
//         endDate: '2024-04-30',
//         thematique: 'Communication interpersonnelle',
//       },
//       {
//         id: 5,
//         title: 'Formation en Développement personnel',
//         body: 'Description de la formation en développement personnel',
//         startDate: '2024-05-01',
//         endDate: '2024-05-10',
//         thematique: 'Développement personnel',
//       },
//       {
//         id: 6,
//         title: 'Formation en Gestion du temps',
//         body: 'Description de la formation en gestion du temps',
//         startDate: '2024-05-15',
//         endDate: '2024-05-20',
//         thematique: 'Gestion du temps',
//       },
//     ];
//   }
