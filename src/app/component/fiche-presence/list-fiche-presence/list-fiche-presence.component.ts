import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Beneficiaire } from 'src/app/modeles/beneficiaire';
import { Formation } from 'src/app/modeles/formation';
declare var $: any;

@Component({
  selector: 'app-list-fiche-presence',
  templateUrl: './list-fiche-presence.component.html',
  styleUrls: ['./list-fiche-presence.component.scss'],
})
export class ListFichePresenceComponent {
  apiData: Formation[];
  apiDatafr!: Beneficiaire[];

  formationForm!: FormGroup;

  joursFormation: string[] = [];

  beneficiaires: Beneficiaire[] = [
    {
      id: 1,
      cne: 'A123456',
      ppr: '123456789',
      nom: 'Doe',
      prenom: 'John',
      thematique: 'Leadership',
      isPresent: false,
    },
    {
      id: 2,
      cne: 'B654321',
      ppr: '987654321',
      nom: 'Smith',
      prenom: 'Jane',
      thematique: 'Soft Skills',
      isPresent: true,
    },
    {
      id: 3,
      cne: 'C789123',
      ppr: '456123789',
      nom: 'Johnson',
      prenom: 'Michael',
      thematique: 'Management',
      isPresent: false,
    },
    {
      id: 4,
      cne: 'D456789',
      ppr: '789123456',
      nom: 'Wilson',
      prenom: 'Sara',
      thematique: 'Communication interpersonnelle',
      isPresent: false,
    },
    {
      id: 5,
      cne: 'E987654',
      ppr: '321654987',
      nom: 'Thomas',
      prenom: 'Chris',
      thematique: 'Développement personnel',
      isPresent: false,
    },
    {
      id: 6,
      cne: 'F123789',
      ppr: '654789123',
      nom: 'Jones',
      prenom: 'Emily',
      thematique: 'Gestion du temps',
      isPresent: false,
    },
    {
      id: 7,
      cne: 'G468123',
      ppr: '159753468',
      nom: 'Brown',
      prenom: 'Kevin',
      thematique: 'Leadership',
      isPresent: false,
    },
    {
      id: 8,
      cne: 'H147852',
      ppr: '369852147',
      nom: 'White',
      prenom: 'Lisa',
      thematique: 'Soft Skills',
      isPresent: false,
    },
    {
      id: 9,
      cne: 'I369147',
      ppr: '258147369',
      nom: 'Miller',
      prenom: 'Adam',
      thematique: 'Management',
      isPresent: false,
    },
    {
      id: 10,
      cne: 'J963258',
      ppr: '741258963',
      nom: 'Moore',
      prenom: 'Olivia',
      thematique: 'Communication interpersonnelle',
      isPresent: false,
    },
    // Ajoutez d'autres bénéficiaires en fonction de la thématique et de la date choisie
  ];
  thematique_choisi!: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder
  ) {
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
    this.formationForm = this.fb.group({
      thematique: [''], // Contrôle pour la sélection de la thématique
      jourFormation: [''], // Contrôle pour la sélection du jour de formation
    });
  }

  // ngOnInit(): void {

  // }

  filterJoursFormation(): void {
    this.thematique_choisi = this.formationForm!.get('thematique')?.value;
    if (this.thematique_choisi == 'tt') {
      this.apiDatafr = [];
      this.joursFormation = [];
    }
    if (this.thematique_choisi) {
      const selectedFormation = this.apiData.find(
        (data) => data.thematique === this.thematique_choisi
      );
      // setTimeout(() => {
      this.apiDatafr = this.beneficiaires.filter(
        (data) => data.thematique === this.thematique_choisi
      )
      
      console.log(this.apiDatafr)
      // ;}, 1000);
      if (selectedFormation) {
        // Récupérer les jours entre la startDate et la endDate
        const startDate = new Date(selectedFormation.startDate);
        const endDate = new Date(selectedFormation.endDate);
        const joursArray = [];

        for (
          let date = startDate;
          date <= endDate;
          date.setDate(date.getDate() + 1)
        ) {
          joursArray.push(date.toISOString().split('T')[0]); // Convertir la date en format ISO (YYYY-MM-DD)
        }

        this.joursFormation = joursArray;
      }
    } else {
      this.joursFormation = []; // Réinitialiser la liste des jours de formation si aucune thématique n'est sélectionnée
    }
  }
  toggleAttendance(id: number) {
    const beneficiaryfr = this.apiDatafr.find((b) => b.id === id);

    // Find the beneficiary by id
    if (beneficiaryfr) {
      beneficiaryfr.isPresent = !beneficiaryfr.isPresent;
      // Toggle the value of isPresent
    }
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
