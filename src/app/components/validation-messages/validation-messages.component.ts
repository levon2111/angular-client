import {Component, Input, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ValidationService} from '../../services/validation.service';

@Component({
  selector: 'app-validation-messages',
  templateUrl: './validation-messages.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ValidationMessagesComponent {

  errorMessages: string;
  @Input() control: FormControl;
  @Input() valid: boolean;

  constructor() {
  }

  get errorMessage() {
    for (const propertyName in this.control.errors) {
      if ((this.control.errors.hasOwnProperty(propertyName) && this.control.touched) || (this.control.errors.hasOwnProperty(propertyName) && this.valid)) {
        return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }

    return null;
  }

}
