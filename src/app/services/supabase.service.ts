import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  client: SupabaseClient;

  constructor() {
    this.client = createClient(
      'TUS_CREDENCIALES_SUPABASE_URL',
      'TUS_CREDENCIALES_SUPABASE_ANON_KEY'
    );
  }
}