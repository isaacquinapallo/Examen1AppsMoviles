import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../services/chat.service';
import { Subscription } from 'rxjs';
import { ChatMessage } from '../models/chat-message.model';
import { SupabaseService } from '../services/supabase.service';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, HttpClientModule],
})
export class ChatPage implements OnInit, OnDestroy {
  messages: ChatMessage[] = [];
  newMessage = '';
  private messagesSub?: Subscription;

  currentUserId = '';
  currentUserName = '';
  currentUserAvatar = '';

  private sendingMessage = false; // evita envíos múltiples simultáneos

  funnyPhrase = ''; // Aquí guardamos la frase divertida

  constructor(
    private chatService: ChatService,
    private supabase: SupabaseService,
    private cd: ChangeDetectorRef,
    private http: HttpClient
  ) {}

  async ngOnInit() {
    try {
      // Obtengo usuario sólo 1 vez
      const user = await this.supabase.client.auth.getUser();
      if (user.data.user) {
        this.currentUserId = user.data.user.id;
        this.currentUserName =
          user.data.user.user_metadata?.['name'] ?? 'Anónimo';
        this.currentUserAvatar = user.data.user.user_metadata?.['avatar_url'] ?? '';
      } else {
        console.warn('User not logged in for ChatPage');
        this.currentUserName = 'Anónimo';
      }

      await this.chatService.loadMessages();

      this.messagesSub = this.chatService.messages$.subscribe((msgs) => {
        this.messages = msgs;
        this.cd.detectChanges();
      });

      this.chatService.subscribeToMessages();
    } catch (error) {
      console.error('Error initializing chat page:', error);
    }
  }

  ngOnDestroy() {
    this.messagesSub?.unsubscribe();
    this.chatService.unsubscribe();
  }

  async sendMessage(): Promise<void> {
    if (
      this.sendingMessage ||
      !this.newMessage.trim() ||
      !this.currentUserId
    )
      return;

    this.sendingMessage = true;
    try {
      // Paso el user_id ya obtenido, sin que el servicio consulte auth.getUser()
      await this.chatService.sendMessage({
        user_id: this.currentUserId,
        user_name: this.currentUserName,
        avatar_url: this.currentUserAvatar,
        message: this.newMessage.trim(),
        type: 'text',
      });
      this.newMessage = '';
    } catch (error) {
      console.error('Error enviando mensaje:', error);
    } finally {
      this.sendingMessage = false;
    }
  }

  async sendLocation(): Promise<void> {
    if (!this.currentUserId) return;

    try {
      const coordinates = await Geolocation.getCurrentPosition();
      const { latitude, longitude } = coordinates.coords;
      const locationMessage = `${latitude},${longitude}`;

      await this.chatService.sendMessage({
        user_id: this.currentUserId,
        user_name: this.currentUserName,
        avatar_url: this.currentUserAvatar,
        message: locationMessage,
        type: 'location',
      });
    } catch (error) {
      console.error('Error obteniendo ubicación:', error);
    }
  }

  async sendPhoto(): Promise<void> {
    if (!this.currentUserId) {
      console.warn('No hay usuario logueado, no se puede enviar foto');
      return;
    }

    try {
      const photo = await Camera.getPhoto({
        quality: 70,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt,
      });

      if (!photo || !photo.webPath) {
        console.warn('No se obtuvo ruta válida de la foto');
        return;
      }

      const response = await fetch(photo.webPath);
      const blob = await response.blob();

      const fileName = `${uuidv4()}.jpeg`;

      const { data, error: uploadError } = await this.supabase.client.storage
        .from('chat-photos')
        .upload(fileName, blob, {
          contentType: 'image/jpeg',
          upsert: false,
        });

      if (uploadError) {
        console.error('Error subiendo la imagen:', uploadError);
        return;
      }

      const { data: publicUrlData } = this.supabase.client.storage
        .from('chat-photos')
        .getPublicUrl(fileName);

      const publicUrl = publicUrlData?.publicUrl;

      if (!publicUrl) {
        console.error('No se pudo obtener la URL pública de la imagen');
        return;
      }

      await this.chatService.sendMessage({
        user_id: this.currentUserId,
        user_name: this.currentUserName,
        avatar_url: this.currentUserAvatar,
        message: publicUrl,
        type: 'image',
      });
    } catch (error) {
      console.error('Error en sendPhoto():', error);
    }
  }

  fetchFunnyPhrase(): void {
    this.http.get<any>('https://api.chucknorris.io/jokes/random').subscribe({
      next: (response) => {
        this.funnyPhrase = response.value;
      },
      error: (err) => {
        console.error('Error al obtener frase divertida:', err);
        this.funnyPhrase = '';
      },
    });
  }

  private botUserId = '00000000-0000-0000-0000-000000000001';

  sendFunnyPhrase(): void {
    this.http.get<any>('https://api.chucknorris.io/jokes/random').subscribe({
      next: async (response) => {
        try {
          await this.chatService.sendMessage({
            user_id: this.botUserId,
            user_name: 'ChuckBot',
            avatar_url:
              'https://api.chucknorris.io/img/chucknorris_logo_coloured_small.png',
            message: response.value,
            type: 'text',
          });
        } catch (error) {
          console.error('Error enviando frase divertida:', error);
        }
      },
      error: (err) => {
        console.error('Error al obtener frase divertida:', err);
      },
    });
  }
}
