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

 this.allPeriodicosGQL.watch()
 .valueChanges.subscribe(result => {
    this.asignarperiodicos(result.data);
 });

      }

      asignarperiodicos(periodicos: any){
        this.newspapers = periodicos.periodicos;
      }


      listDiarios(){
        console.log("Entra aqui");
        this.apollo.query({query: gql`
          query listPeriodicos{
        periodicos{
          id,
          descripcion,
          fecha_publicacion,
          tomo,
          numero,
          estatus,
          createdAt
        }
        },
                        `, fetchPolicy: 'network-only'})
                        .subscribe(result => {
                          this.asignarperiodicos(result.data)
                        });

      }







}
