import { Thematique } from "./Thematique";
import { Utilisateur } from "./Utilisateur";

export interface Absence {
  id: number;
  etatAbsence: string;
  dateAbsence: string; 
  utilisateur: Utilisateur;
  thematique: Thematique;
}
