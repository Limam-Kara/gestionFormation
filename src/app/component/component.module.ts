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
    SupprimerThematiqueComponent
  ],
})
export class ComponentsModule { }
