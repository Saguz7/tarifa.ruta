import { RutaInterna } from '../vo/rutaInterna';

export class Ruta {
  ruta: RutaInterna;
    descripcionTarifa: String;
    tarifa: Number;
    orden: Number;

    constructor(
      rutaInterna?: RutaInterna,
      descripcionTarifa?: String,
      tarifa?: Number,
      orden?: Number
    ) {}
}
