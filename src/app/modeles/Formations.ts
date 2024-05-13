import { Utilisateur } from "./Utilisateur";

export interface Formation {
  id?: number;
  specialite?: string;
  diplome?: string;
  niveauEtude?: string;
  utilisateur?: Utilisateur;
}
