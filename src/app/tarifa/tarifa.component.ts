  import {Component, OnInit} from '@angular/core';
  import {Router} from '@angular/router';
  import {Apollo} from 'apollo-angular';
  import gql from 'graphql-tag';
  import {Observable,Observer} from 'rxjs';
  import {User} from "../core/models/user.model";
  declare var M: any;
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
import { PaymentsModel } from '../models/vo/paymentsmodel';


  pdfMake.vfs = pdfFonts.pdfMake.vfs;

 @Component({
  selector: 'app-tarifa', templateUrl: './tarifa.component.html', styleUrls: ['./tarifa.component.css']
})
export class TarifaComponent implements OnInit {
    public paymentsModel:PaymentsModel;
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


    mostrarformulario2: boolean = false;
    mostrarplantillas: boolean = false;
    formbuscarnumserie: boolean = false;


    mostrarfechapago: boolean = false;
    mostrardespuesdewebservice: boolean = false;

    infoqr = "Concesionario";
    nombreconcesionario = "";
      vehiculo: any;
      fechaactual = "";
      tamanio: any;
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
      this.paymentsModel = new PaymentsModel('3IFAAA065');

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
     this.qrmensagge = this.infoqr + " Folio Hoja Valorada: " +  this.pago3;
     const barcodeData = TarifaComponent.getBarcodeData(this.qrmensagge);
     pdf.setDrawColor(0);
     pdf.setFillColor(255,0,0);
     pdf.rect(6, 44, 198, 222 );
     pdf.addImage(img, 'png', 110, 46, 74, 16);
     pdf.setFontSize(27);
     pdf.setDrawColor(0);
     pdf.setFillColor(214,214,214);
     pdf.rect(11, 62, 186, 12,'F');
     pdf.setDrawColor(0,0,0);
     pdf.addFont("Calibrib.ttf", "Calibrib", "normal");
     pdf.setFont("Calibrib");
     pdf.addImage(barcodeData, "JPG", 10, 45,31, 31);
     pdf.text(50, 71, 'TARJETÓN');
     pdf.setFontSize(7);
     pdf.addFont("Calibri.ttf", "Calibri", "normal");
     pdf.setFont("Calibri");
     if(this.registroamostrar.tipo_persona == "F"){
       pdf.text(100, 67, 'CONCESIONARIO: ' + this.registroamostrar.nombre + " " + this.registroamostrar.primer_apellido + " " + this.registroamostrar.segundo_apellido);
     }else{
       pdf.text(100, 67, 'CONCESIONARIO: ' + this.registroamostrar.razon_social );
     }
     pdf.text(100, 71, 'NUC: ' + this.registroamostrar.nuc);
     pdf.setFontSize(8);

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
           "$"+this.arrayrutasdepruebas[i].tarifa.toFixed(2)]);
         }

         pdf.autoTable({
           head: [['NU','ORIGEN-DESTINO', 'TARIFA EN TEXTO', '' ]],
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
             this.arrayrutasdepruebas[i].descripcion_tarifa,
             "$"+this.arrayrutasdepruebas[i].tarifa.toFixed(2)]);
           }
         for(var a = 25; a < restorutas; a++){
           a_permisoxf2.push([
             this.arrayrutasdepruebas[a].orden,
             this.arrayrutasdepruebas[a].ruta.origen +" - "+ this.arrayrutasdepruebas[a].ruta.destino,
             this.arrayrutasdepruebas[a].descripcion_tarifa,
             "$"+this.arrayrutasdepruebas[a].tarifa.toFixed(2)]);
           }
            let pageNumber = pdf.internal.getNumberOfPages();
           pdf.autoTable({
             head: [['NU','ORIGEN-DESTINO', 'TARIFA', ' ' ]],
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

           generaformatoconmakepdf(){
             var imageBase64Data = `iVBORw0KGgoAAAANSUhEUgAAAV4AAABQCAQAAAD7X9VVAAAAAmJLR0QA/4ePzL8AABxASURBVHja7d13gBRVtsfxD1lBBXMWxBUDSFIUER0xoGSUIEklCLKrKIoCKoppdwXFtD4M6BrYJ4K66ror7hoQAxjIIJIFhiwMGWYQpt8fU7RdnWZI+wz9qz9muvr2rapb37517jnn3iajjDLKKKOMMsooo4wyyiijjDLaKyqrkeu008xpmcbI6Jej4mpqqbMbddZEd52UyjRKRj9/HaORc92ut6666uo6nd2pl5KZpsno567mLnaNa3XQQ1vdXKuL+92nW6ZpMvq5q4xaOrpQT93drLmr3aKfa/VXJ9M4Gf2cVUsFdVzvFJ10cpPW2mntGl10ysCb0c9blTR2tdOVd5vuOhugrkY66qGXFpnmyejnrZZ66qiphnq6zU3aOFBNnfxBF4dq6phME2X0c1MJXRyiuqouVlsbLbTV0tW6uEFjh/mDVirq4+RMU2X0c9PhnnK86jpqpKmLZbnc5Vpp5ib99VJTLcfLUibTVBn9/HS9Wkpro70ztFRGRSVc7FpXulhdVRyjmoaZZkqmYzQxxOdmWGiJJZaYZ6YvPOty+2Wa57+gGtqp6CRnu0w9LTXS3I2u1EsbF6uvrNsyg7Z4neEtCy2xUSTptlG2d52Yaah9rKM8oLniqqvtSq0000w9F2uhpdaOdqIOymea6SeVNcKqFNCGt6WezoQo97Eq6aelwzR3plNcqK3OmjjNuSq7xtX234W6Tnbsr7uxDjLFj0VCNyJisy8zBsQ+1v7+7BZnOlUd9Z3rMg1V1VA1A/RUehdqmmzYr7mhihm7C+hGROR6P8PXPlEZFVV1tktcro0OmmnnHK20Vl1n3dR0tDPVVNmxRfQ3/Mrh7W39LqEbEZGjQ4a0vaSDXex2I3xlWaiFB7rCje5zi2s0197v3aC1caFRyEIfelh7pyr+W4T3QNm7jG5ExAIl9vimvWeBsYXaZHf53mxNf7HPtXJp3+9shXUp2niVV/RSTiPnaehJH9uR8m68k8KY+FXD29e2FJ6FmcYbZ5bspEbFBlftIbozg1vxvRPSlHvWWhERK1z7C2zdY31ks85pbNscEdPTdBLzvOAJg31ic8oyK2wQ0em3B+/MhKbYYporHRDTNz9ueZIm+3QPjnqY2fKjNS32uxS91sgYk2aVP/zifDhzg3P/fYoSF4qImJwUydXudJkLtNbeNXooqYkPkpacJSLi5d8avAdZEtcQ232cxCBolgTfxbvtMgujmwrfYkbaEPcYveEX1brlTBIR8aPLU5ToJCLiE7kJrfuCs/Vzi65ausejeirlIse4IsmdKIB/zG8N3kY2xTXEEhWSlnwo4bH1g9oJpkBtLfTWW29dXalGUjvsULPi0C04bniCYXGvx6Fb0Bv1SVLjAc7QVC+99dZda2cVYmfuVEUtdHePQe5zg9ZqJT3f4k6UpWtwXW003AXP6f7+brnGKd9vEzzDwle6TTvN9PA/btNTR7110lFJ/Z2CqmbEtcoXIiL+/VuD99m4Zsj3bIqSpX0fV3ZHYMsdoolHjTfXEmti7OPtVltullsdVCi6BfieXgi6YXzLuciDxpoj2yp5MdeQY7n5HnBUyutuYIyFVobs/XyrLfadVkGZM1xvlBkWBTblT2bVCsv80wV7of2rioh4PlT/Du1d7w5366alw3AnDtJSa+Xcp7dDzQm1ySsiIh7bRXhP1d9fve8Dr3tGHxcojVJeNirJ1heUN8Ioo7zsyrhn6cNBuVj7fj+tPeJZI43ymj/JUgz0Cco2DT1nnzPKKCOdqI5nPetZTwTlU+jzhN70zJRlH08Y6z4e9Ml5af0SeZa4LtoTTUs5Yo5Y5Iig3NA07rsfAjddK1vSHne75e5L4kI6yzSr03xuYFBuWYov2c5tjS9U3GNfxBQRDULw3quscgZq77ig1J0BOFV11VwTvdULfaKPqfLV2wV4i3s6yX3ojgNTXO14UDvmrh4eU9+T0f3vRvfVtyChlo8cjkeDV2/H1FAt2oUcrke0fNl0jRf/AMpOY8fWTrjlBQ+qwUVwrK33EBgS57nYIT+0rQJXiYT2bk+wtoujVVI/Sfzg8624b+9dhYbBd8K7oAjXle2kPcT3JC2JQXGCKvqqpnXMjXvGJRqqr55y2unufzVxYwjeSildicnhvSHp1fy+UHibxey5Nca2/+n8J0VNsuQ5Ml8oFq0lJ6Zr6RXsm0pR4Z2fMG5NrdIJHuGpRYY3IkdrvJdgpsTDBgMS9m+Py684qIjwRmzyQMw13BM43vYWvBGzCwnWXmSgAwtF+Kebfz4ucKFjna2Oq9RR3rta6KWp7iiho86Gq2ZaDLy7GmH7NOm1dEsD7zjw+9CV7+wWusbsXZnQF8dvjZWP3s/q0TN6I9jzRNHhXRxX8aS0TTw7rvTMXYA3Yr5SGssJ9bvxKL8Fjk7wLOeHPvVZYDZsK9JxlzgyOP+6Vhah/K7Bu9W9aVrsDvkipqaxvsPwjlUCh7tQXfV08og6anjHXe7SNuhdq2hsiM7BYG/34F0QRfJUB0e3kiF4/+ySmK0quD907XWD2saE7k4pFPNDtH1udpJzvBbjR2FC8P+NUfNp5/PwyqLDm51gk6TTtLjSc0PwrpNtnu9MM97XZsqOcwCt0wC3WJOiP803GdWNc6qGcfjmx3xmcpAQuBPejZaYZ5bpvvKVGRbHeVC2uz04/4kJ6K0011fGGmuCieZYYmscvD9aYaHZvjXROJPNT/gCzEkTvcyL+0IUBm8n9d0c+LMPdSiOc4k3VXa2c50TlL7C7forEzXjdh3enQO+t5KccyR6Lol6IXTlBYP7E+Oekyfg2OirR4NPlooO+CfikeD/kaGBa8QOhxYd3ngvb/qEmy/iSn8P7pPtI3epF3eoAzwS/f5FglE13BrFd3sCuudYLmKp6nH45kc/MSWay9rKcl/4kwZx2a2l9YoD7CtwbpzNvsEXasZd4ZGaRYesi31ruI4JVm11M0O3a1mayZCd5Ir4tFDX3Ybgi3K4vxuoUXQQc7SyTjNCTz31VD+6vzLKGLbb8H4Z011dHTJrfoL3FpWjW6XARPh3XBz2ADwQR8W5qBd91Sxa88sxhkXzqAFYoJ7B6xkUHd6lcQcenbaJ30oYOBWmD5LG5G4NjIftMXBOwdnR88lW3eUx+OYH5acWMQ370RBes0JW1U5b+Mk9CPouDVnz9dKUraFrEVYY2xAdFJXS1jE6aOxqpdQCI13lAjfIcqwPLdRIY+e7T4fdhveRuJHGq7IS4A1vZ0NCILuTYgku1FZoFH310yoTfwr2/IiDoyZjQdcwInj11K7AG2/zfpa2iYcmjLULU9cQRFOj+/tYEwNvvqkhdAss1TNi8M0Xsd20FAGURJ0bsq0XJLHYp6T3IRai70IJoi332N9bAO8wB6mjEZq4WAvVAlv5n3q4WGWVAnhWa24/56u+2/CelCRT4j/Kp4G3AMI10adNwd+PgwB3xA/REUgvtI5+rkbMYHnn0zPWhOsS6kTb7Aq88YOSiWmb+Mldhjc8qJoeclmtCeDNNw1nJ5gw2appEi2zYxfQ5YyQQ2wRKoS+Ghv2ELjpoSFKu70E753OMUBDNEFDzRwK3tZdd93VitrhjZVzvMN2G16qezfBpzMsDby1UDb6qn/gY8/3SdS2XRT89xAahz5XoIExPS+PBa9eRJVoF3XErsA7N6nza3d63hLO85CPzTHf9743zyzveSdkuU4P1fZH20Xkm6+4OgnoFtRfVYcA3+nRAEa8arrbaLOD484324f+FrK2FyXgvLjIU2kOcY2XTDXX9763wFwTvRzKvE0Pb/EifeUK4O2ICi4L4O3kKFkaEI16nqy9rXZ4XmPXeUDtoHVv2w14C4aE1/ggBuH1isfA+5p+Mdth+F2MJfu3uHtV1fhovI/60f0NEqK560GLqA+K7iGLt8jwfhd3Ct+lbeIRSQds7O9hi0MP6uTb9Lj6uvmXATgrZU5xtqrqGGVE0od8Cb0tLMLcu0W4IJQ1O6dI4FYzztJC4ofp4T3WJJtS5pTFw9tJT3dpjMtdq6vT3ORE5b0oS5YsLVVypIporK1eTgn6v92Fd+dI/6PotVRK6224IKY/vSghhPFGjMfq5Og7tyUM978N4oXbo96JV4P/ntw1eKekwDG5vkxw0EMlc2wtkk90eop6F6bNZ02lCiYWcQ7IIrQMOe5mFgHd/kkTQXcF3v3NKyQlMgxvL821DTLQjlBXM+3UdqQX1Aq2mkH+R2OnO1P5oNfcM3hpF72Wk9PC2z763hGKhwZq1+GJmOFx8eidmRekMTWJwvpmnOOyfXTk1WbX4P0wYW7wEWlKz0oC46FRW2f34b0tzqUWmwTZM8VnSpmRJksiEd4moUyI7wq9oX2KEIsrDN5Swdc9L+r8Sg/vvW7WOqituLoO1dv1LvViTMmjQVOlVVE5oXcrGrwlfGRCzLY2xst6YIw/JidmG4E+0cBDsZgBWMRGB6JfdIJumKztvgslEu3Myh4SpSJs8RYZ3ucT4kVtU5Y9IsGxNgZvFRmhRHjvNNGziqNXTOgiNoOsMy73lSkJl/FgEXv7nfCeFzJr5hUC01EJ17p7ZsOBRljqwiKaDW/q4AkP6quvvu4wyN3ud69PPB7dntJXX7er5yGX7Sa8B6e4ko8LyW0YEmq946N96QuBT3tn2QqhXjp+js5ORJumjO4WEd4bE0acqWNs3ROsv4EOirNWV/vWGx41yPPeME12KBAxPS4ds2DAtlJp3JSAbwG6fewQkW9BXAbX/Ljo3TxvecIgzxphskWhKNsinB4KXCyJmSmSTA/EBaSzjfW8QR73kjHmhs5173kbljnNTbKC0Elzj3kj5kl4kYeivXJTHO7u3YT3gKT5cgtVKgTenWOeT4J63gv5gBtEyxaYNs8lTZS6IiZhMjx3765dhffihKzZZSlSrYsnTBha60KtQv3fyoTZWleEgJ8ekwo4ysYo2DnK4saQ8VCA7sCgX8+Pm21RLYTiOn+KG9AlusrCc0bWxoyCk2lq3DD2yDTZeHsP3oj67vBYYPt97TNLoujVs8IsY9RHHVfr5ojoTOJdt3lv9oapUUNqtTFuDUApGzIWftrexdvB/09Hh3r99Iva8ydGy54bvfv/iOnc5ngyLlrZMTra2ejdmDhfp6CelenDO4cleTx+nXQa9YAEzJc4KOq7S5XWkxzeYl63MRRhi8e3AN27oyZJftxkoaahL828BF9EIrzxQYp/p4VpXsgn3ChtKunehPcxPXXXywE4yxQ7on6RD0Vs1lcZNHWj/dWK9p97OmD7/1QFBzs45cT9QjQriVWSOI36tiTp29/gmUKCy8ngLR6gG85tWBvgu1rEal0wIMaazo+6zgrw7VzIQDAZvO/Gzbitn6ZVFoWeJ1X3AN5WngrNJEkP72rneModWgeJizusCvzEE0SsUhKnOc+9bo1JktmX8J6kj9tcVEipkgndx1WhVNQCf0PLvU3+K0nT/Ga53rFKKut01/omyXBqo84x8eqdidSFw/sTuvFZZesdhDut0zsO3dissoK5buF6ZxcJ3hZxNtayhLSc5Bb1+iQmRlHhvVu+iOkqFRHeiEe18rjWqhlmh6Xmy9HXTAttFfGWClooi5oxrXf7PoR3vC88pGPaMmWsUxEHxjzm+zhMiZgATWnP7v1nwFkppsRssVS2bCtSOOm/VwrdQgAuTsjAapUA7ysxGfbbExLW90N53Bznw8gPmSuV4nIXVib0ojWSwFs8ZAwUfO5NF0afMoc4yx+8rm1c8CbfOwmPtW+LBO/B0fjifUWGN9fl6iurk6U2uMR4OZ6XY6ILbJbjGWf7s2N9FnMG+xLej43TXPHAUHtURxut08l0W3WwWMR0d4t4z93WydPOI3I9aZUss2y1wMEYKl+uYW6yw/aU7s/d0KTdWC9nbbAEyO+siIuITTfNNNNMNdl3FocgnK5zqPfLT0g5L0gMqpKAdbjkNGXivBzLzDQlOPIk31oUsokXBVfaO8nUlA1WWGqJlVbKsSPIvX0t7pkwN3pdk0w1P/SF356m521ti4hPCjUcNoQCKJU96lz3GBET7oCn/dUlqOnB0PntS3greckWb3jGDG+aY7gXgiyHUzWXa7CI6iIqquNusz3hQ7fhBw10NVhETWTr5AnDjDXGWO/sPXhrFWl+Qez2o/+kzI5I7+d9v9AVKAsgSzxiOJRS3thdOO6iqMdkQiGTKncmjl9ShGD3T/C2TdO6p+tUhIWxNojYFE1i+lpdnK+vLi51CMo5y6W66+0B58XMX1u7z+Gt5xJPWOovvtVPey/4lzMdI+J3Gss1wC0OF3GZ8f7H+57woVvwg2ttd0WQmrPAPUYY5kNj9Nu767rfknK1rOToTo9Jrr52F5bpe889CctrbI/ZdpgMsuwI7c9PWJmrmLNSRuUStxkxgZb5heI7MImzLN22Kibtb/e9DeOcpEv0iTPdaX7vWpcoo56uLnGw+m72mixPR488WAX/u4/hfdU3xuuops9NMMA5xpuglQmOU9ZbJhitmH95x20mGKe7odrjA/WMNsEYJ6CLCca7URNfm5BiYard1q1pJ4OHB2qfxzn4RyYsXBJJseLCOUr5KuVyqvm+i9Z8V5rg7Mpg7Ht3EQO4G0M21uG+TrPq10/wVixy2HvPMoN3wtsxSH3ZGB1z3Ov6wLH4sAY4VF+to0PF7doohlP2Mby/CFU3vVCAt1ioR5LwxWArC+3P1ugXjDo/SzoE3GF6aJbErUkDxhErojn/9LQ8wTpOnHT/ahxcxXQzJ82zZmDU2pueYuGT2OdG+mUCKVGk1Xs2WKic4pprHGPEbfKq9mo6V3WXeDDGrblVG+c4QTGjM/AWqI5R5lqWMIFxtSUWG+e6lBGP33neLNlWWGOTzTHbRsst9KXzYpwmifjuMCNhgs+tSezOWHQLchAe8q3FllttY+i4m6y02NQUg6liLvWCaRbJtsxyy2TL9r3JXolJny7hCp+bb6lV1oVq32KNJeYYVsi0pKNMsrUIaxlvEDEctV3t/JAnIfl0+3qaaqFkkAzz34H3CN1UQGXdk1jx16mhrePdFUQjr4z79ZLm/51fjjtOI/094yUveckg16jvhCItqlfOabK0idmaqZ8k3Fza5yF8k6GbrPeNR/en+k5R35Uxx20hS6UirSBcQRVnqq5imqTxY5ypSei6LlW9CD1quSBtML/Q5Vk3BAbRMFX00lDvOC9OrJ+nv5O0d5l7rAx8Of+dCFsLEffgHRHHJ7x7p7oWaO6pYJ2f6XFf2a+iqyb94lXGF1F8d/g2JTh9YvBdUYTsrJ+XSgfrE+QVujT2T1f5pfM0k6WKbj4ImS1bfeRmtZ3uZg39I+adzv8VeHvaYa4j5cl3tvstN1djq1V2n5e9r6MFmslW27tybNfBe3LMdLTX5fjx1wNvwfKfP4rYYXZo1at4/TEwHlb9ItdGP8Bwc9IGogv0YchdOEBN3d2urRM0cKUO2rhcFQ2cq6eGCcH6s/4r8N7nUyu9bYzVWlqlh7cN9Y0uxrvReNdZoJnNrhRR3WwdXORWedqLqGfirwleyhlmphHBJMPU6mya8dHVWX6dOi9uwLvRC1qq7XTn6eiPertFB8109EyCV/6LtDXvPXiHGe7PItqb7gY/uMabnjbY3+SqFgNvKxEnm62HHa6xTkcRtX5t8GYUqy5Jkut/NM1Igz3kMa+antTJ+GUhv/++N+G9QxXv2d9wvQOzIUttK4xXzJvaGusiM9TyvhxLNPKNHNnqeVuOpTGZvBn96nSca/TYxa1BoT7m34yrLJl6eUYrT7oW13lMK884Gzd43J8NNthg1yvpeq952JE4yXNejzqcyhvgVW1Rxk1e8yeHOMBT7kUlQ9VT1ctGuCyoa7C+Brnf1Q50q/uRZagGBsky1B/BA4Y6Pu6Yw6LHPD+op5v+usVcyemeMCzIJHtQexztfwwG9xoqy1DP6O8YtT3kBKX83msGpbXIC9fl+qWfD7CP9ZuG9z/yjJTjY3xllVEi5iptqpVybfGjzWb7xlZrbbHMSbJttt5CJXGERXKtlesu0+Vaa6tFTrHaJl3Vl2egVTbZ6Hu5cm21xXd+tMlWE3xnIQbKNcAO/WyVp6Yz5NqqXuiYS2yyPvh5rSG222yzqbJjAsNXWGez9Taqoa7tViilhi3y1FVFrjy95dlkq0X62OZSk+Raa4slha7xmFp3BolER2bg/f/QEdYaaVUA7zKjbLLFI6Za6AQv2aiBXvK8rIzuNvmndaa4KshgfcVm19tPH/3leVQZ/W01TI4tsjWTa6itPtLJCU4wQ7YTPGmTG8yzzLfmYaAtBtiun1y5XvGSXLnuizvmJO2CWW5DbNLP1c63ICZNfa5lTldRV4y2RZ5Oatgq1xuelmub3vK8aLK17pBniDzDlPEHm0Ozd3dtSLolxSqRxZymSuCHLu8o7B8THEmmQ4K/B+JkZzozyeyDMqpl4E0Pb46F1lhmIZ6y0ames8EZYLFpJsm12qCg6bIDq+wNOY7HfpabIMdKm8yR607fybPKbZhsMQbbbrM8n5uRAO82K62SJ9fbKY85xA7b/OifMfCWsixYK7Lgir71g2lq2OpHqy0P4M21Q75l+sjzvvVORTFLClm1OJ2ukifi47iUyGLe9pTBKoNm+uIo3dPW9Kfg75/xkXvcrbTyiukX80M0xxmegXen9pPlHGu9Ftz6qRYZJUdz622Lgfd229yIatYZrZ72lgRLQY22Vg008ohc7ZBlkzfleN2X1svTxwW6WGp+DLybzLdRlikWKu5Rm9wewPuFbbb5XK4nUx5ziE366qhuqOddaIEy9neph+TbIk+O1rYaH9RY0PM+7Rnb/FWeF2zTHbWt36P80xo6J0QnKxoFTvKxT3T1jQlaedFw/3Cn6R4w3mRDPefv+qOXB7ytq3v1C+DtpYdbjPSgb91rkPdda5x/Ge4lb0eXbP5Nw3uWzRbbqq/PrTfPRh8YJccRhvsxBt5DLZJjomXW62KjudYE1ubZ1lpmik3essxqE62Uo64co1S2UsQLNpljra9C8Lbwg5kG2WKh1b7XKYC3rzXW6CtXw5THHCI3WFNsgRxzLVJCwU9xzTHbZqss1ttDNvmPrQb6wVo3Bz3vcktt9LA8V8iWY6IV1gc9/N7T0d7DA+7SSQ+D9NfCg1403yBPm4HReN9oxXyARzDICP08GcDbTCOdfGqwvzrRg54z0kjHGe59Jf0jAy/8xQxv2t8RRpvtHw51kzHKO8iH3kEPkxyPE/3HbF+rr7jHzfKJKkEN9X1tlr87zKk+Mds4ZypvjJtws3Gae8Fs/3Y8/uJTdDZJZUNMUNczZvnKGbJMc5VPXephg13qUyenPGZXU0011T/921RTfaU4irnVDDMMM1Zv8HejfaqpP3pcls8095lxPtVac1PUcJKPzPZldCL33tRzRpmslQ+M0dMX3tfci4Z7SjsTA3hHG+Vpg/G4xl4xQHPnBPA+5jFtDfGRIe43xd2GGetvhnvTy6FEnX7aZ7yQGe3t3rc8KiivlOMcrKTDFHOwsg7EUThKiSCpqZQaDlNMVceqhKOc6EQlHW9/pRzrOGcqr7QKKFlI0CKjjDLKKKOMMsooo4wyyiijjDLKKKOMMsooo4wyyiijjDLKKKOMMsooo32g/wNwCSIit1XLewAAAABJRU5ErkJggg==`;
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
                           { image: 'data:image/jpeg;base64,'+imageBase64Data,width: 240,height: 62}
                          ]
                       },
                       { columns: [
                           { width: 140,text: ''},
                           { width: '*', text: '2018. AÑO DE LA ERRADICACIÓN DEL TRABAJO INFANTIL', fontSize: 9, bold: true },
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
                           { width: 250, text: ''},
                           { width: 70, text: 'MEMORANDUM:', fontSize: 9,bold: true },
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
                           { width: 350, text: 'San Antonino de la Cal, Oax., ' +this.fechaactual, fontSize: 8, margin: [0, 10] }
                         ], columnGap: 10
                       },
                       { columns: [
                           { width: 10, text: '' },
                           { alignment: 'justify', width: 250, text: this.nombreconcesionario + ' CONCESIONARIO DEL SERVICIO PÚBLICO DE TRANSPORTE EN LA MODALIDAD DE ' + this.plantillaseleccionada.modalidad.nombre+', EN LA LOCALIDAD DE '+ this.registroamostrar.localidad.nombre +', MUNICIPIO DE '+this.registroamostrar.localidad.municipio.nombre + ".", fontSize: 10, bold: true }
                         ]
                       },
                       { columns: [
                           { width: 10, text: '' },
                           { alignment: 'justify', width: 80, text: 'P R E S E N T E', fontSize: 10, bold: true }
                         ]
                       },
                       { columns: [
                           { width: 10, text: '' },
                           { alignment: 'justify', width: 520,
                             text: 'En atención a las diversas solicitudes presentadas ante esta Secretaría por prestadores del servicio público de transporte, en su modalidad de ' + this.plantillaseleccionada.modalidad.nombre+' en esta localidad, con fundamento en los articulos 27 fracción VII, 40 fracción XXXIX de la Ley Orgánica del Poder Ejecutivo del Estado de Oaxaca: 1, 2, 6, 11 fracción II, XII, XXX, 35, 114, 116, 117, 120 fracción II, 121 fracción IX, de la ley de Transporte del Estado de Oaxaca, 31, 52, 73, 74 y 76 del Reglamento de la Ley de Transporte del Estado de Oaxaca y Articulos 31 fracción III y 32 fracción V, del Reglamento Interno de la Secretaria de Vialidad y Transporte del Estado de Oaxaca y con base en las conclusiones del estudio técnico y costos practicado por la Subsecretara de Planeación y Normatividad para la actualización de las tarifas del servicio público de transporte de pasajeros, considerando la estimación de la demanda del servicio, el inventario de vehículos que prestan el servicio en dicha modalidad y las cotizaciones de costos de refacciones, combustibles y mantenimiento, relacionados directamente con el costo de operación de los vehículos, por instrucciones del encargado de Despacho de la Secretaría de Movilidad del Gobierno del Estado de Oaxaca y en términos del Acuerdo por el que el Secretario de Movilidad delega facultades al Titular de la Dirección de Operación del Transporte Público de la misma Dependencia, publicado en el Periódico Oficial del Gobierno del Estado de Oaxaca el dia 6 de julio del año 2013, la Dirección de Operación del Transporte Público a través del Departamento de Control de Trnasporte, le comunica que se autoriza como tarifa para la prestación del servicio público de transporte de pasajeros en la modalidad de ' + this.plantillaseleccionada.modalidad.nombre+', en la localidad de ' + this.plantillaseleccionada.localidad.nombre+', municipio de ' + this.plantillaseleccionada.localidad.municipio.nombre+' una cantidad que no deberá ser mayor a:', fontSize: 8, margin: [0, 10] }
                         ]
                       },
                       { columns: [
                           { width: 230, text: '' },
                           { alignment: 'justify', width: 240, text: 'TARJETÓN ANEXO', fontSize: 10, margin: [0, 20], bold: true }
                         ]
                       },
                       { columns: [
                           { width: 10, text: '' },
                           { alignment: 'justify', width: 520, text: 'No omito manifestarles que deberán prestar el servicio en los términos marcados en sus concesiones, que la tarifa entrará en vigor una vez cumplidas las formalidades que indica la Ley de Transporte del Estado de Oaxaca, su Reglamento y demás legislación en vigor y permanecera vigente hasta nueva determinación por parte de Secretaria de Movilidad, quedando el concesionario sujeto a la normatividad aplicable', fontSize: 8 }
                         ]
                       },
                       { columns: [
                           { width: 10, text: '' },
                           { alignment: 'justify', width: 530, text: 'Sin otro particular; el envió un cordial saludo:', fontSize: 8, margin: [0, 20] }
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
                           { alignment: 'justify', width: 200, text: 'REGISTRÓ', fontSize: 8,bold: true, margin: [0, 15] }
                         ]
                       },
                       { columns: [
                           { width: 10, text: '' },
                           { alignment: 'justify', width: 300, text: 'LIC. SERGIO BARRERA MEJÍA', fontSize: 8,bold: true },
                           { alignment: 'justify', width: 400, text: 'ARQ. JULIO CESAR ROJAS RIVERA', fontSize: 8,bold: true }
                         ]
                       },
                       {
                         columns: [
                           { width: 10, text: '' },
                           { alignment: 'justify', width: 300, text: 'DIRECTOR DE OPERACIÓN DEL TRANSPORTE PÚBLICO', fontSize: 8,bold: true },
                           { alignment: 'justify', width: 400, text: 'JEFE DE DEPTO. CONTROL DE TRANSPORTE', fontSize: 8,bold: true }
                         ]
                       }
                     ]
                   };
                 pdfMake.createPdf(dd).download();
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

    validarhojavalorada(){
      var n = this.pago3.toString();
       console.log(this.mostrarfechapago);

      if(n.length == 9 && !this.mostrarfechapago){
          this.fechaverificada = true;
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
      console.log(this.pago3);
      console.log(this.pago3);
      if(this.pago3=='' ||this.pago3==null ||this.pago3==undefined){
        this.fechaverificada = false;
       }else{
        this.fechaverificada = true;

      }
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
              var tamanio2 = this.arrayrutasdepruebas[i].descripcion_tarifa;
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
              var tamanio2 = this.arrayrutasdepruebas[i].descripcion_tarifa;
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
              var tamanio2 = this.arrayrutasdepruebas[i].descripcion_tarifa;
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

      buscarnumserie(){
        this.formbuscarnumserie = true;
        this.mostrarformulario2 = true;
        this.mostrarplantillas = true;
        if(this.registroamostrar.tipo_persona == "F"){
          this.nombreconcesionario =this.registroamostrar.nombre + " " + this.registroamostrar.primer_apellido + " " + this.registroamostrar.segundo_apellido;
        }else{
          this.nombreconcesionario =this.registroamostrar.razon_social;
        }
        this.infoqr = " NUC: " + this.registroamostrar.nuc +" Serie:" + this.vehiculo.serie + " NIM: 222222222 " + "Sitio: CENTRO" ;
        console.log(this.paymentsModel);
        console.log(this.datepay);

      }

      public check($event){
        if($event.error){
          alert($event.error.status + ' - ' + $event.error.description);
          this.mostrarfechapago = true;
        }else{
          console.log(this.paymentsModel);
          this.test = JSON.stringify($event);
        }
        this.mostrardespuesdewebservice = true;

  }

}
