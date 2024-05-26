import { ListevaluationuserComponent } from './evalutionuser/listevaluationuser/listevaluationuser.component';
import { SupprimerEvaluationComponent } from './evaluation/supprimer-evaluation/supprimer-evaluation.component';
import { ModifierFichePresenceComponent } from './fiche-presence/modifier-fiche-presence/modifier-fiche-presence.component';
import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ListComponent } from './thematique/list/list.component';
import { CreateThematiquesComponent } from './thematique/create/create.component';
import { ListBeneficiaiaresComponent } from './beneficiares/list-beneficiaiares/list-beneficiaiares.component';
import { ListFormationComponent } from './formation/list-formation/list-formation.component';
import { ListAffectationComponent } from './affectation/list-affectation/list-affectation.component';
import { ListFichePresenceComponent } from './fiche-presence/list-fiche-presence/list-fiche-presence.component';
import { ListEvaluationComponent } from './evaluation/list-evaluation/list-evaluation.component';
import { ListbenificiareEvaluationComponent } from './evaluation/listbenificiare-evaluation/listbenificiare-evaluation.component';
import { EvalutionFormComponent } from './evalution-form/evalution-form.component';
import { ListBilanComponent } from './Bilan/list-bilan/list-bilan.component';
import { AuthorizationGuard } from '../guards/authorization.guard';

export const ComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'Bilan',
        component: ListBilanComponent,
        canActivate: [AuthorizationGuard], // Add canActivate property with AuthorizationGuard
        data: { roles: ['ADMIN'] }
      },
      {
        path: 'For.continu',
        component: DashboardComponent,
        canActivate: [AuthorizationGuard], // Add canActivate property with AuthorizationGuard
        data: { roles: ['ADMIN'] }
      },
      {
        // ModifierFichePresenceComponent
        path: 'Fiche.présence',
        component: ListFichePresenceComponent,
        canActivate: [AuthorizationGuard], // Add canActivate property with AuthorizationGuard
        data: { roles: ['ADMIN'] }
      },
      {
        path: 'Bénéficiaires',
        component: ListBeneficiaiaresComponent,
        canActivate: [AuthorizationGuard], // Add canActivate property with AuthorizationGuard
        data: { roles: ['ADMIN'] }
      },
      {
        path: 'Thématiques',
        component: ListComponent,
        canActivate: [AuthorizationGuard], // Add canActivate property with AuthorizationGuard
        data: { roles: ['ADMIN'] }
      },
      {
        path: 'Affectation',
        component: ListAffectationComponent,
        canActivate: [AuthorizationGuard], // Add canActivate property with AuthorizationGuard
        data: { roles: ['ADMIN'] }
      },
      {
        path: 'Evaluation',
        component: ListEvaluationComponent,
        canActivate: [AuthorizationGuard], // Add canActivate property with AuthorizationGuard
        data: { roles: ['ADMIN'] }
      },
      {
        path: 'evaluationlist',
        component: ListbenificiareEvaluationComponent,
        canActivate: [AuthorizationGuard], // Add canActivate property with AuthorizationGuard
        data: { roles: ['ADMIN'] }
      },
      {
        path: 'For.initiale',
        component: ListFormationComponent,
        canActivate: [AuthorizationGuard], // Add canActivate property with AuthorizationGuard
        data: { roles: ['ADMIN'] }
      },
      {
        path: 'create',
        component: CreateThematiquesComponent,
        canActivate: [AuthorizationGuard], // Add canActivate property with AuthorizationGuard
        data: { roles: ['ADMIN'] }
      },
      {
        path: 'Evaluation.For',
        component: EvalutionFormComponent,
        canActivate: [AuthorizationGuard], // Add canActivate property with AuthorizationGuard
        data: { roles: ['ADMIN', 'USER'] }
      },{
        path: 'Evaluation.user',
        component: ListevaluationuserComponent,
        canActivate: [AuthorizationGuard], // Add canActivate property with AuthorizationGuard
        data: { roles: ['ADMIN', 'USER'] }
      },

    ],
  },
];
