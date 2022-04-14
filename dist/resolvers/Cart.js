"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Cart_1 = require("../entities/Cart");
const cart_input_1 = require("./types/cart-input");
const Product_1 = require("../entities/Product");
let CartResolver = class CartResolver {
    async returnsSingleCart(id) {
        return await Cart_1.CartModel.findById(id);
    }
    async returnAllCart() {
        return await Cart_1.CartModel.find();
    }
    async createCart({ products }) {
        const cart = (await Cart_1.CartModel.create({
            products
        })).save();
        return cart;
    }
    async deleteCart(id) {
        await Cart_1.CartModel.deleteOne({ id });
        return true;
    }
    async product(cart) {
        console.log(cart, 'cart!');
        return (await Product_1.ProductModel.findById(cart._doc.products));
    }
};
__decorate([
    (0, type_graphql_1.Query)((_returns) => Cart_1.Cart, { nullable: false }),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CartResolver.prototype, "returnsSingleCart", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Cart_1.Cart]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CartResolver.prototype, "returnAllCart", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Cart_1.Cart),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cart_input_1.CartInput]),
    __metadata("design:returntype", Promise)
], CartResolver.prototype, "createCart", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CartResolver.prototype, "deleteCart", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => Product_1.Product),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Cart_1.Cart]),
    __metadata("design:returntype", Promise)
], CartResolver.prototype, "product", null);
CartResolver = __decorate([
    (0, type_graphql_1.Resolver)((_of) => Cart_1.Cart)
], CartResolver);
exports.CartResolver = CartResolver;
