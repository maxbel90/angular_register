import {FormControl} from '@angular/forms';


export function checkCurrentPasswordValidator(currentValue: string) {

  return function checkCurrentPassword(thisControl: FormControl) {
    if (thisControl.value !== currentValue) {
      return {
        equals: false
      };
    }

    return null;
  }
}
