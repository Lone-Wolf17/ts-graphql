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
exports.ProductResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Product_1 = require("../entities/Product");
const product_input_1 = require("./types/product-input");
const Categories_1 = require("../entities/Categories");
let ProductResolver = class ProductResolver {
    async returnSingleProduct(id) {
        return await Product_1.ProductModel.findById(id);
    }
    async returnAllProduct() {
        return await Product_1.ProductModel.find();
    }
    async createProduct({ name, description, color, stock, price, category_id }) {
        const product = (await Product_1.ProductModel.create({
            name, description, color, stock, price, category_id
        })).save();
        return product;
    }
    async deleteProduct(id) {
        await Product_1.ProductModel.deleteOne({ id });
        return true;
    }
    async category(product) {
        console.log(product, 'product!');
        return (await Categories_1.CategoriesModel.findById(product._doc.category_id));
    }
};
__decorate([
    (0, type_graphql_1.Query)((_returns) => Product_1.Product, { nullable: false }),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "returnSingleProduct", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Product_1.Product]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "returnAllProduct", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Product_1.Product),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_input_1.ProductInput]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "createProduct", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "deleteProduct", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => Categories_1.Categories),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Product_1.Product]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "category", null);
ProductResolver = __decorate([
    (0, type_graphql_1.Resolver)((_of) => Product_1.Product)
], ProductResolver);
exports.ProductResolver = ProductResolver;
