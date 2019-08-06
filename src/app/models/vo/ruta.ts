import { RutaInterna } from '../vo/rutaInterna';

export class Ruta {
  ruta: RutaInterna;
    descripcion_tarifa: String;
    tarifa: Number;
    orden: Number;

    constructor(
      rutaInterna?: RutaInterna,
      descripcion_tarifa?: String,
      tarifa?: Number,
      orden?: Number
    ) {}
}
