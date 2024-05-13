import { Component, Input } from '@angular/core';
import { Utilisateur } from 'src/app/modeles/Utilisateur';

@Component({
  selector: 'app-detail-beneficiaiares',
  templateUrl: './detail-beneficiaiares.component.html',
  styleUrls: ['./detail-beneficiaiares.component.scss']
})
export class DetailBeneficiaiaresComponent {
  @Input() selectedUtilisateur: Utilisateur ={
    idRole: {
      id: 2,
      nom: 'user',
      description: 'User role'
    }
  };
}
