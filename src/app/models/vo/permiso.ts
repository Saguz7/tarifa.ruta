import { Concesionario } from '../vo/concesionario';
import { Vehiculo } from '../vo/vehiculo';
import { Movimiento } from '../vo/movimiento';

export class Permiso {
    id: number;
    concesionario: Concesionario;
    vehiculo: Vehiculo;
    movimiento: Movimiento;
    folio_hoja_valorada : String;
    estatus: String;
    createdAt : String;
}
