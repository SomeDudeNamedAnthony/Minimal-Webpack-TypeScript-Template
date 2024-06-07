import "./../css/style.css";

const header = document.createElement("h1");
header.textContent = "Oh wow, DOM access works!";
header.id = "title";

document.body.appendChild(header);
