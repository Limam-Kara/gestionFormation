import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Formation } from 'src/app/modeles/Formations';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  private baseUrl = environment.baseUrl + 'formations';

  constructor(private http: HttpClient) { }

  getFormationById(id: number): Observable<Formation> {
    return this.http.get<Formation>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllFormations(): Observable<Formation[]> {
    return this.http.get<Formation[]>(`${this.baseUrl}/all`)
      .pipe(
        catchError(this.handleError)
      );
  }

  saveFormation(formation: Formation): Observable<Formation> {
    return this.http.post<Formation>(`${this.baseUrl}/save`, formation)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteFormationById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getFormationsByUtilisateurId(utilisateurId: number): Observable<Formation[]> {
    return this.http.get<Formation[]>(`${this.baseUrl}utilisateur/${utilisateurId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
