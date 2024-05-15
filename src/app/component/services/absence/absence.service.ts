import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Absence } from 'src/app/modeles/Absence';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {

  private baseUrl = environment.baseUrl ;

  constructor(private http: HttpClient) { }

  saveAbsences(absences: Absence[]): Observable<Absence[]> {
    return this.http.post<Absence[]>(`${this.baseUrl}absences/save`, absences)
      .pipe(
        catchError(this.handleError)
      );
  }
  getAllAbsences(): Observable<Absence[]> {
    return this.http.get<Absence[]>(`${this.baseUrl}absences/all`);
  }
  // Implement other methods for fetching, updating, deleting absences if needed

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
