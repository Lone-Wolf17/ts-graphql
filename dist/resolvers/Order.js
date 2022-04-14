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
exports.OrderResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Order_1 = require("../entities/Order");
const order_input_1 = require("./types/order-input");
const Product_1 = require("../entities/Product");
let OrderResolver = class OrderResolver {
    async returnSingleProduct(id) {
        return await Order_1.OrderModel.findById(id);
    }
    async returnAllOrder() {
        return await Order_1.OrderModel.find();
    }
    async createOrder({ user_id, date, payde }) {
        const order = (await Order_1.OrderModel.create({
            user_id,
            date,
            payde
        })).save();
        return order;
    }
    async deleteOrder(id) {
        await Order_1.OrderModel.deleteOne({ id });
        return true;
    }
    async products(order) {
        console.log(order, 'Order!');
        return (await Product_1.ProductModel.findById(order._doc.products));
    }
};
__decorate([
    (0, type_graphql_1.Query)((_returns) => Order_1.Order, { nullable: false }),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "returnSingleProduct", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Order_1.Order]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "returnAllOrder", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Order_1.Order),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_input_1.OrderInput]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "createOrder", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "deleteOrder", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => Product_1.Product),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Order_1.Order]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "products", null);
OrderResolver = __decorate([
    (0, type_graphql_1.Resolver)((_of) => Order_1.Order)
], OrderResolver);
exports.OrderResolver = OrderResolver;
