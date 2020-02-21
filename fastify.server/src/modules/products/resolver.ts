import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Product } from "./entity";
import { CreateProductInput } from "./createInput";

@Resolver()
export class ProductResolver {
    @Query(() => [Product])
    products() {
        return Product.find()
    }
    @Mutation(() => Product)
    async createProduct(@Arg("data") data: CreateProductInput) {
        const book = Product.create(data);
        await book.save();
        return book;
    }
}