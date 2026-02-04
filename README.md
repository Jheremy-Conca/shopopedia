# 🛒 ShopOpedia – E-commerce Web Application

**ShopOpedia** es una aplicación web tipo **e-commerce** desarrollada con **Vue 3 y Vite**, orientada a la gestión y visualización de productos.

El proyecto implementa **autenticación de usuarios**, **gestión de productos**, **subida de imágenes**, una **arquitectura modular** y una **interfaz moderna y responsiva**, aplicando buenas prácticas de desarrollo frontend.

Este proyecto forma parte de mi **portafolio profesional**.

---

## 🎯 Objetivo del proyecto

Desarrollar una aplicación web moderna que permita:

- Autenticación real de usuarios
- Gestión de productos (crear, editar y listar)
- Separación clara de responsabilidades (views, components, services, stores)
- Integración con servicios externos (Firebase y Cloudinary)
- Aplicación de buenas prácticas con Vue 3 (Composition API)

---

## 🚀 Funcionalidades principales

### 🔐 Autenticación

- Registro de usuarios
- Inicio de sesión
- Persistencia de sesión
- Protección de rutas
- Vistas personalizadas:
  - Access Denied
  - Not Found (404)

Autenticación implementada con **Firebase Authentication**.

---

### 🛍️ Funcionalidades para usuarios

- Visualización de productos
- Listado de productos
- Vista de detalle del producto
- Navegación por páginas
- Interfaz clara y responsiva

---

### 🛠️ Gestión de productos

- Crear productos
- Actualizar productos
- Listar productos
- Subida de imágenes con **Cloudinary**
- Reutilización de formulario (Upsert)
- Alertas visuales mediante **SweetAlert** (composable)

---

## 📦 Información de productos

Cada producto maneja:

- Nombre
- Descripción
- Precio
- Imagen
- Información adicional según configuración

---

## 🧱 Tecnologías utilizadas

### Frontend

- Vue 3 (Composition API)
- Vite
- Vue Router
- Pinia
- Pinia Persisted State
- Bootstrap 5
- SweetAlert2

### Servicios

- Firebase Authentication
- Cloud Firestore
- Cloudinary

---

## 📁 Estructura del proyecto

```txt
src/
│── App.vue
│── main.js
│
├── assets/
│   └── logo.png
│
├── components/
│   ├── layout/
│   │   ├── Header.vue
│   │   └── Footer.vue
│   │
│   └── Product/
│       ├── ProductCard.vue
│       └── ProductDetail.vue
│
├── composables/
│   └── useSwal.js
│
├── constants/
│   ├── appConstants.js
│   └── routeNames.js
│
├── router/
│   └── routes.js
│
├── services/
│   └── productService.js
│
├── stores/
│   ├── authStore.js
│   └── themeStore.js
│
├── utility/
│   ├── cloudinary.js
│   └── firebaseConfig.js
│
└── views/
    ├── auth/
    │   ├── AccessDenied.vue
    │   ├── NotFound.vue
    │   ├── SignIn.vue
    │   └── SignUp.vue
    │
    ├── home/
    │   ├── Home.vue
    │   └── ContactUs.vue
    │
    └── product/
        ├── ProductList.vue
        └── ProductUpsert.vue
```

## ⚙️ Instalación y ejecución

1. Clonar el repositorio  
   git clone https://github.com/Jheremy-Conca/shopopedia.git  
   cd shopopedia

2. Instalar dependencias  
   npm install

3. Ejecutar la aplicación  
   npm run dev

La aplicación se ejecuta en:  
http://localhost:5173

---

## 🎨 Diseño y arquitectura

- Arquitectura modular
- Separación clara de responsabilidades
- Composables reutilizables
- Stores centralizados (Pinia)
- Servicios desacoplados
- Layout reutilizable (Header / Footer)
- Diseño responsive
- Proyecto escalable

---

## 🧩 Tecnologías

- Vue 3 (Composition API)
- Vite
- Vue Router
- Pinia
- Firebase
- Cloudinary
- SweetAlert2

---

## 👨‍💻 Autor

Jheremy  
Egresado de Computación e Informática  
Estudiante de Ingeniería de Sistemas  
Desarrollador Web Frontend con Vue.js

---

## 📌 Estado del proyecto

✔ Funcional  
🔧 En mejora continua  
📈 Escalable
