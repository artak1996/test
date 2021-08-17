import { Types } from 'mongoose';

export interface ItemInterface {
  categoryId?: Types.ObjectId;
  name: string;
  price: number;
  image?: string;
  available: boolean;
}
