export class LineaCapturaInput {
    lineaCaptura: String;
    folioPago: String;
    totalAmparados: Number;
    fechaPago: Date;
    totalPago: Number;

    constructor(
      lineaCaptura?: String,
      folioPago?: String,
      totalAmparados?: Number,
      fechaPago?: Date,
      totalPago?: Number
    ) {}
}
