  import {Component, OnInit} from '@angular/core';
  import {Router} from '@angular/router';
  import {Apollo} from 'apollo-angular';
  import gql from 'graphql-tag';
  import { Observable,Observer } from 'rxjs';
  import {User} from "../core/models/user.model";
  import {Ruta} from "../models/vo/ruta";
  declare var M: any;
  import { saveAs } from 'file-saver';
  import * as jsPDF from 'jspdf';
  import 'jspdf-autotable';
  import { Periodico, AllPeriodicosGQL } from '../graphql/newspapers';

 @Component({
  selector: 'app-plantilla', templateUrl: './plantilla.component.html', styleUrls: ['./plantilla.component.css']
})
export class PlantillaComponent implements OnInit {
  newspapers: any;
  plantillas: any;
  newspaperselect: any;
  btninhabilitar: boolean = false;

  constructor(
      private router?: Router,
      private apollo?: Apollo,
      private allPeriodicosGQL?: AllPeriodicosGQL
    ){}

      ngOnInit() {
        $(document).ready(function(){
          $('.tabs').tabs();
        });
        $(document).ready(function(){
          $('.modal').modal({dismissible: false});
        });

        this.listPlantillas();
        this.allPeriodicosGQL.watch()
        .valueChanges.subscribe(result => {
          this.asignarperiodicos(result.data);
        });
      }

      asignarperiodicos(periodicos: any){
        this.newspapers = periodicos.periodicos;
      }


      listDiarios(){
        this.apollo.query({query: gql`
        query listPeriodicos{
              periodicos{
                   id,descripcion,fecha_publicacion,tomo,numero,estatus,createdAt
                    }
                   },
                   `, fetchPolicy: 'network-only'})
                   .subscribe(result => {
                     this.asignarperiodicos(result.data)
                   });
      }


      listPlantillas(){
        this.apollo.query({query: gql`
          query listPlantillas($localidad:ID,$modalidad:ID){
    plantillas(localidad:$localidad,modalidad:$modalidad){
      id,
      nombre,
      descripcion,
      municipio{
        id,
        nombre
      },
      localidad{
        id,
        nombre,
        municipio{
          id,
          nombre
        }
      },
      modalidad{
        id,
        nombre,
        descripcion,
        abreviatura
      },
      periodico{
        id,
        descripcion,
        fecha_publicacion,
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
                           localidad: null,
                           modalidad: null
                  }})
                   .subscribe(result => {
                     this.asignarplantillas(result.data)
                   });
      }

      asignarplantillas(periodicos: any){
        this.plantillas = periodicos.plantillas;
      }

      seleccionardiario(rowData: any,event: any){
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
        this.newspaperselect = rowData;
        this.btninhabilitar = true;
      }

}
