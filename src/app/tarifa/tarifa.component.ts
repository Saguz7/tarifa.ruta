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
  import { ConvertNSService } from '../core/services/convertns.service';

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
    div2busquedadeconcesionario: boolean = false;
    div3solicitud: boolean = false;
    div4descarga: boolean = false;
    divdebusqueda: boolean = true;
    arrayrutasdepruebas: any;
    data: Observable<any>;
    registroabuscar: any;
    tamaniointervalo: any;
    busquedapornuc: boolean = false;
    busquedapornombre: boolean = true;

    plantillasencontradas: any;
    foliosolicitud: any;
    divplantillas: boolean = false;
    btninhabilitar: boolean = false;
    plantillaseleccionada: any;
    btngetRutas: boolean = false;
    btngetTarjeton: boolean = false;
    //Valores estaticos del QR
    static getBarcodeData(text: string, size = 900) {
      return kjua({
        render: "canvas", crisp: true, minVersion: 1, ecLevel: "Q", size: size, ratio: undefined, fill: "#333", back: "#fff",
        text, rounded: 10, quiet: 2, mode: "label",  mSize: 5, mPosX: 50, mPosY: 100, label: "", fontname: "sans-serif", fontcolor: "#3F51B5", image: undefined
      });
    }
    constructor(
      private router?: Router,
      private apollo?: Apollo,
      private convertNSService?: ConvertNSService
    ){}


    ngOnInit() {


       for (var z = 0; z < 2; z++){
           if(z==0){
              console.log("Una Sola Hoja");
           }else{
               console.log("Agrega otra hoja");
           }
      }

       this.datenow = new Date();
      this.minDate = new Date(2010);
      this.arrayrutasdepruebas = [];

      document.getElementById("divheader1").style.backgroundColor ="white";

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

        this.obtenertamañodeseparacion();
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

   creaciondetarjeton(){

     /* Para insertar el tarjeton
     this.insertPlantillaGQL
       .mutate({
         plantilla: nuevaplantilla,
         rutas: this.arrayrutas
       })
       .subscribe(({ data }) => {
           this.plantillaComponent.listPlantillas();
          this.limpiar();
         M.toast({html: "Se ha agregado una nueva plantilla."})
                  }, (error) => {
                    var divisiones = error.message.split(":", 2);
                    M.toast({html: divisiones[1]})
        });
     */
     this.generate();
   }
   //Generacion del pdf con las rutas correspondientes
   generate(){
      let calibri_url = CALIBRI.CALIBRI;
      let calibrib_url = CALIBRIB.CALIBRIB;
      var pdf = new jsPDF('p', 'mm', [612,   792]);
          var a_permisoxf = [];
          var a_permisoxf2 = [];
          var totalderutas = this.arrayrutasdepruebas.length;
          var restorutas = this.arrayrutasdepruebas.length;
              pdf.addFileToVFS("Calibri.ttf",calibri_url);
              pdf.addFileToVFS("Calibrib.ttf",calibrib_url);
              pdf.addFont("Calibrib.ttf", "Calibrib", "normal");
              pdf.setFont("Calibrib");
              pdf.setFontSize(13);
              pdf.text(89, 18, 'SECRETARÍA DE MOVILIDAD');
              pdf.setFontSize(9);
              pdf.text(77, 21, 'SUBSECRETARÍA DE REGULACIÓN Y CONTROL DE TRANSPORTE');
              pdf.text(82, 24, 'DIRECCIÓN DE OPERACIÓN DEL TRANSPORTE PUBLICO');
              var img = new Image();
              img.src = './assets/SEMOVI2.png'
              pdf.addFont("Calibri.ttf", "Calibri", "normal");
              pdf.setFont("Calibri");
              var concesionarionombre= "";
              if(this.registroamostrar.tipo_persona == "F"){
                concesionarionombre = 'CONCESIONARIO: ' + this.registroamostrar.nombre + " " + this.registroamostrar.primer_apellido + " " + this.registroamostrar.segundo_apellido ;

              }else{
                concesionarionombre = 'CONCESIONARIO: ' + this.registroamostrar.razon_social ;

              }
              this.qrmensagge =
                       "" + concesionarionombre + " NUC:" + this.registroamostrar.nuc + " Folio Hoja Valorada:" + this.pago3;
              const barcodeData = TarifaComponent.getBarcodeData(this.qrmensagge);
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
              pdf.addImage(barcodeData, "JPG", 10, 45,31, 31);

              pdf.text(50, 71, 'TARJETÓN');
              pdf.setFontSize(8);
              pdf.addFont("Calibri.ttf", "Calibri", "normal");
              pdf.setFont("Calibri");
              if(this.registroamostrar.tipo_persona == "F"){
                pdf.text(115, 67, 'CONCESIONARIO: ' + this.registroamostrar.nombre + " " + this.registroamostrar.primer_apellido + " " + this.registroamostrar.segundo_apellido);

              }else{
                pdf.text(115, 67, 'CONCESIONARIO: ' + this.registroamostrar.razon_social );

              }

               pdf.text(115, 71, 'NUC: ' + this.registroamostrar.nuc);
              pdf.text('La  Secretaría  de  Movilidad  del  Poder  Ejecutivo  del  estado  de  Oaxaca , con  fundamento  en  lo  dispuesto   por  los  artículos  2 párrafo  tercero y   82  de  la   Constitución   Política   del   Estado  Libre  y  Soberado  de  Oaxaca;  1 ,  27   fracción  VII  y  40   de   la   Ley  Orgánica   del   Poder   Ejecutivo  del  Estado de  Oaxaca, articulo  114  y  116 de  la  Ley  del  Transporte  del  Estado de Oaxaca; en  relación  con  los  artículos 43  fracción II, 72,  73,  75  y 76 del  Reglamento  de la  Ley  de Transporte del  Estado de Oaxaca;  y  de  conformidad  con el  Acuerdo  Administrativo  de  fecha  17  de  diciembre  del  2018,  publicado  en  el  Periódico Oficial de Gobierno del Estado de Oaxaca el 19 de enero del 2019 y en el diario Enlace de la costa, el  día  15 de febrero de 2019 , queda autorizada   la siguiente:', 14,78, {maxWidth: 182, align: "justify"});
              pdf.setFontSize(16);
              pdf.text(96, 97, 'TARIFA');
              if(restorutas<=25){
                for(var i = 0; i < restorutas; i++){
                   this.arrayrutasdepruebas[i]
                   a_permisoxf.push([
                   this.arrayrutasdepruebas[i].orden,
                   this.arrayrutasdepruebas[i].ruta.origen +" - "+ this.arrayrutasdepruebas[i].ruta.destino,
                   this.arrayrutasdepruebas[i].descripcion_tarifa,
                   "$"+this.arrayrutasdepruebas[i].tarifa.toFixed(2)    ]);
                 }
                 var tamanioletra = 6;
                 if(this.tamaniointervalo==0){
                   tamanioletra = 5;
                 }
                 pdf.autoTable({
                   head: [['NU','ORIGEN-DESTINO', 'TARIFA EN TEXTO', '' ]],
                   styles: {overflow: 'linebreak', fontSize: tamanioletra  ,overflowColumns: 'linebreak' , cellPadding: {top: this.tamaniointervalo, right: 1, bottom: this.tamaniointervalo, left: 1} },

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
                 this.arrayrutasdepruebas[i].orden,
                 this.arrayrutasdepruebas[i].ruta.origen +" - "+ this.arrayrutasdepruebas[i].ruta.destino,
                 this.arrayrutasdepruebas[i].descripcion_tarifa,
                 "$"+this.arrayrutasdepruebas[i].tarifa.toFixed(2)    ]);
               }
               for(var a = 25; a < restorutas; a++){
                 a_permisoxf2.push([
                   this.arrayrutasdepruebas[a].orden,
                   this.arrayrutasdepruebas[a].ruta.origen +" - "+ this.arrayrutasdepruebas[a].ruta.destino,
                    this.arrayrutasdepruebas[a].descripcion_tarifa,
                   "$"+this.arrayrutasdepruebas[a].tarifa.toFixed(2)    ]);
                 }

               let pageNumber = pdf.internal.getNumberOfPages();
               pdf.autoTable({
                 head: [['NU','ORIGEN-DESTINO', 'TARIFA', ' ' ]],
                  body: a_permisoxf,
                 startY: 100,
                 showHead: 'firstPage',
                 styles: {overflow: 'linebreak', fontSize: 4.7  ,overflowColumns: 'linebreak' , cellPadding: {top: this.tamaniointervalo, right: 1, bottom: this.tamaniointervalo,  left: 1} },
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
                   styles: { overflow: 'linebreak',  fontSize: 4.7,overflowColumns: 'linebreak', cellPadding: {top: this.tamaniointervalo, right: 1, bottom: this.tamaniointervalo, left: 1}  },
                   columnStyles: {
                     0: {cellWidth: 6},
                     1: {cellWidth: 40},
                     2: {cellWidth: 35},
                     3: {cellWidth: 10}
                   },
                   margin: { left: 108}
                 });
               }
             }
             pdf.setFontSize(9);
             pdf.text(25, 264, 'del Servicio Público de Transporte de pasajeros en la modalidad de ' + this.plantillaseleccionada.modalidad.nombre+ '; para el Municipio de ' +this.registroamostrar.municipio.nombre +  ".");
             /*
             var delayInMilliseconds = 1000; //1 second
               setTimeout(function() {
              }, delayInMilliseconds);
              if(this.objetoparaqr!=undefined){
                this.terminarproceso();
              }
             */
             pdf.save(this.registroamostrar.nuc + ".pdf");
           }

      generateurbanos(){

             for (var z = 0; z < 2; z++){

             let calibri_url = CALIBRI.CALIBRI;
             let calibrib_url = CALIBRIB.CALIBRIB;
             var pdf = new jsPDF('p', 'mm', [612,   792]);
                 var a_permisoxf = [];
                 var a_permisoxf2 = [];
                 var totalderutas = this.arrayrutasdepruebas.length;
                 var restorutas = this.arrayrutasdepruebas.length;
                     pdf.addFileToVFS("Calibri.ttf",calibri_url);
                     pdf.addFileToVFS("Calibrib.ttf",calibrib_url);
                     pdf.addFont("Calibrib.ttf", "Calibrib", "normal");
                     pdf.setFont("Calibrib");
                     pdf.setFontSize(13);
                     pdf.text(89, 18, 'SECRETARÍA DE MOVILIDAD');
                     pdf.setFontSize(9);
                     pdf.text(77, 21, 'SUBSECRETARÍA DE REGULACIÓN Y CONTROL DE TRANSPORTE');
                     pdf.text(82, 24, 'DIRECCIÓN DE OPERACIÓN DEL TRANSPORTE PUBLICO');
                     var img = new Image();
                     img.src = './assets/SEMOVI2.png'
                     pdf.addFont("Calibri.ttf", "Calibri", "normal");
                     pdf.setFont("Calibri");
                     var concesionarionombre= "";
                     if(this.registroamostrar.tipo_persona == "F"){
                       concesionarionombre = 'CONCESIONARIO: ' + this.registroamostrar.nombre + " " + this.registroamostrar.primer_apellido + " " + this.registroamostrar.segundo_apellido ;

                     }else{
                       concesionarionombre = 'CONCESIONARIO: ' + this.registroamostrar.razon_social ;

                     }
                     this.qrmensagge =
                              "" + concesionarionombre + " NUC:" + this.registroamostrar.nuc + " Folio Hoja Valorada:" + this.pago3;
                     const barcodeData = TarifaComponent.getBarcodeData(this.qrmensagge);
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
                     pdf.addImage(barcodeData, "JPG", 10, 45,31, 31);

                     pdf.text(50, 71, 'TARJETÓN');
                     pdf.setFontSize(8);
                     pdf.addFont("Calibri.ttf", "Calibri", "normal");
                     pdf.setFont("Calibri");
                     if(this.registroamostrar.tipo_persona == "F"){
                       pdf.text(115, 67, 'CONCESIONARIO: ' + this.registroamostrar.nombre + " " + this.registroamostrar.primer_apellido + " " + this.registroamostrar.segundo_apellido);

                     }else{
                       pdf.text(115, 67, 'CONCESIONARIO: ' + this.registroamostrar.razon_social );

                     }

                      pdf.text(115, 71, 'NUC: ' + this.registroamostrar.nuc);
                     pdf.text('La  Secretaría  de  Movilidad  del  Poder  Ejecutivo  del  estado  de  Oaxaca , con  fundamento  en  lo  dispuesto   por  los  artículos  2 párrafo  tercero y   82  de  la   Constitución   Política   del   Estado  Libre  y  Soberado  de  Oaxaca;  1 ,  27   fracción  VII  y  40   de   la   Ley  Orgánica   del   Poder   Ejecutivo  del  Estado de  Oaxaca, articulo  114  y  116 de  la  Ley  del  Transporte  del  Estado de Oaxaca; en  relación  con  los  artículos 43  fracción II, 72,  73,  75  y 76 del  Reglamento  de la  Ley  de Transporte del  Estado de Oaxaca;  y  de  conformidad  con el  Acuerdo  Administrativo  de  fecha  17  de  diciembre  del  2018,  publicado  en  el  Periódico Oficial de Gobierno del Estado de Oaxaca el 19 de enero del 2019 y en el diario Enlace de la costa, el  día  15 de febrero de 2019 , queda autorizada   la siguiente:', 14,78, {maxWidth: 182, align: "justify"});
                     pdf.setFontSize(16);
                     pdf.text(96, 97, 'TARIFA');
                     if(restorutas<=25){
                       for(var i = 0; i < restorutas; i++){
                          this.arrayrutasdepruebas[i]
                          a_permisoxf.push([
                          this.arrayrutasdepruebas[i].orden,
                          this.arrayrutasdepruebas[i].ruta.origen +" - "+ this.arrayrutasdepruebas[i].ruta.destino,
                          this.arrayrutasdepruebas[i].descripcion_tarifa,
                          "$"+this.arrayrutasdepruebas[i].tarifa.toFixed(2)    ]);
                        }
                        var tamanioletra = 6;
                        if(this.tamaniointervalo==0){
                          tamanioletra = 5;
                        }
                        pdf.autoTable({
                          head: [['NU','ORIGEN-DESTINO', 'TARIFA EN TEXTO', '' ]],
                          styles: {overflow: 'linebreak', fontSize: tamanioletra  ,overflowColumns: 'linebreak' , cellPadding: this.tamaniointervalo},

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
                        this.arrayrutasdepruebas[i].orden,
                        this.arrayrutasdepruebas[i].ruta.origen +" - "+ this.arrayrutasdepruebas[i].ruta.destino,
                        this.arrayrutasdepruebas[i].descripcion_tarifa,
                        "$"+this.arrayrutasdepruebas[i].tarifa.toFixed(2)    ]);
                      }
                      for(var a = 25; a < restorutas; a++){
                        a_permisoxf2.push([
                          this.arrayrutasdepruebas[a].orden,
                          this.arrayrutasdepruebas[a].ruta.origen +" - "+ this.arrayrutasdepruebas[a].ruta.destino,
                           this.arrayrutasdepruebas[a].descripcion_tarifa,
                          "$"+this.arrayrutasdepruebas[a].tarifa.toFixed(2)    ]);
                        }

                      let pageNumber = pdf.internal.getNumberOfPages();
                      pdf.autoTable({
                        head: [['NU','ORIGEN-DESTINO', 'TARIFA', ' ' ]],
                        body: a_permisoxf,
                        startY: 100,
                        showHead: 'firstPage',
                        styles: {overflow: 'linebreak', fontSize: 5  ,overflowColumns: 'linebreak' , cellPadding: this.tamaniointervalo},
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
                          styles: { overflow: 'linebreak',  fontSize: 5,overflowColumns: 'linebreak', cellPadding: this.tamaniointervalo  },
                          columnStyles: {
                            0: {cellWidth: 6},
                            1: {cellWidth: 40},
                            2: {cellWidth: 35},
                            3: {cellWidth: 10}
                          },
                          margin: { left: 108}
                        });
                      }
                    }
                    pdf.setFontSize(9);
                    pdf.text(25, 264, 'del Servicio Público de Transporte de pasajeros en la modalidad de ' + this.plantillaseleccionada.modalidad.nombre+ '; para el Municipio de ' +this.registroamostrar.municipio.nombre +  ".");
                    pdf.addPage();

                  }
                    /*
                    var delayInMilliseconds = 1000; //1 second
                      setTimeout(function() {
                     }, delayInMilliseconds);
                     if(this.objetoparaqr!=undefined){
                       this.terminarproceso();
                     }
                    */
                    pdf.save(this.registroamostrar.nuc + ".pdf");
           }

   terminarproceso(){
        window.location.href = "/tarifa";
   }



    vistaprevia(){
        this.btngetTarjeton = true;
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

      //this.verificarpago();

    }

    verificarpago(){
      /*
      this.apollo
      .watchQuery({
        query: gql`
        query findLineaCaptura($lineaCaptura:String,$folioPago:String){
            lineaCaptura(lineaCaptura:$lineaCaptura,folioPago:$folioPago){
                      id,linea_captura,folio_pago,total_amparados,fecha_pago,total_pago,estatus,createdAt
                      }
                    },
          `,
        variables: {
           lineaCaptura: this.pago2 ,
           folioPago:  this.pago1 ,
         }
       })
       .valueChanges.subscribe(result => {
         var toastHTML = '<span> <div class="valign-wrapper"><i class="material-icons">error_outline</i>  &nbsp;&nbsp;Datos ya registrados</div></span>';
         M.toast({html: toastHTML});
       }, (error) => {
         this.validarfoliodehojavalorada();
       });

      */
    }


    validarfoliodehojavalorada(){
      /*
      this.apollo
      .watchQuery({
        query: gql`
        query findFolioHojaValorada($folioHojaValorada:String){
              folioHoja(folioHojaValorada:$folioHojaValorada){
                     estatus
                   }
                },
          `,
          variables: {
               folioHojaValorada: this.pago3
             }
           })
           .valueChanges.subscribe(result => {
             this.validarlineascapturas(result.data);
           }, (error) => {
             var divisiones = error.message.split(":", 2);
             var toastHTML = '<span> <div class="valign-wrapper"><i class="material-icons">error_outline</i>  &nbsp;&nbsp;'+divisiones[1]+'</div></span>';
             M.toast({html: toastHTML});
           });
           */
     }


     validarlineascapturas(objreturnlineacaptura: any){
       this.pago2a = this.pago2;
       if(!objreturnlineacaptura.folioHoja.estatus){
         this.pago2a = this.pago2;
         this.btnverficarfecha = true;
         this.formlineadecaptura = false;
         this.formhojavalorada = false;
         (<HTMLInputElement>document.getElementById("pago1")).disabled = true;
         this.btnhojavalorada= false;
       }else{
         var toastHTML = '<span> <div class="valign-wrapper"><i class="material-icons">error_outline</i> &nbsp;&nbsp; No es posible validar pago. Repetido.</div></span>';
         M.toast({html: toastHTML});
         }
       }

    verificarfecha(){
      this.fechaverificada = true;
    }
  //Seleccionar el tipo de busqueda
      mychange(event)
       {
            this.divdebusqueda = true;
            if(this.busquedapornombre==true){
               this.llamarregistros(1);
             }else{
                if(this.busquedapornuc==true){
                  this.llamarregistros(2);
         }
       }
      }

      llamarregistros(decision: any){
         this.apollo
          .watchQuery({
            query: gql`
            query listConcesionarios($entrada:String,$campo:Int){
              concesionarios(entrada:$entrada,campo:$campo){
                id_concesion,nombre,primer_apellido,segundo_apellido,tipo_persona,razon_social,nuc,
                localidad{id,nombre,municipio{id,nombre}},
                municipio{id,nombre},
                amparados,
                modalidad{id,nombre,descripcion,abreviatura},
                vigente
              }
            },
            `,
            variables: {
                    entrada: this.registroabuscar,
                    campo: decision
                  }
          })
          .valueChanges.subscribe(result => {
            this.crearregistros(result.data)
          });
      }

      seleccionarregistro(registro: any){
          this.registroamostrar = registro;
          this.divdebusqueda = false;
          this.apollo.query({query: gql`
           query listPlantillas($localidad:ID,$modalidad:ID){
             plantillas(localidad:$localidad,modalidad:$modalidad){
               id,nombre,descripcion,
               municipio{id,nombre},
               localidad{id,nombre,
               municipio{id,nombre}},
               modalidad{id,nombre,descripcion,abreviatura},
               periodico{id,descripcion,fecha_publicacion,tomo,numero,estatus,createdAt},
               estatus,createdAt
             }
           },
             `, fetchPolicy: 'network-only',
                variables: {
                  localidad: this.registroamostrar.localidad.id,
                  modalidad: this.registroamostrar.modalidad.id
                }})
                .subscribe(result => {
                  this.asignarplantillasseleccionadas(result.data);
              });
      }

      asignarplantillasseleccionadas(plantillas: any){
           this.plantillasencontradas = plantillas.plantillas;
           this.divplantillas = true;
      }

      crearregistros(registrosencontrados: any){
         this.data = registrosencontrados.concesionarios;
      }
      obtenertamañodeseparacion(){
        this.tamaniointervalo = 1;
        for(var i = 0; i < this.arrayrutasdepruebas.length; i++){
          var tamanio = this.arrayrutasdepruebas[i].ruta.origen +" - "+ this.arrayrutasdepruebas[i].ruta.destino;
          if(tamanio.length> 34){
            this.tamaniointervalo = 0.7
            if(tamanio.length> 75){
              this.tamaniointervalo = 0.0
            }
          }
         }
       }

      buscarpornuc(){
        this.busquedapornuc = true;
        this.busquedapornombre = false;
      }

      buscarpornombre(){
        this.busquedapornuc = false;
        this.busquedapornombre = true;
      }

      seleccionarplantilla(rowData: any,event: any){
        if(event.target.tagName == "TD"){
          for(var i = 1; i < event.target.parentNode.parentNode.parentNode.rows.length; i++){
            event.target.parentNode.parentNode.parentNode.rows[i].style.backgroundColor = "#FFF";
          }
          event.target.parentNode.style.backgroundColor = "#f5f5f5";
        }
        if(event.target.tagName == "LABEL"){
          for(var i = 0; i < event.target.parentNode.parentNode.parentNode.parentNode.rows.length; i++){
            event.target.parentNode.parentNode.parentNode.parentNode.rows[i].style.backgroundColor = "#FFF";
          }
          event.target.parentNode.parentNode.parentNode.style.backgroundColor = "#f5f5f5";
        }
        if(event.target.tagName == "DIV"){
          for(var i = 0; i < event.target.parentNode.parentNode.parentNode.parentNode.rows.length-1; i++){
            event.target.parentNode.parentNode.parentNode.rows[i].style.backgroundColor = "#FFF";
          }
          event.target.parentNode.parentNode.style.backgroundColor = "#f5f5f5";
        }
        this.plantillaseleccionada = rowData;
        this.btngetRutas = true;
      }

//Metodo que obtiene las rutas de la plantilla seleccionada
      getRutas(){
        this.divplantillas = false;
        this.apollo.query({query: gql`
          query listRutas4Plantilla($plantilla:ID){
            plantillasRutas(plantilla:$plantilla){
              id,
              ruta{id,origen,destino,estatus,createdAt},
              tarifa,descripcion_tarifa,orden,estatus,createdAt
            }
          },
            `, fetchPolicy: 'network-only',
               variables: {
                  plantilla: this.plantillaseleccionada.id
                }})
              .subscribe(result => {
                this.asignarrutas(result.data);
              });
      }
//Asignacion de rutas
      asignarrutas(rutas: any){
        this.arrayrutasdepruebas = rutas.plantillasRutas;
        this.solicituddatosactive();
        this.obtenertamañodeseparacion()
      }

      buscarOtroConcesionario(){
        this.div2busquedadeconcesionario = true;
        this.divdebusqueda = true;
        this.divplantillas = false;
      }

      busquedaconcesionarioactive(){
        this.div1validacionpago = false;
        this.div2busquedadeconcesionario = true;
        this.div3solicitud = false;
        this.div4descarga = false;
        document.getElementById("divheader1").style.backgroundColor ="#F1F1F1";
        document.getElementById("divheader2").style.backgroundColor ="white";
      }

      solicituddatosactive(){
        this.div1validacionpago = false;
        this.div2busquedadeconcesionario = false;
        this.div3solicitud = true;
        this.div4descarga = false;
        document.getElementById("divheader2").style.backgroundColor ="#F1F1F1";
        document.getElementById("divheader3").style.backgroundColor ="white";
      }

      descargaractive(){
        this.div1validacionpago = false;
        this.div2busquedadeconcesionario = false;
        this.div3solicitud = false;
        this.div4descarga = true;
        document.getElementById("divheader3").style.backgroundColor ="#F1F1F1";
        document.getElementById("divheader4").style.backgroundColor ="white";
      }

}
