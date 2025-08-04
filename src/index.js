const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const github = document.getElementById("github");
const submit = document.getElementById("submit");
const avatar = document.getElementById("avatar");
const removeImg = document.getElementById("removeImg");
const changeImgInput = document.getElementById("changeImg");
const fileFull = document.getElementById("fullFileInput");

function changeImg(img) {
  const fileEmpty = document.getElementById("emptyFileInput");
  if (img) {
    fileEmpty.classList.add("hidden");
    fileFull.classList.remove("hidden");
    fileFull.querySelector("img").src = img;
    avatar.classList.add("hidden");
  } else {
    avatar.classList.add("hidden");
    fileEmpty.classList.remove("hidden");
    fileFull.classList.add("hidden");
    // fileFull.querySelector("img").src = img;
  }
}

function fileError(isError) {
  const info = document.getElementById("infoP");
  if (isError) {
    info.classList.add("hidden");
  } else {
    info.classList.remove("hidden");
  }
}
// github input change event
github.addEventListener("change", (e) => {
  const value = e.target.value;
  if (!value) return;
  if (value === "@") {
    e.target.value = "";
    return;
  }
  if (!value.startsWith("@")) {
    e.target.value = "@" + value;
  }
});
// avatar inuput change event
avatar.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file && file.type.startsWith("image/")) {
    const img = URL.createObjectURL(file);
    changeImg(img);
  } else {
    changeImg(null);
  }
});
// img button event
changeImgInput.addEventListener("click", () => {
  avatar.click();
});
removeImg.addEventListener("click", () => {
  avatar.value = null;
  changeImg();
});
// submit event
submit.addEventListener("click", () => {
  const fullNameValue = fullName.value;
  const emailValue = email.value;
  const avatarValue = avatar.files[0];
  const githubValue = github.value;
  const infoP = document.getElementById("infoP");
  let isValid = true;
  if (!fullNameValue) {
    document.getElementById("fullNameError").classList.add("active");
    isValid = false;
  } else document.getElementById("fullNameError").classList.remove("active");

  if (!emailValue || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
    document.getElementById("emailError").classList.add("active");
    isValid = false;
  } else document.getElementById("emailError").classList.remove("active");

  if (!avatarValue) {
    document.getElementById("avatarError").classList.add("active");
    infoP.classList.add("hidden");
    isValid = false;
  } else {
    infoP.classList.remove("hidden");
    document.getElementById("emailError").classList.remove("active");
  }

  if (!isValid) return;

  const ticketValue = {
    fullName: fullNameValue,
    github: githubValue,
    email: emailValue,
    avatar: avatarValue,
  };

  document.getElementById("fullNameLabel").textContent = ticketValue.fullName;
  document.getElementById("emailLabel").textContent = ticketValue.email;
  document.getElementById("nameLabel").textContent = ticketValue.fullName;
  document.getElementById("githubLabel").textContent = ticketValue.github;
  const img = URL.createObjectURL(ticketValue.avatar);
  document.getElementById("avatarLabel").src = img;

  document.getElementById("form").classList.add("hidden");
  document.getElementById("ticket").classList.remove("hidden");
});
