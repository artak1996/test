import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EmailStatuses, UserInterface } from './interfaces/user.interface';
import { isEmail } from 'class-validator';
import { Document } from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class User implements UserInterface {
  @Prop({ required: true, unique: true, trim: true, maxlength: 50 })
  name: string;

  @Prop({
    required: true,
    lowercase: true,
    unique: true,
    trim: true,
    validate: {
      validator: (email) => isEmail(email),
      message: (props) => `${props.value} is not a valid email!`,
    },
  })
  email: string;

  @Prop({ enum: EmailStatuses, default: EmailStatuses.NOT_VERIFIED })
  status: EmailStatuses;

  @Prop()
  password: string;

  @Prop()
  avatar: string;
}

export type UserDocument = User & Document
export const UserSchemaName = User.name;
export const UserSchema = SchemaFactory.createForClass(User);