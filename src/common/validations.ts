import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { Types } from 'mongoose';

/* Contains: uppercase + lowercase latin character, digit. Min length is 10 */
export const regExpPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{10,}$/;
export const regExpFileName = /^[\w\s-.()]{1,50}$/;

export function IsObjectIdString(validationOptions?: ValidationOptions) {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      name: 'IsObjectIdString',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate: (id: any): boolean => Types.ObjectId.isValid(id),
        defaultMessage: (validationArguments?: ValidationArguments): string =>
          `${validationArguments.property} must be an ObjectId`,
      },
    });
  };
}
