import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../../services/User/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Utilisateur } from 'src/app/modeles/Utilisateur';
declare var $: any;
@Component({
  selector: 'app-modifier-beneficiaiares',
  templateUrl: './modifier-beneficiaiares.component.html',
  styleUrls: ['./modifier-beneficiaiares.component.scss']
})
export class ModifierBeneficiaiaresComponent  {
  ngOnInit(): void {
    this.loadBeneficiaiares();
  }
  apiData: Utilisateur[] = [];
  @Input() selectedUtilisateur: Utilisateur ={
    idRole: {
      id: 2,
      nom: 'user',
      description: 'User role'
    }
  };
  loadBeneficiaiares(): void {
    this.utilisateurService.getAllUtilisateurs().subscribe(
      (utilisateur: Utilisateur[]) => {
        this.apiData = utilisateur;
        console.log('Utilisateur:', this.apiData);

      },
      (error) => {
        console.error('Erreur lors du chargement des Utilisateur:', error);
      }
    );
  }
  utilisateurUpdate: Utilisateur ={};
  constructor(private utilisateurService: UserService,private toastr: ToastrService,private router: Router) {}
  @Output() utilisateurUpdated: EventEmitter<void> = new EventEmitter<void>();
  onSubmit(): void {
    if (this.isUtilisateurExistsForUpdate(this.selectedUtilisateur)) {
      this.toastr.warning('Un utilisateur avec les mêmes attributs existe déjà', 'Erreur de conflit');
      return;
    }
    if (!this.selectedUtilisateur.username) {
      this.selectedUtilisateur.username = this.selectedUtilisateur.ppr;
    }
    if (!this.selectedUtilisateur.password) {
      this.selectedUtilisateur.password = this.selectedUtilisateur.ppr;
    }
    // Check for required fields
    if (!this.selectedUtilisateur.ppr || !this.selectedUtilisateur.nom || !this.selectedUtilisateur.prenom ||
        !this.selectedUtilisateur.username || !this.selectedUtilisateur.email || !this.selectedUtilisateur.password ||
        !this.selectedUtilisateur.tel || !this.selectedUtilisateur.fonction) {
      this.toastr.warning('Veuillez remplir tous les champs obligatoires', 'Champs requis manquants');
      return; // Stop further execution
    }

    // Validate fields using regex patterns
    if (!this.isValidName(this.selectedUtilisateur.nom)) {
      this.toastr.warning('Veuillez saisir un nom valide', 'Nom invalide');
      return;
    }

    if (!this.isValidName(this.selectedUtilisateur.prenom)) {
      this.toastr.warning('Veuillez saisir un prénom valide', 'Prénom invalide');
      return;
    }

    if (!this.isValidEmail(this.selectedUtilisateur.email)) {
      this.toastr.warning('Veuillez saisir une adresse e-mail valide', 'E-mail invalide');
      return;
    }

    if (!this.isValidPhoneNumber(this.selectedUtilisateur.tel)) {
      this.toastr.warning('Veuillez saisir un numéro de téléphone valide', 'Numéro de téléphone invalide');
      return;
    }

    if (!this.isValidFunction(this.selectedUtilisateur.fonction)) {
      this.toastr.warning('Veuillez saisir une fonction valide', 'Fonction invalide');
      return;
    }
    const utilisateurUpdate: Utilisateur = {
      id: this.selectedUtilisateur.id,
      ppr: this.selectedUtilisateur.ppr,
      nom: this.selectedUtilisateur.nom,
      prenom: this.selectedUtilisateur.prenom,
      fonction: this.selectedUtilisateur.fonction,
      username: this.selectedUtilisateur.username,
      email: this.selectedUtilisateur.email,
      tel: this.selectedUtilisateur.tel,
      genre: this.selectedUtilisateur.genre,
      adresse: this.selectedUtilisateur.adresse,
      dateDeNaissance: this.selectedUtilisateur.dateDeNaissance,
      formations: this.selectedUtilisateur.formations,
      idRole: this.selectedUtilisateur.idRole
    };
    console.log(utilisateurUpdate);

    // Save the Utilisateur
    this.utilisateurService.editUtilisateur(utilisateurUpdate).subscribe(
      (response) => {
        console.log('Utilisateur updated successfully:', response);
        $('#MT').modal('hide');

        // Remove the modal backdrop manually
        $('.modal-backdrop').remove();

        // Optionally, you can also reset the body class to remove the modal-open class
        $('body').removeClass('modal-open');
        // Optionally reset the form or perform other actions after successful submission
        this.utilisateurUpdated.emit();
      },
      (error) => {
        console.error('Error updating Utilisateur:', error);
        if (error.status === 404) {
          this.toastr.warning('Utilisateur non trouvé', 'Erreur');
        } else if (error.status === 409) {
          this.toastr.warning('Un utilisateur avec les mêmes attributs existe déjà', 'Erreur de conflit');
        } else {
          this.toastr.error('Une erreur inattendue s\'est produite', 'Erreur');
        }
      }
    );
  }
  public isUtilisateurExistsForUpdate(updatedUtilisateur: Utilisateur): boolean {
    const updatedId = updatedUtilisateur.id;

    // Check if any other utilisateur in apiData has the same PPR or username as the updated utilisateur
    return this.apiData.some(user => {
      // Skip comparing with the current utilisateur being edited (based on ID)
      if (user.id === updatedId) {
        return false;
      }

      return user.ppr === updatedUtilisateur.ppr || user.username === updatedUtilisateur.username || user.email === updatedUtilisateur.email;
    });
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
