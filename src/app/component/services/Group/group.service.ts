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

  updateGroupAndAssignUser(userId: number, groupId: number): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/updateAndAssignUser?userId=${userId}&groupId=${groupId}`, {})
      .pipe(
        catchError(this.handleError)
      );
  }

  removeUserFromGroup(userId: number, groupId: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/removeUser?userId=${userId}&groupId=${groupId}`, {})
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
