# Lógica desarrollada en la base de datos

## Vistas

* Usuarios No Administrativo

Está vista carga a los usuarios con sus roles y permisos excluyendo al usuario **aldebaran**, que es el administrador del sistema.

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

## Rutinas o procedimientos almacenados

* Actualizar permiso usuario

Actualiza los permisos del usuario

- `actualizar_permiso_usuario(nombre, id)`.
   - `nombre` - parámetro requerido y debe ser de tipo texto, hace referencia a `nombre_usuario` de la tabla `usuario`.
   - `id` - parámetro requerido y debe ser de tipo entero, hace referencia a `id_permiso` de la tabla `permiso`.


```sql
create procedure actualizar_permiso_usuario(nombre text, id integer)
    language plpgsql
as
$$
begin
    update usuario
    set id_permiso = id
    where nombre_usuario LIKE nombre;
end;
$$;
```


## Disparadores

* Tabla `aspirante`

Insertar en la tabla `aspirante` creará una relación en la tabla `curriculum`, agregando por defecto un avatar.

```sql
create trigger crear_curriculum
    after insert
    on aspirante
    for each row
execute procedure asignar_usuario_curriculum();
```

```sql
create function asignar_usuario_curriculum() returns trigger
    language plpgsql
as
$$
BEGIN
    INSERT INTO curriculum (nombre_usuario, foto)
    VALUES (NEW.nombre_usuario, (SELECT (CONCAT('https://avatars.dicebear.com/api/human/', (SELECT md5(random()::text) || '.svg')))));
    UPDATE usuario 
    SET id_rol = (SELECT id_rol FROM rol WHERE nombre ILIKE 'aspirante') ,
        id_permiso = (SELECT id_permiso FROM permiso WHERE descripcion_ruta ILIKE 'rutas base aspirante.')
    WHERE nombre_usuario = NEW.nombre_usuario;
    RETURN NEW;
END;
$$;
```

* Tabla `pais`

Insertar o actualizar en la tabla `pais` modifica el atributo `bandera_url` con la URL de las banderas si se ingresa una abreviatura válida (ISO 3166-1).

```sql
create trigger agregar_pais
    before insert or update
    on pais
    for each row
execute procedure agregar_enlace_bandera();
```

```sql
create function agregar_enlace_bandera() returns trigger
    language plpgsql
as
$$
BEGIN
    NEW.iso = lower (NEW.iso);
    NEW.informacion = initcap (NEW.informacion);
    NEW.bandera_url = concat ('https://flagcdn.com/', NEW.iso, '.svg');
    RETURN NEW;
END;
$$;
```

* Tabla `empresa`

Al insertar en la tabla empresa asigna el rol y permisos de las empresas en la tabla. `usuario`

```sql
create trigger crear_empresa_permisos
    after insert
    on empresa
    for each row
execute procedure actualizar_permisos_empresa();
``

```sql
create function actualizar_permisos_empresa() returns trigger
    language plpgsql
as
$$
BEGIN
    UPDATE usuario
    SET id_rol = (SELECT id_rol FROM rol WHERE nombre ILIKE 'empresa') ,
        id_permiso = (SELECT id_permiso FROM permiso WHERE descripcion_ruta ILIKE 'rutas base empresa.')
    WHERE nombre_usuario = NEW.nombre_usuario;
    RETURN NEW;
END;
$$;
```
