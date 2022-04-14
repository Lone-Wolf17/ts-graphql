import {
    Resolver, Mutation, Arg, Query, FieldResolver, Root
} from 'type-graphql';

import { OrderModel, Order } from '../entities/Order';
import { OrderInput } from './types/order-input';
import { ProductModel, Product } from '../entities/Product';

@Resolver((_of) => Order)
export class OrderResolver {
    @Query((_returns) => Order, {nullable: false})
    async returnSingleProduct(@Arg('id') id: string) : Promise<Order|null> {
        return await OrderModel.findById(id);
    }

    @Query(() => [Order])
    async returnAllOrder() : Promise<Order[]> {
        return await OrderModel.find();
    }

    @Mutation(() => Order)
    async createOrder(
        @Arg('data') {user_id, date, payde} : OrderInput
    ) : Promise<Order> {
        const order = (
            await OrderModel.create({
                user_id,
                date,
                payde
            })
        ).save();
        return order;
    }

    @Mutation(() => Boolean)
    async deleteOrder(@Arg('id')id : string) : Promise<boolean> {
        await OrderModel.deleteOne({id});
        return true;
    }

    @FieldResolver((_type) => Product)
    async products (@Root() order : Order) : Promise<Product> {
        console.log(order, 'Order!');
        return (await ProductModel.findById(order._doc.products))!;
    }
}