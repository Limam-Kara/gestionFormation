import { Thematique } from "./Thematique";
import { Utilisateur } from "./Utilisateur";

export interface Absence {
  id?: number;
  etatAbsence: boolean;
  dateAbsence: Date;
  utilisateur: Utilisateur;
  thematique: Thematique;
}
