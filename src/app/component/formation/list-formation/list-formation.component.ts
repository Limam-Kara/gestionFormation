import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-list-formation',
  templateUrl: './list-formation.component.html',
  styleUrls: ['./list-formation.component.scss']
})
export class ListFormationComponent {
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
        diplome: 'Master en Gestion des Ressources Humaines',
        specialite: 'Gestion stratégique',
        niveau_etude: 'Bac+5'
      },
      {
        id: 2,
        cne: 'B654321',
        ppr: '987654321',
        nom: 'Smith',
        prenom: 'Jane',
        diplome: 'Licence en Marketing',
        specialite: 'Marketing Digital',
        niveau_etude: 'Bac+3'
      },
      {
        id: 3,
        cne: 'C789123',
        ppr: '456123789',
        nom: 'Johnson',
        prenom: 'Michael',
        diplome: 'Doctorat en Informatique',
        specialite: 'Intelligence Artificielle',
        niveau_etude: 'Bac+8'
      },
      {
        id: 4,
        cne: 'D456789',
        ppr: '789123456',
        nom: 'Wilson',
        prenom: 'Sara',
        diplome: 'technicien spécialisé en Finance',
        specialite: 'Analyse Financière',
        niveau_etude: 'Bac+2'
      },
      {
        id: 5,
        cne: 'E987654',
        ppr: '321654987',
        nom: 'Thomas',
        prenom: 'Chris',
        diplome: 'technicien spécialisé en Informatique',
        specialite: 'Développement Web',
        niveau_etude: 'Bac+2'
      },
      {
        id: 6,
        cne: 'F123789',
        ppr: '654789123',
        nom: 'Jones',
        prenom: 'Emily',
        diplome: 'Master en Communication',
        specialite: 'Relations Publiques',
        niveau_etude: 'Bac+5'
      },
      {
        id: 7,
        cne: 'G468123',
        ppr: '159753468',
        nom: 'Brown',
        prenom: 'Kevin',
        diplome: 'Doctorat en Management',
        specialite: 'Stratégie d\'Entreprise',
        niveau_etude: 'Bac+8'
      },
      {
        id: 8,
        cne: 'H147852',
        ppr: '369852147',
        nom: 'White',
        prenom: 'Lisa',
        diplome: 'Licence en Ressources Humaines',
        specialite: 'Gestion du Personnel',
        niveau_etude: 'Bac+3'
      },
      {
        id: 9,
        cne: 'I369147',
        ppr: '258147369',
        nom: 'Miller',
        prenom: 'Adam',
        diplome: 'technicien spécialisé en Économie',
        specialite: 'Analyse Macroéconomique',
        niveau_etude: 'Bac+2'
      },
      {
        id: 10,
        cne: 'J963258',
        ppr: '741258963',
        nom: 'Moore',
        prenom: 'Olivia',
        diplome: 'Licence en Psychologie',
        specialite: 'Psychologie Cognitive',
        niveau_etude: 'Bac+3'
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
