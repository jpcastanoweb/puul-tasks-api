# Proyecto Tareas: Puul

Desarrollado por: Juan Pablo Castaño

## Descripción

API para la gestión de tareas dentro de un equipo, permitiendo la creación de usuarios, la asignación de tareas con fechas de entrega y la manipulación de datos numéricos asociados a las tareas, como estimaciones de tiempo y seguimiento del tiempo invertido.

## Instalación

1. Clonar el repositorio

   ```
   git clone https://github.com/jpcastanoweb/puul-tasks-api.git
   ```

2. Moverse al repositorio del API

   ```
   cd puul-tasks-api
   ```

3. Instalar Dependencias

   ```
   npm install
   ```

4. Crear una nueva base de datos con el nombre de su elección en un servidor de Postgres local

5. Crear archivo env en el directorio con la configuración de Postgres:
   ```
   DATABASE_PORT=<POSTGRES SERVER PORT>
   DATABASE_PASSWORD=<POSTGRES SERVER PASSWORD>
   DATABASE_USERNAME=<POSTGRES SERVER USERNAME>
   DATABASE_NAME=<DATABASE NAME>
   ```

## Correr la aplicación

Para correr la aplicación corra el siguiente command en la terminal adentro del repositorio.

```bash
$ npm start
```

## API

### Endpoints

| HTTP Verbs | Endpoints        | Action                    |
| ---------- | ---------------- | ------------------------- |
| POST       | /usuario         | Crear nuevo usuario       |
| GET        | /usuario         | Listar todos los usuarios |
| POST       | /tarea           | Crear tarea               |
| GET        | /tarea           | Listar todas las tareas   |
| PUT        | /tarea/:id       | Editar tarea con _id_     |
| DELETE     | /tarea/:id       | Eliminar tarea con _id_   |
| GET        | /tarea/analitica | Listar analítica          |

### API: Opciones de Query

#### GET /usuario

| Opcion | Descripción                                                 |
| ------ | ----------------------------------------------------------- |
| nombre | Filtro para buscar por nombre                               |
| correo | Filtro para buscar por correo                               |
| rol    | Filtro para buscar por rol: "_administrator_" o "_miembro_" |

Ejemplos:

```
/usuario?rol=administrador
/usuario?nombre=JuanPablo&correo=jpcastanom@gmail.com
```

#### GET /tarea

| Opcion      | Descripción                                   |
| ----------- | --------------------------------------------- |
| titulo      | Filtro para buscar por título                 |
| vencimiento | Filtro para buscar por fecha de vencimiento   |
| usuario     | Filtro para buscar por id de usuario adignado |

Ejemplos:

```
/tarea?titulo=Tarea1&usuario=4
```

### API: Campos en _Body_ del request

#### POST /usuario

| Parametro | Tipo   | Descripción                                      |
| --------- | ------ | ------------------------------------------------ |
| nombre    | String | Nombre del usuario                               |
| correo    | String | Correo del usuario                               |
| rol       | String | Rol del usuario: "_administrator_" o "_miembro_" |

#### POST /tarea

| Parametro      | Tipo            | Descripción                                                |
| -------------- | --------------- | ---------------------------------------------------------- |
| título         | String          | Título de la tarea                                         |
| descripcion    | String          | Descripción de la tarea                                    |
| estimadoHoras  | Number          | Estimado de horas para cumplimiento                        |
| vencimiento    | String          | Fecha de vencimiento. Ej. 2024-03-06                       |
| estado         | String          | Estado de la tarea: "_activa_" o "_terminada_"             |
| costoMonetario | Number          | Costo monetario de la tarea                                |
| usuarios       | Array (Numbers) | Arreglo con IDs de usuarios asignados a la tarea Ej. [0,1] |

## Analítica

En el endpoint de analitica decidí implementar las siguientes estadísticas:

1. Cantidad de Tareas Urgentes: Arreglo con tareas con vencimiento en menos de 5 días.
2. Costo monetario total de tareas activas: Suma del costo monetario de todas las tareas con "estado" de "activa"

Para probar este endpoint utilize la siguiente llamada:

```
GET /tarea/analitica
```
