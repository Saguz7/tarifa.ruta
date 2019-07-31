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
    import kjua from "kjua";
    import {Ruta} from "../models/vo/ruta";
    import {CALIBRI} from "../core/key/calibri";
    import {CALIBRIB} from "../core/key/calibrib";


 @Component({
  selector: 'app-tarifa', templateUrl: './tarifa.component.html', styleUrls: ['./tarifa.component.css']
})

export class TarifaComponent implements OnInit {
    date1: Date;
    datepay: Date;
    datenow: Date;
    minDate: Date;
    qrmensagge: any;
    statusComponentPayment: boolean = false;

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
        arrayrutasdepruebas: any;

        static getBarcodeData(text: string, size = 900) {
           return kjua({
             render: "canvas", crisp: true, minVersion: 1, ecLevel: "Q", size: size, ratio: undefined, fill: "#333", back: "#fff",
             text, rounded: 10, quiet: 2, mode: "label",  mSize: 5, mPosX: 50, mPosY: 100, label: "", fontname: "sans-serif", fontcolor: "#3F51B5", image: undefined
           });
         }
  constructor(
      private router?: Router,
      private apollo?: Apollo
    ){}

  ngOnInit() {
    this.datenow = new Date();
    this.minDate = new Date(2010);

    this.arrayrutasdepruebas = [];

    let rutanueva = new Ruta();
    rutanueva.origen = "SANTA MARIA HUATULCO";
    rutanueva.destino = "SANTA MARIA HUATULCO";
    rutanueva.tarifa = 35.00;

    let rutanueva2 = new Ruta();
    rutanueva2.origen = "SANTA MARIA HUATULCO";
    rutanueva2.destino = "PASO ANCHO HUATULCO";
    rutanueva2.tarifa = 30.00;


    let rutanueva3 = new Ruta();
    rutanueva3.origen = "SANTA MARIA HUATULCO";
    rutanueva3.destino = "SALINA CRUZ";
    rutanueva3.tarifa = 1200.00;


    let rutanueva4 = new Ruta();
    rutanueva4.origen = "SANTA MARIA HUATULCO";
    rutanueva4.destino = "CRUCECITA";
<<<<<<< HEAD
    rutanueva4.tarifa = 130.50;
=======
    rutanueva4.tarifa = 130.50;
>>>>>>> test

    this.arrayrutasdepruebas.push(rutanueva);
    this.arrayrutasdepruebas.push(rutanueva2);
    this.arrayrutasdepruebas.push(rutanueva2);
    this.arrayrutasdepruebas.push(rutanueva2);
    this.arrayrutasdepruebas.push(rutanueva2);
    this.arrayrutasdepruebas.push(rutanueva2);
    this.arrayrutasdepruebas.push(rutanueva2);
    this.arrayrutasdepruebas.push(rutanueva2);
    this.arrayrutasdepruebas.push(rutanueva2);
    this.arrayrutasdepruebas.push(rutanueva2);
    this.arrayrutasdepruebas.push(rutanueva2);
    this.arrayrutasdepruebas.push(rutanueva3);
    this.arrayrutasdepruebas.push(rutanueva2);
    this.arrayrutasdepruebas.push(rutanueva3);
    this.arrayrutasdepruebas.push(rutanueva2);
    this.arrayrutasdepruebas.push(rutanueva2);
    this.arrayrutasdepruebas.push(rutanueva3);
    this.arrayrutasdepruebas.push(rutanueva2);
    this.arrayrutasdepruebas.push(rutanueva3);
    this.arrayrutasdepruebas.push(rutanueva2);
    this.arrayrutasdepruebas.push(rutanueva3);
    this.arrayrutasdepruebas.push(rutanueva2);
    this.arrayrutasdepruebas.push(rutanueva2);
    this.arrayrutasdepruebas.push(rutanueva3);
    this.arrayrutasdepruebas.push(rutanueva2);
    this.arrayrutasdepruebas.push(rutanueva2);
    this.arrayrutasdepruebas.push(rutanueva2);
    this.arrayrutasdepruebas.push(rutanueva3);
    this.arrayrutasdepruebas.push(rutanueva2);
    this.arrayrutasdepruebas.push(rutanueva2);
    this.arrayrutasdepruebas.push(rutanueva3);
    this.arrayrutasdepruebas.push(rutanueva2);
    this.arrayrutasdepruebas.push(rutanueva2);
    this.arrayrutasdepruebas.push(rutanueva3);
    this.arrayrutasdepruebas.push(rutanueva2);
    this.arrayrutasdepruebas.push(rutanueva2);
    this.arrayrutasdepruebas.push(rutanueva2);
    this.arrayrutasdepruebas.push(rutanueva3);
    this.arrayrutasdepruebas.push(rutanueva2);
    this.arrayrutasdepruebas.push(rutanueva2);
    this.arrayrutasdepruebas.push(rutanueva3);
    this.arrayrutasdepruebas.push(rutanueva2);
    this.arrayrutasdepruebas.push(rutanueva2);
    this.arrayrutasdepruebas.push(rutanueva3);
    this.arrayrutasdepruebas.push(rutanueva2);
    this.arrayrutasdepruebas.push(rutanueva2);
    this.arrayrutasdepruebas.push(rutanueva2);
    this.arrayrutasdepruebas.push(rutanueva3);
    this.arrayrutasdepruebas.push(rutanueva2);
    this.arrayrutasdepruebas.push(rutanueva2);

    console.log(this.arrayrutasdepruebas);

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

  getStatusComponentPayment($event){
    this.statusComponentPayment = $event;
  }



     multiple(valor, multiple){
       var resto = valor % multiple;
       if(resto==0)
       {return true;}
       else
       {return false;}
     }

     getStatusComponentPayment($event){
       this.statusComponentPayment = $event;
     }
      generate(){

        let calibri_url = CALIBRI.CALIBRI;
        let calibrib_url = CALIBRIB.CALIBRIB;

        var pdf = new jsPDF('p', 'mm', [612,   792]);
            var multiplesde40 = [];
            var a_permisoxf = [];
            var a_permisoxf2 = [];

<<<<<<< HEAD

     multiple(valor, multiple){
       var resto = valor % multiple;
       if(resto==0)
       {return true;}
       else
       {return false;}
     }

     getStatusComponentPayment($event){
       this.statusComponentPayment = $event;
     }
      generate(){

        let calibri_url = CALIBRI.CALIBRI;
        let calibrib_url = CALIBRIB.CALIBRIB;

        var pdf = new jsPDF('p', 'mm', [612,   792]);
            var multiplesde40 = [];
            var a_permisoxf = [];
            var a_permisoxf2 = [];

             pdf.setFont('Calibri');

            var totalderutas = this.arrayrutasdepruebas.length;
            for( var z = 1; z < totalderutas; z++){
              if(this.multiple(z,50)){
                    multiplesde40.push(z);
              }
            }

            for(var x = 0; x < multiplesde40.length; x++){
              console.log("hacer los 40"+x);
              a_permisoxf = [];
              pdf.addFileToVFS("Calibri.ttf",
// ttf font file converted to base64
// following is Consolas with only hex digit glyphs defined (0-9, A-F)
            calibri_url);


           pdf.addFileToVFS("Calibrib.ttf",
// ttf font file converted to base64
// following is Consolas with only hex digit glyphs defined (0-9, A-F)
         calibrib_url);

  // add custom font to file

pdf.addFont("Calibrib.ttf", "Calibrib", "normal");
pdf.setFont("Calibrib");
               pdf.setFontSize(11);
              pdf.text(88, 18, 'SECRETARÍA DE MOVILIDAD');
               pdf.setFontSize(9);
              pdf.text(69, 21, 'SUBSECRETARÍA DE REGULACIÓN Y CONTROL DE TRANSPORTE');
               pdf.text(75, 24, 'DIRECCIÓN DE OPERACIÓN DEL TRANSPORTE PUBLICO');
              var img = new Image();
              img.src = './assets/SEMOVI2.png'

              pdf.addFont("Calibri.ttf", "Calibri", "normal");
              pdf.setFont("Calibri");

              this.qrmensagge =
                           " Hola mundo" ;
               const barcodeData = TarifaComponent.getBarcodeData(this.qrmensagge);
               pdf.addImage(barcodeData, "JPG", 10, 45,18, 18);

              pdf.setDrawColor(0);
              pdf.setFillColor(255,0,0);
              pdf.rect(6, 44, 198, 222 ); // empty square

              pdf.addImage(img, 'png', 110, 46, 74, 16);
              pdf.setFontSize(27);
              pdf.setDrawColor(0);
              pdf.setFillColor(214,214,214);
              pdf.rect(11, 62, 186, 12,'F'); // empty square
              pdf.setDrawColor(0,0,0);
              pdf.addFont("Calibrib.ttf", "Calibrib", "normal");
              pdf.setFont("Calibrib");

              pdf.text(15, 71, 'TARJETÓN');
              pdf.setFontSize(8);
               pdf.addFont("Calibri.ttf", "Calibri", "normal");
              pdf.setFont("Calibri");

              pdf.text(115, 67, 'CONCESIONARIO: CESAR SANTIAGO GUZMAN');
              pdf.text(115, 71, 'NUC: XXXXX/XXXXXXXXXX');


              pdf.text('La  Secretaría  de  Movilidad  del  Poder  Ejecutivo  del  estado  de  Oaxaca , con  fundamento  en  lo  dispuesto   por  los  artículos  2 párrafo  tercero y   82  de  la   Constitución   Política   del   Estado  Libre  y  Soberado  de  Oaxaca;  1 ,  27   fracción  VII  y  40   de   la   Ley  Orgánica   del   Poder   Ejecutivo  del  Estado de  Oaxaca, articulo  114  y  116 de  la  Ley  del  Transporte  del  Estado de Oaxaca; en  relación  con  los  artículos 43  fracción II, 72,  73,  75  y 76 del  Reglamento  de la  Ley  de Transporte del  Estado de Oaxaca;  y  de  conformidad  con el  Acuerdo  Administrativo  de  fecha  17  de  diciembre  del  2018,  publicado  en  el  Periódico Oficial de Gobierno del Estado de Oaxaca el 19 de enero del 2019 y en el diario Enlace de la costa, el  día  15 de febrero de 2019 , queda autorizada   la siguiente:', 14,78, {maxWidth: 182, align: "justify"});
              pdf.setFontSize(16);
              pdf.text(96, 97, 'TARIFA');

              for(var i = 0; i < 25; i++){

              a_permisoxf.push([
                (i+1),
                this.arrayrutasdepruebas[i].origen +" - "+ this.arrayrutasdepruebas[i].destino,
                this.numeroALetras(this.arrayrutasdepruebas[i].tarifa),
                "$"+this.arrayrutasdepruebas[i].tarifa.toFixed(2)   ]);
             }

             for(var x = 25; x < 50; x++){

             a_permisoxf2.push([
               (x+1),
               this.arrayrutasdepruebas[x].origen +" - "+ this.arrayrutasdepruebas[x].destino,
               this.numeroALetras(this.arrayrutasdepruebas[x].tarifa),
               "$"+this.arrayrutasdepruebas[x].tarifa.toFixed(2)   ]);
            }


              let pageNumber = pdf.internal.getNumberOfPages();

              pdf.autoTable({
                  head: [['NU','ORIGEN-DESTINO', 'TARIFA', ' ' ]],
                  body: a_permisoxf,
                  startY: 100,
                  showHead: 'firstPage',
                  styles: {overflow: 'linebreak', fontSize: 5  ,overflowColumns: 'linebreak' , cellPadding: 1},
                  columnStyles: {
                    0: {cellWidth: 6},
                    1: {cellWidth: 40},
                    2: {cellWidth: 35},
                    3: {cellWidth: 10}
                  },
                  margin: { right: 140}
              });

              pdf.setPage(pageNumber);

              pdf.autoTable({
                  head: [['NU',' ORIGEN-DESTINO', 'TARIFA', ' ' ]],
                  body: a_permisoxf2,
                  startY: 100,
                  showHead: 'firstPage',
                  styles: { overflow: 'linebreak', fontSize: 5, cellPadding: 1  },

                  columnStyles: {
                    0: {cellWidth: 6},
                    1: {cellWidth: 40},
                    2: {cellWidth: 35},
                    3: {cellWidth: 10}
                  },
                  margin: { left: 108}
              });

              pdf.setFontSize(9);
              pdf.text(25, 264, 'del Servicio Público de Transporte de pasajeros en la modalidad de TAXI; para el Municipio de SANTA MARÍA HUATULCO.');
              pdf.addPage();

            }

            console.log(totalderutas - multiplesde40[multiplesde40.length-1]);

            a_permisoxf = [];
var restorutas = 0;
            if(multiplesde40.length>0){
           restorutas = totalderutas - multiplesde40[multiplesde40.length-1];
          }else{
             restorutas = this.arrayrutasdepruebas.length;
          }

          console.log(restorutas);


          pdf.addFileToVFS("Calibri.ttf",
// ttf font file converted to base64
// following is Consolas with only hex digit glyphs defined (0-9, A-F)
        calibri_url);


       pdf.addFileToVFS("Calibrib.ttf",
// ttf font file converted to base64
// following is Consolas with only hex digit glyphs defined (0-9, A-F)
     calibrib_url);

// add custom font to file

pdf.addFont("Calibrib.ttf", "Calibrib", "normal");
pdf.setFont("Calibrib");
           pdf.setFontSize(11);
          pdf.text(88, 18, 'SECRETARÍA DE MOVILIDAD');
           pdf.setFontSize(9);
          pdf.text(69, 21, 'SUBSECRETARÍA DE REGULACIÓN Y CONTROL DE TRANSPORTE');
           pdf.text(75, 24, 'DIRECCIÓN DE OPERACIÓN DEL TRANSPORTE PUBLICO');
          var img = new Image();
          img.src = './assets/SEMOVI2.png'

          pdf.addFont("Calibri.ttf", "Calibri", "normal");
          pdf.setFont("Calibri");

          this.qrmensagge =
                       " Hola mundo" ;
           const barcodeData = TarifaComponent.getBarcodeData(this.qrmensagge);
           pdf.addImage(barcodeData, "JPG", 10, 45,18, 18);

          pdf.setDrawColor(0);
          pdf.setFillColor(255,0,0);
          pdf.rect(6, 44, 198, 222 ); // empty square

          pdf.addImage(img, 'png', 110, 46, 74, 16);
          pdf.setFontSize(27);
          pdf.setDrawColor(0);
          pdf.setFillColor(214,214,214);
          pdf.rect(11, 62, 186, 12,'F'); // empty square
          pdf.setDrawColor(0,0,0);
          pdf.addFont("Calibrib.ttf", "Calibrib", "normal");
          pdf.setFont("Calibrib");

          pdf.text(15, 71, 'TARJETÓN');
          pdf.setFontSize(8);
           pdf.addFont("Calibri.ttf", "Calibri", "normal");
          pdf.setFont("Calibri");

          pdf.text(115, 67, 'CONCESIONARIO: CESAR SANTIAGO GUZMAN');
          pdf.text(115, 71, 'NUC: XXXXX/XXXXXXXXXX');


          pdf.text('La  Secretaría  de  Movilidad  del  Poder  Ejecutivo  del  estado  de  Oaxaca , con  fundamento  en  lo  dispuesto   por  los  artículos  2 párrafo  tercero y   82  de  la   Constitución   Política   del   Estado  Libre  y  Soberado  de  Oaxaca;  1 ,  27   fracción  VII  y  40   de   la   Ley  Orgánica   del   Poder   Ejecutivo  del  Estado de  Oaxaca, articulo  114  y  116 de  la  Ley  del  Transporte  del  Estado de Oaxaca; en  relación  con  los  artículos 43  fracción II, 72,  73,  75  y 76 del  Reglamento  de la  Ley  de Transporte del  Estado de Oaxaca;  y  de  conformidad  con el  Acuerdo  Administrativo  de  fecha  17  de  diciembre  del  2018,  publicado  en  el  Periódico Oficial de Gobierno del Estado de Oaxaca el 19 de enero del 2019 y en el diario Enlace de la costa, el  día  15 de febrero de 2019 , queda autorizada   la siguiente:', 14,78, {maxWidth: 182, align: "justify"});
          pdf.setFontSize(16);
          pdf.text(96, 97, 'TARIFA');

            if(restorutas<=25){
              for(var i = 0; i < restorutas; i++){
this.arrayrutasdepruebas[i]
              a_permisoxf.push([
                (i+1),
                this.arrayrutasdepruebas[i].origen +" - "+ this.arrayrutasdepruebas[i].destino,
                this.numeroALetras(this.arrayrutasdepruebas[i].tarifa),
                 "$"+this.arrayrutasdepruebas[i].tarifa.toFixed(2)    ]);
             }

              pdf.autoTable({
                   head: [['NU','ORIGEN-DESTINO', 'TARIFA EN TEXTO', '' ]],
                   styles: {
                   fontSize: 6
                   },
                   columnStyles: {
                     0: {cellWidth: 6},
                     1: {cellWidth: 40},
                     2: {cellWidth: 35},
                     3: {cellWidth: 10}
                   },
                   startY: 100,
                   body: a_permisoxf
               });
            }else{
              for(var i = 0; i < 25; i++){

              a_permisoxf.push([
                (i+1),this.arrayrutasdepruebas[i].origen +" - "+ this.arrayrutasdepruebas[i].destino,
                this.numeroALetras(this.arrayrutasdepruebas[i].tarifa),
                "$"+this.arrayrutasdepruebas[i].tarifa.toFixed(2)    ]);
             }

             console.log("----------------------------->"+(restorutas- 25));


             for(var a = 25; a < restorutas; a++){

=======
             pdf.setFont('Calibri');

            var totalderutas = this.arrayrutasdepruebas.length;
            for( var z = 1; z < totalderutas; z++){
              if(this.multiple(z,50)){
                    multiplesde40.push(z);
              }
            }

            for(var x = 0; x < multiplesde40.length; x++){
              console.log("hacer los 40"+x);
              a_permisoxf = [];
              pdf.addFileToVFS("Calibri.ttf",
// ttf font file converted to base64
// following is Consolas with only hex digit glyphs defined (0-9, A-F)
            calibri_url);


           pdf.addFileToVFS("Calibrib.ttf",
// ttf font file converted to base64
// following is Consolas with only hex digit glyphs defined (0-9, A-F)
         calibrib_url);

  // add custom font to file

pdf.addFont("Calibrib.ttf", "Calibrib", "normal");
pdf.setFont("Calibrib");
               pdf.setFontSize(11);
              pdf.text(88, 18, 'SECRETARÍA DE MOVILIDAD');
               pdf.setFontSize(9);
              pdf.text(69, 21, 'SUBSECRETARÍA DE REGULACIÓN Y CONTROL DE TRANSPORTE');
               pdf.text(75, 24, 'DIRECCIÓN DE OPERACIÓN DEL TRANSPORTE PUBLICO');
              var img = new Image();
              img.src = './assets/SEMOVI2.png'

              pdf.addFont("Calibri.ttf", "Calibri", "normal");
              pdf.setFont("Calibri");

              this.qrmensagge =
                           " Hola mundo" ;
               const barcodeData = TarifaComponent.getBarcodeData(this.qrmensagge);
               pdf.addImage(barcodeData, "JPG", 10, 45,18, 18);

              pdf.setDrawColor(0);
              pdf.setFillColor(255,0,0);
              pdf.rect(6, 44, 198, 222 ); // empty square

              pdf.addImage(img, 'png', 110, 46, 74, 16);
              pdf.setFontSize(27);
              pdf.setDrawColor(0);
              pdf.setFillColor(214,214,214);
              pdf.rect(11, 62, 186, 12,'F'); // empty square
              pdf.setDrawColor(0,0,0);
              pdf.addFont("Calibrib.ttf", "Calibrib", "normal");
              pdf.setFont("Calibrib");

              pdf.text(15, 71, 'TARJETÓN');
              pdf.setFontSize(8);
               pdf.addFont("Calibri.ttf", "Calibri", "normal");
              pdf.setFont("Calibri");

              pdf.text(115, 67, 'CONCESIONARIO: CESAR SANTIAGO GUZMAN');
              pdf.text(115, 71, 'NUC: XXXXX/XXXXXXXXXX');


              pdf.text('La  Secretaría  de  Movilidad  del  Poder  Ejecutivo  del  estado  de  Oaxaca , con  fundamento  en  lo  dispuesto   por  los  artículos  2 párrafo  tercero y   82  de  la   Constitución   Política   del   Estado  Libre  y  Soberado  de  Oaxaca;  1 ,  27   fracción  VII  y  40   de   la   Ley  Orgánica   del   Poder   Ejecutivo  del  Estado de  Oaxaca, articulo  114  y  116 de  la  Ley  del  Transporte  del  Estado de Oaxaca; en  relación  con  los  artículos 43  fracción II, 72,  73,  75  y 76 del  Reglamento  de la  Ley  de Transporte del  Estado de Oaxaca;  y  de  conformidad  con el  Acuerdo  Administrativo  de  fecha  17  de  diciembre  del  2018,  publicado  en  el  Periódico Oficial de Gobierno del Estado de Oaxaca el 19 de enero del 2019 y en el diario Enlace de la costa, el  día  15 de febrero de 2019 , queda autorizada   la siguiente:', 14,78, {maxWidth: 182, align: "justify"});
              pdf.setFontSize(16);
              pdf.text(96, 97, 'TARIFA');

              for(var i = 0; i < 25; i++){

              a_permisoxf.push([
                (i+1),
                this.arrayrutasdepruebas[i].origen +" - "+ this.arrayrutasdepruebas[i].destino,
                this.numeroALetras(this.arrayrutasdepruebas[i].tarifa),
                "$"+this.arrayrutasdepruebas[i].tarifa.toFixed(2)   ]);
             }

             for(var x = 25; x < 50; x++){

             a_permisoxf2.push([
               (x+1),
               this.arrayrutasdepruebas[x].origen +" - "+ this.arrayrutasdepruebas[x].destino,
               this.numeroALetras(this.arrayrutasdepruebas[x].tarifa),
               "$"+this.arrayrutasdepruebas[x].tarifa.toFixed(2)   ]);
            }


              let pageNumber = pdf.internal.getNumberOfPages();

              pdf.autoTable({
                  head: [['NU','ORIGEN-DESTINO', 'TARIFA', ' ' ]],
                  body: a_permisoxf,
                  startY: 100,
                  showHead: 'firstPage',
                  styles: {overflow: 'linebreak', fontSize: 5  ,overflowColumns: 'linebreak' , cellPadding: 1},
                  columnStyles: {
                    0: {cellWidth: 6},
                    1: {cellWidth: 40},
                    2: {cellWidth: 35},
                    3: {cellWidth: 10}
                  },
                  margin: { right: 140}
              });

              pdf.setPage(pageNumber);

              pdf.autoTable({
                  head: [['NU',' ORIGEN-DESTINO', 'TARIFA', ' ' ]],
                  body: a_permisoxf2,
                  startY: 100,
                  showHead: 'firstPage',
                  styles: { overflow: 'linebreak', fontSize: 5, cellPadding: 1  },

                  columnStyles: {
                    0: {cellWidth: 6},
                    1: {cellWidth: 40},
                    2: {cellWidth: 35},
                    3: {cellWidth: 10}
                  },
                  margin: { left: 108}
              });

              pdf.setFontSize(9);
              pdf.text(25, 264, 'del Servicio Público de Transporte de pasajeros en la modalidad de TAXI; para el Municipio de SANTA MARÍA HUATULCO.');
              pdf.addPage();

            }

            console.log(totalderutas - multiplesde40[multiplesde40.length-1]);

            a_permisoxf = [];
var restorutas = 0;
            if(multiplesde40.length>0){
           restorutas = totalderutas - multiplesde40[multiplesde40.length-1];
          }else{
             restorutas = this.arrayrutasdepruebas.length;
          }

          console.log(restorutas);


          pdf.addFileToVFS("Calibri.ttf",
// ttf font file converted to base64
// following is Consolas with only hex digit glyphs defined (0-9, A-F)
        calibri_url);


       pdf.addFileToVFS("Calibrib.ttf",
// ttf font file converted to base64
// following is Consolas with only hex digit glyphs defined (0-9, A-F)
     calibrib_url);

// add custom font to file

pdf.addFont("Calibrib.ttf", "Calibrib", "normal");
pdf.setFont("Calibrib");
           pdf.setFontSize(11);
          pdf.text(88, 18, 'SECRETARÍA DE MOVILIDAD');
           pdf.setFontSize(9);
          pdf.text(69, 21, 'SUBSECRETARÍA DE REGULACIÓN Y CONTROL DE TRANSPORTE');
           pdf.text(75, 24, 'DIRECCIÓN DE OPERACIÓN DEL TRANSPORTE PUBLICO');
          var img = new Image();
          img.src = './assets/SEMOVI2.png'

          pdf.addFont("Calibri.ttf", "Calibri", "normal");
          pdf.setFont("Calibri");

          this.qrmensagge =
                       " Hola mundo" ;
           const barcodeData = TarifaComponent.getBarcodeData(this.qrmensagge);
           pdf.addImage(barcodeData, "JPG", 10, 45,18, 18);

          pdf.setDrawColor(0);
          pdf.setFillColor(255,0,0);
          pdf.rect(6, 44, 198, 222 ); // empty square

          pdf.addImage(img, 'png', 110, 46, 74, 16);
          pdf.setFontSize(27);
          pdf.setDrawColor(0);
          pdf.setFillColor(214,214,214);
          pdf.rect(11, 62, 186, 12,'F'); // empty square
          pdf.setDrawColor(0,0,0);
          pdf.addFont("Calibrib.ttf", "Calibrib", "normal");
          pdf.setFont("Calibrib");

          pdf.text(15, 71, 'TARJETÓN');
          pdf.setFontSize(8);
           pdf.addFont("Calibri.ttf", "Calibri", "normal");
          pdf.setFont("Calibri");

          pdf.text(115, 67, 'CONCESIONARIO: CESAR SANTIAGO GUZMAN');
          pdf.text(115, 71, 'NUC: XXXXX/XXXXXXXXXX');


          pdf.text('La  Secretaría  de  Movilidad  del  Poder  Ejecutivo  del  estado  de  Oaxaca , con  fundamento  en  lo  dispuesto   por  los  artículos  2 párrafo  tercero y   82  de  la   Constitución   Política   del   Estado  Libre  y  Soberado  de  Oaxaca;  1 ,  27   fracción  VII  y  40   de   la   Ley  Orgánica   del   Poder   Ejecutivo  del  Estado de  Oaxaca, articulo  114  y  116 de  la  Ley  del  Transporte  del  Estado de Oaxaca; en  relación  con  los  artículos 43  fracción II, 72,  73,  75  y 76 del  Reglamento  de la  Ley  de Transporte del  Estado de Oaxaca;  y  de  conformidad  con el  Acuerdo  Administrativo  de  fecha  17  de  diciembre  del  2018,  publicado  en  el  Periódico Oficial de Gobierno del Estado de Oaxaca el 19 de enero del 2019 y en el diario Enlace de la costa, el  día  15 de febrero de 2019 , queda autorizada   la siguiente:', 14,78, {maxWidth: 182, align: "justify"});
          pdf.setFontSize(16);
          pdf.text(96, 97, 'TARIFA');

            if(restorutas<=25){
              for(var i = 0; i < restorutas; i++){
this.arrayrutasdepruebas[i]
              a_permisoxf.push([
                (i+1),
                this.arrayrutasdepruebas[i].origen +" - "+ this.arrayrutasdepruebas[i].destino,
                this.numeroALetras(this.arrayrutasdepruebas[i].tarifa),
                 "$"+this.arrayrutasdepruebas[i].tarifa.toFixed(2)    ]);
             }

              pdf.autoTable({
                   head: [['NU','ORIGEN-DESTINO', 'TARIFA EN TEXTO', '' ]],
                   styles: {
                   fontSize: 6
                   },
                   columnStyles: {
                     0: {cellWidth: 6},
                     1: {cellWidth: 40},
                     2: {cellWidth: 35},
                     3: {cellWidth: 10}
                   },
                   startY: 100,
                   body: a_permisoxf
               });
            }else{
              for(var i = 0; i < 25; i++){

              a_permisoxf.push([
                (i+1),this.arrayrutasdepruebas[i].origen +" - "+ this.arrayrutasdepruebas[i].destino,
                this.numeroALetras(this.arrayrutasdepruebas[i].tarifa),
                "$"+this.arrayrutasdepruebas[i].tarifa.toFixed(2)    ]);
             }

             console.log("----------------------------->"+(restorutas- 25));


             for(var a = 25; a < restorutas; a++){

>>>>>>> test
             a_permisoxf2.push([
               (a+1),this.arrayrutasdepruebas[a].origen +" - "+ this.arrayrutasdepruebas[a].destino,
               this.numeroALetras(this.arrayrutasdepruebas[a].tarifa),
               "$"+this.arrayrutasdepruebas[a].tarifa.toFixed(2)    ]);
            }

                          let pageNumber = pdf.internal.getNumberOfPages();

                          pdf.autoTable({
                              head: [['NU','ORIGEN-DESTINO', 'TARIFA', ' ' ]],
                              body: a_permisoxf,
                              startY: 100,
                              showHead: 'firstPage',
                              styles: {overflow: 'linebreak', fontSize: 5  ,overflowColumns: 'linebreak' , cellPadding: 1},
                              columnStyles: {
                                0: {cellWidth: 6},
                                1: {cellWidth: 40},
                                2: {cellWidth: 35},
                                3: {cellWidth: 10}
                              },
                              margin: { right: 140}
                          });

                          pdf.setPage(pageNumber);

                          if((restorutas- 25) > 0){

                          pdf.autoTable({
                              head: [['NU',' ORIGEN-DESTINO', 'TARIFA', ' ' ]],
                              body: a_permisoxf2,
                              startY: 100,
                              showHead: 'firstPage',
                              styles: { overflow: 'linebreak', fontSize: 5, cellPadding: 1  },

                              columnStyles: {
                                0: {cellWidth: 6},
                                1: {cellWidth: 40},
                                2: {cellWidth: 35},
                                3: {cellWidth: 10}
                              },
                              margin: { left: 108}
                          });
<<<<<<< HEAD
=======

                        }
>>>>>>> test

                        }






            }

            pdf.setFontSize(9);
            pdf.text(25, 264, 'del Servicio Público de Transporte de pasajeros en la modalidad de TAXI; para el Municipio de SANTA MARÍA HUATULCO.');




            console.log(multiplesde40);

          pdf.save("ejemplo.pdf");

<<<<<<< HEAD
=======




            }

            pdf.setFontSize(9);
            pdf.text(25, 264, 'del Servicio Público de Transporte de pasajeros en la modalidad de TAXI; para el Municipio de SANTA MARÍA HUATULCO.');




            console.log(multiplesde40);

          pdf.save("ejemplo.pdf");

>>>>>>> test
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

<<<<<<< HEAD
=======

      unidades(num){
        switch(num)
{
case 1: return "UN";
case 2: return "DOS";
case 3: return "TRES";
case 4: return "CUATRO";
case 5: return "CINCO";
case 6: return "SEIS";
case 7: return "SIETE";
case 8: return "OCHO";
case 9: return "NUEVE";
}

return "";
}

decenas(num){

    let decena = Math.floor(num/10);
    let unidad = num - (decena * 10);

    switch(decena)
    {
        case 1:
            switch(unidad)
            {
                case 0: return 'DIEZ';
                case 1: return 'ONCE';
                case 2: return 'DOCE';
                case 3: return 'TRECE';
                case 4: return 'CATORCE';
                case 5: return 'QUINCE';
                default: return 'DIECI' + this.unidades(unidad);
            }
        case 2:
            switch(unidad)
            {
                case 0: return 'VEINTE';
                default: return 'VEINTI' + this.unidades(unidad);
            }
        case 3: return this.decenasY('TREINTA', unidad);
        case 4: return this.decenasY('CUARENTA', unidad);
        case 5: return this.decenasY('CINCUENTA', unidad);
        case 6: return this.decenasY('SESENTA', unidad);
        case 7: return this.decenasY('SETENTA', unidad);
        case 8: return this.decenasY('OCHENTA', unidad);
        case 9: return this.decenasY('NOVENTA', unidad);
        case 0: return this.unidades(unidad);
    }
}//Unidades()

  decenasY(strSin, numUnidades) {
   if (numUnidades > 0)
       return strSin + ' Y ' + this.unidades(numUnidades)

   return strSin;
}//DecenasY()

centenas(num) {
   let centenas = Math.floor(num / 100);
   let decenas = num - (centenas * 100);
   console.log(centenas);

   switch(centenas)
   {
       case 1:
           if (decenas > 0)
               return 'CIENTO ' + this.decenas(decenas);
           return 'CIEN';
       case 2: return 'DOSCIENTOS ' + this.decenas(decenas);
       case 3: return 'TRESCIENTOS ' + this.decenas(decenas);
       case 4: return 'CUATROCIENTOS ' + this.decenas(decenas);
       case 5: return 'QUINIENTOS ' + this.decenas(decenas);
       case 6: return 'SEISCIENTOS ' + this.decenas(decenas);
       case 7: return 'SETECIENTOS ' + this.decenas(decenas);
       case 8: return 'OCHOCIENTOS ' + this.decenas(decenas);
       case 9: return 'NOVECIENTOS ' + this.decenas(decenas);
   }
 }

 seccion(num, divisor, strSingular, strPlural) {
    let cientos = Math.floor(num / divisor)
    let resto = num - (cientos * divisor)
    console.log("******************************");
    console.log(cientos);

    let letras = '';

    if (cientos > 0){
        if (cientos > 1)
            {
              console.log("Aqui entra" + cientos);
              letras = this.unidades(cientos) + ' ' + strPlural;
            }
        else
            {
              letras = strSingular;
            }
       }
    if (resto > 0)
        {
          letras += '';
        }
        console.log("[[[[[[[[]]]]]]]]");

        console.log(letras);

    return letras;
}//Seccion()

miles(num) {
    let divisor = 1000;
    let cientos = Math.floor(num / divisor)
    let resto = num - (cientos * divisor)
    console.log("cientos"+cientos);

    console.log("resto"+resto);

    let strMiles = this.seccion(num, divisor, 'MIL', 'MIL');
    console.log(resto);
    console.log("--------------------");
    let strCentenas;

    if(resto > 100){
     strCentenas = this.centenas(resto);
   }else{
     if(resto > 10){
       strCentenas = this.decenas(resto);
     }else{
       strCentenas = this.unidades(resto);
     }
   }


    if(strMiles == '')
        return strCentenas;


    return strMiles + ' ' + strCentenas;
}//Miles()


numeroALetras(num){
var data = {
numero: num,
enteros: Math.floor(num),
centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
letrasCentavos: "",
letrasMonedaPlural: "PESOS " ,
letrasMonedaSingular: "PESO "
};

if (data.centavos > 0)
data.letrasCentavos = data.centavos + "/100 M.N";
else
data.letrasCentavos = "00/100 M.N";

if(data.enteros == 0)
return "CERO " + data.letrasMonedaPlural + " "  ;
if (data.enteros == 1)
return this.miles(data.enteros) + " " + data.letrasMonedaSingular + " " + data.letrasCentavos;
else
return this.miles(data.enteros) + " " + data.letrasMonedaPlural + " " + data.letrasCentavos;
}


      unidades(num){
        switch(num)
{
case 1: return "UN";
case 2: return "DOS";
case 3: return "TRES";
case 4: return "CUATRO";
case 5: return "CINCO";
case 6: return "SEIS";
case 7: return "SIETE";
case 8: return "OCHO";
case 9: return "NUEVE";
}

return "";
}

decenas(num){

    let decena = Math.floor(num/10);
    let unidad = num - (decena * 10);

    switch(decena)
    {
        case 1:
            switch(unidad)
            {
                case 0: return 'DIEZ';
                case 1: return 'ONCE';
                case 2: return 'DOCE';
                case 3: return 'TRECE';
                case 4: return 'CATORCE';
                case 5: return 'QUINCE';
                default: return 'DIECI' + this.unidades(unidad);
            }
        case 2:
            switch(unidad)
            {
                case 0: return 'VEINTE';
                default: return 'VEINTI' + this.unidades(unidad);
            }
        case 3: return this.decenasY('TREINTA', unidad);
        case 4: return this.decenasY('CUARENTA', unidad);
        case 5: return this.decenasY('CINCUENTA', unidad);
        case 6: return this.decenasY('SESENTA', unidad);
        case 7: return this.decenasY('SETENTA', unidad);
        case 8: return this.decenasY('OCHENTA', unidad);
        case 9: return this.decenasY('NOVENTA', unidad);
        case 0: return this.unidades(unidad);
    }
}//Unidades()

  decenasY(strSin, numUnidades) {
   if (numUnidades > 0)
       return strSin + ' Y ' + this.unidades(numUnidades)

   return strSin;
}//DecenasY()

centenas(num) {
   let centenas = Math.floor(num / 100);
   let decenas = num - (centenas * 100);
   console.log(centenas);

   switch(centenas)
   {
       case 1:
           if (decenas > 0)
               return 'CIENTO ' + this.decenas(decenas);
           return 'CIEN';
       case 2: return 'DOSCIENTOS ' + this.decenas(decenas);
       case 3: return 'TRESCIENTOS ' + this.decenas(decenas);
       case 4: return 'CUATROCIENTOS ' + this.decenas(decenas);
       case 5: return 'QUINIENTOS ' + this.decenas(decenas);
       case 6: return 'SEISCIENTOS ' + this.decenas(decenas);
       case 7: return 'SETECIENTOS ' + this.decenas(decenas);
       case 8: return 'OCHOCIENTOS ' + this.decenas(decenas);
       case 9: return 'NOVECIENTOS ' + this.decenas(decenas);
   }
 }

 seccion(num, divisor, strSingular, strPlural) {
    let cientos = Math.floor(num / divisor)
    let resto = num - (cientos * divisor)
    console.log("******************************");
    console.log(cientos);

    let letras = '';

    if (cientos > 0){
        if (cientos > 1)
            {
              console.log("Aqui entra" + cientos);
              letras = this.unidades(cientos) + ' ' + strPlural;
            }
        else
            {
              letras = strSingular;
            }
       }
    if (resto > 0)
        {
          letras += '';
        }
        console.log("[[[[[[[[]]]]]]]]");

        console.log(letras);

    return letras;
}//Seccion()

miles(num) {
    let divisor = 1000;
    let cientos = Math.floor(num / divisor)
    let resto = num - (cientos * divisor)
    console.log("cientos"+cientos);

    console.log("resto"+resto);

    let strMiles = this.seccion(num, divisor, 'MIL', 'MIL');
    console.log(resto);
    console.log("--------------------");
    let strCentenas;

    if(resto > 100){
     strCentenas = this.centenas(resto);
   }else{
     if(resto > 10){
       strCentenas = this.decenas(resto);
     }else{
       strCentenas = this.unidades(resto);
     }
   }


    if(strMiles == '')
        return strCentenas;


    return strMiles + ' ' + strCentenas;
}//Miles()


numeroALetras(num){
var data = {
numero: num,
enteros: Math.floor(num),
centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
letrasCentavos: "",
letrasMonedaPlural: "PESOS " ,
letrasMonedaSingular: "PESO "
};

if (data.centavos > 0)
data.letrasCentavos = data.centavos + "/100 M.N";
else
data.letrasCentavos = "00/100 M.N";

if(data.enteros == 0)
return "CERO " + data.letrasMonedaPlural + " "  ;
if (data.enteros == 1)
return this.miles(data.enteros) + " " + data.letrasMonedaSingular + " " + data.letrasCentavos;
else
return this.miles(data.enteros) + " " + data.letrasMonedaPlural + " " + data.letrasCentavos;
}




>>>>>>> master
}
