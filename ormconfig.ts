import { User } from "src/user/entities/user.entity"
import { DataSource } from "typeorm"

const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "mypassword",
    database: "nest_api",
    entities: [User],
    synchronize: true
})

AppDataSource.initialize()