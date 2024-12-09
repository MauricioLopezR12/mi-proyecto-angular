# Proyecto Angular - Gestión de Productos y Usuarios

Este proyecto es una aplicación frontend desarrollada con **Angular**, diseñada para gestionar productos y usuarios mediante una API REST construida en **Laravel**. La aplicación incluye autenticación, CRUD para productos y usuarios, y una interfaz gráfica intuitiva y responsiva.

---

## **Índice**
1. [Descripción General](#descripción-general)
2. [Características Principales](#características-principales)
3. [Estructura del Código](#estructura-del-código)
4. [Clases y Componentes Explicados](#clases-y-componentes-explicados)
    - AuthService
    - ProductService
    - UserService
    - DashboardComponent
    - UsuariosComponent
    - AuthGuard
5. [Requisitos Previos](#requisitos-previos)
6. [Instalación y Configuración](#instalación-y-configuración)
7. [Flujo del Proyecto](#flujo-del-proyecto)
8. [Tecnologías Utilizadas](#tecnologías-utilizadas)
9. [Capturas de Pantalla](#capturas-de-pantalla)
10. [Autor](#autor)

---

## **Descripción General**

Este sistema permite a los usuarios autenticarse y realizar operaciones básicas de gestión sobre dos entidades principales:
- **Productos**: Crear, listar, editar, eliminar productos.
- **Usuarios**: Administrar usuarios con imágenes de perfil y datos básicos.

La aplicación utiliza **Angular** para el frontend y una API en **Laravel** para manejar las operaciones de backend, incluyendo autenticación basada en tokens **JWT**.

---

## **Características Principales**

1. **Autenticación de Usuarios**
   - Inicio de sesión con credenciales.
   - Gestión de tokens para validar sesiones.
   - Logout que elimina el token.

2. **Gestión de Productos**
   - Visualización de productos con imágenes.
   - Búsqueda y paginación.
   - Operaciones CRUD (Crear, Leer, Actualizar, Eliminar).

3. **Gestión de Usuarios**
   - Administración de usuarios.
   - Asignación de imágenes de perfil.
   - Operaciones CRUD.

4. **Interfaz Gráfica**
   - Responsive (adaptable a dispositivos móviles y escritorio).
   - Uso de modales para agregar, editar y eliminar entidades.

---

## **Estructura del Código**

```plaintext
src/
├── app/
│   ├── components/
│   │   ├── dashboard/ (Gestión de productos)
│   │   │   ├── dashboard.component.ts
│   │   │   ├── dashboard.component.html
│   │   │   └── dashboard.component.css
│   │   ├── login/ (Autenticación)
│   │   │   ├── login.component.ts
│   │   │   ├── login.component.html
│   │   │   └── login.component.css
│   │   ├── usuarios/ (Gestión de usuarios)
│   │       ├── usuarios.component.ts
│   │       ├── usuarios.component.html
│   │       └── usuarios.component.css
│   ├── services/ (Lógica de negocio)
│   │   ├── auth.service.ts
│   │   ├── product.service.ts
│   │   └── user.service.ts
│   ├── guards/ (Protección de rutas)
│   │   └── auth.guard.ts
│   ├── app.module.ts (Módulo principal)
│   ├── app-routing.module.ts (Rutas de la aplicación)
│   └── environments/ (Configuración de entorno)

Clases y Componentes Explicados
AuthService
Propósito: Gestiona la autenticación del usuario mediante JWT.
Métodos:
login(email, password): Valida credenciales, guarda el token y los datos del usuario en localStorage.
logout(): Elimina el token y cierra sesión.
isAuthenticated(): Verifica si el usuario está autenticado.
getToken(): Obtiene el token almacenado para usarlo en solicitudes.
Cómo Funciona:

Se comunica con el backend para validar credenciales y manejar el estado del usuario en la sesión.
ProductService
Propósito: Maneja las operaciones relacionadas con productos.
Métodos:
getProducts(): Recupera todos los productos.
createProduct(product): Envía datos para crear un producto.
updateProduct(id, product): Actualiza un producto existente.
deleteProduct(id): Elimina un producto.
Cómo Funciona:

Utiliza HttpClient para realizar solicitudes HTTP hacia los endpoints de la API.
Implementa FormData para manejar la carga de imágenes.
UserService
Propósito: Similar al ProductService, pero enfocado en usuarios.
Métodos:
getUsers(): Lista todos los usuarios.
addUser(user): Crea un nuevo usuario.
updateUser(id, user): Actualiza un usuario existente.
deleteUser(id): Elimina un usuario.
DashboardComponent
Propósito: Es la interfaz principal para gestionar productos.
Características:
Visualización de productos en tablas.
Paginación y búsqueda por nombre.
Modales para agregar, editar y eliminar productos.
UsuariosComponent
Propósito: Proporciona una interfaz para gestionar usuarios.
Características:
Visualización y búsqueda de usuarios.
CRUD completo de usuarios.
AuthGuard
Propósito: Protege rutas de acceso no autorizado.
Cómo Funciona:
Verifica si el usuario está autenticado antes de permitir el acceso a una ruta.
Redirige a la página de login si no hay sesión activa.
Requisitos Previos
Node.js y npm:
Descargar Node.js
Angular CLI:
npm install -g @angular/cli

Backend API:
Laravel configurado con endpoints /products, /users, /login.

Clonar el repositorio

git clone https://github.com/MauricioLopezR12/mi-proyecto-angular.git
cd mi-proyecto-angular

instalar dependencias
npm install

ejecuta el servidor
ng serve

Acceder a la Aplicación:

Abre tu navegador y ve a: http://localhost:4200.
Flujo del Proyecto
El usuario inicia sesión en la página de login. Si las credenciales son válidas, se guarda un token en localStorage.
Una vez autenticado, el usuario accede al dashboard.
Desde el dashboard, se pueden realizar operaciones CRUD en productos.
En la sección de usuarios, se gestionan las cuentas de usuario.
Tecnologías Utilizadas
Angular: Framework frontend.
Bootstrap: Para estilos y diseño responsivo.
JWT: Manejo de autenticación.
Laravel: Backend para API REST.

Autor
Mauricio Lopez R.
GitHub: MauricioLopezR12
