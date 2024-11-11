document.getElementById("stockGasolinaForms").addEventListener("submit", function (e) {
    e.preventDefault();


})

const formData = new FormData(this);
let dataHora = document.getElementsById("data");
let data = {};

formData.forEach((value, key) => {
    let dataValue = data["data"];
    let dataObj = new Date(dataValue);

    if (dataObj.getFullYear() !== 2024 ){
        showNotification("Ano inválido!");
        return;

    }

})

function showNotification(message, isSucess) {
    const notificationElement = document.createElement("div");
    notificationElement.textContent = message;
    notificationElement.style.position = "fixed";
    notificationElement.style.bottom = "20px";
    notificationElement.style.left = "50%";
    notificationElement.style.transform = "translateX(-50%)";
    notificationElement.style.padding = "10px 20px";
    notificationElement.style.backgroundColor = isSucess ? "#4CAF50" : "#F44336";
    notificationElement.style.color = "#fff";
    notificationElement.style.borderRadius = "5px";
    notificationElement.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";
    document.body.appendChild(notificationElement);


    setTimeout(() => {
        notificationElement.remove()
    }, 4500);
}