let users = [];
let patternName = /^[a-z ,.'-]+$/i;

fetch("https://dummyjson.com/users")
  .then((res) => res.json())
  .then((res) => reload(res.users));

let upto25 = document.querySelector(".upto25 .users");
let after25 = document.querySelector(".after25 .users");
let after50 = document.querySelector(".after50 .users");

function reload(users) {
  for (let user of users) {
    let userDiv = document.createElement("div");
    let userName = document.createElement("h2");
    let ageBox = document.createElement("div");
    let ageText = document.createElement("p");
    let age = document.createElement("p");

    userDiv.classList.add("userDiv");
    userName.classList.add("userName");
    ageBox.classList.add("ageDiv");
    ageText.classList.add("ageText");
    age.classList.add("age");

    userName.innerHTML = `${user.firstName} ${user.lastName}`;
    ageText.innerHTML = "Age";
    age.innerHTML = `${user.age}`;

    userDiv.append(userName);
    userDiv.append(ageBox);
    ageBox.append(ageText, age);

    if (user.age < 25) {
      upto25.append(userDiv);
    } else if (user.age >= 25 && user.age < 50) {
      after25.append(userDiv);
    } else {
      after50.append(userDiv);
    }
  }
}

let form = document.forms["add"];
let nameInp = document.querySelector(".name");
let ageInp = document.querySelector(".age");

nameInp.onkeyup = () => {
  if (
    (nameInp.value.length >= 3 && patternName.test(nameInp.value) === false) ||
    nameInp.value.length < 3
  ) {
    nameInp.style.borderColor = "red";
  } else if (nameInp.value.length >= 3 && patternName.test(nameInp.value)) {
    nameInp.style.borderColor = "green";
  } else if (nameInp.value.length === 0) {
    nameInp.style.borderColor = "gray";
  }
};
ageInp.onkeyup = () => {
  if (ageInp.value >= 99) {
    ageInp.value = 99;
  } else if (ageInp.value < 0) {
    ageInp.value = 0;
  }
};

form.onsubmit = function (event) {
  event.preventDefault();

  let name = nameInp.value;
  let age = ageInp.value;

  if (name.length >= 3 && age >= 0) {
    let user = {
      firstName: name,
      lastName: "",
      age: age,
    };

    let userDiv = document.createElement("div");
    let userName = document.createElement("h2");
    let ageBox = document.createElement("div");
    let ageText = document.createElement("p");
    let userAge = document.createElement("p");

    userDiv.classList.add("userDiv");
    userName.classList.add("userName");
    ageBox.classList.add("ageDiv");
    ageText.classList.add("ageText");
    userAge.classList.add("age");

    userName.innerHTML = `${user.firstName}`;
    ageText.innerHTML = "Age";
    userAge.innerHTML = `${user.age}`;

    userDiv.append(userName);
    userDiv.append(ageBox);
    ageBox.append(ageText, userAge);

    if (user.age < 25) {
      upto25.append(userDiv);
    } else if (user.age >= 25 && user.age < 50) {
      after25.append(userDiv);
    } else {
      after50.append(userDiv);
    }

    users.push(user);
    nameInp.value = "";
    ageInp.value = "";
  }
};
