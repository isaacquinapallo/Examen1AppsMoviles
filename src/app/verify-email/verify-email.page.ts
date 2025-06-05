import { Component } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class VerifyEmailPage {
  userEmail: string | null = null;

  constructor(
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router
  ) {}

  async ionViewWillEnter() {
    // Obtener usuario actual para mostrar su email
    const user = await this.authService.getUser();
    this.userEmail = user?.email ?? null;
  }

  async resendVerification() {
    try {
      // Supabase no tiene método directo para reenviar el email
      // Pero puedes intentar registrar de nuevo el usuario con el mismo email para que se reenvíe,
      // o mejor instruir al usuario a revisar su email.
      // Aquí solo mostramos toast informativo.
      await this.presentToast(
        'Revisa tu correo para el link de verificación.',
        'success'
      );
    } catch (error: any) {
      this.presentToast('Error al reenviar correo: ' + error.message, 'danger');
    }
  }

  goToLogin() {
    this.router.navigate(['/welcome']); // O ruta de login si la tienes separada
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
}
