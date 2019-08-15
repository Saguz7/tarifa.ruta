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
 import { ConvertNSService } from '../core/services/convertns.service';
 import {Plantilla} from "../models/vo/plantilla";
 import {RutaInterna} from "../models/vo/rutaInterna";
 import { InsertPlantillaGQL } from '../graphql/createtemplate';
 import {PlantillaComponent} from '../plantilla/plantilla.component';


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
  modalidad:any;
  nombre: any;
  mostardespuesmunicipio: boolean = false;
  mostardespueslocalidad: boolean = false;
  mostardespuesmodalidad: boolean = false;
  mostardespuesperiodicooficial: boolean = false;

  modalidades: any;
  verificarrutas: boolean = false;
  velidacionrepetidos: boolean = false;

  constructor(
    private apollo?: Apollo,
    private allPeriodicosGQL?: AllPeriodicosGQL,
    private allMunicipiosGQL?: AllMunicipiosGQL,
    private allModalidadesGQL?: AllModalidadesGQL,
    private insertPlantillaGQL?: InsertPlantillaGQL,
    private convertNSService?: ConvertNSService,
    private plantillaComponent?: PlantillaComponent)
              {}
//Se solicitan los periodicos y municipios totales para usarlos en el componente
  ngOnInit() {
    $(document).ready(function(){
      $('.modal').modal({dismissible: false});
    });
    this.allPeriodicosGQL.watch()
        .valueChanges.subscribe(result => {
          this.asignarperiodicos(result.data);
        });

        this.apollo.use('backsicac').query({query: gql`
          query listMunicipios{
        municipios{
          id,
          nombre
        }
        },
         `, fetchPolicy: 'network-only'})
         .subscribe(result => {
           this.asignarmunicipios(result.data)
         });


  }
//Listar periodicos
    listDiarios(){
     this.apollo.query({query: gql`
       query listPeriodicos {
   periodicos {
     id,
     descripcion,
     fechaPublicacion,
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
//Asignar periodicos
    asignarperiodicos(periodicos: any){
      this.newspapers = periodicos.periodicos;
    }
//Asignar modalidades
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
//Asignar Municipios
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
//Buscar localidad para validar
    buscarlocalidades(){
      this.listDiarios();
      var nombreMunicipio = (<HTMLInputElement>document.getElementById("autocomplete2")).value;
      for(var i = 0; i <this.municipios.length;i++){
        if(this.municipios[i].nombre == nombreMunicipio){
          this.municipioobj = this.municipios[i];
        }
      }
      this.apollo.use('backsicac')
          .watchQuery({
             query: gql`
                    query listLocalidades($municipio:ID){
                          localidades(municipio:$municipio){
                          id,nombre,municipio{id,nombre}
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

//Asignar Localidades
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
  }

  esconderdespuesdebuscar(){
      if(this.mostardespuesmunicipio){
       this.mostardespuesmunicipio = false;
     }
  }

  //Metodo para crear una ruta mas

  addruta(){
     this.buscarlocalidad();
     let rutanueva = new Ruta();
     let ruta = new RutaInterna();
     rutanueva.ruta = ruta;
     ruta.origen = "";
     ruta.destino = "";
     rutanueva.orden = 0;
     rutanueva.descripcionTarifa = "";
     this.arrayrutas.push(rutanueva);
      this.validarrutas();

  }

  //Eliminar una ruta

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


//Creacion de la plantilla
  crearruta(){

    this.buscarlocalidad();
    this.buscarmodalidad();
    let nuevaplantilla = new Plantilla();
    nuevaplantilla.nombre = this.nombre;
    nuevaplantilla.descripcion = this.descripcion;
    nuevaplantilla.localidad = this.localidadobj.id;
    nuevaplantilla.modalidad = this.modalidadobj.id;
    nuevaplantilla.periodico = this.newspaperselect.id;
    for(var x = 0; x < this.arrayrutas.length; x++){
      this.arrayrutas[x].orden = x+1;
    }
    this.insertPlantillaGQL
      .mutate({
        plantilla: nuevaplantilla,
        rutas: this.arrayrutas
      })
      .subscribe(({ data }) => {
         $('.modal.open').modal('close')
         this.plantillaComponent.listPlantillas();
         this.limpiar();
        M.toast({html: "Se ha agregado una nueva plantilla."})
                 }, (error) => {
                   var divisiones = error.message.split(":", 2);
                   M.toast({html: divisiones[1]})
       });
  }

//Metodo para seleccionar el periodico y pintar el periodico seleccionado
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

    this.mensaje = "Ha seleccionado el periódico oficial del dia: " +rowData.fecha_publicacion +", Tomo: " + rowData.tomo +", Numero:"+ rowData.numero
    M.toast({html: this.mensaje})
    this.newspaperselect = rowData;
    this.mostardespuesperiodicooficial = true;
  }
//Convierte un numero a un formato de letras aceptado, usa un servicio externo para este proposito
  convertirALetras(rutaacambiar: any){
      rutaacambiar.descripcionTarifa = this.convertNSService.convert(rutaacambiar.tarifa);
      this.validarrutas();
  }


     limpiar(){
       this.arrayrutas = new Array();
       this.date1 = null;
       this.localidad= null;
       this.localidades= null;
       this.municipio= null;
       this.descripcion= null;
       this.nombre= null;
       this.newspapers= null;
       this.mensaje= null;
       this.newspaperselect= null;
       this.municipioobj= null;
       this.localidadobj= null;
       this.modalidad = null;
       this.modalidadobj= null;
       this.mostardespuesmunicipio = false;
       this.mostardespueslocalidad = false;
       this.mostardespuesmodalidad = false;
       this.mostardespuesperiodicooficial = false;
       this.modalidades= null;
     }

//Metodo que valida que no se encuentren rutas repetidas en las agregadas por el usuario, si existen rutas repetidas se desabilita elboton de crear plantilla
     validarrutas(){
       if(this.arrayrutas.length==0){
         this.verificarrutas = false;
       }else{
         this.verificarrutas = true;
       }
        for(var i = 0; i < this.arrayrutas.length;i++){
         if(this.arrayrutas[i].ruta.origen == "" || this.arrayrutas[i].ruta.destino == "" || this.arrayrutas[i].descripcionTarifa == ""){
              this.verificarrutas = false;
         }
       }
       this.velidacionrepetidos = true;
        for(var i = 0; i < this.arrayrutas.length;i++){
         for(var x = 0; x < this.arrayrutas.length;x++){
              if((this.arrayrutas[i].ruta.origen == this.arrayrutas[x].ruta.origen && this.arrayrutas[i].ruta.origen!= "") && (this.arrayrutas[i].ruta.destino == this.arrayrutas[x].ruta.destino && this.arrayrutas[i].ruta.destino!= "") && x != i && this.velidacionrepetidos)
             {
               M.toast({html: "No se pueden registrar dos rutas iguales"})
               this.velidacionrepetidos = false;
             }
         }
       }
     }
//Comprueba de que la Localidad si exista
     validarlocalidad(){
       var inputlocalidad = (<HTMLInputElement>document.getElementById("autocomplete")).value;
       var decision = false;
       this.mostardespueslocalidad = false;
        for(var i = 0; i <this.localidades.length;i++){
           if(this.localidades[i].nombre == inputlocalidad){
               this.mostardespueslocalidad = true;


               this.apollo.use('backsicac')
                   .watchQuery({
                      query: gql`
                      query listModalidades{
                      modalidades{
                        id,
                        nombre
                      }
                    },
                       `
                    })
                    .valueChanges.subscribe(result => {
                        this.asignarmodalidades(result.data)
                    });

              }
          }
      }
//Comprueba de que la modalidad si exista
     validarmodalidad(){
       this.mostardespuesmodalidad = false;
       var inputmodalidad = (<HTMLInputElement>document.getElementById("autocomplete3")).value;
       var decision = false;
       for(var i = 0; i <this.modalidades.length;i++){
           if(this.modalidades[i].nombre == inputmodalidad){
               this.mostardespuesmodalidad = true;
              }
        }
     }
}
