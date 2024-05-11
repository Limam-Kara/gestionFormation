import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Thematique } from '../../../modeles/Thematique';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ThematiqueService {

  private baseUrl = `${environment.baseUrl}thematiques`; // Corrected string interpolation

  constructor(private http: HttpClient) { }

  getThematiqueById(id: number): Observable<Thematique> {
    return this.http.get<Thematique>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllThematiques(): Observable<Thematique[]> {
    return this.http.get<Thematique[]>(`${this.baseUrl}/all`)
      .pipe(
        catchError(this.handleError)
      );
  }

  saveThematique(thematique: Thematique): Observable<Thematique> {
    return this.http.post<Thematique>(`${this.baseUrl}/save`, thematique)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateThematique(id: number, thematique: Thematique): Observable<Thematique> {
    return this.http.put<Thematique>(`${this.baseUrl}/${id}`, thematique)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteThematiqueById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
