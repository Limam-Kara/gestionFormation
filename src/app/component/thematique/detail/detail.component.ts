import { Component, Input } from '@angular/core';
import { Thematique } from 'src/app/modeles/Thematique';
import { ThematiqueService } from '../../services/Thematique/thematique.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-thematique',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailThematiqueComponent {
  thematique: Thematique ={ }// Initialize a new Thematique object
  @Input() selectedThematique: Thematique ={};
  constructor(private thematiqueService: ThematiqueService,private toastr: ToastrService,private router: Router) {}
}
