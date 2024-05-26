import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResetService {

  constructor(private http: HttpClient) { }

  resetPassword(token: string, newPassword: string): Observable<any> {
    // Define the request body containing token and newPassword
    const requestBody = { token, newPassword };

    // Make the POST request with the request body
    return this.http.post(environment.baseUrl + 'resetPassword', requestBody,{ responseType: 'text' });
  }
}
