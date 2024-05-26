import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { UserAuthService } from "../component/services/Auth/user-auth.service";
import { LogoutService } from "../component/services/Logout/logout.service";


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private router: Router,private authService: UserAuthService,private logoutService:  LogoutService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwtToken = localStorage.getItem('jwtToken');
    let headers = request.headers;

    if (jwtToken) {
      // Add Authorization header if JWT token exists
      headers = headers.set('Authorization', `Bearer ${jwtToken}`);
      // headers = headers.set('Content-Type', `multipart/form-data`);
    }

    // Check if the request needs 'multipart/form-data' Content-Type header
    // if (request.body instanceof FormData) {
    //   headers = headers.set('Content-Type', 'multipart/form-data');
    // }

    // Clone the request with the updated headers
    request = request.clone({ headers });
    //console.log('HTTP Headers:', headers);
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          this.logoutService.logout().subscribe(
            () => {
              this.authService.clear();
              this.router.navigate(['/Login']); // Redirect to login page after successful logout
            },
            error => {
              console.error('Logout failed:', error);
            }
          );
          this.router.navigateByUrl('');
        }
        return throwError(error);
      })
    );
  }
}
