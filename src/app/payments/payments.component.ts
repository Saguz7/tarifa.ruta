import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Validators, FormGroup, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';

import { PaymentsService } from './payments.service';
import { Payments } from './payments';

@Component({
  selector: 'semovi-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  @Input() IModel: Payments;
  @Output() Ostatus = new EventEmitter<any>();
  public paymentsForm: FormGroup;

  constructor(private paymentsService?: PaymentsService) {}

  ngOnInit() {
    this.paymentsForm = new FormGroup({
      folio: new FormControl(this.IModel.folio, {
        validators: [
          Validators.required,
          Validators.maxLength(11),
          Validators.pattern('^[0-9]{11}$')
        ]
      }),
      capture_line: new FormControl(this.IModel.capture_line, {
        validators: [
          Validators.required,
          Validators.maxLength(19),
          Validators.pattern('^[0-9]{19}$')
        ]
      })
    });

    $(document).ready(function(){
      $('input#folio').characterCounter();
    });
  }

  public match():boolean {
    let folio = this.paymentsForm.controls.folio.value;
    let capture_line = this.paymentsForm.controls.capture_line.value;
    return capture_line.indexOf(folio, 0) == 0 ? true : false;
  }

  public formIsValid():boolean {
    if(this.paymentsForm.valid)
      if(this.match())
        return true;
    return false;
  }

  public sendStatus(status: boolean):void {
    this.IModel.setInitValues(
      this.paymentsForm.controls.folio.value,
      this.paymentsForm.controls.capture_line.value
    );

    this.paymentsService.validate(this.IModel).subscribe((result) => {
      this.IModel.setAllValues(result);
      this.Ostatus.emit({status: true});

      (<HTMLInputElement>document.getElementById('folio')).disabled = true;
      (<HTMLInputElement>document.getElementById('capture_line')).disabled = true;
      (<HTMLInputElement>document.getElementById('formButton')).style.visibility = "hidden";
    }, (error) => {
      if(error.error.error.status >= 500){
        document.getElementById('formButton').style.visibility = "hidden";
      }
      this.Ostatus.emit(error.error);
    });

  }
}
