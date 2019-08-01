 import {Component, OnInit} from '@angular/core';
 import {Router} from '@angular/router';
 import {StorageService} from "../core/services/storage.service";
 import {Session} from "../core/models/session.model";
 import {Apollo} from 'apollo-angular';
 import gql from 'graphql-tag';
 declare var M: any;
 import { InsertPeriodicoGQL } from '../graphql/createnewspape';
 import {PlantillaComponent} from '../plantilla/plantilla.component';


@Component({
  selector: 'app-creatediariooficial',
  templateUrl: './creatediariooficial.component.html',
  styleUrls: ['./creatediariooficial.component.css']
})
export class CreateDiarioOficialComponent implements OnInit {
  es: any;
  numero: any;
  tomo: any;
  date1: Date;
  descripcion: any;

  constructor(private apollo?: Apollo,private insertPeriodicoGQL?: InsertPeriodicoGQL,private plantillaComponent?: PlantillaComponent)
              {}

  ngOnInit() {
     this.es = {
            firstDayOfWeek: 1,
            dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
            dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
            dayNamesMin: [ "D","L","M","X","J","V","S" ],
            monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
            monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
            today: 'Hoy',
            clear: 'Borrar'
        }

  }

  creardiarioficial(){
    this.insertPeriodicoGQL
      .mutate({
        descripcion: this.descripcion,
        fecha_publicacion: this.date1,
        tomo: this.tomo,
        numero: this.numero

      })
      .subscribe(({ data }) => {
        this.plantillaComponent.listDiarios();
        $('.modal.open').modal('close')
        M.toast({html: "Se ha agregado un nuevo periodico."})

                 }, (error) => {
                   var divisiones = error.message.split(":", 2);
                   M.toast({html: divisiones[1]})
       });

  }

   limpiar(){
     this.numero = null;
     this.tomo = null;
     this.date1 = null;
     this.descripcion = null;
   }
}
