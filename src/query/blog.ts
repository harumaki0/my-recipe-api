import { getConnection, createConnection,createQueryBuilder, getRepository } from "typeorm";
import { Blog } from "../entity/blog";

async function getBlogs() {
    const query = getConnection()
        .getRepository(Blog)
        .createQueryBuilder()
        .select()
        // .where("blog.blog_id = :id", { id: 1 });
    console.log(query.getSql())
    const blogs = await query.getMany();
    
    return blogs
}
export default getBlogs;

// (async function getBlog() {
//   const connection = await createConnection()

//     const userRepository = getRepository(Blog)
    
// const getBlog = await userRepository.find()
// await connection.close()
// })()