import { Resolver, Mutation, Arg, Query, FieldResolver, Root } from "type-graphql";

import { UserModel, User } from "../entities/User";
import { UserInput } from "./types/user-input";
import { CartModel, Cart } from "../entities/Cart";

@Resolver((_of) => User)
export class UserResolver {
    @Query((_returns) => User, {nullable: false})
    async returnSingleUser(@Arg('id') id : string) : Promise<User|null>{
        return await UserModel.findById(id);
    }

    @Query(() => [User])
    async returnAllUsers() : Promise<User[]> {
        return await UserModel.find();
    }

    @Mutation(() => User)
    async createUser(
        @Arg('data') {username, email, cart_id} : UserInput 
    ) : Promise<User> {
        const user = (await UserModel.create({
            username,
            email, cart_id
        })).save();
        return user;
    }

    @Mutation(() => Boolean)
    async deleteUser(@Arg('id')id : string) {
        await UserModel.deleteOne({id});
        return true;
    }

    @FieldResolver((_type) => Cart)
    async cart(@Root() user : User) : Promise<Cart> {
        console.log(user, 'User!');
        return (await CartModel.findById(user._doc.cart_id))!;
    }
}