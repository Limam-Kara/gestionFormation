import { Thematique } from "./Thematique";

export interface Group {
  id: number;
  numGroupe: string;
  thematique: Thematique;
  // utilisateurs: Utilisateur[];
}
