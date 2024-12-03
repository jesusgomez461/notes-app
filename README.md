Notes App Frontend

Este es el repositorio del frontend de la aplicación Notes App, desarrollada con React y TypeScript, utilizando PrimeReact y PrimeFlex para el diseño de la interfaz de usuario.

Tabla de Contenidos

Descripción

Características

Tecnologías Utilizadas

Instalación y Configuración

Scripts Disponibles

Gestión de Estado

Manejo de Concurrencia

Manejo de Errores

Desafíos y Soluciones

Descripción

La Notes App es una aplicación web que permite a los usuarios autenticados crear, leer, actualizar y eliminar notas personales. Cada nota incluye un título, contenido y una marca de tiempo. La aplicación implementa una estrategia de bloqueo eficiente para manejar problemas de concurrencia y prevenir condiciones de carrera, simulando un entorno altamente paralelizado.

Características

Autenticación de Usuarios: Registro e inicio de sesión utilizando JSON Web Tokens (JWT).

Gestión de Notas: Crear, editar, eliminar y listar notas personales.

Interfaz Responsiva: Diseño adaptable a dispositivos móviles y de escritorio.

Simulación de Concurrencia: Manejo de ediciones concurrentes en la misma nota.

Manejo de Errores: Mensajes de error amigables y diálogos de confirmación.

Operaciones Asíncronas: Indicadores de carga y manejo eficiente de llamadas API.

Tecnologías Utilizadas

React con TypeScript: Para la construcción de la interfaz de usuario.

PrimeReact y PrimeFlex: Librerías UI para componentes y diseño responsivo.

Axios: Para las solicitudes HTTP al backend.

Zustand: Gestión de estado simple y escalable.

Vite: Herramienta de desarrollo rápida para React.

Instalación y Configuración

Requisitos Previos

Node.js v14 o superior

npm o yarn

Pasos de Instalación

Clonar el Repositorio

bash

Copiar código

git clone https://github.com/tu\_usuario/notes-app-frontend.git

cd notes-app-frontend

Instalar Dependencias

bash

Copiar código

npm install

\# o

yarn install

Configurar Variables de Entorno

Renombrar el archivo .env.example a .env y configurar las variables necesarias:

env

Copiar código

VITE_API_URL=http://localhost:8000/api

Iniciar la Aplicación

bash

Copiar código

npm run dev

\# o

yarn dev

La aplicación estará disponible en http://localhost:3000.

Scripts Disponibles

npm run dev / yarn dev: Inicia el servidor de desarrollo.

npm run build / yarn build: Construye la aplicación para producción.

npm run lint / yarn lint: Ejecuta el linter para verificar la calidad del código.

Gestión de Estado

Se utiliza Zustand para la gestión de estado global, permitiendo un manejo sencillo y eficiente del estado de la aplicación sin la complejidad de Redux.

Manejo de Concurrencia

La aplicación permite abrir múltiples instancias de la misma nota en diferentes pestañas. Si se detecta una edición concurrente:

Se muestra un mensaje de error indicando el conflicto.

Se ofrecen opciones para recargar la nota, fusionar cambios o reintentar la actualización.

Manejo de Errores

Mensajes de Error Amigables: Se muestran notificaciones claras al usuario en caso de errores en las acciones.

Validación: Los formularios incluyen validaciones para evitar entradas incorrectas.

Diálogos de Confirmación: Antes de eliminar una nota, se solicita confirmación al usuario.

Desafíos y Soluciones

Manejo de Concurrencia y Estrategia de Bloqueo

Desafío: Implementar una estrategia que maneje eficientemente las condiciones de carrera al editar la misma nota desde múltiples instancias.

Solución: Se optó por una estrategia de bloqueo optimista, utilizando marcas de tiempo updated_at en las notas. Al intentar actualizar una nota, se verifica si la marca de tiempo coincide con la del backend. Si hay una discrepancia, se informa al usuario del conflicto.
