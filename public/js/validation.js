function showError(input, message) {
  // removeError();
  const error = document.createElement("small");
  error.style.color = "#e74c3c";
  error.innerHTML = `** ${message} **`;
  error.className = "error-message";

  //   input.insertAdjacentElement("afterend", error);
  //   input.parentNode.appendChild(error);
  input.parentElement.appendChild(error);
  input.addEventListener("change", removeError);

  input.focus();
}
function removeError() {
  document.querySelectorAll(".error-message").forEach((e) => e.remove());
}

function validateRequiredField(inp, message) {
  if (inp.value.trim() === "") {
    showError(inp, message);
    return false;
  }
  // removeError();
  return true;
}

function minLengthValidation(inp, minLength, message) {
  if (inp.value.trim().length < minLength) {
    showError(inp, message);
    return false;
  }
  // removeError();
  return true;
}

function emailValidation(inp, message) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(inp.value.trim())) {
    showError(inp, message);
    return false;
  }
  // removeError();
  return true;
}

function validatePhoneNumber(inp, message) {
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(inp.value.trim())) {
    showError(inp, message);
    return false;
  }
  // removeError();
  return true;
}

//zip code validation formate: 12345 or 12345-6789
function validateZipCode(inp, message) {
  const zipRegex = /^\d{6}(-\d{4})?$/;
  if (!zipRegex.test(inp.value.trim())) {
    showError(inp, message);
    return false;
  }
  // removeError();
  return true;
}

function validateDate(inp, message) {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  const currentDate = new Date();

  if (!dateRegex.test(inp.value.trim()) || new Date(inp.value) > currentDate) {
    showError(inp, message);
    return false;
  }
  // removeError();
  return true;
}

function validateYear(inp) {
  const yearRegex = /^\d{4}$/;
  const currentYear = new Date().getFullYear();

  if (!yearRegex.test(inp.value) || inp.value > currentYear) {
    showError(inp, `Enter valid Year`);
    return false;
  }
  return true;
}

function validateNumber(inp, message) {
  const numberRegex = /^\d+$/;
  if (!numberRegex.test(inp.value.trim())) {
    showError(inp, message);
    return false;
  }
  return true;
}

function validateResult(inp) {
  const resRegex = /^\d{0,3}\.\d{0,2}$/;

  if (!resRegex.test(inp.value) || inp.value === ".") {
    showError(inp, `Enter valid Result (e.g., 12.34)`);
    return false;
  }
  return true;
}
function validateDateRange(startInp, endInp) {
  const startDate = new Date(startInp.value);
  const endDate = new Date(endInp.value);

  // Check if either date is invalid (NaN)
  if (isNaN(startDate) || isNaN(endDate)) {
    showError(endInp, "Please enter valid dates");
    return false;
  }

  // Ensure start is strictly before end
  if (startDate >= endDate) {
    showError(endInp, "End date must be after start date");
    return false;
  }

  return true;
}

function radioValidation(inp) {
  const radioGroup = document.getElementsByName(inp);
  const container = document.getElementById(`${inp}-container`);

  for (let r of radioGroup) {
    if (r.checked) {
      return true;
    }
  }

  showError(container, `Please select a ${inp}`);
  return false;
}

const form = document.getElementById("job-application");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  removeError();

  const basicValid = basic_info_validation();
  const eduValid = education_validation();
  const workValid = work_validation();
  // const referenceValid = reference_validation();
  const prefValid = preferences_validation();
  const skillValid = skill_validation();
  const langValid = language_validation();

  if (
    basicValid &&
    eduValid &&
    workValid &&
    skillValid &&
    langValid &&
    prefValid 
    // referenceValid
    ) {
    form.submit();
  }
});

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   removeError();

// //   let valid = true;

//   //   let f_name = form.elements["f_name"];
//   //   valid = valid && validateRequiredField(f_name, "First name is required");
//   //   valid = valid && minLengthValidation(f_name, 2, "First name should be at least 2 characters long");
// let basicValid = basic_info_validation();
// let eduValid = education_validation();
// let workValid = work_validation();

// let valid = basicValid && eduValid && workValid;
//   //   education_validation();
//   //   valid = valid && reference_validation();
//   //   valid = valid && preferences_validation();

//   //   if (valid) {
//   //     form.submit();
//   //   }
// });

function basic_info_validation() {
  fields = [
    "f_name",
    "l_name",
    "designation",
    "address_1",
    "email",
    "phone",
    "city",
    "state",
    "zip_code",
    "dob",
    "gender",
    "relationship_status",
  ];
  let valid = true;
  for (field of fields) {
    let inp = form.elements[field];

    if (field === "gender") {
      if (!radioValidation(field)) {
        valid = false;
      }
      continue;
    }

    if (!validateRequiredField(inp, `${field} is required`)) {
      valid = false;
    }
    if (
      (field === "f_name" || field === "l_name") &&
      !minLengthValidation(
        inp,
        2,
        `${field} should be at least 2 characters long`,
      )
    ) {
      valid = false;
    }
    if (
      field === "email" &&
      !emailValidation(inp, "Please enter a valid email address")
    ) {
      valid = false;
    }
    if (
      field === "phone" &&
      !validatePhoneNumber(inp, "Please enter a valid 10-digit phone number")
    ) {
      valid = false;
    }
    if (
      field === "dob" &&
      !validateDate(inp, "Please enter a valid date of birth")
    ) {
      valid = false;
    }
    if (
      field === "zip_code" &&
      !validateZipCode(inp, "Please enter a valid zip code")
    ) {
      valid = false;
    }
  }
  return valid;
}

function education_validation() {
  let valid = true;
  const courseInputs = form.querySelectorAll(
    'input[name^="education"][name$="[course]"]',
  );

  const passYearInputs = form.querySelectorAll(
    'input[name^="education"][name$="[year]"]',
  );

  const uniInputs = form.querySelectorAll(
    'input[name^="education"][name$="[university]"]',
  );
  const resInputs = form.querySelectorAll(
    'input[name^="education"][name$="[result]"]',
  );

  courseInputs.forEach((input) => {
    let val = input.value;
    if (!validateRequiredField(input, `Course Name is required`)) {
      valid = false;
    }
    if (
      !minLengthValidation(input, 2, `Course Name must be more then 2 latters`)
    ) {
      valid = false;
    }
  });

  passYearInputs.forEach((input) => {
    let val = input.value;
    if (!validateYear(input)) {
      valid = false;
    }
  });

  uniInputs.forEach((input) => {
    if (!validateRequiredField(input, "University / Board name required")) {
      valid = false;
    }
  });

  resInputs.forEach((input) => {
    if (!validateResult(input)) {
      valid = false;
    }
  });
  return valid;
}

function work_validation() {
  let valid = true;
  const companyInputs = form.querySelectorAll(
    'input[name^="work"][name$="[company]"]',
  );

  const fromInputs = form.querySelectorAll(
    'input[name^="work"][name$="[from]"]',
  );
  const toInputs = form.querySelectorAll('input[name^="work"][name$="[to]"]');

  const anualSalaryInputs = form.querySelectorAll(
    'input[name^="work"][name$="[package]"]',
  );

  const reasonInputs = form.querySelectorAll(
    'input[name^="work"][name$="[reason]"]',
  );

  const refContactInputs = form.querySelectorAll(
    'input[name^="work"][name$="[ref_contact]"]',
  );

  const refNameInputs = form.querySelectorAll(
    'input[name^="work"][name$="[ref_name]"]',
  );

  companyInputs.forEach((input) => {
    if (!validateRequiredField(input, `Company Name is required`)) {
      valid = false;
    }
  });

  fromInputs.forEach((input) => {
    if (!validateDate(input, "Please enter a valid start date")) {
      valid = false;
    }
  });

  for (let i = 0; i < fromInputs.length; i++) {
    if (!validateDateRange(fromInputs[i], toInputs[i])) {
      valid = false;
    }
  }

  anualSalaryInputs.forEach((input) => {
    if (!validateNumber(input, "Please enter a valid annual salary")) {
      valid = false;
    }
  });

  reasonInputs.forEach((input) => {
    if (!validateRequiredField(input, `Reason for leaving is required`)) {
      valid = false;
    }
  });

  refContactInputs.forEach((input) => {
    if (
      !validatePhoneNumber(
        input,
        "Please enter a valid 10-digit reference contact number",
      )
    ) {
      valid = false;
    }
  });

  refNameInputs.forEach((input) => {
    if (!validateRequiredField(input, `Reference name is required`)) {
      valid = false;
    }
  });

  return valid;
}

function skill_validation() {
  let valid = true;
  const skillInputs = form.querySelectorAll('input[name^="skills"]');

  skillInputs.forEach((input) => {
    if (input.checked) {
      const levelRadios = form.querySelectorAll(
        `input[name="${input.value}_level"]`,
      );
      let levelSelected = false;
      levelRadios.forEach((radio) => {
        if (radio.checked) {
          levelSelected = true;
        }
      });
      if (!levelSelected) {
        showError(
          levelRadios[0].parentElement,
          `Please select a proficiency level for ${input.value}`,
        );
        valid = false;
      }
    }
  });

  return valid;
}

function language_validation() {
  let valid = true;

  const languageInputs = form.querySelectorAll(
    'input[name^="lang["]:not([name*="read"]):not([name*="write"]):not([name*="speak"])',
  );

  languageInputs.forEach((input) => {
    if (input.checked) {
      const lang = input.name.match(/lang\[(.*?)\]/)[1];

      const readCheckbox = form.querySelector(
        `input[name="lang[${lang}][read]"]`,
      );
      const writeCheckbox = form.querySelector(
        `input[name="lang[${lang}][write]"]`,
      );
      const speakCheckbox = form.querySelector(
        `input[name="lang[${lang}][speak]"]`,
      );

      if (
        !readCheckbox.checked &&
        !writeCheckbox.checked &&
        !speakCheckbox.checked
      ) {
        showError(
          readCheckbox.parentElement,
          `Please select at least one proficiency for ${lang}`,
        );

        valid = false;
      }
    }
  });

  return valid;
}

function preferences_validation() {
  const prefSelect = form.elements["preferd_location"];
  const noticePeriod = document.getElementById("notice_period");
  const currentCTC = document.getElementById("current_CTC");
  const expectedCTC = document.getElementById("expacted_CTC");

  let valid = true;
  //   console.log(noticePeriod.value);

  if (!prefSelect || prefSelect.selectedOptions.length === 0) {
    showError(prefSelect, "Please select at least one preferred location");
    valid = false;
  }

  if (!noticePeriod.value.trim()) {
    showError(noticePeriod, "Please select a notice period");
    valid = false;
  }

  if (
    !validateNumber(noticePeriod, "Please enter a valid notice period in days")
  ) {
    valid = false;
  }

  if (!validateNumber(currentCTC, "Please enter a valid current CTC")) {
    valid = false;
  }

  if (!validateNumber(expectedCTC, "Please enter a valid expected CTC")) {
    valid = false;
  }

  return valid;
}

// function reference_validation() {
//   let valid = true;
//   const fieldset = [
//     "ref_name_1",
//     "ref_con_1",
//     "ref_rel_1",
//     "ref_name_2",
//     "ref_con_2",
//     "ref_rel_2",
//   ];

//   fieldset.forEach((field) => {
//     const input = form.elements[field];
//     if (!validateRequiredField(input, `${field} is required`)) {
//       valid = false;
//     }

//     if (field === "ref_con_1" || field === "ref_con_2") {
//     if (
//       !validatePhoneNumber(
//         input,
//         "Please enter a valid 10-digit reference contact number",
//       )
//     ) {
//       valid = false;
//     }
//   }
//   });

  

//   return valid;
// }
