import { Thematique } from "./Thematique";
import { Utilisateur } from "./Utilisateur";

export interface Group {
  id: number;
  numGroupe: string;
  thematique: Thematique;
  utilisateurs: Utilisateur[];
}
