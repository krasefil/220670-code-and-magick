"use strict";
var WIZARD_NAMES = ["Иван", "Хуан Себастьян", "Мария", "Кристоф", "Виктор", "Юлия", "Люпита", "Вашингтон"];
var WIZARD_FAMILY = ["да Марья", "Верон", "Мирабелла", "Вальц", "Онопко", "Топольницкая", "Нионго", "Ирвинг"];
var COAT_COLOR = [
  "rgb(101, 137, 164)",
  "rgb(241, 43, 107)",
  "rgb(146, 100, 161)",
  "rgb(56, 159, 117)",
  "rgb(215, 210, 55)",
  "rgb(0, 0, 0)"
];
var COLOR_FIREBALL = ["#ee4830", "#30a8ee", "#5ce6c0", "#e848d", "#e6e848"];
var EYES_COLOR = ["black", "red", "blue", "yellow", "green"];
var userDialog = document.querySelector(".setup");
userDialog.classList.remove("hidden");
var similarListElement = userDialog.querySelector(".setup-similar-list");
var similarWizardTemplate = document
  .querySelector("#similar-wizard-template")
  .content.querySelector(".setup-similar-item");
function randomInteger(min, max) {
  var rand = min + Math.random() * (max - min);
  rand = Math.round(rand);
  return rand;
}
var renderWizard = function(wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector(".setup-similar-label").textContent = wizard.name;
  wizardElement.querySelector(".wizard-coat").style.fill = wizard.coatColor;
  wizardElement.querySelector(".wizard-eyes").style.fill = wizard.eyesColor;
  return wizardElement;
};
var wizardClone = function() {
  var wizards = [];
  for (var i = 0; i < 4; i++) {
    wizards[i] = {};
    wizards[i].name =
      WIZARD_NAMES[randomInteger(0, WIZARD_NAMES.length - 1)] +
      " " +
      WIZARD_FAMILY[randomInteger(0, WIZARD_FAMILY.length - 1)];
    wizards[i].coatColor = COAT_COLOR[randomInteger(0, COAT_COLOR.length - 1)];
    wizards[i].eyesColor = EYES_COLOR[randomInteger(0, EYES_COLOR.length - 1)];
    return wizards[i];
  }
};
var fragmentWizard = function() {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < 4; i++) {
    fragment.appendChild(renderWizard(wizardClone()));
  }
  similarListElement.appendChild(fragment);
  userDialog.querySelector(".setup-similar").classList.remove("hidden");
};
fragmentWizard();

// 14 одеть надежду
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setup = document.querySelector(".setup");
var setupOpen = document.querySelector(".setup-open");
var setupClose = setup.querySelector(".setup-close");

var onPopupEscPress = function(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopap();
  }
};

var openPopup = function() {
  setup.classList.remove("hidden");
  document.addEventListener("keydown", onPopupEscPress);
};

var closePopap = function() {
  setup.classList.add("hidden");
  document.addEventListener("keydown", onPopupEscPress);
};

setupOpen.addEventListener("click", function() {
  openPopup();
});

setupOpen.addEventListener("keydown", function(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener("click", function() {
  closePopap();
});

setupClose.addEventListener("keydown", function(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopap();
  }
});

var userNameInput = setup.querySelector(".setup-user-name");

userNameInput.addEventListener("input", function(evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity("Имя должно состоять минимум из 2-х символов");
  } else if (target.value.length > 25) {
    target.setCustomValidity("Имя должно состоять максимум из 25-и символов");
  } else {
    target.setCustomValidity("");
  }
});

var fireball = setup.querySelector(".setup-fireball-wrap");
var onChangeFire = function() {
  fireball.style.background = COLOR_FIREBALL[randomInteger(0, COLOR_FIREBALL.length - 1)];
};
fireball.addEventListener("click", onChangeFire);

var glass = setup.querySelector(".wizard-eyes");
var onChangeGlass = function() {
  glass.style.fill = EYES_COLOR[randomInteger(0, EYES_COLOR.length - 1)];
};
glass.addEventListener("click", onChangeGlass);

var coat = setup.querySelector(".wizard-coat");
var onChangeCoat = function() {
  coat.style.fill = COAT_COLOR[randomInteger(0, COAT_COLOR.length - 1)];
};
coat.addEventListener("click", onChangeCoat);
