import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Payments } from './payments';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  private apiurl: string = 'http://wservices.semovioaxaca.gob.mx/api/payments/validate';

  constructor(private http: HttpClient) {}

  public validate(paymentsModel: Payments){
    return this.http.post(this.apiurl, paymentsModel);
  }
}
