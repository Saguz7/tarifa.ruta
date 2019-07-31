 import {Component, OnInit} from '@angular/core';
 import {Router} from '@angular/router';
 import {StorageService} from "../core/services/storage.service";
 import {Session} from "../core/models/session.model";
 import {Apollo} from 'apollo-angular';
 import gql from 'graphql-tag';
  declare var M: any;
  import {Ruta} from "../models/vo/ruta";
  import { Periodico, AllPeriodicosGQL } from '../graphql/newspapers';
  import { Municipio, AllMunicipiosGQL } from '../graphql/listmunicipios';
  import { Modalidad, AllModalidadesGQL } from '../graphql/listmodalidades';

@Component({
  selector: 'app-createplantilla',
  templateUrl: './createplantilla.component.html',
  styleUrls: ['./createplantilla.component.css']
})
export class CreatePlantillaComponent implements OnInit {
  arrayrutas = new Array();
  date1: Date;
  es: any;
  localidad: any;
  localidades: any;
  municipio: any;
  descripcion: any;
  newspapers: any;
  mensaje: any;
  newspaperselect: any;
  municipios: any;
  municipioobj: any;
  localidadobj: any;
modalidadobj: any;
  mostardespuesmunicipio: boolean = false;
  modalidades: any;

  constructor(private apollo?: Apollo,private allPeriodicosGQL?: AllPeriodicosGQL,private allMunicipiosGQL?: AllMunicipiosGQL,private allModalidadesGQL?: AllModalidadesGQL)
              {}

  ngOnInit() {


this.allPeriodicosGQL.watch()
.valueChanges.subscribe(result => {
   this.asignarperiodicos(result.data);
});

this.allMunicipiosGQL.watch()
.valueChanges.subscribe(result => {
   this.asignarmunicipios(result.data);
});





  }

  listDiarios(){
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

  asignarperiodicos(periodicos: any){
    this.newspapers = periodicos.periodicos;
  }

  asignarmodalidades(modalidades: any){
    this.modalidades = modalidades.modalidades;
     var datos = new Object();
    datos = {};
    for(var i = 0; i <this.modalidades.length;i++){
        datos[this.modalidades[i].nombre] = null;
     }
     $(document).ready(function(){
       $('#autocomplete3').autocomplete(
         {
           data: datos,
           getData: function (value, callback) {
           }
         });
       });
  }

  asignarmunicipios(municipios: any){
    this.municipios = municipios.municipios;
    var datos = new Object();
    datos = {};
    for(var i = 0; i <this.municipios.length;i++){
       datos[this.municipios[i].nombre] = null;
     }
     $(document).ready(function(){
       $('#autocomplete2').autocomplete(
         {
           data: datos,
           getData: function (value, callback) {
           }
         });
       });
  }

  buscarlocalidades(){

    this.listDiarios();
    var nombreMunicipio = (<HTMLInputElement>document.getElementById("autocomplete2")).value;

    for(var i = 0; i <this.municipios.length;i++){
      if(this.municipios[i].nombre == nombreMunicipio){
        this.municipioobj = this.municipios[i];
      }
    }


    this.apollo
     .watchQuery({
       query: gql`
       query listLocalidades($municipio:ID){
             localidades(municipio:$municipio){
               id,
               nombre,
               municipio{
               id,
               nombre
                }
            }
          },
       `,
       variables: {
               municipio: this.municipioobj.id
     }
     })
     .valueChanges.subscribe(result => {
        this.asignarlocalidades(result.data)
      });


  }


  asignarlocalidades(localidades: any){
    this.localidades = localidades.localidades;
    this.mostardespuesmunicipio = true;

    var datos = new Object();
    datos = {};
    for(var i = 0; i <localidades.localidades.length;i++){
       datos[localidades.localidades[i].nombre] = null;
     }

    $(document).ready(function(){
      $('#autocomplete').autocomplete(
        {
          data: datos,
          getData: function (value, callback) {
          }
        });
      });

      this.allModalidadesGQL.watch()
      .valueChanges.subscribe(result => {
         this.asignarmodalidades(result.data);
      });
  }

  esconderdespuesdebuscar(){
      if(this.mostardespuesmunicipio){
       this.mostardespuesmunicipio = false;
     }
  }


  addruta(){
    this.buscarlocalidad();

     let rutanueva = new Ruta();
     rutanueva.origen = this.localidadobj.nombre;
     rutanueva.destino = "";

    this.arrayrutas.push(rutanueva);

  }

  deleteruta(numero: any){
    this.arrayrutas.splice(numero, 1);
  }


  buscarlocalidad(){
    var inputlocalidad = (<HTMLInputElement>document.getElementById("autocomplete")).value;
    var decision = false;
    for(var i = 0; i <this.localidades.length;i++){
        if(this.localidades[i].nombre == inputlocalidad){
            this.localidadobj = this.localidades[i];
           }
     }
  }


  buscarmodalidad(){
    var inputmodalidad = (<HTMLInputElement>document.getElementById("autocomplete3")).value;
    var decision = false;
    for(var i = 0; i <this.modalidades.length;i++){
        if(this.modalidades[i].nombre == inputmodalidad){
            this.modalidadobj = this.modalidades[i];
           }
     }
  }

  crearruta(){

    this.buscarlocalidad();
    this.buscarmodalidad();
    console.log(this.localidadobj);
    console.log(this.modalidadobj);
    console.log(this.localidadobj.municipio);
    console.log(this.descripcion);
     console.log(this.newspaperselect);
    console.log(this.arrayrutas);


  }


  seleccionardiario(rowData: any,event: any){
    console.log(rowData);
    if(event.target.tagName == "TD"){
      console.log("TD");

      for(var i = 1; i < event.target.parentNode.parentNode.parentNode.rows.length; i++){
        event.target.parentNode.parentNode.parentNode.rows[i].style.backgroundColor = "#FFF";
        }
        event.target.parentNode.style.backgroundColor = "#f5f5f5";
    }

    if(event.target.tagName == "LABEL"){
      console.log("LABEL");
      for(var i = 0; i < event.target.parentNode.parentNode.parentNode.parentNode.rows.length; i++){
        event.target.parentNode.parentNode.parentNode.parentNode.rows[i].style.backgroundColor = "#FFF";
        }
     event.target.parentNode.parentNode.parentNode.style.backgroundColor = "#f5f5f5";
    }

    if(event.target.tagName == "DIV"){
      console.log("DIV");
      for(var i = 0; i < event.target.parentNode.parentNode.parentNode.parentNode.rows.length-1; i++){
       event.target.parentNode.parentNode.parentNode.rows[i].style.backgroundColor = "#FFF";
       }
       event.target.parentNode.parentNode.style.backgroundColor = "#f5f5f5";
    }

    this.mensaje = "Ha seleccionado el diario oficial del dia: " +rowData.fecha_publicacion +", Tomo: " + rowData.tomo +", Numero:"+ rowData.numero
    this.newspaperselect = rowData;
  }



}
