const express = require("express");
const path = require("path");

const {
  insertApplicant,
  insertEdu,
  insertWork,
  insertLang,
  insertSkill,
  insertPL,
  insertRef,
} = require("./query");

const { getData } = require("./fetchdata");

const { userDel } = require("./delete.js");

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/view", async (req, res) => {
  let id = req.query.id;
  const db_data = await getData(id);
  console.log(db_data);
  res.render("main", { db_data });
});

app.get("/delete-applicant", async (req, res) => {
  let id = req.query.id;
  const del_user = await userDel(id);
  res.redirect("/view");
});

app.post("/submit", async (req, res) => {
  const formData = req.body;

  console.log(formData);

  let insert = await insertApplicant(formData);

  let edu_data = req.body.education;
  if (edu_data) {
    for (const e of edu_data) {
      let edu_insert = await insertEdu(e);
    }
  }

  let work_data = req.body.work;
  if (work_data) {
    for (const w of work_data) {
      let work_insert = await insertWork(w);
    }
  }

  let langs = formData.languages;
  // console.log(langs);
  let lang_insert = await insertLang(langs);

  let skill = req.body.technologies;
  // console.log(skill);
  let skill_insert = await insertSkill(skill);

  let preferd_location = req.body.preferd_location;
  if (Array.isArray(preferd_location)) {
    for (const pl of preferd_location) {
      let pl_insert = await insertPL(pl);
    }
  } else {
    let insert_one_pl = await insertPL(preferd_location);
  }

  let ref_insert = await insertRef(formData);

  console.log(`Data insertion done`);
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
