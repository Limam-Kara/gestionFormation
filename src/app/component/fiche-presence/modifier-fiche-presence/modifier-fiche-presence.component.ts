import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

// Interface décrivant la structure d'un objet dans apiData
interface Formation {
  id: number;
  title: string;
  body: string;
  startDate: string;
  endDate: string;
  thematique: string;
}
interface Beneficiaire {
  ppr: string;
  cne: string;
  nom: string;
  prenom: string;
  thematique: string;
}
@Component({
  selector: 'app-modifier-fiche-presence',
  templateUrl: './modifier-fiche-presence.component.html',
  styleUrls: ['./modifier-fiche-presence.component.scss'],
})
export class ModifierFichePresenceComponent implements OnInit {
  formationForm!: FormGroup;
  apiData: Formation[] = [
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
      endDate: '2024-05-15',
      thematique: 'Soft Skills',
    },
    // Ajoutez d'autres données de formation ici
  ];
  joursFormation: string[] = []; // Liste des jours de formation pour la thématique sélectionnée
  beneficiaires: Beneficiaire[] = [
    {
      ppr: '123456',
      cne: 'A12345',
      nom: 'Doe',
      prenom: 'John',
      thematique: 'Soft Skills',
    },
    {
      ppr: '123456',
      cne: 'A12345',
      nom: 'Doe',
      prenom: 'John',
      thematique: 'Soft Skills',
    },
    {
      ppr: '123456',
      cne: 'A12345',
      nom: 'Doe',
      prenom: 'John',
      thematique: 'Soft Skills',
    },
    {
      ppr: '789012',
      cne: 'B67890',
      nom: 'Smith',
      prenom: 'Jane',
      thematique: 'Leadership',
    },
    // Ajoutez d'autres bénéficiaires en fonction de la thématique et de la date choisie
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formationForm = this.fb.group({
      thematique: [''], // Contrôle pour la sélection de la thématique
    });
  }
  thema!: string;
  // Méthode pour filtrer les jours de formation en fonction de la thématique sélectionnée
  filterJoursFormation(): void {
    const selectedThematique = this.formationForm.get('thematique')?.value;
    this.thema = this.formationForm.get('thematique')?.value;
    if (selectedThematique) {
      const selectedFormation = this.apiData.find(
        (data) => data.thematique === selectedThematique
      );

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
}
