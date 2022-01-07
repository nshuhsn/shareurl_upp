import mongoose from "mongoose"

mongoose.connect("mongodb://127.0.0.1:27017/wetube", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;
const handleOpen = () => console.log("💚 Connected to DB");
const handleError = (error) => console.log("❌ DB Error", error)
// on은 어떤일이 일어날때마다 실행 once는 딱 한번
db.on("error", handleError)

db.once("open", handleOpen)