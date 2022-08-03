
import { Injectable } from '@nestjs/common';
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { existsSync } from 'fs';
import { resolve } from 'path';

export function getEnvPath(dest: string): string {
    const env: string | undefined =   process.env.NODE_ENV.toLowerCase();
    const fallback: string = resolve(`${dest}/config/config.cfg`);
    const filename: string = env ? `${env}.config.cfg` : '/config/config.cfg';
    let filePath: string = resolve(`${dest}/config/${filename}`.toLowerCase());
    console.log("ddd:",filePath)
    if (!existsSync(filePath)) {
      filePath = fallback;
    }
  
    return filePath;
  }
export class  Util{
  static randomString(len:number, charSet?:string) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}
static generateOTP(max) {
  const NUMERIC_STRING = "0123456789";
  var otp = "";
  for (let i = 0; i < max; i++) {
      let pos = Math.floor(Math.random() * (NUMERIC_STRING.length + 1));
      while (pos == null || pos == undefined || pos >= NUMERIC_STRING.length) {
          pos = Math.floor(Math.random() * (NUMERIC_STRING.length + 1));
      }
      otp += NUMERIC_STRING[pos];
  }
  return otp;
}

}

class AppUtilities {
  static convertPhoneToInternationalAnnotation(prefix, phone, message) {
      try {
          phone = phone.trim().replace("/+/g", "");
          if (phone.startsWith("00")) {
              phone = phone.substring(2, phone.length - 1);
          }
          if (phone.startsWith("0")) {
              phone = prefix + phone.substring(1, phone.length);
          }
          if (phone.trim().length <= 0) {
              throw message;
          }
      }
      catch (e) {
          phone = null;
      }
      if (phone == null) {
          throw message;
      }
      return phone;
  }
  static controlStringValue(value, message) {
      if (value == null || (value != null && value.trim().length <= 0)) {
          throw message;
      }
  }
  static controlNumberValue(value, message) {
      if (value == null || (value != null && value <= 0)) {
          throw message;
      }
  }
  static removeNullFromArray(arr: any) {
        let narw: Array<any> = [];
        
        for (const e of arr) {
            if(e){
                narw.push(e);
            }
        }
        return narw;

        
    }
    /*
    removeRole(r: Role) {

        this.selectedRoles.forEach((e, i) => {
          if (e.id == r.id) {
            this.selectedRoles.splice(i, 1);
            return;
          }
        })
      }*/

}

export function Match(property?: string, validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            name : 'MatchPassword',
            options: validationOptions,
            constraints: [property],
            validator: MatchConstraint,
        });
    };
}

export function IsValidPwd(property?: string, validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            name : 'PasswordValids',
            propertyName,
            options: validationOptions,
            constraints: [property],
            validator: PasswordValidConstraint,
        });
    };
}

@ValidatorConstraint({name: 'PasswordValids', async: true })
@Injectable()
export class PasswordValidConstraint implements ValidatorConstraintInterface {

    validate(value: any, args: ValidationArguments) {
        let reg  = new RegExp(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/);
        
        //const [relatedPropertyName] = args.constraints;
        //const relatedValue = (args.object as any)[relatedPropertyName];
        return reg.test(value);
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return "Bad password";
    }

}
//

@ValidatorConstraint({name: 'MatchPassword', async: true })
@Injectable()
export class MatchConstraint implements ValidatorConstraintInterface {

    validate(value: any, args: ValidationArguments) {
        const [relatedPropertyName] = args.constraints;
        console.log("epppp", value);
        const relatedValue = (args.object as any)[relatedPropertyName];
        return value === relatedValue;
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return "Password and confirmation pasword don't match"
    }
}

import { Transform } from "class-transformer";

export default function TransformDate() {
  const toPlain = Transform((value) => (value as unknown as Date).getTime(), {
    toPlainOnly: true,
  });

  const toClass = Transform((value:any) => new Date(value), {
    toClassOnly: true,
  });

  return function (target: any, key: string) {
    toPlain(target, key);
    toClass(target, key);
  };
}