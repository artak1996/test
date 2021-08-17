import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes ,Types} from 'mongoose';
import { ItemInterface } from './interfaces/item.interface';
import { CategorySchema, Category, CategorySchemaName } from '../categories/categories.schema';


@Schema({ versionKey: false, timestamps: true })
export class Item implements ItemInterface {
  @Prop({  })
  name: string;

  @Prop()
  price: number;

  @Prop()
  image: string;

  @Prop()
  available: boolean;

  @Prop({
    ref: 'Category',
    type: SchemaTypes.ObjectId,
  })
  categoryId: Types.ObjectId;
}

export type ItemDocument = Item & Document
export const ItemSchemaName = Item.name;
export const ItemSchema = SchemaFactory.createForClass(Item);