import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Utilisateur } from '../../../modeles/Utilisateur';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.baseUrl +'utilisateurs'; // Base URL of your backend server

  constructor(private http: HttpClient) { }

  saveUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(`${this.baseUrl}`+"/save", utilisateur)
      .pipe(
        catchError(this.handleError)
      );
  }

  getUtilisateurByUsername(username: string): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.baseUrl}`+"/"+`${username}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllUtilisateurs(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.baseUrl}`+"/all")
      .pipe(
        catchError(this.handleError)
      );
  }

  editUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(`${this.baseUrl}`+"/edit", utilisateur)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteUtilisateur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}`+"/"+`${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
