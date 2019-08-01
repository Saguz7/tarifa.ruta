import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {LineaCaptura} from "../../models/vo/lineacaptura";

@Injectable({ providedIn: 'root' })
export class PagosService {
    private resourceUrl =  'http://172.80.13.28:1336/api/validate/';

    constructor(private http: HttpClient) {}

    getConsulta(): any {
      console.log(this.http);
        return this.http.post(`${this.resourceUrl}`, { observe: 'response' });
    }

}
