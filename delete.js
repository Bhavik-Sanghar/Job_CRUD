const db = require("./db");
async function userDel(id) {
const del_user = `DELETE FROM applicants WHERE applicant_id = ?`;
try {
    let [res] = await db.query(del_user,[id])
    console.log(`User DEL DONE !!`);
} catch (error) {
    console.log(error);
}
}

module.exports = {userDel}