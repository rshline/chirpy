import { DataSource } from "typeorm"
import { Tweet } from "./entities/Tweet"
import { User } from "./entities/User"
require('dotenv').config()

const conn = new DataSource({
    type: 'postgres',
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    logging: true,
    synchronize: true,
    entities: [ User, Tweet ]
  })  

export default conn