const express = require("express");
const mongoose = require("mongoose");
const app = express();

const PORT = 8000;

//Schema define
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    }, last_name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false,
        unique: true
    },
    job_title: {
        type: String
    },
    gender: {
        type: String
    }
}, { timestamps: true });

//mongoose connection
mongoose.connect("mongodb://localhost:27017/myapp-1")
    .then(() => {
        console.log("mongo db connected")
    })
    .catch((err) => {
        console.log("Error Generated", err)
    });

const userData = mongoose.model("user", userSchema);

//adding url encodeing
app.use(express.urlencoded({ extended: false }));

//Routes
app.get("/api/users", async (req, res) => {
    const allDbUsers = await userData.find({});
    return res.status(200).json(allDbUsers);
});

app.get("/users", async (req, res) => {
    const allDbUsers = await userData.find({});
    const html = `
     <ul> 
       ${allDbUsers
            .map((user) => {
                return `<li>${user.first_name} - ${user.email}</li>`;
            })
            .join("")}
     </ul>
    `;
    res.send(html);
});

//handling post request
app.post("/api/users", async (req, res) => {
    const body = req.body;
    if (!body || !body.first_name || !body.last_name || !body.email || !body.job_title) {
        return res.status(400).json({ msg: "Please send all parameters" })
    }
    // users.push({ ...body, id: users.length + 1 });
    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    //     return res.status(201).json({ status: "User Added Sucessfully" });
    // });
    await user.create({ first_name: body.first_name, last_name: body.last_name, email: body.email, job_title: body.job_title });

    return res.status(201).json({ msg: "Sucess" });
});

app
    .route("/api/user/:id")
    .get(async (req, res) => {

        const userById = await userData.findById(req.params.id)

        if (!userById) {
            return res.status(400).json({ msg: "User not Found" });

        }
        else {
            return res.json(userById);
        }
        
    })
    .patch(async (req, res) => {
        await userData.findByIdAndUpdate(req.params.id, { last_name: "Changed" })
        return res.json({ status: "User has been updated" });
    })
    .delete(async (req, res) => {
        await userData.findByIdAndDelete(req.params.id)
        return res.json({ status: "User Deleted Sucessfully" });
    });

app.listen(PORT, () => {
    console.log(`Server started: ${PORT}`);
});

