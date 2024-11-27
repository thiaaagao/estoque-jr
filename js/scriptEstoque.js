document.getElementById("stockRequestForm").addEventListener("submit", function (e) {
        e.preventDefault();

        // Validação de quantidades de buchas e parafusos
        if (!validarBuchaParafuso()) {
            showNotification(
                "A quantidade de buchas e parafusos deve ser iguais.",
                false
            );
            return;
        }

        const formData = new FormData(this);
        let dataHoraElement =
            document.getElementById("data");
        let data = {};

        formData.forEach((value, key) => {
            data[key] = value;
        });
        let dataValue = data["data"];
        let dataObj = new Date(dataValue);

        if (dataObj.getFullYear() !== 2024) {
            showNotification("O ano deve ser 2024!");
            return;
        }

        enviarNotificacaoTelegram();
        showNotification(
            "Requisição enviada com sucesso!",
            true
        );
        document
            .getElementById("stockRequestForm")
            .reset();
    });

function validarBuchaParafuso() {
    const bucha6mm = parseInt(
        document.getElementById("bucha6mm").value,
        10
    );
    const parafuso6mm = parseInt(
        document.getElementById("parafuso6mm").value,
        10
    );
    return bucha6mm === parafuso6mm;
}

function enviarNotificacaoTelegram() {
    //Hora requisição
    const horaAtual = new Date();
    const horaReq = horaAtual.getHours();
    const minutosReq = horaAtual.getMinutes();
    const segundosReq = horaAtual.getSeconds();

    const b =
        "NzUyOTIyMDk0MjpBQUVHN1BOYmR3cU81aU9GZnpMWm1OMWZHMms3UURIVWpfRQ";
    const c = "NzAxNTI0MTEwMw";
    const f = "LTEwMDIzNzUzMjY2MzE=";
    const botToken = atob(b);
    const chatId = atob(c);
    const chatIdGroup = atob(f);
    const nomeTecnico = document
        .getElementById("nomeTecnico")
        .value.toUpperCase();
    const dataRequisicao = document
        .getElementById("data")
        .value.split("-")
        .reverse()
        .join("/");
    const esticadores =
        document.getElementById("esticadores").value;
    const dropFibra =
        document.getElementById("dropFibra").value;
    const fixaFio =
        document.getElementById("fixaFio").value;
    const fitaCrepe =
        document.getElementById("fitaCrepe").value;
    const fitaIsolante =
        document.getElementById("fitaIsolante").value;
    const conectores =
        document.getElementById("conectores").value;
    const abracadeira =
        document.getElementById("abracadeira").value;
    const espiral =
        document.getElementById("espiral").value;
    const bucha6mm =
        document.getElementById("bucha6mm").value;
    const parafuso6mm =
        document.getElementById("parafuso6mm").value;
    const etiquetaLacre =
        document.getElementById("etiquetaLacre").value;
    const placaJR = document.getElementById("placasJR").value;
    const horasRequisicao = `${horaReq}:${minutosReq}:${segundosReq}`;
    const message = `
      🚨 Nova Solicitação de Materiais de Estoque 🚨

      👷 Técnico: ${nomeTecnico}
      📅 Data da Solicitação: ${dataRequisicao}
      ⏰ Horário da Solicitação: ${horasRequisicao}

      🧰 Suprimentos Solicitados:
      --------------------------------------
      🔹 Esticadores: ${esticadores} Unidades
      🔹 Placas JR: ${placaJR} Unidades
      🔹 Drop Fibra: ${dropFibra} Metros
      🔹 Fixa Fio: ${fixaFio} Unidades
      🔹 Fita Crepe: ${fitaCrepe} Unidades
      🔹 Fita Isolante: ${fitaIsolante} Unidades
      🔹 Conectores APC: ${conectores} Unidades
      🔹 Abraçadeira: ${abracadeira} Unidades
      🔹 Espiral: ${espiral} Metros
      🔹 Bucha 6mm: ${bucha6mm} Unidades
      🔹 Parafuso 6mm: ${parafuso6mm} Unidades
      🔹 Etiqueta Lacre: ${etiquetaLacre} Unidades
      --------------------------------------
`;

    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&chat_id=${chatIdGroup}&text=${encodeURIComponent(
        message
    )}`;
    const urlTwo = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatIdGroup}&text=${encodeURIComponent(
        message
    )}`;

    fetch(urlTwo)
        .then((response) => response.json())
        .then((data) => {
            if (data.ok) {
            } else {
                // console.error("Erro URL GRUPO:", data);
                showNotification(
                    "Erro no envio, consulte o administrador do sistema!"
                );
            }
        });

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data.ok) {
            } else {
                //console.error("Erro URL PRIVADO:", data);
                showNotification(
                    "Erro no envio, consulte o administrador do sistema!"
                );
            }
        })
        .catch((error) =>
            console.error("Erro na requisição:", error)
        );
}

function showNotification(message, isSuccess) {
    var notificationElement =
        document.createElement("div");
    notificationElement.textContent = message;
    notificationElement.style.position = "fixed";
    notificationElement.style.bottom = "20px";
    notificationElement.style.left = "50%";
    notificationElement.style.transform =
        "translateX(-50%)";
    notificationElement.style.padding = "10px 20px";
    notificationElement.style.backgroundColor =
        isSuccess ? "#4CAF50" : "#F44336";
    notificationElement.style.color = "#fff";
    notificationElement.style.borderRadius = "5px";
    notificationElement.style.boxShadow =
        "0 2px 5px rgba(0, 0, 0, 0.2)";
    document.body.appendChild(notificationElement);

    setTimeout(() => {
        notificationElement.remove();
    }, 4500);
}