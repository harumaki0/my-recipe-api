import { getConnection } from "typeorm";
import { Blog } from "../entity/blog";

const blog = await getConnection()
    .getRepository(Blog)
    .createQueryBuilder()
    .where("blog.blog_id = :id", { id: 1 })
    .getOne();

