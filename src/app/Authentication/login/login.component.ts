import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { UserAuthService } from 'src/app/component/services/Auth/user-auth.service';
import { LoginService } from 'src/app/component/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  hide: boolean = true;

  constructor(
    private toastr: ToastrService,
    private loginService: LoginService,
    private userAuthService: UserAuthService,
    private router: Router
  ) {}
  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  onSubmit(loginForm: any): void {
    if (!loginForm.valid) {
      return;
    }

    const loginRequest = {
      username: this.username,
      password: this.password,
    };

    this.loginService.login(loginRequest).pipe(
      catchError((error) => {
        if (error.status === 401) {
          // Handle invalid credentials error
          this.toastr.error('Nom d\'utilisateur ou mot de passe invalide', 'Erreur de Connexion');
        } else {
          // Handle other errors
          this.toastr.error('Une erreur s\'est produite lors de la connexion', 'Erreur');
        }
        return of(null); // Return a new observable to complete the stream
      })
    ).subscribe((response) => {
      if (response && response.jwt) {
        // Handle successful login
        this.toastr.success('Connexion réussie !', 'Bienvenue', { closeButton: false });
        this.userAuthService.setRole(response.role);
        this.userAuthService.setToken(response.jwt);
        this.userAuthService.setID(response.id);
        setTimeout(() => {
          if (response.role==="ADMIN") {
            this.router.navigateByUrl('/dashboard');
          }
          else{
            this.router.navigateByUrl('/component/Evaluation.For');
          }

        }, 3300);
      }
    });
  }


}
