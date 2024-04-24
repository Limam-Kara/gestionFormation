import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsRoutes } from './component.routing';
import { ListComponent } from './thematique/list/list.component';
import { CreateThematiquesComponent } from './thematique/create/create.component';
import { ModifierThematiqueComponent } from './thematique/modifier-thematique/modifier-thematique.component';
import { SupprimerThematiqueComponent } from './thematique/supprimer-thematique/supprimer-thematique.component';
import { ListBeneficiaiaresComponent } from './beneficiares/list-beneficiaiares/list-beneficiaiares.component';
import { CreateBeneficiaiaresComponent } from './beneficiares/create-beneficiaiares/create-beneficiaiares.component';
import { ModifierBeneficiaiaresComponent } from './beneficiares/modifier-beneficiaiares/modifier-beneficiaiares.component';
import { SupprimerBeneficiaiaresComponent } from './beneficiares/supprimer-beneficiaiares/supprimer-beneficiaiares.component';
import { ListFormationComponent } from './formation/list-formation/list-formation.component';
import { CreateFormationComponent } from './formation/create-formation/create-formation.component';
import { ModifierFormationComponent } from './formation/modifier-formation/modifier-formation.component';
import { SupprimerFormationComponent } from './formation/supprimer-formation/supprimer-formation.component';
import { ListAffectationComponent } from './affectation/list-affectation/list-affectation.component';
import { CreateAffectationComponent } from './affectation/create-affectation/create-affectation.component';
import { ModifierAffectationComponent } from './affectation/modifier-affectation/modifier-affectation.component';
import { SupprimerAffectationComponent } from './affectation/supprimer-affectation/supprimer-affectation.component';
import { ListFichePresenceComponent } from './fiche-presence/list-fiche-presence/list-fiche-presence.component';
import { ModifierFichePresenceComponent } from './fiche-presence/modifier-fiche-presence/modifier-fiche-presence.component';
import { ListEvaluationComponent } from './evaluation/list-evaluation/list-evaluation.component';
import { CreateEvaluationComponent } from './evaluation/create-evaluation/create-evaluation.component';
import { SupprimerEvaluationComponent } from './evaluation/supprimer-evaluation/supprimer-evaluation.component';
import { ListbenificiareEvaluationComponent } from './evaluation/listbenificiare-evaluation/listbenificiare-evaluation.component';
import { ImprimerFichePresenceComponent } from './fiche-presence/imprimer-fiche-presence/imprimer-fiche-presence.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  declarations: [
    ListComponent,
    CreateThematiquesComponent,
    ModifierThematiqueComponent,
    SupprimerThematiqueComponent,
    ListBeneficiaiaresComponent,
    CreateBeneficiaiaresComponent,
    ModifierBeneficiaiaresComponent,
    SupprimerBeneficiaiaresComponent,
    ListFormationComponent,
    CreateFormationComponent,
    ModifierFormationComponent,
    SupprimerFormationComponent,
    ListAffectationComponent,
    CreateAffectationComponent,
    ModifierAffectationComponent,
    SupprimerAffectationComponent,
    ListFichePresenceComponent,
    ModifierFichePresenceComponent,
    ListEvaluationComponent,
    CreateEvaluationComponent,
    SupprimerEvaluationComponent,
    ListbenificiareEvaluationComponent,
    ImprimerFichePresenceComponent
  ],
})
export class ComponentsModule { }
