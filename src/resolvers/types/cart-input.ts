import { InputType, Field, ID } from 'type-graphql';
import { Cart } from '../../entities/Cart';

import { ObjectId } from 'mongoose';

@InputType()
export class CartInput implements Partial<Cart> {
  @Field(() => ID)
  products!: ObjectId;
}