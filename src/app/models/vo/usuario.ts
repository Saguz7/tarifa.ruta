export class Usuario {
    nombre: String;
    a_paterno: String;
    a_materno: String;
    id_rol: number;
    correo: String;
    password: String;
    rol: String;

    constructor(
      nombre?: String,
      a_paterno?: String,
      a_materno?: String,
      id_rol?: number,
      correo?: String,
      password?: String,
      rol?: String
    ) {}
}
