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
  return generator;
};

const getPassword = () => {
  const newPassword = generatePassword(parseInt(passwordLength.value));
  password.value = newPassword;

  // Mengaktifkan atau menonaktifkan tombol berdasarkan kondisi password
  saveButton.disabled = !newPassword; // Disable save button jika password kosong
  copyButton.disabled = !newPassword; // Disable copy button jika password kosong
};

const copyPassword = () => {
  if (password.value) {
    navigator.clipboard.writeText(password.value);
    alert("Password telah disalin!");
  }
};

const savePassword = () => {
  if (password.value) {
    const passwordText = password.value;
    const fileName = "MyPasswordGenerator.txt";
    const fileContent = `Password saya: ${passwordText}`;

    saveButton.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(fileContent));
    saveButton.setAttribute("download", fileName);
    alert("Password telah disimpan!");
  }
};

// Initial state: disable buttons
saveButton.disabled = true;
copyButton.disabled = true;
