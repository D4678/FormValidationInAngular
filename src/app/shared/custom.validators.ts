import { AbstractControl } from "@angular/forms";

export class Customvalidators{
    static emailDomain(control:AbstractControl):{[key:string]:any} | null {
        const email: string = control.value;
        const domain = email.substring(email.lastIndexOf('@') + 1)
        if(email === '' || domain.toLowerCase()==='gmail.com') {
          return null;
        }else {
          return {'emailDomain': true};
        }
      }
      
}