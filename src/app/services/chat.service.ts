import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { ChatMessage } from '../models/chat-message.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private messagesSubject = new BehaviorSubject<ChatMessage[]>([]);
  messages$ = this.messagesSubject.asObservable();

  private channel: any;

  constructor(private supabase: SupabaseService) {}

  async loadMessages() {
    const { data, error } = await this.supabase.client
      .from('messages')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error cargando mensajes:', error);
    } else {
      this.messagesSubject.next(data ?? []);
    }
  }

  subscribeToMessages() {
    this.channel = this.supabase.client
      .channel('messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload: { new: ChatMessage }) => {
          const currentMessages = this.messagesSubject.value;
          // Evitar duplicados si ya existe el mensaje con mismo id
          const exists = payload.new.id && currentMessages.some(m => m.id === payload.new.id);
          if (!exists) {
            this.messagesSubject.next([...currentMessages, payload.new]);
          }
        }
      )
      .subscribe();
  }

  async unsubscribe() {
    if (this.channel) {
      await this.supabase.client.removeChannel(this.channel);
      this.channel = null;
    }
  }

  addMessageLocally(msg: ChatMessage) {
    const currentMessages = this.messagesSubject.value;
    // Si no hay id, no podemos verificar duplicados, solo agregar
    const exists = msg.id ? currentMessages.some(m => m.id === msg.id) : false;
    if (!exists) {
      this.messagesSubject.next([...currentMessages, msg]);
    }
  }

  async sendMessage(msg: ChatMessage) {
    const { data: userData } = await this.supabase.client.auth.getUser();

    const isBot = msg.user_id === '00000000-0000-0000-0000-000000000001'; // bot ID fijo

    if (!isBot && userData?.user?.id !== msg.user_id) {
      console.error('El user_id del mensaje no coincide con el usuario autenticado.');
      return;
    }

    // Optimistic update: agregamos localmente antes de insertar
    this.addMessageLocally(msg);

    // Construir objeto para insertar sin el campo id (si existe)
    const { id, ...insertMsg } = msg;

    const { error } = await this.supabase.client
      .from('messages')
      .insert([insertMsg]);

    if (error) {
      console.error('Error enviando mensaje:', error);
      // Remover mensaje local si falla inserción
      const filtered = this.messagesSubject.value.filter(m => m !== msg);
      this.messagesSubject.next(filtered);
    }
  }
}
