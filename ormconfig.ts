import { User } from "src/user/entities/user.entity"
import { DataSource, DataSourceOptions } from "typeorm"

export const dataSourceOptions: DataSourceOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "mypassword",
    database: "nest_api",
    entities: [User],
    synchronize: true
}
