import { Concesionario } from '../vo/concesionario';
import { Vehiculo } from '../vo/vehiculo';
import { Movimiento } from '../vo/movimiento';
import { LineaCaptura } from '../vo/lineacaptura';

export class Permiso {
    id: number;
    concesionario: Concesionario;
    vehiculo: Vehiculo;
    movimiento: Movimiento;
    lineaCaptura: LineaCaptura;
    folio_hoja_valorada : String;
    estatus: String;
    createdAt : String;
}
