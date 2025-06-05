# Foro Comunitario Móvil

Aplicación móvil desarrollada en Ionic + Angular, que simula un foro donde los usuarios pueden registrarse, iniciar sesión, publicar mensajes, compartir fotos, ubicaciones y frases divertidas desde una API externa.

---

## Características principales

### 1. Autenticación de Usuarios
- Registro e inicio de sesión completamente funcional mediante Supabase Auth.
![image](https://github.com/user-attachments/assets/964e9105-aa54-4d29-a5c5-f7869f07addd)


- Almacenamiento del nombre y foto de perfil de cada usuario.
![image](https://github.com/user-attachments/assets/be43edc5-f49d-4158-8670-01d0e178975e)
![image](https://github.com/user-attachments/assets/7ab07994-dd91-4e24-a76a-0b2d63aff4b4)


- Visualización en tiempo real de los datos de usuario en cada publicación.
![image](https://github.com/user-attachments/assets/9557d27e-6d1a-402f-bdcd-f58ce06bdf68)


### 2. Interfaz del Foro
- Interfaz moderna y responsiva para móviles.
- Los usuarios pueden:
  - Publicar mensajes
  - Editar sus propias publicaciones
![image](https://github.com/user-attachments/assets/778eed23-d9db-4357-a5ee-d477be13f320)


- Se muestra claramente:
  - El nombre de usuario
  - Imagen de perfil
  - Contenido del mensaje
![image](https://github.com/user-attachments/assets/bbef3ddb-a80b-4d4f-9783-0dadfaaa88f1)


### 3. Envío de Ubicación
- Uso del GPS para capturar coordenadas actuales.
- Las coordenadas son enviadas como parte de la publicación.
- Enlace directo a Google Maps para visualizar la ubicación.
![image](https://github.com/user-attachments/assets/cc5c637b-e737-4c49-bd6a-db2af6ae7216)



### 4. Captura y Envío de Fotografías (15 pts)
- Integración con la cámara del dispositivo para capturar imágenes.
- Las fotos se suben automáticamente a la nube mediante Supabase Storage.
- Las imágenes se muestran en tiempo real en el foro.
- 
![imagenexamen](https://github.com/user-attachments/assets/b7fe86db-1f5d-4ac7-89fb-24adacc6ca22)



### 5. Consumo de API REST (15 pts)
- Consulta a la API pública de Chuck Norris.
- El usuario puede enviar una frase divertida aleatoria obtenida desde la API como parte del chat o publicación.
![image](https://github.com/user-attachments/assets/7e67437d-1bd9-4aa1-a3a2-ccf0de25f10e)


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
- [Chuk Norrys) – Frases divertidas
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

## Autor

- Isaac Quinapallo

---

## APK

La APK generada se encuentra en el repositorio en la carpeta `release/` con el nombre:

```
foro-comunitario.apk
```
