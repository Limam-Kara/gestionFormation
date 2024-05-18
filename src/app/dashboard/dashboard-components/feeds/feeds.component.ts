import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Feeds,Feed } from './feeds-data';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/component/services/User/user.service';
import { Utilisateur } from 'src/app/modeles/Utilisateur';


@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html'
})
export class FeedsComponent implements OnInit {
  apiData: Utilisateur[] = [];
  niveauEtudeData: { niveauEtude: string, count: number }[] = [];

  constructor(
    private utilisateurService: UserService,
  ) { }

  ngOnInit(): void {
    this.loadBeneficiaiares();
  }

  loadBeneficiaiares(): void {
    this.utilisateurService.getAllUtilisateurs().subscribe(
      (utilisateurs: Utilisateur[]) => {
        this.apiData = utilisateurs;
        this.extractNiveauEtudeData();
      },
      (error) => {
        console.error('Erreur lors du chargement des Utilisateur:', error);
      }
    );
  }

  extractNiveauEtudeData(): void {
    const counts = new Map<string, number>();

    this.apiData.forEach(user => {
      user.formations?.forEach(formation => {
        const niveauEtude = formation.niveauEtude || 'Unknown'; // Handle null or undefined niveauEtude
        counts.set(niveauEtude, (counts.get(niveauEtude) || 0) + 1);
      });
    });

    this.niveauEtudeData = Array.from(counts).map(([niveauEtude, count]) => ({ niveauEtude, count }));
  }
}
