import { listProductsSchema, deleteProductSchema, postProductSchema } from "./schema"
// import product from './entity';
export default (server, options, next) => {
    server.get(
        "/products",
        { schema: listProductsSchema, preValidation: [server.authenticate] },
        async (req, res) => {
            req.log.info(`list products from db`)

            console.log("----")

            console.log(server.db)
            console.log("----")

            // const products = await server.db.products.find()
            const products = await server.db.products.findOne(1)
            res.send(products)
        }
    )
    server.post(
        "/product",
        { schema: postProductSchema, preValidation: [server.authenticate] },
        async (req, res) => {
            const { name, id, image, expires_in, unit } = req.body
            if (!id) {
                return res.code(404).send("product not found")
            }

            // const product = await server.db.products.findOne(id)

            // if (!product) {
            //   return res.code(404).send("product not found")
            // }
            req.log.info(server)

            req.log.info(`save inventory to db`)
            // const product = await server.db.product.save({ name, id, image, unit })
            // const product = await server.orm
            //     // .getRepository(require('./entity'))
            //     .createQueryBuilder()
            //     .insert()
            //     .into(require('./entity'))
            //     .values([
            //         { name, id, image, unit }
            //     ])
            //     .execute();

            const product = await server.db.products.save({ name, id, image, expires_in, unit })

            //   return users;

            res.code(201).send(product)
        }
    )

    server.delete(
        "/products/:id",
        { schema: deleteProductSchema, preValidation: [server.authenticate] },
        async (req, res) => {
            req.log.info(`delete product ${req.params.id} from db`)
            const product = await server.db.products.findOne(req.params.id)
            await server.db.products.remove(product)
            res.code(200).send({})
        }
    )
    next()
}
