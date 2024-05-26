import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ForgetService } from 'src/app/component/services/forget/forget.service';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.scss']
})
export class ForgetPassComponent {
  email: string = ''; // Property to bind to the input field

  constructor(private forgetPasswordService: ForgetService, private toastr: ToastrService) {}

  onSubmit() {
    if (!this.email) {
      this.toastr.warning('Veuillez saisir votre email.', 'Avertissement');
      return;
    }

    this.forgetPasswordService.forgetPassword(this.email).subscribe(
      (response: any) => {
        this.toastr.success('Vérifiez votre e-mail pour réinitialiser votre mot de passe.', 'Succès');
        console.log(response);
      },
      (error: any) => {
        this.toastr.error('Erreur lors de la réinitialisation du mot de passe.', 'Erreur');
        console.error('Forget Password error:', error);
      }
    );
  }
}
