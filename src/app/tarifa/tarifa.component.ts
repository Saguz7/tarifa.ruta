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

  constructor(
      private router?: Router,
      private apollo?: Apollo
    ){}

  ngOnInit() {
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




}
