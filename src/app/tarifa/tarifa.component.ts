import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {Observable,Observer} from 'rxjs';
import {saveAs} from 'file-saver';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import kjua from "kjua";
import {Ruta} from "../models/vo/ruta";
import {CALIBRI} from "../core/key/calibri";
import {CALIBRIB} from "../core/key/calibrib";
import {ConvertNSService} from '../core/services/convertns.service';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import {Vehiculo} from '../models/vo/vehiculo';
import { Payments } from '../payments/payments';
import {SerieConcesionInput} from '../models/vo/serieConcesionInput';
import {IMAGE} from "../core/key/imglogo";
import {CEROTOLERANCIA} from "../core/key/cerotolerancia";
import { InsertTarjetonGQL } from '../graphql/createcard';
import {IMAGEOAXACAWEB} from "../core/key/imgoaxacagobmx";
import {HojaValoradaInput} from '../models/vo/hojavaloradainput';
import {LineaCapturaInput} from '../models/vo/lineacapturainput';
import {SolicitudInput} from '../models/vo/solicitudinput';
import {User} from "../core/models/user.model";
import {StorageService} from "../core/services/storage.service";
declare var M: any;

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-tarifa', templateUrl: './tarifa.component.html', styleUrls: ['./tarifa.component.css']
})

export class TarifaComponent implements OnInit {
  public paymentsModel: Payments;
  public test: any;
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
  loading:boolean = false;
  arrayrutasdepruebas: any;
  data: Observable<any>;
  registroabuscar: any;
  tamaniointervalo: any;
  busquedapornuc: boolean = false;
  busquedapornombre: boolean = true;
  rutaseleccionada: any;

  plantillasencontradas: any;
  foliosolicitud: any;
  divplantillas: boolean = false;
  btninhabilitar: boolean = false;
  plantillaseleccionada: any;
  btngetRutas: boolean = false;
  btngetTarjeton: boolean = false;


  mostrarformulario2: boolean = false;
  mostrarplantillas: boolean = false;
  formbuscarnumserie: boolean = false;


  mostrarfechapago: boolean = false;
  mostrardespuesdewebservice: boolean = false;
  fechaperiodicooficial: any;

  validarfecha: boolean = false;
  descargaroficio: boolean = false;
  descargarrutas: boolean = false;
  user: any;

  infoqr = "Concesionario";
  nombreconcesionario = "";
  vehiculo: any;
  fechaactual = "";
  tamanio: any;
  objtarjeton: any;

  static getBarcodeData(text: string, size = 900) {
    return kjua({
      render: "canvas", crisp: true, minVersion: 1, ecLevel: "Q", size: size, ratio: undefined, fill: "#333", back: "#fff",
      text, rounded: 10, quiet: 2, mode: "label",  mSize: 5, mPosX: 50, mPosY: 100, label: "", fontname: "sans-serif", fontcolor: "#3F51B5", image: undefined
    });
  }
  constructor(
    private router?: Router,
    private apollo?: Apollo,
    private convertNSService?: ConvertNSService,
    private insertTarjetonGQL?: InsertTarjetonGQL,
    private storageService?: StorageService

  ){}


  ngOnInit() {
    this.user = this.storageService.getCurrentUser();

    $('input#input_text').characterCounter();

    this.paymentsModel = new Payments('3IFBAC017');
    const meses = [
          "Enero", "Febrero", "Marzo",
          "Abril", "Mayo", "Junio", "Julio",
          "Agosto", "Septiembre", "Octubre",
          "Noviembre", "Diciembre"
        ];
    const date = new Date()
    const dia = date.getDate()
    const mes = date.getMonth()
    const ano = date.getFullYear()
    this.fechaactual = `${dia} de ${meses[mes]} del ${ano}`;
    this.datenow = new Date();
    this.minDate = new Date(2010);
    this.arrayrutasdepruebas = [];

    document.getElementById("divheader1").style.backgroundColor ="white";

    this.vehiculo = new Vehiculo();
    this.vehiculo.serie = "";
    this.es = {
          firstDayOfWeek: 1,
          dayNames: [ "Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado" ],
          dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
          dayNamesMin: [ "D","L","M","X","J","V","S" ],
          monthNames: [ "Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre" ],
          monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
          today: 'Hoy',
          clear: 'Borrar'
      }
      $(document).ready(function(){
        $('.modal').modal({dismissible: false});
      });
    }

 getStatusComponentPayment($event){
   this.statusComponentPayment = $event;
 }


 generatepdfreverse(){

   var para='JSPDF is the HTML5 client-side solution for generating PDFs. This is perfect for event tickets, reports, and certificates. Just include the JSPDF library in your <head>, generate your PDF using the many built-in functions';
   let calibri_url = CALIBRI.CALIBRI;
   let calibrib_url = CALIBRIB.CALIBRIB;
   var pdf = new jsPDF('p', 'mm', [612,   792]);
   pdf.addFileToVFS("Calibri.ttf",calibri_url);
   pdf.addFileToVFS("Calibrib.ttf",calibrib_url);
   pdf.setFontSize(44);
   pdf.text('TARJETÓN DE TARIFA' , 30, 200, null, 90);
   pdf.setFontSize(32);
   pdf.addFont("Calibri.ttf", "Calibri", "normal");
   pdf.setFont("Calibri");

   var municipio = 'MUNICIPIO: OCOTLAN DE MORELOS OAXACA - SAN PEDRO APOSTOL BLA BLA BLA BLA BLA BLA BLA';
   var lines = pdf.splitTextToSize(municipio, 240);

   pdf.text(lines, 110, 260, null, 90);


   var ruta = 'RUTA: OCOTLAN DE MORELOS OAXACA - SAN PEDRO APOSTOL BLA BLA BLA BLA BLA BLA BLA ';

   var lines = pdf.splitTextToSize(ruta, 250);

   pdf.text(lines , 130, 260, null, 90);

   pdf.setFontSize(24);
   pdf.addFont("Calibri.ttf", "Calibri", "normal");
   pdf.setFont("Calibri");
   var tarifa = '(CIENTO QUINCE PESOS 00/100 M.N). BLA BLA BLA BLA BLA BLA';

   var lines = pdf.splitTextToSize(tarifa, 150);

   pdf.text(lines, 185, 235, null, 90);

   pdf.save( "REVERSE.pdf");
 }


 creaciondetarjeton(){

   this.loading = true;
   let solicitudinput = new SolicitudInput();
   solicitudinput.folio = this.foliosolicitud;
   solicitudinput.fecha = this.date1;

   let lineaCaptura = new LineaCapturaInput();
   lineaCaptura.lineaCaptura = this.paymentsModel.capture_line;
   lineaCaptura.folioPago = this.paymentsModel.folio;
   lineaCaptura.totalAmparados = 1;
   //lineaCaptura.fechaPago = new Date();
   lineaCaptura.fechaPago =  this.paymentsModel.payment_date;
   lineaCaptura.totalPago =  Number(this.paymentsModel.total_payment);

   let hojaValorada = new HojaValoradaInput();
   hojaValorada.folio = this.pago3;
   this.insertTarjetonGQL
     .mutate({
       concesion: this.registroamostrar.id,
       plantilla: this.plantillaseleccionada.id,
       solicitud: solicitudinput,
       lineaCaptura: lineaCaptura,
       vehiculo: this.vehiculo.id,
       hojaValorada: hojaValorada,
       token: this.storageService.getCurrentToken()
     })
     .subscribe(({ data }) => {
       this.asignaciontarjeton(data);
    }, (error) => {
     var divisiones = error.message.split(":", 2);
     M.toast({html: divisiones[1]})
   });
 }


 asignaciontarjeton(tarjeton : any){
   this.objtarjeton = tarjeton.crearTarjeton;
   this.registroamostrar = tarjeton.crearTarjeton.concesion;
   this.plantillaseleccionada = tarjeton.crearTarjeton.plantilla;


   this.infoqr = " NUC: " + this.registroamostrar.nuc +" \r\n Serie:" + tarjeton.crearTarjeton.vehiculo.serie +  "\r\nSitio: " + this.registroamostrar.sitio.nombre;


   this.generate();
 }

 //Generacion del pdf con las rutas correspondientes
 generate(){
   let calibri_url = CALIBRI.CALIBRI;
   let calibrib_url = CALIBRIB.CALIBRIB;
   var pdf = new jsPDF('p', 'mm', [612,   792]);
   pdf.addFileToVFS("Calibri.ttf",calibri_url);
   pdf.addFileToVFS("Calibrib.ttf",calibrib_url);
    this.generaformatoconmakepdf();
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
   pdf.setFontSize(11);

   pdf.text(74, 25, 'DIRECCIÓN DE OPERACIÓN DEL TRANSPORTE PUBLICO');
   var img = new Image();
   img.src = './assets/SEMOVI2.png'
   pdf.addFont("Calibri.ttf", "Calibri", "normal");
   pdf.setFont("Calibri");
   this.qrmensagge = this.infoqr + " \r\n Folio Hoja Valorada: " +  this.pago3;
   const barcodeData = TarifaComponent.getBarcodeData(this.qrmensagge);
   pdf.setDrawColor(0);
   pdf.setFillColor(255,0,0);
   pdf.rect(6, 44, 198, 222 );
   pdf.addImage(img, 'png', 125, 44, 76, 18);
   pdf.setFontSize(27);
   pdf.setDrawColor(0);
   pdf.setFillColor(214,214,214);
   pdf.rect(11, 62, 186, 12,'F');
   pdf.setDrawColor(0,0,0);
   pdf.addFont("Calibrib.ttf", "Calibrib", "normal");
   pdf.setFont("Calibrib");
   pdf.addImage(barcodeData, "JPG", 10, 45,31, 31);
   pdf.text(50, 71, 'TARJETÓN');
   pdf.setFontSize(9);


   pdf.addFont("Calibrib.ttf", "Calibrib", "normal");
   pdf.setFont("Calibrib");
   let concesionarionombre = "";
   if(this.registroamostrar.concesionario.tipoPersona == "F"){
     concesionarionombre = 'CONCESIONARIO: ' + this.registroamostrar.concesionario.nombre + " " + this.registroamostrar.concesionario.primerApellido + " " + this.registroamostrar.concesionario.segundoApellido ;
   }else{
     concesionarionombre = 'CONCESIONARIO: ' + this.registroamostrar.concesionario.razonSocial ;
   }
   pdf.text(100, 67, concesionarionombre);
   pdf.text(100, 71, 'NUC: ' + this.registroamostrar.nuc);
   pdf.setFontSize(8);

   pdf.addFont("Calibri.ttf", "Calibri", "normal");
   pdf.setFont("Calibri");
   pdf.text('La  Secretaría  de  Movilidad  del  Poder  Ejecutivo  del  estado  de  Oaxaca , con  fundamento  en  lo  dispuesto   por  los  artículos  2  párrafo  tercero  y   82  de  la   Constitución   Política   del   Estado  Libre  y  Soberado  de  Oaxaca;  1 ,  27   fracción  VII  y  40   de   la   Ley  Orgánica   del   Poder   Ejecutivo  del  Estado de  Oaxaca, articulo  156  y  158  de  la  Ley  del  Movilidad  del  Estado de Oaxaca; en  relación  con  los artículos 82 fracción II, 270, 271, 273 y 274 del Reglamento de la Ley de Movilidad para el Estado de Oaxaca ;  y  de  conformidad  con el  Acuerdo  Administrativo  de  fecha  17  de  diciembre  del  2018,  publicado  en  el  Periódico Oficial de Gobierno del Estado de Oaxaca el 19 de  enero del 2019 y en  el diario Enlace de la costa, el  día  15 de febrero de 2019 , queda autorizada   la siguiente:', 14,78, {maxWidth: 182, align: "justify"});
   pdf.setFontSize(22);

   pdf.addFont("Calibrib.ttf", "Calibrib", "normal");
   pdf.setFont("Calibrib");

   pdf.text(92, 97, 'TARIFA');

   pdf.addFont("Calibri.ttf", "Calibri", "normal");
   pdf.setFont("Calibri");
   if(restorutas<=25){
     for(var i = 0; i < restorutas; i++){
       this.arrayrutasdepruebas[i]
       a_permisoxf.push([
         this.arrayrutasdepruebas[i].orden,
         this.arrayrutasdepruebas[i].ruta.origen +" - "+ this.arrayrutasdepruebas[i].ruta.destino,
         this.arrayrutasdepruebas[i].descripcionTarifa,
         "$"+this.arrayrutasdepruebas[i].tarifa.toFixed(2)]);
       }
       pdf.autoTable({
         head: [['No','ORIGEN-DESTINO', 'TARIFA EN TEXTO', '' ]],
         styles: {overflow: 'linebreak', fontSize: 5.7  ,overflowColumns: 'linebreak' , cellPadding: {top: 1.5, right: 2, bottom: 1.5, left: 1} },
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
           this.arrayrutasdepruebas[i].descripcionTarifa,
           "$"+this.arrayrutasdepruebas[i].tarifa.toFixed(2)]);
         }
       for(var a = 25; a < restorutas; a++){
         a_permisoxf2.push([
           this.arrayrutasdepruebas[a].orden,
           this.arrayrutasdepruebas[a].ruta.origen +" - "+ this.arrayrutasdepruebas[a].ruta.destino,
           this.arrayrutasdepruebas[a].descripcionTarifa,
           "$"+this.arrayrutasdepruebas[a].tarifa.toFixed(2)]);
         }
          let pageNumber = pdf.internal.getNumberOfPages();
         pdf.autoTable({
           head: [['No','ORIGEN-DESTINO', 'TARIFA', ' ' ]],
           body: a_permisoxf,
           startY: 100,
           showHead: 'firstPage',
           styles: {overflow: 'linebreak', fontSize: this.tamanio  ,overflowColumns: 'linebreak' , cellPadding: {top: this.tamaniointervalo, right: 1.5, bottom: this.tamaniointervalo,  left: 1} },
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
             styles: { overflow: 'linebreak',  fontSize: this.tamanio,overflowColumns: 'linebreak', cellPadding: {top: this.tamaniointervalo, right: 1.5, bottom: this.tamaniointervalo, left: 1}  },
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
       pdf.addFont("Calibrib.ttf", "Calibrib", "normal");
       pdf.setFont("Calibrib");


       pdf.text(15, 260, 'del Servicio Público de Transporte de pasajeros en la modalidad de '.toUpperCase() + this.plantillaseleccionada.modalidad.nombre+ ';' );
       pdf.text(15, 263, 'para el Municipio de '.toUpperCase() +this.registroamostrar.concesionario.localidad.municipio.nombre +  ".");


       pdf.addPage();


       pdf.addFont("Calibrib.ttf", "Calibrib", "normal");
       pdf.setFont("Calibrib");
       pdf.setFontSize(44);
       pdf.text('TARJETÓN DE TARIFA' , 30, 200, null, 90);
       pdf.setFontSize(24);
       pdf.addFont("Calibri.ttf", "Calibri", "normal");
       pdf.setFont("Calibri");
       var lines = pdf.splitTextToSize(concesionarionombre, 650);
       pdf.text(lines, 50, 260, null, 90);
       pdf.text('NUC:' + this.registroamostrar.nuc, 70, 260, null, 90);
       pdf.text('MODALIDAD:' + this.plantillaseleccionada.modalidad.nombre +  ".", 90, 260, null, 90);
       var municipio = 'MUNICIPIO: ' + this.registroamostrar.concesionario.localidad.municipio.nombre;
       var lines = pdf.splitTextToSize(municipio, 240);

       pdf.text(lines, 110, 260, null, 90);
       var ruta = 'RUTA: ' + this.rutaseleccionada.ruta.origen +  " - " + this.rutaseleccionada.ruta.destino;

       var lines = pdf.splitTextToSize(ruta, 250);

       pdf.text(lines , 130, 260, null, 90);
       pdf.setFontSize(90);
       pdf.addFont("Calibrib.ttf", "Calibrib", "normal");
       pdf.setFont("Calibrib");
       pdf.text('$'+this.rutaseleccionada.tarifa.toFixed(2), 170, 235, null, 90);


       pdf.setFontSize(24);
       pdf.addFont("Calibri.ttf", "Calibri", "normal");
       pdf.setFont("Calibri");
       //pdf.text(concesionarionombre, 50, 260, null, 90);

       var tarifa = '(' + this.rutaseleccionada.descripcionTarifa +  ").";

       var lines = pdf.splitTextToSize(tarifa, 150);

       pdf.text(lines, 185, 235, null, 90);

           /*
           var delayInMilliseconds = 1000; //1 second
             setTimeout(function() {
            }, delayInMilliseconds);
            if(this.objetoparaqr!=undefined){
              this.terminarproceso();
            }
           */
       pdf.save(this.registroamostrar.nuc + ".pdf");

       this.descargarrutas=true;


          this.teminarproceso();

      }


      teminarproceso(){
        var delayInMilliseconds = 15000; //1 second
          setTimeout(function() {
            window.location.href = "/tarifa";

         }, delayInMilliseconds);


      }

         generaformatoconmakepdf(){
             pdfMake.fonts = {
             Roboto: {
                            normal: 'Roboto-Regular.ttf',
                            bold: 'Roboto-Medium.ttf',
                            italics: 'Roboto-Italic.ttf',
                            bolditalics: 'Roboto-MediumItalic.ttf'
                    }
               }
                 var dd = {
                   pageSize: 'LETTER',
                   content: [
                     { columns: [
                         { width: 10,text: ''},
                         { qr: this.infoqr ,fit: 75},
                         { width: 30, text: ''
                         },
                         { image: 'data:image/jpeg;base64,'+IMAGE.IMAGE_B,width: 240,height: 62}
                        ]
                     },
                     { columns: [
                         { width: 105,text: ''},
                         { width: '*', text: '"2019, AÑO POR LA ERRADICACIÓN DE LA VIOLENCIA CONTRA LA MUJER"', fontSize: 9, bold: true },
                         { width: 50, text: ''}
                       ]
                     },

                     { columns: [
                         { width: 282, text: ''},
                         { width: 38, text: 'ORIGEN:', fontSize: 9,bold: true },
                         { width: 200, text: 'DEPTO. CONTROL DE TRANSPORTE', fontSize: 9}
                       ]
                     },
                     { columns: [
                         { width: 282, text: ''},
                         { width: 39, text: 'OFICIO:', fontSize: 9,bold: true },
                         { width: 230, text: 'SEMOVI/SRCT/DOCTP/CT/1987/2018', fontSize: 9 }
                       ]
                     },
                     { columns: [
                         { width: 280, text: '' },
                         { width: 41, text: 'ASUNTO:', fontSize: 9,bold: true },
                         { width: 200, text: 'AUTORIZACIÓN DE TARIFA', fontSize: 9}
                       ]
                     },
                     { columns: [
                         { width: 270, text: '' },
                         { width: 240, text: 'San Antonio de la Cal, Oax., ' +this.fechaactual, fontSize: 8, margin: [0, 10] }
                       ], columnGap: 10
                     },

                     { columns: [
                         { width: 10, text: '' },
                         { alignment: 'justify', width: 250, text: this.nombreconcesionario + ' CONCESIONARIO DEL SERVICIO PÚBLICO DE TRANSPORTE EN LA MODALIDAD DE ' + this.plantillaseleccionada.modalidad.nombre+', EN LA LOCALIDAD DE '+ this.registroamostrar.concesionario.localidad.nombre +', MUNICIPIO DE '+this.registroamostrar.concesionario.localidad.municipio.nombre + ".", fontSize: 10, bold: true },
                        ]
                     },
                     { columns: [
                         { width: 10, text: '' },
                         { alignment: 'justify', width: 80, text: 'P R E S E N T E.', fontSize: 10, bold: true }
                       ]
                     },
                     { columns: [
                         { width: 10, text: '' },
                         { alignment: 'justify', width: 460,
                           text: 'En atención a las diversas solicitudes presentadas ante esta Secretaría por prestadores del servicio público de transporte, en su modalidad de ' + this.plantillaseleccionada.modalidad.nombre+' en esta localidad, con fundamento en los artículos 27 fracción VII, 40 fracción XXXIX de la Ley Orgánica del Poder Ejecutivo del Estado de Oaxaca: 1 , 2, 13, 35 fracción II, 37 fracción VII, XXI, XL, 85, 156, 158, 159, 206 fracción II, 207 fracción IX de la ley de Movilidad, 76, 130, 271, 272 y 274 del Reglamento de la Ley de Movilidad para el Estado de Oaxaca y Artículo 31 fracción III y 32 fracción V, del Reglamento Interno de la Secretaria de Vialidad y Transporte del Estado de Oaxaca y con base en las conclusiones del estudio técnico y costos practicado por la Subsecretaria de Planeación y Normatividad para la actualización de las tarifas del servicio público de transporte de pasajeros, considerando la estimación de la demanda del servicio, el inventario de vehículos que prestan el servicio en dicha modalidad y las cotizaciones de costos de refacciones, combustibles y mantenimiento, relacionados directamente con el costo de operación de los vehículos, por instrucciones del encargado de Despacho de la Secretaría de Movilidad del Gobierno del Estado de Oaxaca y en términos del Acuerdo por el que el Secretario de Movilidad delega facultades al Titular de la Dirección de Operación del Transporte Público de la misma Dependencia, publicado en el Periódico Oficial del Gobierno del Estado de Oaxaca el día 6 de Julio del año 2013, la Dirección de Operación del Transporte Público a través del Departamento de Control de Transporte, le comunica que se le autoriza como tarifa para la prestación del servicio público de transporte de pasajeros en la Modalidad de ' + this.plantillaseleccionada.modalidad.nombre+', en la Localidad de ' + this.plantillaseleccionada.localidad.nombre+', Municipio de ' + this.plantillaseleccionada.localidad.municipio.nombre+', Oax., una cantidad que no deberá ser mayor a:', fontSize: 8, margin: [0, 10] }
                       ]
                     },
                     { columns: [
                         { width: 190, text: '' },
                         { alignment: 'justify', width: 155, text: 'TARJETÓN ANEXO', fontSize: 10, margin: [0, 20], bold: true }
                       ]
                     },
                     { columns: [
                         { width: 10, text: '' },
                         { alignment: 'justify', width: 460, text: 'No omito manifestarles que deberán prestar el servicio en los términos marcados en sus concesiones, que la tarifa entrará en vigor una vez cumplidas las formalidades que indica la Ley de Transporte del Estado de Oaxaca, su Reglamento y demás legislación en vigor y permanecerá vigente hasta nueva determinación por parte de Secretaria de Movilidad, quedando el concesionario sujeto a la normatividad aplicable', fontSize: 8 }
                       ]
                     },
                     { columns: [
                         { width: 10, text: '' },
                         { alignment: 'justify', width: 460, text: 'Sin otro particular; le envió un cordial saludo.', fontSize: 8, margin: [0, 20] }
                       ]
                     },
                     { columns: [
                         { width: 10, text: '' },
                         { alignment: 'justify', width: 200, text: 'ATENTAMENTE', fontSize: 8,bold: true }
                       ]
                     },
                     { columns: [
                         { width: 10, text: '' },
                         { alignment: 'justify', width: 400, text: 'SUFRAGIO EFECTIVO, NO REELECCIÓN', fontSize: 8,bold: true }
                       ]
                     },
                     { columns: [
                         { width: 10, text: '' },
                         { alignment: 'justify', width: 300, text: '"EL RESPETO AL DERECHO AJENO, ES LA PAZ"', fontSize: 8,bold: true },
                         { alignment: 'justify', width: 200, text: 'REGISTRÓ', fontSize: 8,bold: true  }
                       ]
                     },
                     {
                       columns: [
                         { width: 10, text: '', margin: [0, 8] }
                       ]
                     },
                     {
                       columns: [
                         { width: 10, text: '' },
                         { alignment: 'justify', width: 300, text: 'ING. FELIPE REYNA ROMERO', fontSize: 8,bold: true },
                         { alignment: 'justify', width: 400, text: 'ARQ. MARINO HERNÁNDEZ LÓPEZ', fontSize: 8,bold: true }
                       ]
                     },
                     {
                       columns: [
                         { width: 10, text: '' },
                         { alignment: 'justify', width: 300, text: 'DIRECTOR DE OPERACIÓN DEL TRANSPORTE PÚBLICO', fontSize: 8,bold: true },
                         { alignment: 'justify', width: 400, text: 'JEFE DE DEPTO. CONTROL DE TRANSPORTE', fontSize: 8,bold: true }
                       ]
                     },
                     {
                       columns: [
                         { width: 10, text: '', margin: [0, 8] }
                       ]
                     },
                     {
                       columns: [
                         { width: 10, text: '' },
                         { alignment: 'justify', width: 300, text: 'C.c.p.:', fontSize: 5  }
                       ]
                     },
                     {
                       columns: [
                         { width: 10, text: '' },
                         { alignment: 'justify', width: 300, text: '- Lic. Mariana Erandi Nassar Piñeyro.- Secretaria de Movilidad. Para su conocimiento.', fontSize: 5  }
                       ]
                     }
                     ,
                     {
                       columns: [
                         { width: 10, text: '' },
                         { alignment: 'justify', width: 300, text: '- Lic. Mario Alberto Guzmán Jaime.- Subsecretario de Regulación y Control de Transporte. Mismo fin.', fontSize: 5  }
                       ]
                     },
                     {
                       columns: [
                         { width: 10, text: '' },
                         { alignment: 'justify', width: 300, text: '- Lic. Alejandro Villanueva López.- Subsecretario de Planeación y Normatividad. Mismo fin.', fontSize: 5  }
                       ]
                     },
                     {
                       columns: [
                         { width: 10, text: '' },
                         { alignment: 'justify', width: 300, text: '-C.P. Jóse Guzmán Santos.- Director de la Policía Vial Estatal. Mismo fin.', fontSize: 5  }
                       ]
                     },
                     {
                       columns: [
                         { width: 10, text: '' },
                         { alignment: 'justify', width: 300, text: '-Módulo SEMOVI  Región. '+this.registroamostrar.concesionario.localidad.municipio.distrito.region.nombre+'. Mismo fin', fontSize: 5  }
                       ]
                     },
                     {
                       columns: [
                         { width: 10, text: '' },
                         { alignment: 'justify', width: 300, text: '-Autoridad Municipal . ' + this.plantillaseleccionada.localidad.municipio.nombre + ' Mismo fin', fontSize: 5  }
                       ]
                     }
                     ,
                     {
                       columns: [
                         { width: 170, text: '' },
                         { alignment: 'right', width: 300, text: 'Av. Carlos Gracida No. 9 La Experimental San Antonio', fontSize: 6  }
                       ]
                     }
                     ,
                     {
                       columns: [
                         { width: 170, text: '' },
                         { alignment: 'right', width: 300, text: 'de la Cal, Oaxaca - C.P. 71236', fontSize: 6  }
                       ]
                     },
                     {
                       columns: [
                         { width: 170, text: '' },
                         { alignment: 'right', width: 300, text: 'Tel. (951) 5016691 Ext. 1622', fontSize: 6  }
                       ]
                     },
                     {
                       columns: [
                         { width: 15, text: '' },
                         {
                           image:  'data:image/jpeg;base64,'+CEROTOLERANCIA.IMAGE,width: 40,height: 52,
                           absolutePosition: {x: 50, y: 685}
                         }
                       ]
                     },
                     {
                       image:  'data:image/jpeg;base64,'+IMAGEOAXACAWEB.IMAGE_W,width: 44,height: 460,
                       absolutePosition: {x: 540, y: 200}
                     }
                    ]
                 };
               pdfMake.createPdf(dd).download('OFC'+this.registroamostrar.nuc + '.pdf');
               this.descargaroficio = true;

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
      M.toast({html: 'Formato del folio de pago correcto.'});
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
      M.toast({html: 'Formato de la linea de captura correcto.'});
      this.formhojavalorada = true;
      document.getElementById("pago2advertencia").style.color = "#000000";
    }else{
      this.formhojavalorada = false;
      document.getElementById("pago2advertencia").style.color = "red";
    }
  }
  tercerproceso(){
    this.div1validacionpago = false;
    this.div2busquedadeconcesionario = true;
    this.div3solicitud = false;
    this.div4descarga = false;
    document.getElementById("divheader1").style.backgroundColor ="#F1F1F1";
    document.getElementById("divheader2").style.backgroundColor ="white";
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
    /*
    this.pago2a = this.pago2;
    this.btnverficarfecha = true;
    this.formlineadecaptura = false;
    this.formhojavalorada = false;
    (<HTMLInputElement>document.getElementById("pago1")).disabled = true;
    this.btnhojavalorada= false;
    */
    this.validarfoliodehojavalorada();

    //this.verificarpago();
  }

  verificarpago(){

    this.apollo
    .watchQuery({
      query: gql`
      query findLineaCaptura($lineaCaptura:String,$folioPago:String){
        lineaCaptura(lineaCaptura:$lineaCaptura,folioPago:$folioPago){
          id,
          lineaCaptura,
          folioPago,
          totalAmparados,
          fechaPago,
          totalPago
        }
      },
        `,
      variables: {
         lineaCaptura: this.paymentsModel.capture_line ,
         folioPago:  this.paymentsModel.folio ,
       }
     })
     .valueChanges.subscribe(result => {
       var toastHTML = '<span> <div class="valign-wrapper"><i class="material-icons">error_outline</i>  &nbsp;&nbsp;Datos ya registrados</div></span>';
       M.toast({html: toastHTML});
     }, (error) => {
       this.mostrardespuesdewebservice = true;

       $(document).ready(function() {
         $('input#input_text').characterCounter();
       });
     });
  }


  validarfoliodehojavalorada(){
     this.apollo
    .watchQuery({
      query: gql`
      query findHojaValorada($folio:String){
        hojaValorada(folio:$folio){
          id,
          folio,
          estatus,
          createdAt
        }
      },
      `,
      variables: {
        folio: this.pago3
      }
    })
    .valueChanges.subscribe(result => {
      var toastHTML = '<span> <div class="valign-wrapper"><i class="material-icons">error_outline</i>  &nbsp;&nbsp;Datos ya registrados</div></span>';
      M.toast({html: toastHTML});
    }, (error) => {
      if(this.validarfecha){
        this.div1validacionpago = false;
        this.div2busquedadeconcesionario = true;
        this.div3solicitud = false;
        this.div4descarga = false;
        document.getElementById("divheader1").style.backgroundColor ="#F1F1F1";
        document.getElementById("divheader2").style.backgroundColor ="white";
      }

    });

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
     this.validarfecha = true;
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
       this.apollo.use('backsicac').watchQuery({
          query: gql`
          query listConcesiones($entrada: String, $opcion: Int, $top: Int) {
concesiones(entrada: $entrada, opcion: $opcion, top: $top) {
  id
  unidadesAmparadas
  modalidad {
    id
    nombre
  }
  sitio {
    id
    nombre
  }
  nuc
  estatus
  concesionario {
    tipoPersona
    nombre
    primerApellido
    segundoApellido
    razonSocial
    localidad {
      id
      nombre
      municipio {
        id
        nombre
      }
    }
  }
  condiciones{
    vigente
    bloqueado
  }
}
},
          `,
          variables: {
                  entrada: this.registroabuscar,
                  opcion: decision,
                  top: 10
                }
        })
        .valueChanges.subscribe(result => {
          this.crearregistros(result.data)
        });
    }

    seleccionarregistro(registro: any){
       if(registro.condiciones.bloqueado==false){
        if(registro.condiciones.vigente==true){
           if(registro.nuc != '/'){
            this.registroamostrar = registro;
            this.divdebusqueda = false;
            this.apollo.query({query: gql`
              query listPlantillas($localidad: ID, $modalidad: ID) {
                plantillas(localidad: $localidad, modalidad: $modalidad) {
                  id,
                  nombre,
                  descripcion,
                  localidad {
                    id,
                    nombre,
                    municipio {
                      id,
                      nombre
                    }
                  },
                  modalidad {
                    id,
                    nombre,
                    descripcion,
                    estatus,
                    abreviatura
                  },
                  periodico {
                    id,
                    descripcion,
                    fechaPublicacion,
          tomo,
          numero,
          estatus,
          createdAt
        },
        estatus,
        createdAt
      }
    },
               `, fetchPolicy: 'network-only',
                  variables: {
                    localidad: this.registroamostrar.concesionario.localidad.id,
                    modalidad: this.registroamostrar.modalidad.id
                  }})
                  .subscribe(result => {
                    this.asignarplantillasseleccionadas(result.data);
                });
          }else{
            var toastHTML = '<span> <div class="valign-wrapper"><i class="material-icons">error_outline</i>  &nbsp;&nbsp;Concesión no tiene NUC</div></span>';
            M.toast({html: toastHTML});
          }


      }else{

        var toastHTML = '<span> <div class="valign-wrapper"><i class="material-icons">error_outline</i>  &nbsp;&nbsp;Concesión no vigente</div></span>';
        M.toast({html: toastHTML});
      }

    }else{


      var toastHTML = '<span> <div class="valign-wrapper"><i class="material-icons">error_outline</i>  &nbsp;&nbsp;Concesión bloqueado</div></span>';
      M.toast({html: toastHTML});
    }

    }

    asignarplantillasseleccionadas(plantillas: any){
         this.plantillasencontradas = plantillas.plantillas;
         this.divplantillas = true;
    }

    crearregistros(registrosencontrados: any){
       this.data = registrosencontrados.concesiones;
    }

    obtenertamañodeseparacion(){
      this.tamaniointervalo = 1;
      var contador1renglon = 0;
      var contador2renglon = 0;
      var contador3renglon = 0
      var contadorsegundatabla1renglon = 0;
      var contadorsegundatabla2renglon = 0;
      var contadorsegundatabla3renglon = 0
      for(var i = 0; i < this.arrayrutasdepruebas.length; i++){
        var tamanio = this.arrayrutasdepruebas[i].ruta.origen +" - "+ this.arrayrutasdepruebas[i].ruta.destino;
        if(tamanio.length> 33){
          this.tamaniointervalo = 0.7
           if(tamanio.length> 60){
              this.tamaniointervalo = 0.0;
            }
         }
       }
       if((this.arrayrutasdepruebas.length+1) < 25){
          for(var i = 0; i < this.arrayrutasdepruebas.length; i++){
            var tamanio = this.arrayrutasdepruebas[i].ruta.origen +" - "+ this.arrayrutasdepruebas[i].ruta.destino;
            var tamanio2 = this.arrayrutasdepruebas[i].descripcionTarifa;
            if(tamanio.length< 33 || tamanio2.length< 33){
              contador1renglon = contador1renglon  + 1 ;
            }
            if(tamanio.length> 33 || tamanio2.length> 33){
               contador2renglon = contador2renglon + 1;
              if(tamanio.length> 60 || tamanio2.length> 60){
                 contador3renglon = contador3renglon + 1
              }
            }
          }
        }else{
          for(var i = 0; i < 25; i++){
            var tamanio = this.arrayrutasdepruebas[i].ruta.origen +" - "+ this.arrayrutasdepruebas[i].ruta.destino;
            var tamanio2 = this.arrayrutasdepruebas[i].descripcionTarifa;
            if(tamanio.length<= 36 || tamanio2.length<= 36){
              contador1renglon = contador1renglon  + 1 ;
            }
            if(tamanio.length> 33 || tamanio2.length> 33){
               contador2renglon = contador2renglon + 1;
              if(tamanio.length > 60 || tamanio2.length> 60){
                contador2renglon = contador2renglon - 1;
                 contador3renglon = contador3renglon + 1;
              }
            }
          }
          for(var i = 25; i < (this.arrayrutasdepruebas.length); i++){
            var tamanio = this.arrayrutasdepruebas[i].ruta.origen +" - "+ this.arrayrutasdepruebas[i].ruta.destino;
            var tamanio2 = this.arrayrutasdepruebas[i].descripcionTarifa;
            if(tamanio.length<= 36 || tamanio2.length<= 36){
              contadorsegundatabla1renglon = contadorsegundatabla1renglon  + 1 ;
            }
            if(tamanio.length> 36 || tamanio2.length> 36 ){
               contadorsegundatabla2renglon = contadorsegundatabla2renglon + 1;
              if(tamanio.length>= 60 || tamanio2.length>= 60){
                contadorsegundatabla3renglon = contadorsegundatabla3renglon - 1;
                contadorsegundatabla3renglon = contadorsegundatabla3renglon + 1
              }
            }
          }
        }

       this.tamanio = 5.5;
       if(contador2renglon > 10 || contadorsegundatabla2renglon > 10){
         this.tamanio = 5;
         }

       if(contador3renglon > 10 || contadorsegundatabla3renglon > 10){
         this.tamanio = 4.7;
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
      const meses = [
            "Enero", "Febrero", "Marzo",
            "Abril", "Mayo", "Junio", "Julio",
            "Agosto", "Septiembre", "Octubre",
            "Noviembre", "Diciembre"
          ];
      const date = new Date(this.plantillaseleccionada.periodico.fechaPublicacion);
      const dia = date.getDate()
      const mes = date.getMonth()
      const ano = date.getFullYear()
     this.fechaperiodicooficial = `${dia} de ${meses[mes]} del ${ano}`;
      this.btngetRutas = true;
      var toastHTML = '<span> <div class="valign-wrapper"> &nbsp;&nbsp; Se ha seleccionado '+this.plantillaseleccionada.nombre+'</div></span>';
      M.toast({html: toastHTML});
    }
//Metodo que obtiene las rutas de la plantilla seleccionada
    getRutas(){
      this.loading = true;
      this.divplantillas = false;
      this.apollo.query({query: gql`
        query listRutas4Plantilla($plantilla:ID){
          plantillasRutas(plantilla:$plantilla){
            id,
            ruta{id,origen,destino,estatus,createdAt},
            tarifa,descripcionTarifa,orden,estatus,createdAt
           }
         },
          `, fetchPolicy: 'network-only',
             variables: {
                plantilla: this.plantillaseleccionada.id
              }})
            .subscribe(result => {
              this.loading = false;
              this.asignarrutas(result.data);
            });
    }
//Asignacion de rutas
    asignarrutas(rutas: any){
      this.arrayrutasdepruebas = rutas.plantillasRutas;
      this.solicituddatosactive();
      this.obtenertamañodeseparacion();
    }

    buscarOtroConcesionario(){
      this.div2busquedadeconcesionario = true;
      this.registroamostrar = undefined;
      this.formbuscarnumserie = false;
      this.divdebusqueda = true;
      this.divplantillas = false;
      this.vehiculo.serie = "";
      this.mostrarformulario2 = false;
      this.mostrarplantillas = false;
      this.btngetRutas=false;
    }

    busquedaconcesionarioactive(){
      this.validarfoliodehojavalorada();
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

    buscarnumserie(){
      let inputconcesion = new SerieConcesionInput();
      inputconcesion.concesion = this.registroamostrar.id;
      inputconcesion.serie = this.vehiculo.serie.toUpperCase();
      this.apollo.use('backsicac').watchQuery({
         query: gql`
         query findVehiculoActivo($concesion:ID,$serie:String) {
  vehiculoActivo(concesion:$concesion,serie:$serie) {
    id
    anioModelo
    motor
    serie
    puertas
    numeroEconomico
    estatus
    marca{
      id
      nombre
    }
    tipo{
      id
      nombre
    }
  }
},
         `,
         variables: {
                 concesion: this.registroamostrar.id,
                 serie: this.vehiculo.serie.toUpperCase()
               }
       })
       .valueChanges.subscribe(result => {
         this.formbuscarnumserie = true;
         this.mostrarformulario2 = true;
         this.mostrarplantillas = true;
         this.infoqr = " NUC: " + this.registroamostrar.nuc +",Serie:" + this.vehiculo.serie +  ",Sitio: " + this.registroamostrar.sitio.nombre;
          if(this.registroamostrar.concesionario.tipoPersona == "F"){
           this.nombreconcesionario = this.registroamostrar.concesionario.nombre + " " + this.registroamostrar.concesionario.primerApellido + " " + this.registroamostrar.concesionario.segundoApellido ;
         }else{
           this.nombreconcesionario = this.registroamostrar.concesionario.razonSocial ;
         }
         this.asignarvehiculo(result.data);
       }, (error) => {
         var divisiones = error.message.split(":", 2);
         var toastHTML = '<span> <div class="valign-wrapper"><i class="material-icons">error_outline</i>  &nbsp;&nbsp;'+divisiones[1]+'</div></span>';
         M.toast({html: toastHTML});
       });
     }


    asignarvehiculo(vehiculo: any){
      this.vehiculo = vehiculo.vehiculoActivo;
    }

    public check($event){
       if($event.error){
        if($event.error.status > 500 ||  $event.error.status == 404){
          alert($event.error.status + ' - Cambiando a modo manual' );

          this.verificarpagomanual();

        }else{
          alert($event.error.status + ' - ' + $event.error.description );
        }
      }else{
        if($event.status){
           this.test = JSON.stringify($event);
           this.verificarpago();
           this.verificarfecha();
        }
      }
    }

    verificarpagomanual(){

      this.apollo
      .watchQuery({
        query: gql`
        query findLineaCaptura($lineaCaptura:String,$folioPago:String){
          lineaCaptura(lineaCaptura:$lineaCaptura,folioPago:$folioPago){
            id,
            lineaCaptura,
            folioPago,
            totalAmparados,
            fechaPago,
            totalPago
          }
        },
          `,
        variables: {
           lineaCaptura: this.paymentsModel.capture_line ,
           folioPago:  this.paymentsModel.folio ,
         }
       })
       .valueChanges.subscribe(result => {
         var toastHTML = '<span> <div class="valign-wrapper"><i class="material-icons">error_outline</i>  &nbsp;&nbsp;Datos ya registrados</div></span>';
         M.toast({html: toastHTML});
       }, (error) => {
         this.mostrarfechapago = true;
         this.mostrardespuesdewebservice = true;
         $(document).ready(function() {
           $('input#input_text').characterCounter();
         });
       });
    }

    seleccionaruta(rowData: any,event: any){
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
      this.rutaseleccionada = rowData;

      var toastHTML = '<span> <div class="valign-wrapper"> &nbsp;&nbsp; Se ha seleccionado la ruta '+this.rutaseleccionada.ruta.origen+'-'+this.rutaseleccionada.ruta.destino+'</div></span>';
      M.toast({html: toastHTML});

    }

}
