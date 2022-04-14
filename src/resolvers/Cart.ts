import { Resolver, Mutation, Arg, Query, FieldResolver, Root } from "type-graphql";

import { CartModel, Cart } from "../entities/Cart";
import { CartInput } from "./types/cart-input";
import { ProductModel, Product } from "../entities/Product";

@Resolver((_of) => Cart)
export class CartResolver {
    @Query((_returns) => Cart, {nullable: false})
    async returnsSingleCart(@Arg('id') id : string) : Promise<Cart|null> {
        return await CartModel.findById(id);
    }

    @Query(() => [Cart])
    async returnAllCart() : Promise<Cart[]>{
        return await CartModel.find();
    }

    @Mutation(() => Cart)
    async createCart(@Arg('data') {products}: CartInput) : Promise<Cart> {
        const cart = (
            await CartModel.create({
                products
            })
        ).save();
        return cart;
    }

    @Mutation(()=> Boolean)
    async deleteCart(@Arg('id') id: string) : Promise<boolean> {
        await CartModel.deleteOne({id});
        return true;
    }

    @FieldResolver((_type) => Product)
    async product (@Root() cart: Cart): Promise<Product> {
        console.log(cart, 'cart!');
        return (await ProductModel.findById(cart._doc.products))!;
    }
}