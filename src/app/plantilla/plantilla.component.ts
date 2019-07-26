  import {Component, OnInit} from '@angular/core';
  import {Router} from '@angular/router';
   import {Apollo} from 'apollo-angular';
  import gql from 'graphql-tag';
  import { Observable,Observer } from 'rxjs';
   import {User} from "../core/models/user.model";
    declare var M: any;
    import { saveAs } from 'file-saver';
    import * as jsPDF from 'jspdf';
    import 'jspdf-autotable';

 @Component({
  selector: 'app-plantilla', templateUrl: './plantilla.component.html', styleUrls: ['./plantilla.component.css']
})
export class PlantillaComponent implements OnInit {
  arrayarchivosadjuntos = new Array();
  date1: Date;
  es: any;

  constructor(
      private router?: Router,
      private apollo?: Apollo
    ){}

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

        $(document).ready(function(){
    $('input.autocomplete').autocomplete({
      data: {
        "Ocotlan de Morelos": null,
        "Huatulco": null 
      },
    });
  });

      }

      addruta(){
        var archivoadjunto = {};

        this.arrayarchivosadjuntos.push(archivoadjunto);

      }

      deleteruta(numero: any){
        this.arrayarchivosadjuntos.splice(numero, 1);
      }





}
