import {Gestionnaire} from "./gestionnaire.model";
import {Assureur} from "./assureur.model";

export interface Client {
  id: number;
  matricule: string;
  name?: string;
  prenom?: string;
  email?: string;
  telephone?: string;
  dateNaissance?: string; // Dates sont typiquement des chaînes en ISO 8601 en TypeScript
  sexe?: string;
  dateFeet?: string;
  dateSortie?: string;
  code1?: string;
  code2?: string;
  gestionnaireId: number;
  gestionnaire?: Gestionnaire;
  assureurId: number;
  assureur?: Assureur;
}
