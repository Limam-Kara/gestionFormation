import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Group } from 'src/app/modeles/Groupe';
import { environment } from '../../../environments/environment';
import { Utilisateur } from 'src/app/modeles/Utilisateur';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private baseUrl = environment.baseUrl + 'groups';

  constructor(private http: HttpClient) { }

  assignUserToGroup(userId: number, groupId: number): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/assignUser?userId=${userId}&groupId=${groupId}`, {})
      .pipe(
        catchError(this.handleError)
      );
  }

  updateGroup(groupId: number, group: Group): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/update/${groupId}`, group)
      .pipe(
        catchError(this.handleError)
      );
  }

  getUsersInGroup(groupId: number): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.baseUrl}/${groupId}/users`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.baseUrl}/all`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getGroupById(groupId: number): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.baseUrl}/${groupId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
