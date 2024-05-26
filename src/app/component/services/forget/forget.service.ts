import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgetService {

  constructor(private http: HttpClient) { }
  forgetPassword(email: string): Observable<any> {
    return this.http.post(environment.baseUrl + 'forgetPassword', email, { responseType: 'text' });
  }
}
