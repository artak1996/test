import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CategoryInterface } from './interfaces/category.interface';
import { Document, SchemaTypes, Types } from 'mongoose';

@Schema({
  versionKey: false,
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
})
export class Category implements CategoryInterface {

  @Prop()
  name: string;

  @Prop({
    type: [SchemaTypes.ObjectId],
    ref: 'Item',
  })
  items: [Types.ObjectId];
}

export type CategoryDocument = Category & Document
export const CategorySchemaName = Category.name;
export const CategorySchema = SchemaFactory.createForClass(Category);