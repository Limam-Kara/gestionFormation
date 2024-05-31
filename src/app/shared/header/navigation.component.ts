import { Component, AfterViewInit, EventEmitter, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserAuthService } from 'src/app/component/services/Auth/user-auth.service';
import { LogoutService } from 'src/app/component/services/Logout/logout.service';
import { UserService } from 'src/app/component/services/User/user.service';
 // Adjust the import as per your project structure
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Utilisateur } from 'src/app/modeles/Utilisateur';

declare var $: any;

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports:[NgbDropdownModule],
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements AfterViewInit, OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  public showSearch = false;
  public fullName: string = '';

  constructor(
    private logoutService: LogoutService,
    private authService: UserAuthService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('id'); // Adjust the key as per your local storage setup
    if (userId) {
      this.getUtilisateurById(Number(userId)).subscribe(
        user => {
          this.fullName = `${user.nom} ${user.prenom}`;
        },
        error => {
          console.error('Failed to fetch user details:', error);
        }
      );
    }
  }

  logout(): void {
    this.logoutService.logout().subscribe(
      () => {
        this.authService.clear();
        this.router.navigate(['/Authentication/Login']); // Redirect to login page after successful logout
      },
      error => {
        console.error('Logout failed:', error);
      }
    );
  }

  ngAfterViewInit() {
  }

  getUtilisateurById(id: number): Observable<Utilisateur> {
    return this.userService.getUtilisateurById(id) // Ensure this method exists in your UserService
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(error);
  }
}
