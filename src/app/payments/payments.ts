export class Payments {
  public folio: string;
  public capture_line: string;
  public key_concept: string;
  public concept: string;
  public contributor: string;
  public detail: string;
  public payment_date: string;
  public status_payment: string;
  public total_payment: string;
  public error;

  /**
   * @param key_concept :string
  */
  constructor(key_concept: string){
    this.key_concept = key_concept;
    this.folio = '';
    this.capture_line = '';
  }

  /**
   * @param folio: string
   * @param capture_line: string
   * @param rate_sheet: string
  */
  public setInitValues(folio: string, capture_line: string):void {
    this.folio = folio;
    this.capture_line = capture_line;
  }

  /**
   * @param object Object Api Response
  */
  public setAllValues(object): void{
    for (var property in object.data) {
      if (object.data.hasOwnProperty(property)) {
        this[property] = object.data[property];
      }
    }
  }
}
