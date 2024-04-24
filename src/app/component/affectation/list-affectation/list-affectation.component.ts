import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-list-affectation',
  templateUrl: './list-affectation.component.html',
  styleUrls: ['./list-affectation.component.scss']
})
export class ListAffectationComponent {
  apiData: any;

  constructor(private http: HttpClient,private router:Router) {
    // Static data definition
    this.apiData = [
      {
        id: 1,
        cne: 'A123456',
        ppr: '123456789',
        nom: 'Doe',
        prenom: 'John',
        thematique: 'Leadership'
      },
      {
        id: 2,
        cne: 'B654321',
        ppr: '987654321',
        nom: 'Smith',
        prenom: 'Jane',
        thematique: 'Soft Skills'
      },
      {
        id: 3,
        cne: 'C789123',
        ppr: '456123789',
        nom: 'Johnson',
        prenom: 'Michael',
        thematique: 'Management'
      },
      {
        id: 4,
        cne: 'D456789',
        ppr: '789123456',
        nom: 'Wilson',
        prenom: 'Sara',
        thematique: 'Communication interpersonnelle'
      },
      {
        id: 5,
        cne: 'E987654',
        ppr: '321654987',
        nom: 'Thomas',
        prenom: 'Chris',
        thematique: 'Développement personnel'
      },
      {
        id: 6,
        cne: 'F123789',
        ppr: '654789123',
        nom: 'Jones',
        prenom: 'Emily',
        thematique: 'Gestion du temps'
      },
      {
        id: 7,
        cne: 'G468123',
        ppr: '159753468',
        nom: 'Brown',
        prenom: 'Kevin',
        thematique: 'Leadership'
      },
      {
        id: 8,
        cne: 'H147852',
        ppr: '369852147',
        nom: 'White',
        prenom: 'Lisa',
        thematique: 'Soft Skills'
      },
      {
        id: 9,
        cne: 'I369147',
        ppr: '258147369',
        nom: 'Miller',
        prenom: 'Adam',
        thematique: 'Management'
      },
      {
        id: 10,
        cne: 'J963258',
        ppr: '741258963',
        nom: 'Moore',
        prenom: 'Olivia',
        thematique: 'Communication interpersonnelle'
      }
      // Add more static data as needed
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
