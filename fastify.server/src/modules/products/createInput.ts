import { InputType, Field } from "type-graphql";

@InputType()
export class CreateProductInput {
    @Field(() => String)
    name: string

    @Field(() => String)
    image: string

    @Field(() => Number)
    expires_in: number

    @Field(() => String)
    unit: string
}
