import { Component } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class WelcomePage {
  showLogin = true;           // Mostrar login por defecto
  showRegister = false;

  email = '';
  password = '';
  name = '';
  avatarUrl = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastController: ToastController
  ) {}

  toggleLogin() {
    this.showLogin = !this.showLogin;
    this.showRegister = false;
  }

  toggleRegister() {
    this.showRegister = !this.showRegister;
    this.showLogin = false;
  }

  async presentToast(message: string, color: 'success' | 'danger' = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
      color,
    });
    await toast.present();
  }

  async onLogin() {
    const { data, error } = await this.authService.login(this.email, this.password);
    if (error) {
      this.presentToast('Error al iniciar sesión: ' + error.message, 'danger');
    } else {
      this.presentToast('Inicio de sesión exitoso', 'success');
      this.resetForms();
      this.router.navigate(['/home']);
    }
  }

  async onRegister() {
    const { data, error } = await this.authService.register(
      this.email,
      this.password,
      this.name,
      this.avatarUrl
    );

    if (error) {
      this.presentToast('Error al registrarse: ' + error.message, 'danger');
    } else {
      this.presentToast(
        'Cuenta creada. Revisa tu correo y verifica tu cuenta para continuar.',
        'success'
      );
      this.resetForms();
      this.router.navigate(['/verify-email']); // 🔁 Redirige a pantalla de verificación
    }
  }

  resetForms() {
    this.email = '';
    this.password = '';
    this.name = '';
    this.avatarUrl = '';
    this.showLogin = true;
    this.showRegister = false;
  }
}
