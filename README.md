# Technical Test
Prueba ténica, requerimientos.


- Crear una aplicación web MVC monolítica en Nodejs utilizando los frameworks y librerias/paquetes de su preferencia y mongodb como base de datos.

- La aplicación web es para crear, editar, borrar y leer noticias. Una Noticia se puede definir con las siguientes propiedades (solo un ejemplo):
    > Id - Title - Body - (Date) Created At - Created By (Id del editor que la creó)

- (Indispensable) Dos tipos de roles de usuario. Rol Editor y Rol Lector,  Un usuario se puede definir con las siguientes propiedades (solo un ejemplo):

    > Id - Username - Password (hashed) - (Date) Created At - Role (para simplificar se puede asignar el rol aqui mismo)

    - El Editor puede crear, editar, leer y borrar noticias
    - El Lector solo puede leer noticias y marcarlas/desmarcarlas como favoritas
    - para simplificar, cualquier editor puede editar y borrar cualquier noticia aunque no la haya creado él mismo.

- (Indispensable)  Ventana de registro con nombre de usuario, password y tipo de rol con el que se está registrando.
- (Indispensable)  Ventana de login única para ambos roles
- (Indispensable) ventana de ver noticias, ordenadas por orden de creación (la más nueva primero). (opcional): que venga la lista de noticias paginada.
- (Indispensable) funcionalidad para crear una nueva noticia. solo disponible para el Rol Editor
-(opcional) funcionalidad para editar una noticia existente. solo disponible para el Rol Editor
-(opcional) funcionalidad para borrar una noticia existente. Rol Editor
-(Indispensable) funcionalidad para marcar una noticia como favorita. Solo para el  Rol Lector
-(Indispensable) ventana donde el usuario lector pueda ver sus noticias favoritas. opcional: que venga la lista de noticias paginada.
-(Indispensable) funcionalidad de logout


## Template 

Template utilizado para el desarrollo del sistema: [SB Admin 2](https://startbootstrap.com/theme/sb-admin-2)

## Observaciones 

Para el tema de los roles y permisos pude haber realizado algo mucho más complejo, almacenando los roles y los permisos para cada rol en tablas correspondientes, sin embargo, debido al tiempo y los requerimientos, solamente valido si el usuario cuenta con el rol de Editor.