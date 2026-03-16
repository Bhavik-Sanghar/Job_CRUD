const db = require("./db");
// const dataMap = ;

async function getData(id) {
    data = []
    const query1 = `select applicant_id, first_name, last_name, designation ,address1, address2, email, phone, city, state, zip_code, gender ,relationship_status, dob, notice_period, department, current_ctc, expected_ctc from applicants`    
    const [rows] = await db.query(query1);
    
    // const query2 = `select applicant_id,course,passing_year,university,result from education group by applicant_id`;
    // const [rows2 ] = await db.query(query2);
    
    // console.log(rows);
    for( r of rows){
        data.push(r);
    }
    return data;

    // eduction = []
    console.log(rows2);
    // console.log(data);
} 

module.exports = {getData}

// async function getAllApplicants() {
//     // 1. Fetch everything from all tables in parallel
//     const [
//         [applicants],
//         [education],
//         [experience],
//         [skills]
//     ] = await Promise.all([
//         db.query(`SELECT * FROM applicants`),
//         db.query(`SELECT * FROM education`),
//         db.query(`SELECT * FROM experience`),
//         db.query(`SELECT * FROM skills`)
//     ]);

//     // 2. Create a Map for quick lookup
//     // This turns the flat applicants array into an object keyed by ID
//     const applicantMap = {};
    
//     applicants.forEach(app => {
//         applicantMap[app.id] = { ...app, education: [], experience: [], skills: [] };
//     });

//     // 3. Distribute the "child" data into the correct applicant
//     education.forEach(edu => {
//         if (applicantMap[edu.applicant_id]) {
//             applicantMap[edu.applicant_id].education.push(edu);
//         }
//     });

//     experience.forEach(exp => {
//         if (applicantMap[exp.applicant_id]) {
//             applicantMap[exp.applicant_id].experience.push(exp);
//         }
//     });

//     // ... repeat for other tables (skills, etc.)

//     // 4. Return as a clean array
//     return Object.values(applicantMap);
// }
