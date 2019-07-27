import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Validators, FormGroup, FormControl, ValidatorFn, AbstractControl} from '@angular/forms';
import {Router} from '@angular/router';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
declare var M: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  @Output() componentStatus = new EventEmitter<boolean>();
  private paymentForm: FormGroup;

  constructor(private router?: Router, private apollo?: Apollo){
  }

  ngOnInit() {
    this.paymentForm = new FormGroup({
      folio: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern('^[0-9]{11}$')
        ]
      }),
      capture_line: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern('^[0-9]{19}$'),
          this.match(this)
        ]
      }),
      key_concept: new FormControl('', Validators.required)
    });
  };

  private match(form: any): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      if(!form.paymentForm)
        return null;
      let folio = form.paymentForm.controls.folio.value;
      let split = control.value.indexOf(folio, 0);
      return split != 0 ? {'capture_line': {value: control.value}} : null;
    }
  }

  private sendStatus(status: boolean):void {
    this.componentStatus.emit(status);
  }
}
