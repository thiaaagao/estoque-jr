document.getElementById("stockRequestForm").addEventListener("submit", function (e) {
        e.preventDefault();

       /*  const formData = new FormData(this); */
       
        enviarNotificacaoTelegram();
        showNotification(
            "Requisição enviada com sucesso!",
            true
        );
        document
            .getElementById("stockRequestForm")
            .reset();
    });


function enviarNotificacaoTelegram() {
    //Hora requisição
    const horaAtual = new Date();
    const horaReq = horaAtual.getHours();
    const minutosReq = horaAtual.getMinutes();
    const segundosReq = horaAtual.getSeconds();

    // Data requisição 
    const diaReq = String(horaAtual.getDate()).padStart(2, '0'); // Dia do mês (1-31),
    const mesReq = String(horaAtual.getMonth() + 1).padStart(2, '0'); // Mês (0-11, então +1)
    const anoReq = horaAtual.getFullYear(); // Ano com 4 dígitos
    const dataRequisicao = `${diaReq}/${mesReq}/${anoReq}`; // Formata como DD/MM/YYYY

    /* OCULTAR TOKEN */
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
    const buchaParafuso6mm =
        document.getElementById("buchaParafuso").value;
    const buchaAcab = document.getElementById("buchaAcabamento").value;
   /*  const parafuso6mm =
        document.getElementById("parafuso6mm").value; */
    const etiquetaLacre =
        document.getElementById("etiquetaLacre").value;
    const placaJR = document.getElementById("placasJR").value;
    const horasRequisicao = `${String(horaReq).padStart(2, '0')}:${String(minutosReq).padStart(2, '0')}:${String(segundosReq).padStart(2, '0')}`;
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
      🔹 Bucha & Parafuso: ${buchaParafuso6mm} Unidades
      🔹 Bucha de Acabamento: ${buchaAcab} Unidades
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
                // Pega a data e hora atual para o nome do arquivo de log
                const agoraParaLog = new Date();
                const diaLog = String(agoraParaLog.getDate()).padStart(2, '0');
                const mesLog = String(agoraParaLog.getMonth() + 1).padStart(2, '0');
                const anoLog = agoraParaLog.getFullYear();
                const horaLog = String(agoraParaLog.getHours()).padStart(2, '0');
                const minutosLog = String(agoraParaLog.getMinutes()).padStart(2, '0');
                const segundosLog = String(agoraParaLog.getSeconds()).padStart(2, '0');

                // Formata o nome do arquivo: REQUISICAO_AAAA-MM-DD_HHMMSS_NOMEDOTECNICO.txt
                const nomeArquivo = `REQUISICAO_${anoLog}-${mesLog}-${diaLog}_${horaLog}${minutosLog}${segundosLog}_${nomeTecnico}.txt`;

                const conteudoLog = message;

                // Cria um Blob (objeto de arquivo) com o conteúdo e tipo de arquivo
                const blob = new Blob([conteudoLog], { type: 'text/plain;charset=utf-8' });

                const urlBlob = URL.createObjectURL(blob);

                // Cria um link temporário na memória
                const a = document.createElement('a');
                a.href = urlBlob;
                a.download = nomeArquivo; // Define o nome do arquivo para download
                document.body.appendChild(a); // Adiciona o link ao corpo (precisa estar no DOM para ser clicável)
                a.click(); // Simula um clique no link para iniciar o download
                document.body.removeChild(a); // Remove o link após o download
                URL.revokeObjectURL(urlBlob); // Libera o URL do Blob para liberar memória

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
