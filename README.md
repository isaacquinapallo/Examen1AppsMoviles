# Foro Comunitario Móvil

Aplicación móvil desarrollada en Ionic + Angular, que simula un foro donde los usuarios pueden registrarse, iniciar sesión, publicar mensajes, compartir fotos, ubicaciones y frases divertidas desde una API externa.

---

## Características principales

### 1. Autenticación de Usuarios
- Registro e inicio de sesión completamente funcional mediante Supabase Auth.
- Almacenamiento del **nombre y foto de perfil** de cada usuario.
- Visualización en tiempo real de los datos de usuario en cada publicación.

### 2. Interfaz del Foro
- Interfaz moderna y responsiva para móviles.
- Los usuarios pueden:
  - Publicar mensajes
  - Editar sus propias publicaciones
- Se muestra claramente:
  - El nombre de usuario
  - Imagen de perfil
  - Contenido del mensaje

### 3. Envío de Ubicación
- Uso del GPS para capturar coordenadas actuales.
- Las coordenadas son enviadas como parte de la publicación.
- Enlace directo a Google Maps para visualizar la ubicación.

### 4. Captura y Envío de Fotografías (15 pts)
- Integración con la cámara del dispositivo para capturar imágenes.
- Las fotos se suben automáticamente a la nube mediante Supabase Storage.
- Las imágenes se muestran en tiempo real en el foro.

### 5. Consumo de API REST (15 pts)
- Consulta a la API pública de Rick and Morty (`https://rickandmortyapi.com/`).
- El usuario puede enviar una frase divertida aleatoria obtenida desde la API como parte del chat o publicación.

### 6. Interfaz de Usuario (10 pts)
- Diseño limpio, responsivo y armonioso.
- Estilo claro y consistente en componentes como inputs, botones y publicaciones.
- Uso de `Ionicons`, colores armónicos y sombras sutiles para mejorar la experiencia visual.

### 7. Deploy en Android y GitHub (15 pts)
- Se generó correctamente la APK de Android.
- Repositorio completo y organizado alojado en GitHub.
- Incluye este `README.md` detallado con descripción de funcionalidades.

---

## Tecnologías Utilizadas

- [Ionic Framework](https://ionicframework.com/)
- [Angular](https://angular.io/)
- [Supabase](https://supabase.com/) – Autenticación, base de datos y almacenamiento
- [Capacitor](https://capacitorjs.com/) – Acceso a GPS y cámara
- [Rick and Morty API](https://rickandmortyapi.com/) – Frases divertidas
- HTML, CSS (con variables CSS personalizadas), TypeScript

---

## Instalación y Ejecución

1. Clona el repositorio:
```bash
git clone https://github.com/usuario/repositorio-foro.git
cd repositorio-foro
```

2. Instala dependencias:
```bash
npm install
```

3. Ejecuta en entorno de desarrollo:
```bash
ionic serve
```

4. Para compilar el APK:
```bash
ionic build
npx cap add android
npx cap open android
```

---

## Capturas de Pantalla

| Inicio de sesión | Chat en vivo | Envío de foto | Ubicación | API externa |
|------------------|--------------|---------------|-----------|-------------|
| ![](assets/screens/login.png) | ![](assets/screens/chat.png) | ![](assets/screens/camera.png) | ![](assets/screens/location.png) | ![](assets/screens/api.png) |

---

## Autor

- Isaac Quinapallo

---

## APK

La APK generada se encuentra en el repositorio en la carpeta `release/` con el nombre:

```
foro-comunitario.apk
```
