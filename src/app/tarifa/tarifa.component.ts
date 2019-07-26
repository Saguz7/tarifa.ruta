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
  selector: 'app-tarifa', templateUrl: './tarifa.component.html', styleUrls: ['./tarifa.component.css']
})
export class TarifaComponent implements OnInit {
    date1: Date;
    datepay: Date;
    datenow: Date;
    minDate: Date;

        es: any;
        registroamostrar: any;
        pago1: any;
        pago2: any;
        pago3: any;
        pago2a: any;
        fechapagoString : string = "";

        pago1aux:string = "A";
        pago2aux:string = "B ";
        pago3aux:string = "C";
        btnhojavalorada: boolean = false;
        btnverficarfecha: boolean = false;
        fechaverificada: boolean = false;
        formlineadecaptura: boolean = false;
        formhojavalorada: boolean = false;


        div1validacionpago: boolean = true;
        div2busquedadeconcesionario: boolean = true;
        div3solicitud: boolean = true;
        div4descarga: boolean = true;

  constructor(
      private router?: Router,
      private apollo?: Apollo
    ){}

  ngOnInit() {
    this.datenow = new Date();
    this.minDate = new Date(2010);

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
          $('.modal').modal({dismissible: false});
        });

  $(document).ready(function() {
    $('input#input_text, textarea#textarea2').characterCounter();
  });

      }

      generate(){
        var pdf = new jsPDF();
             pdf.setFontSize(13);
             pdf.text(77, 18, 'SECRETARÍA DE MOVILIDAD');
             pdf.setFont("helvetica");
             pdf.setFontSize(11);
             pdf.text(46, 23, 'SUBSECRETARÍA DE REGULACIÓN Y CONTROL DE TRANSPORTE');
             pdf.setFontType("normal");
             pdf.text(55, 28, 'DIRECCIÓN DE OPERACIÓN DEL TRANSPORTE PUBLICO');
             var img = new Image();
             img.src = './assets/SEMOVI2.png'
             pdf.setDrawColor(0);
             pdf.setFillColor(255,0,0);
             pdf.rect(6, 34, 198, 256 ); // empty square

             pdf.addImage(img, 'png', 84, 46, 100, 19);
             pdf.setFontSize(37);
             pdf.setDrawColor(0);
             pdf.setFillColor(255,0,0);
             pdf.rect(11, 66, 186, 16,'F'); // empty square
             pdf.setDrawColor(0,0,0);

             pdf.text(15, 79, 'TARJETÓN');
             pdf.setFontSize(9);
             pdf.text(97, 72, 'CONCESIONARIO: CESAR SANTIAGO GUZMAN');
             pdf.text(97, 79, 'NUC: XXXXX/XXXXXXXXXX');


             pdf.text('La Secretaría de  Movilidad  del  Poder  Ejecutivo  del  estado  de  Oaxaca, con  fundamento  en lo  dispuesto por los artículos 2 párrafo  tercero y  82 de la  Constitución  Política  del Estado  Libre  y  Soberado  de Oaxaca; 1, 27 fracción  VII y  40  de  la  Ley Orgánica  del  Poder Ejecutivo del  Estado de Oaxaca, articulo 114 y 116 de  la Ley  del  Transporte  del  Estado de Oaxaca; en relación con los artículos 43  fracción II, 72, 73, 75 y 76 del  Reglamento  de la  Ley de Transporte del  Estado de Oaxaca;  y  de conformidad con el Acuerdo Administrativo de  fecha 17 de diciembre del 2018,  publicado  en el  Periódico Oficial  de Gobierno del Estado de Oaxaca el 19 de enero del 2019 y en el diario Enlace de la costa, el día 15 de febrero de 2019, queda autorizada la siguiente:', 11,86, {maxWidth: 182, align: "justify"});
             pdf.setFontSize(22);
             pdf.text(85, 115, 'TARIFA');
             var a_permisoxf = [];
             var totalderutas = 35

             if(totalderutas<20){
               for(var i = 0; i < 20; i++){

               a_permisoxf.push([
                 (i+1),
                "Ejemplo",
                "Ejemplo",
                "Ejemplo"  ]);
              }

               pdf.autoTable({
                    head: [['RUTA','ORIGEN-DESTINO', 'TARIFA EN TEXTO', 'TARIFA EN NUMERO' ]],
                    styles: {
                    fontSize: 9
                    },

                    margin: {top: 125},
                    body: a_permisoxf
                });
             }else{
               for(var i = 0; i < 20; i++){

               a_permisoxf.push([
                 (i+1),
                "Ejemplo",
                "Ejemplo",
                "Ejemplo"  ]);
              }


               let pageNumber = pdf.internal.getNumberOfPages();

               pdf.autoTable({
                   head: [['1','ORIGEN-DESTINO', 'TARIFA EN TEXTO', 'TARIFA EN NUMERO' ]],
                   body: a_permisoxf,
                   startY: 118,
                   showHead: 'firstPage',
                   styles: {overflow: 'hidden'},
                   margin: {right: 107}
               });

               pdf.setPage(pageNumber);

               pdf.autoTable({
                   head: [['2','ORIGEN-DESTINO', 'TARIFA EN TEXTO', 'TARIFA EN NUMERO' ]],
                   body: a_permisoxf,
                   startY: 118,
                   showHead: 'firstPage',
                   styles: {overflow: 'hidden'},
                   margin: {left: 107}
               });

             }

              pdf.setFontSize(9);
              pdf.text(15, 282, 'del Servicio Público de Transporte de pasajeros en la modalidad de TAXI; para el Municipio de SANTA MARÍA HUATULCO.');


              pdf.save("ejemplo.pdf");
      }

      vistaprevia(){

      }

      validarfoliopago(){
        var n = this.pago1.toString();
        if(n.length>0){
          this.pago1aux = n + "1";
        }
        if(n.length == 11){
          M.toast({html: 'Formato del folio de pago correcto.'})
          this.formlineadecaptura = true;
          document.getElementById("pago1advertencia").style.color = "#000000";
        }else{
          this.formlineadecaptura = false;
          document.getElementById("pago1advertencia").style.color = "red";
        }
      }


      validarnumerodecaptura(){
        var n = this.pago2.toString();
        if(n.length>0){
          this.pago2aux = n + "1";
        }
        if(n.length == 19){
          M.toast({html: 'Formato de la linea de captura correcto.'})
          this.formhojavalorada = true;
          document.getElementById("pago2advertencia").style.color = "#000000";
        }else{
          this.formhojavalorada = false;
          document.getElementById("pago2advertencia").style.color = "red";
        }
      }

      validarhojavalorada(){
        var n = this.pago3.toString();
        if(n.length>0){
          this.pago3aux = n + "1";
        }
        if(n.length == 9){
          M.toast({html: 'Formato de la hoja valorada correcto.'})
          document.getElementById("pago3advertencia").style.color = "#000000";
          this.btnhojavalorada = true;
        }else{
          this.btnhojavalorada = false;
          document.getElementById("pago3advertencia").style.color = "red";
        }
      }

      habilitarpasotres(){
        this.pago2a = this.pago2;
        this.btnverficarfecha = true;
        this.formlineadecaptura = false;
        this.formhojavalorada = false;
        (<HTMLInputElement>document.getElementById("pago1")).disabled = true;
        this.btnhojavalorada= false;

      }

      verificarfecha(){


          this.fechaverificada = true;

      }




}
