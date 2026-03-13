const eduTable = document.getElementById("edu");
const addEduBtn = document.getElementById("add_edu");
const delEduBtn = document.getElementById("del_edu");

let eduIndex = 0;


const languages = ["Hindi", "English", "Gujarati"];
const skills = ["PHP", "JAVA", "SQL", "Node"];


addEduBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const tbody = eduTable.querySelector("tbody");

  const row = document.createElement("tr");

  row.innerHTML = `
    <td><input type="text" name="education[${eduIndex}][course]" required></td>
    <td><input type="text" name="education[${eduIndex}][year]" required></td>
    <td><input type="text" name="education[${eduIndex}][university]" required></td>
    <td><input type="text" name="education[${eduIndex}][result]" required></td>
  `;
  console.log(row);
  
  tbody.appendChild(row);
  // const courseInputs = form.querySelectorAll(
  //   'input[name^="education"][name$="[course]"]',
  // );
  // console.log(courseInputs);
  // courseInputs.forEach(e =>{
  //  console.log(e);
  // })
  eduIndex++;
});

delEduBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const tbody = eduTable.querySelector("tbody");
  const rows = tbody.querySelectorAll("tr");

  if (rows.length > 2) {
    tbody.removeChild(rows[rows.length - 1]);
    eduIndex--;
  }
});

const workTable = document.getElementById("work");
const addWorkBtn = document.getElementById("add_work");
const delWorkBtn = document.getElementById("del_work");

let workIndex = 0;

addWorkBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const tbody = workTable.querySelector("tbody");

  const row = document.createElement("tr");

  row.innerHTML = `
    <td><input type="text" name="work[${workIndex}][company]" required></td>
    <td><input type="text" name="work[${workIndex}][designation]" required></td>
    <td><input type="date" name="work[${workIndex}][from]" required></td>
    <td><input type="date" name="work[${workIndex}][to]" required></td>
    <td><input type="text" name="work[${workIndex}][package]" required></td>
    <td><input type="text" name="work[${workIndex}][reason]" required></td>
    <td><input type="text" name="work[${workIndex}][ref_contact]" required></td>
    <td><input type="text" name="work[${workIndex}][ref_name]" required></td>
  `;

  tbody.appendChild(row);
  workIndex++;
});

delWorkBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const tbody = workTable.querySelector("tbody");
  const rows = tbody.querySelectorAll("tr");

  if (rows.length > 2) {
    tbody.removeChild(rows[rows.length - 1]);
    workIndex--;
  }
});

const tech_table = document.getElementById("tech");


skills.forEach((tech) => {

  const row = tech_table.insertRow(-1);

  row.innerHTML = `
    <td>
      <input type="checkbox" class="tech-main" data-tech="${tech}" 
      name="technologies[${tech.toLowerCase()}][selected]" value="${tech}"> ${tech}
    </td>

    <td>
      <input type="radio" class="tech-level" data-tech="${tech}" 
      name="technologies[${tech.toLowerCase()}][level]" value="Beginner" disabled> Beginner
    </td>

    <td>
      <input type="radio" class="tech-level" data-tech="${tech}" 
      name="technologies[${tech.toLowerCase()}][level]" value="Intermediate" disabled> Intermediate
    </td>

    <td>
      <input type="radio" class="tech-level" data-tech="${tech}" 
      name="technologies[${tech.toLowerCase()}][level]" value="Expert" disabled> Expert
    </td>
  `;

});

const lang_table = document.getElementById("lang");

languages.forEach((e) => {

  const row = lang_table.insertRow(-1);

  row.innerHTML = `
    <td>
      <input type="checkbox" class="lang-main" data-lang="${e}" name="languages[${e.toLowerCase()}][selected]"> ${e}
    </td>

    <td>
      <input type="checkbox" class="lang-level" data-lang="${e}" name="languages[${e.toLowerCase()}][read]" disabled> Read
    </td>

    <td>
      <input type="checkbox" class="lang-level" data-lang="${e}" name="languages[${e.toLowerCase()}][write]" disabled> Write
    </td>

    <td>
      <input type="checkbox" class="lang-level" data-lang="${e}" name="languages[${e.toLowerCase()}][speak]" disabled> Speak
    </td>
  `;
});

document.addEventListener("change", function(e){

  if(e.target.classList.contains("lang-main")){

    const lang = e.target.dataset.lang;

    const levels = document.querySelectorAll(
      `.lang-level[data-lang="${lang}"]`
    );

    levels.forEach(level => {
      level.disabled = !e.target.checked;

      if(!e.target.checked){
        level.checked = false;
      }
    });

  }

  if(e.target.classList.contains("tech-main")){

    const tech = e.target.dataset.tech;

    const levels = document.querySelectorAll(
      `.tech-level[data-tech="${tech}"]`
    );

    levels.forEach(level => {

      level.disabled = !e.target.checked;

      if(!e.target.checked){
        level.checked = false;
      }

    });

  }

});


// languages.forEach((e) => {
//   const row = lang_table.insertRow(-1);
//   row.innerHTML = `<td><input type="checkbox" name="lang[${e}]">${e}</td>
//                     <td><input type="checkbox" name="lang[${e}][read]" value="lang[${e}][read]" disabled>Read</td>
//                     <td><input type="checkbox" name="lang[${e}][write]" value="lang[${e}][write]" disabled>Write</td>
//                     <td><input type="checkbox" name="lang[${e}][speak]" value="lang[${e}][speak]" disabled>Speak</td>`;
// });

// //enable read write speak when language is checked
// languages.forEach((e) => {

//   const langCheckbox = document.querySelector(`input[name="lang[${e}]"]`);
//   const readCheckbox = document.querySelector(`input[name="lang[${e}][read]"]`);
//   const writeCheckbox = document.querySelector(`input[name="lang[${e}][write]"]`);
//   const speakCheckbox = document.querySelector(`input[name="lang[${e}][speak]"]`);

//   langCheckbox.addEventListener("change", function () {

//     if (this.checked) {
//       readCheckbox.disabled = false;
//       writeCheckbox.disabled = false;
//       speakCheckbox.disabled = false;
//     } else {
//       readCheckbox.disabled = true;
//       writeCheckbox.disabled = true;
//       speakCheckbox.disabled = true;

//       readCheckbox.checked = false;
//       writeCheckbox.checked = false;
//       speakCheckbox.checked = false;
//     }

//   });

// });

// function showError(message) {
//     const errorDiv = document.getElementById("errorBox");
//     errorDiv.innerHTML += `<p>${message}</p>`;
// }

// const form = document.getElementById("job-application");

// form.addEventListener("submit",(e)=>{
//   e.preventDefault();

//   //val for basic info
//   const f_name = form.elements["f_name"];
//   const l_name = form.elements["l_name"];
//   const designation = form.elements["designation"];
//   const address_1 = form.elements["address_1"];
//   const email = form.elements["email"];
//   const phone = form.elements["phone"];

//   if(f_name.value.trim().length < 2){
//     console.log("First name is to short");
//     let error = document.createElement("small");
//     error.innerHTML = `First name is to short`;
//     f_name.insertAdjacentElement("afterend", error);
//     // setTimeout(()=>{
//     //   error.remove();
//     // },2000)
//     f_name.addEventListener("keydown",(e)=>{
//       error.remove();
//     })
//     f_name.focus();
//   }

//    if(l_name.value.trim().length < 2){
//     // console.log("Last name is to short");
//     let error = document.createElement("small");
//     error.innerHTML = `Last name is to short`;
//     f_name.insertAdjacentElement("afterend", error);
//     // setTimeout(()=>{
//     //   error.remove();
//     // },2000)
//     l_name.addEventListener("keydown",(e)=>{
//       error.remove();
//     })
//     l_name.focus();
//   }

//    if(address_1.value.trim() === ""){
//     // console.log("First name is to short");
//     let error = document.createElement("small");
//     error.innerHTML = `Address cant be NULL`;
//     address_1.insertAdjacentElement("afterend", error);
//     // setTimeout(()=>{
//     //   error.remove();
//     // },2000)
//     address_1.addEventListener("keydown",(e)=>{
//       error.remove();
//     })
//     address_1.focus();
//   }

// })
