# Lógica desarrollada en la base de datos

## Vistas

* Usuarios No Administrativo
Está vista carga a los usuarios con sus roles y permisos excluyendo al usuario 'aldebaraban', que es el administrador del sistema.

```sql
create view usuarios_no_administrativo
            (nombre_usuario, id_permiso, correo, bloqueado, id_rol, nombre_rol, descripcion_ruta, grupo_ruta) as
SELECT u.nombre_usuario,
       u.id_permiso,
       u.correo,
       u.bloqueado,
       u.id_rol,
       r.nombre AS nombre_rol,
       p.descripcion_ruta,
       p.grupo_ruta
FROM usuario u
         JOIN rol r USING (id_rol)
         JOIN permiso p USING (id_permiso)
WHERE u.nombre_usuario !~~* 'aldebaran'::text;
```
