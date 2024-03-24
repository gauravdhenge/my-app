const { userData } = require('../models/user')

async function handleGetAlluserData(req, res) {
    const allDbUsers = await userData.find({});
    return res.status(200).json(allDbUsers);
}

async function handleGetUserById(req, res) {
    const userById = await userData.findById(req.params.id)
    if (!userById) {
        return res.status(400).json({ msg: "User not Found" });
    }
    else {
        return res.json(userById);
    }
}

async function handlefindByIdAndUpdate(req, res) {
    await userData.findByIdAndUpdate(req.params.id, { last_name: "Changed" })
    return res.json({ status: "User has been updated" });
}

async function handlefindByIdAndDelete(req, res) {
    await userData.findByIdAndDelete(req.params.id)
    return res.json({ status: "User Deleted Sucessfully" });
}

async function handlePostRequest(req, res) {
    const body = req.body;
    if (!body || !body.first_name || !body.last_name || !body.email || !body.job_title) {
        return res.status(400).json({ msg: "Please send all parameters" })
    }
    await userData.create({ first_name: body.first_name, last_name: body.last_name, email: body.email, job_title: body.job_title });
    return res.status(201).json({ msg: "Sucess" });
}

module.exports = { handleGetAlluserData, handleGetUserById, handlefindByIdAndUpdate, handlefindByIdAndDelete, handlePostRequest }