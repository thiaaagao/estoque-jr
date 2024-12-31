document.getElementById("stockGasolinaForms").addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    let dataHoraElement = document.getElementById("data");
    let data = {};

    formData.forEach((value, key) => {
        data[key] = value;
    });
    let dataValue = data["data"];
    let dataObj = new Date(dataValue);

    const numeroVeiculo = document.getElementById("numeroCars").value;
    data["numeroCars"] = numeroVeiculo;

    if (dataObj.getFullYear() !== 2024) {
        showNotification("Ano inválido!");
        return;
    }

    enviarNotificacaoTelegramGasolina();
    showNotification("Solicitação enviada com sucesso!", true);
    document.getElementById("stockGasolinaForms").reset();

})


function enviarNotificacaoTelegramGasolina() {
    const horaAtual = new Date();
    const horaReq = horaAtual.getHours();
    const minutosReq = horaAtual.getMinutes();
    const segundosReq = horaAtual.getSeconds();

    /* const b =
        "NzUyOTIyMDk0MjpBQUVHN1BOYmR3cU81aU9GZnpMWm1OMWZHMms3UURIVWpfRQ";
    const c = "NzAxNTI0MTEwMw";
    const f = "LTEwMDIzNzUzMjY2MzE="; */
    const botToken = atob("NzUyOTIyMDk0MjpBQUVHN1BOYmR3cU81aU9GZnpMWm1OMWZHMms3UURIVWpfRQ");
    const chatId = atob("NzAxNTI0MTEwMw");
    const chatIdGroup = atob("LTEwMDIzNzUzMjY2MzE=");

    const nomeSolicitante = document.getElementById("nomeSolicitante").value;
    const kmVeiculo = document.getElementById("kmVeiculo").value;
    const numeroVeiculo = document.getElementById("numeroCars").value;
    const dataRequisicao = document.getElementById("data").value.split("-").reverse().join("/");
    const horasRequisicao = `${horaReq}:${minutosReq}:${segundosReq}`;

    if (kmVeiculo >= 9500 && kmVeiculo <= 10000) {
        alert("Atenção! O veiculo esta no limite de kilometragem.");
        const messageRevisao = `

        🚨 ATENÇÃO! VEÍCULO NECESSITA DE REVISÃO! 🚨
        --------------------------------------
        📅 Data da Solicitação: ${dataRequisicao}
        ⏰ Horário da Solicitação: ${horasRequisicao}

        🚗 Veiculo: ${numeroVeiculo}
        🚗 KM do Veiculo: ${kmVeiculo}
        --------------------------------------`;
        const urlRevisao = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatIdGroup}&text=${encodeURIComponent(messageRevisao)}`;

        fetch(urlRevisao)
            .then((response) => response.json())
            .then((data) => {
                if (data.ok) {
                    } else {
                    showNotification(
                        "Erro no envio, consulte o administrador do sistema!"
                    );
                }
            });

    }

    const messageGasolina =
        `🚨 Nova Solicitação de Combustível 🚨

        📋 Detalhes da Solicitação

        👷 Nome do Solicitante: ${nomeSolicitante}
        📅 Data da Solicitação: ${dataRequisicao}
        ⏰ Horário da Solicitação: ${horasRequisicao}

        🚗 Veiculo: ${numeroVeiculo}
        🚗 KM do Veiculo: ${kmVeiculo}
        --------------------------------------
    `;

    const urlGasolina = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&chat_id=${chatIdGroup}&text=${encodeURIComponent(
        messageGasolina
    )}`;
    const urlGasolinaGroup = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatIdGroup}&text=${encodeURIComponent(
        messageGasolina
    )}`;

    fetch(urlGasolina)
        .then((response) => response.json())
        .then((data) => {
            if (data.ok) {
            } else {
                showNotification(
                    "Erro no envio, consulte o administrador do sistema!"
                );
            }
        });
    fetch(urlGasolinaGroup)
        .then((response) => response.json())
        .then((data) => {
            if (data.ok) {
            } else {
                showNotification(
                    "Erro no envio, consulte o administrador do sistema!"
                );
            }
        });

}

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
