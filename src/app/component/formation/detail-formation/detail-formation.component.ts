import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../../services/User/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Utilisateur } from 'src/app/modeles/Utilisateur';
import { FormationService } from '../../services/formation/formation.service';
import { Formation } from 'src/app/modeles/Formations';
declare var $: any;

@Component({
  selector: 'app-detail-formation',
  templateUrl: './detail-formation.component.html',
  styleUrls: ['./detail-formation.component.scss']
})
export class DetailFormationComponent {
  @Input() selectedUtilisateur: Utilisateur ={};
  @Input() selectedFormationId: number =0
  @Input() formation: Formation = {};
  constructor(private formationService: FormationService,private utilisateurService: UserService, private toastr: ToastrService, private router: Router) { }
}
