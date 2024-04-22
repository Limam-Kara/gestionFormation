import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ListComponent } from './thematique/list/list.component';
import { CreateThematiquesComponent } from './thematique/create/create.component';

export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'Bilan',
				component: DashboardComponent
			},
			{
				path: 'For.continu',
				component: DashboardComponent
			},
			{
				path: 'Fiche.présence',
				component: DashboardComponent
			},
			{
				path: 'Bénéficiaires',
				component: DashboardComponent
			},
			{
				path: 'Thématiques',
				component: ListComponent
			},
			{
				path: 'Affectation',
				component: DashboardComponent
			},
			{
				path: 'Evaluation',
				component: DashboardComponent
			},
			{
				path: 'For.initiale',
				component: DashboardComponent
			},
      {
        path:'create',
        component:CreateThematiquesComponent
      },
		]
	}
];
