import { Group } from "./Groupe";

export interface Thematique {
  id?: number;
  coutLogistique?: number;
  coutPedagogique?: number;
  dateDebut?: Date;
  dateFin?: Date;
  domaineFormation?: string;
  intitule?: string;
  nbrFormateurExtr?: number;
  nbrFormateurIntr?: number;
  nbrGroupe?: number;
  nbrJoursFormation?: number;
  objectif?: string;
  populationCible?: string;
  prestataire?: string;
  groupes?: Group[]; // Assuming Groupe interface is also defined
}
