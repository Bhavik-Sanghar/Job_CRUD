const db = require("./db");

let last_id = null;

async function insertApplicant(data) {
  const insert = ` INSERT INTO applicants
    (first_name, last_name, designation ,address1, address2, email, phone, city, state, zip_code, gender ,relationship_status, dob, notice_period, department, current_ctc, expected_ctc)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    const [res] = await db.query(insert, [
      data.f_name,
      data.l_name,
      data.designation,
      data.address_1,
      data.address_2,
      data.email,
      data.phone,
      data.city,
      data.state,
      data.zip_code,
      data.gender,
      data.relationship_status,
      data.dob,
      data.notice_period,
      data.dept,
      data.current_CTC,
      data.expacted_CTC,
    ]);

    last_id = res.insertId;
    console.log(`basic info added`);
  } catch (err) {
    throw err;
  }
}

async function insertEdu(data) {
  const edu_insert = `INSERT INTO education (applicant_id,course,passing_year,university,result)
    VALUES (?,?,?,?,?)`;
  try {
    const [res] = await db.query(edu_insert, [
      last_id,
      data.course,
      data.year,
      data.university,
      data.result,
    ]);
    console.log(`edu added`);
  } catch (err) {
    throw err;
  }
}

async function insertWork(data) {
  const work_insert = `INSERT INTO work_experience (applicant_id,company,designation,from_date,to_date,package,reason,ref_contact,ref_name)
    VALUES (?,?,?,?,?,?,?,?,?)`;
  try {
    const [res] = await db.query(work_insert, [
      last_id,
      data.company,
      data.designation,
      data.from,
      data.to,
      data.package,
      data.reason,
      data.ref_contact,
      data.ref_name,
    ]);
    console.log(`work added`);
  } catch (err) {
    throw err;
  }
}

async function insertLang(data) {
  const lang_insert = `INSERT INTO languages (applicant_id,language_name,can_read, can_write, can_speak)
    VALUES (?,?,?,?,?)`;
  for (const [langName, ability] of Object.entries(data)) {
    if (ability.selected == "on") {
      try {
        const [res] = await db.query(lang_insert, [
          last_id,
          langName,
          ability.read === "on" ? 1 : 0,
          ability.write === "on" ? 1 : 0,
          ability.speak === "on" ? 1 : 0,
        ]);
        console.log(`Language added`);
      } catch (err) {
        throw err;
      }
    }
  }
}

async function insertSkill(data) {
  const skill_insert = `INSERT INTO technologies (applicant_id,technology,level)
    VALUES (?,?,?)`;
  for (const [skillName, details] of Object.entries(data)) {
      if (details.selected) {
      try {
        const [res] = await db.query(skill_insert, [
          last_id,
          skillName,
          details.level
        ]);
        console.log(`Skill added`);
      } catch (err) {
        throw err;
      }
    }
  }
}

async function insertPL(data) {
  const pl_insert = `INSERT INTO preferred_locations (applicant_id,location)
    VALUES (?,?)`;
  try {
    const [res] = await db.query(pl_insert, [
      last_id,
      data
    ]);
    console.log(`location added`);
  } catch (err) {
    throw err;
  }
}

// ref_name_1: '',
//   ref_con_1: '',
//   ref_rel_1: '',
//   ref_name_2: '',
//   ref_con_2: '',
//   ref_rel_2: '',



async function insertRef(data) {
  const ref_insert = `INSERT INTO references_contact (applicant_id,name,contact,relation)
    VALUES (?,?,?,?)`;
  try {
    const [res] = await db.query(ref_insert, [
      last_id,
      data.ref_name_1,
      data.ref_con_1,
      data.ref_rel_1
    ]);
    console.log(`Ref 1 added`);
  } catch (err) {
    throw err;
  }

  try {
    const [res] = await db.query(ref_insert, [
      last_id,
      data.ref_name_2,
      data.ref_con_2,
      data.ref_rel_2
    ]);
    console.log(`Ref 2 added`);
  } catch (err) {
    throw err;
  }
}


module.exports = { insertApplicant, insertEdu, insertWork, insertLang , insertSkill , insertPL , insertRef};
