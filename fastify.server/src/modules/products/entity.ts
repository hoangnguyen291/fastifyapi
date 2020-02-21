import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity
} from "typeorm"
import { ObjectType, Field, ID } from "type-graphql";

@Entity()
@ObjectType()
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    @Field(() => ID)
    id: string

    @Column()
    @Field(() => String)
    name: string

    @Column()
    @Field(() => String)
    image: string

    @Column()
    @Field(() => Number)
    expires_in: number

    @Column()
    @Field(() => String)
    unit: string

    @CreateDateColumn()
    @Field(() => String)
    created_at: string

    @UpdateDateColumn()
    @Field(() => String)
    updated_at: string
}
