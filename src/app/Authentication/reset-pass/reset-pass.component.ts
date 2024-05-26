import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResetService } from 'src/app/component/services/reset/reset.service';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss']
})
export class ResetPassComponent {
  password: string = '';
  passwordConfirmer: string = '';
  token!: string;


  constructor(
    private resetPasswordService: ResetService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Retrieve token from route parameters
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  onSubmit() {
    if (!this.password || !this.passwordConfirmer) {
      this.toastr.warning('Veuillez saisir un mot de passe et le confirmer.', 'Avertissement');
      return;
    }

    if (this.password !== this.passwordConfirmer) {
      this.toastr.warning('Les mots de passe ne correspondent pas.', 'Avertissement');
      return;
    }

    this.resetPasswordService.resetPassword(this.token, this.password).subscribe(
      (response: any) => {
        console.log(response);
        this.toastr.success('Mot de passe réinitialisé avec succès !', 'Succès');
        // Redirect or handle success according to your application's logic
      },
      (error: any) => {
        console.error('Reset Password error:', error);
        this.toastr.error('Erreur lors de la réinitialisation du mot de passe.', 'Erreur');
        // Handle error response according to your application's logic
      }
    );
  }

}
