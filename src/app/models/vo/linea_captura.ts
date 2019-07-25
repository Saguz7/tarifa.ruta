export class LineaCapturaInput {
    linea_captura: String;
    folio_pago: String;
    total_amparados: number;
    fecha_pago: String;
    total_pago: number;

    constructor(
      linea_captura?: String,
      folio_pago?: String,
      total_amparados?: number,
      fecha_pago?: String,
      total_pago?: number
    ) {}
}
