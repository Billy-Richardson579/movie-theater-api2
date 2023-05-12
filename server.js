const {app} = require("./src/app");
const { db } = require("./db/connection")
const port = 3000;
const seed = require("./seed")

app.listen(port, async() => {
    await db.sync({force:true});
    await seed()
    console.log(`Listening at http://localhost:${port}/`)
})