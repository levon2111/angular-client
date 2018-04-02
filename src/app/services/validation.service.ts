import {Injectable} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Injectable()
export class ValidationService {
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    const config = {
      'required': 'This field is required.',
      'invalidUrl': 'Invalid URL.',
      'invalidExpireDateFormat': 'The expire date format is not correct!\n',
      'expireHasPassed': 'The expiry date has passed.\n',
      'invalidCardMember': 'invalid Card Member.',
      'invalidNumber': 'invalid number.',
      'invalidYear': 'Please enter correct year.',
      'invalidPhoneNumber': 'invalid phone number.',
      'invalidCreditCard': 'Is invalid credit card number.',
      'invalidEmailAddress': 'Invalid email address.',
      'invalidPassword': 'Invalid password. Password must be at least 8 characters long, and contain a number.',
      'confirm_password_message': 'Passwords do not match.',
      'minlength': `Minimum length ${validatorValue.requiredLength}.`
    };

    return config[validatorName];
  }


  static matchPassword(AC: AbstractControl) {
    const password = AC.get('password').value;

    const confirmPassword = AC.get('repeat_password').value;
    if (password !== confirmPassword) {
      AC.get('repeat_password').setErrors({confirm_password_message: true});
      return {'confirm_password_message': true};
    } else {
      return null;
    }
  }

  static creditCardValidator(control) {
    if (control.value && control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
      return null;
    } else {
      return {'invalidCreditCard': true};
    }
  }

  static emailValidator(control) {
    if (control.value && control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return {'invalidEmailAddress': true};
    }
  }

  static required(control) {
    if (control.value) {
      return null;
    } else {
      return {'required': true};
    }
  }

  static passwordValidator(control) {
    if (control.value && control.value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
      return null;
    } else {
      return {'invalidPassword': true};
    }
  }

  static urlValidator(control) {
    if (control.value && control.value.match(/(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/)) {
      return null;
    } else {
      return {'invalidUrl': true};
    }
  }

  static numberValidator(control) {
    if (control.value && control.value.match(/^\d+$/)) {
      return null;
    } else {
      return {'invalidNumber': true};
    }
  }

  static yearValidator(control) {
    const date = new Date(Date.now());
    const year = date.getFullYear().toString();
    const untilFirst = year[2];
    const untilLast = year[3];
    const until = year.slice(-2);
    const pattern = new RegExp('^(18[0-9][0-9]|19[0-9][0-9]|200[0-9]|20[0-' + untilFirst + '][0-' + untilLast + '])$');
    if ((control.value && pattern.test(control.value)) || !control.value) {
      return null;
    } else {
      return {'invalidYear': true};
    }
  }

  static cardMember(control) {
    const phoneExpression = /^\d{4}$/;
    if (control.value && control.value.match(phoneExpression)) {
      return null;
    } else {
      return {'invalidCardMember': true};
    }
  }

  static expiryDate(control) {
    const expire = control.value;
    if (expire && !expire.match(/(0[1-9]|1[0-2])[-][0-9]{2}/)) {
      return {'invalidExpireDateFormat': true};
    } else if (expire) {
      const d = new Date();
      const currentYear = d.getFullYear();
      const currentMonth = d.getMonth() + 1;
      const parts = expire.split('-');
      const year = parseInt(parts[1], 10) + 2000;
      const month = parseInt(parts[0], 10);
      if (year < currentYear || (year === currentYear && month < currentMonth)) {
        return {'expireHasPassed': true};
      } else {
        return null;
      }
    }
  }
}
