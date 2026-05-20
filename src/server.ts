import { app } from "./app"
import config from "./config"
import { initDB } from "./db"

const main = () => {
    initDB()

    const { port } = config

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

main()