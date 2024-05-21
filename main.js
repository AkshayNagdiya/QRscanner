let form = document.querySelector("form");
let input = document.querySelector("input");
let select = document.querySelector("#size");
let img = document.querySelector("#code");

const qrgenerator = async (e) => {
  e.preventDefault();
  const size = select.value;
  const data = input.value;
  const response = await fetch(
    `https://api.qrserver.com/v1/create-qr-code/?size=${size}&data=${data}`
  );
  const imageUrl = response.url;
  img.setAttribute("src", imageUrl);
  form.reset();
  console.log(response);
};

form.addEventListener("submit", qrgenerator);

async function downloadImage(imageSrc) {
  const image = await fetch(imageSrc);
  const imageBlob = await image.blob();
  const imageURL = URL.createObjectURL(imageBlob);
  const a = document.createElement("a");
  a.href = imageURL;
  a.download = "qr-code.png"; // Specify the file name
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Example usage of downloadImage function
// Assuming you want to add a button to trigger the download
let downloadBtn = document.createElement("button");
downloadBtn.textContent = "Download QR Code";
downloadBtn.classList.add(
  "btn",
  "btn-success",
  "w-100",
  "flex",
  "justify-content-center"
); // Add Bootstrap classes
downloadBtn.addEventListener("click", () => downloadImage(img.src));
form.appendChild(downloadBtn);
