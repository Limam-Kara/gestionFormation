import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Utilisateur } from 'src/app/modeles/Utilisateur';
import { UserService } from './../../services/User/user.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-create-beneficiaiares',
  templateUrl: './create-beneficiaiares.component.html',
  styleUrls: ['./create-beneficiaiares.component.scss']
})
export class CreateBeneficiaiaresComponent {
  utilisateur: Utilisateur = {
    account:true,
    idRole: {
      id: 2,
      nom: '',
      description: ''
    }
  }// Initialize a new Thematique object
  roleid=0;
  constructor(private utilisateurService: UserService, private toastr: ToastrService, private router: Router,) { }
  @Output() utilisateurAdded: EventEmitter<void> = new EventEmitter<void>();
  onSubmit(): void {
    if (!this.utilisateur.username) {
      this.utilisateur.username = this.utilisateur.ppr;
    }
    if (!this.utilisateur.password) {
      this.utilisateur.password = this.utilisateur.ppr;
    }
    // Check for required fields
    if (!this.utilisateur.ppr || !this.utilisateur.nom || !this.utilisateur.prenom ||
        !this.utilisateur.username || !this.utilisateur.email || !this.utilisateur.password ||
        !this.utilisateur.tel || !this.utilisateur.fonction) {
      this.toastr.warning('Veuillez remplir tous les champs obligatoires', 'Champs requis manquants');
      return; // Stop further execution
    }

    // Validate fields using regex patterns
    if (!this.isValidName(this.utilisateur.nom)) {
      this.toastr.warning('Veuillez saisir un nom valide', 'Nom invalide');
      return;
    }

    if (!this.isValidName(this.utilisateur.prenom)) {
      this.toastr.warning('Veuillez saisir un prénom valide', 'Prénom invalide');
      return;
    }

    if (!this.isValidEmail(this.utilisateur.email)) {
      this.toastr.warning('Veuillez saisir une adresse e-mail valide', 'E-mail invalide');
      return;
    }

    if (!this.isValidPhoneNumber(this.utilisateur.tel)) {
      this.toastr.warning('Veuillez saisir un numéro de téléphone valide', 'Numéro de téléphone invalide');
      return;
    }

    if (!this.isValidFunction(this.utilisateur.fonction)) {
      this.toastr.warning('Veuillez saisir une fonction valide', 'Fonction invalide');
      return;
    }

    console.log(this.utilisateur);
    if (this.utilisateur.idRole) {
      this.utilisateur.idRole.id=this.roleid
    }

    // Save the Utilisateur
    this.utilisateurService.saveUtilisateur(this.utilisateur).subscribe(
      (response) => {
        console.log('Utilisateur added successfully:', response);
        this.toastr.success('Utilisateur ajouté avec succès', 'Succès');

        // Optionally reset the form or perform other actions after successful submission
        this.utilisateur = {}; // Reset the utilisateur object
        this.utilisateurAdded.emit();
      },
      (error) => {
        console.error('Error adding Utilisateur:', error);
        if (error.status === 409) {
          this.toastr.warning('Un utilisateur avec les mêmes attributs existe déjà', 'Erreur de conflit');
        } else if (error.status === 500) {
          this.toastr.error('Erreur lors de l\'ajout de l\'utilisateur', 'Erreur interne du serveur');
        } else {
          this.toastr.error('Une erreur inattendue s\'est produite', 'Erreur');
        }
      }
    );
  }

  isValidName(name: string): boolean {
    // Regular expression for a valid name (letters only, at least 2 characters)
    const nameRegex = /^[a-zA-ZÀ-ÿ\s]{2,}$/;
    return nameRegex.test(name);
  }

  isValidEmail(email: string): boolean {
    // Regular expression for a valid email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidPhoneNumber(phoneNumber: string): boolean {
    // Regular expression for a valid phone number (digits only, 10 digits)
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  }

  isValidFunction(func: string): boolean {
    // Regular expression for a valid function (letters and spaces only, at least 2 characters)
    const functionRegex = /^[a-zA-ZÀ-ÿ\s]{2,}$/;
    return functionRegex.test(func);
  }
}
