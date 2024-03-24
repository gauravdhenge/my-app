const express = require("express");
const { handleGetAlluserData, handleGetUserById, handlefindByIdAndUpdate, handlefindByIdAndDelete, handlePostRequest } = require('../controllers/user')
const router = express.Router();

// router.get("/users", async (req, res) => {
//     const allDbUsers = await userData.find({});
//     const html = `
//      <ul> 
//        ${allDbUsers
//             .map((user) => {
//                 return `<li>${user.first_name} - ${user.email}</li>`;
//             })
//             .join("")}
//      </ul>
//     `;
//     res.send(html);
// });

//handling post request

//Routes

router.route("/").get(handleGetAlluserData).post(handlePostRequest)

router
    .route("/:id")
    .get(handleGetUserById)
    .patch(handlefindByIdAndUpdate)
    .delete(handlefindByIdAndDelete);

module.exports = router;