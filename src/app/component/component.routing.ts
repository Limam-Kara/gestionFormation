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

export const ComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'Bilan',
        component: ListBilanComponent,
      },
      {
        path: 'For.continu',
        component: DashboardComponent,
      },
      {
        // ModifierFichePresenceComponent
        path: 'Fiche.présence',
        component: ListFichePresenceComponent,
      },
      {
        path: 'Bénéficiaires',
        component: ListBeneficiaiaresComponent,
      },
      {
        path: 'Thématiques',
        component: ListComponent,
      },
      {
        path: 'Affectation',
        component: ListAffectationComponent,
      },
      {
        path: 'Evaluation',
        component: ListEvaluationComponent,
      },
      {
        path: 'evaluationlist',
        component: ListbenificiareEvaluationComponent,
      },
      {
        path: 'For.initiale',
        component: ListFormationComponent,
      },
      {
        path: 'create',
        component: CreateThematiquesComponent,
      },
      {
        path: 'Evaluation.For',
        component: EvalutionFormComponent,
      },{
        path: 'Evaluation.user',
        component: ListevaluationuserComponent,
      },

    ],
  },
];
