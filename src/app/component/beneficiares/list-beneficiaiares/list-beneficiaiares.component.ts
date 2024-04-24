import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-list-beneficiaiares',
  templateUrl: './list-beneficiaiares.component.html',
  styleUrls: ['./list-beneficiaiares.component.scss'],
})
export class ListBeneficiaiaresComponent {
  apiData: any;

  constructor(private http: HttpClient, private router: Router) {
    // Static data definition
    this.apiData = [
      {
        id: 1,
        ppr: '123456789',
        cne: 'A123456',
        date_naissance: '1990-01-15',
        email: 'john.doe@example.com',
        fonction: 'Ingénieur',
        genre: 'Masculin',
        nom: 'Doe',
        prenom: 'John',
        telephone: '123-456-7890',
      },
      {
        id: 2,
        ppr: '987654321',
        cne: 'B654321',
        date_naissance: '1985-05-20',
        email: 'jane.smith@example.com',
        fonction: 'Manager',
        genre: 'Féminin',
        nom: 'Smith',
        prenom: 'Jane',
        telephone: '987-654-3210',
      },
      {
        id: 3,
        ppr: '456123789',
        cne: 'C789123',
        date_naissance: '1993-12-10',
        email: 'michael.johnson@example.com',
        fonction: 'Développeur',
        genre: 'Masculin',
        nom: 'Johnson',
        prenom: 'Michael',
        telephone: '456-123-7890',
      },
      {
        id: 4,
        ppr: '789123456',
        cne: 'D456789',
        date_naissance: '1988-08-25',
        email: 'sara.wilson@example.com',
        fonction: 'Consultante',
        genre: 'Féminin',
        nom: 'Wilson',
        prenom: 'Sara',
        telephone: '789-123-4560',
      },
      {
        id: 5,
        ppr: '321654987',
        cne: 'E987654',
        date_naissance: '1995-04-03',
        email: 'chris.thomas@example.com',
        fonction: 'Analyste',
        genre: 'Masculin',
        nom: 'Thomas',
        prenom: 'Chris',
        telephone: '321-654-9870',
      },
      {
        id: 6,
        ppr: '654789123',
        cne: 'F123789',
        date_naissance: '1992-11-18',
        email: 'emily.jones@example.com',
        fonction: 'Designer',
        genre: 'Féminin',
        nom: 'Jones',
        prenom: 'Emily',
        telephone: '654-789-1230',
      },
      {
        id: 7,
        ppr: '159753468',
        cne: 'G468123',
        date_naissance: '1987-07-12',
        email: 'kevin.brown@example.com',
        fonction: 'Chef de projet',
        genre: 'Masculin',
        nom: 'Brown',
        prenom: 'Kevin',
        telephone: '159-753-4680',
      },
      {
        id: 8,
        ppr: '369852147',
        cne: 'H147852',
        date_naissance: '1991-09-30',
        email: 'lisa.white@example.com',
        fonction: 'Développeuse',
        genre: 'Féminin',
        nom: 'White',
        prenom: 'Lisa',
        telephone: '369-852-1470',
      },
      {
        id: 9,
        ppr: '258147369',
        cne: 'I369147',
        date_naissance: '1986-03-07',
        email: 'adam.miller@example.com',
        fonction: 'Architecte',
        genre: 'Masculin',
        nom: 'Miller',
        prenom: 'Adam',
        telephone: '258-147-3690',
      },
      {
        id: 10,
        ppr: '741258963',
        cne: 'J963258',
        date_naissance: '1994-06-22',
        email: 'olivia.moore@example.com',
        fonction: 'Consultante RH',
        genre: 'Féminin',
        nom: 'Moore',
        prenom: 'Olivia',
        telephone: '741-258-9630',
      },
    ];
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
