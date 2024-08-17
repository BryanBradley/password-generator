let passwordLength = document.getElementById("passwordLength");
let password = document.getElementById("password");
let copyButton = document.getElementById("copyButton");
let saveButton = document.getElementById("saveButton");

const generatePassword = (len) => {
  if (len < 5 || len > 20) {
    showWarning(len < 5 ? "Panjang password minimal 5 digit" : "Panjang password maksimal 20 digit");
    return "";
  }

  const lowerAlphabet = "abcdefghijklmnopqrstuvwyz";
  const upperAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numeric = "0123456789";
  const symbol = "!@#$%^&*()_+=-{}[]';:/?.,<>~`";

  let data = lowerAlphabet + upperAlphabet;

  if (document.getElementById("includeNumeric").checked) {
    data += numeric;
  }
  if (document.getElementById("includeSymbols").checked) {
    data += symbol;
  }

  if (data.length === 0) {
    showWarning("Harap pilih setidaknya satu jenis karakter untuk password.");
    return "";
  }

  let generator = "";
  for (let index = 0; index < len; index++) {
    generator += data[~~(Math.random() * data.length)];
  }
  saveButton.disabled = false;
  copyButton.disabled = false;
  return generator;
};

const showWarning = (message) => {
  const warningModal = new bootstrap.Modal(document.getElementById("warningModal"));
  const warningMessage = document.getElementById("warningMessage");
  warningMessage.textContent = message;

  // Tambahkan kelas untuk animasi
  warningMessage.classList.add("opacity-0");
  warningMessage.style.transform = "translateY(20px)";

  warningModal.show();

  // Animasi dengan setTimeout
  setTimeout(() => {
    warningMessage.classList.remove("opacity-0");
    warningMessage.classList.add("opacity-100", "transition", "duration-500");
    warningMessage.style.transform = "translateY(0)";
  }, 100);
};

const getPassword = () => {
  const newPassword = generatePassword(parseInt(passwordLength.value));
  if (newPassword) {
    password.value = newPassword;
  }
};

const copyPassword = () => {
  navigator.clipboard.writeText(password.value);
  alert("Password telah disalin!");
};

const savePassword = () => {
  document.title = password.value;
  saveButton.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(`Password saya: ${document.title}`));
  saveButton.setAttribute("download", "MyPasswordGenerator.txt");
  alert("Password telah disimpan!");
};
