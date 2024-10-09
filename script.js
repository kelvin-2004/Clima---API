document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario-busca');
    const entradaCidade = document.getElementById('entrada-cidade');
    const informacoesTempo = document.getElementById('informacoes-tempo');

    const chaveAPI = 'c7c1dc1c8b884ed1de2b7d0d3112b1d6'; 

    formulario.addEventListener('submit', async (evento) => {
        evento.preventDefault();
        const cidade = entradaCidade.value.trim();
        if (cidade) {
            await obterTempo(cidade);
        }
    });

    async function obterTempo(cidade) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${chaveAPI}&units=metric&lang=pt_br`;
        try {
            const resposta = await fetch(url);
            if (!resposta.ok) {
                throw new Error('Cidade não encontrada');
            }
            const dados = await resposta.json();
            exibirTempo(dados);
        } catch (erro) {
            informacoesTempo.innerHTML = `<p>Erro: ${erro.message}</p>`;
        }
    }

    function exibirTempo(dados) {
        const { name, main, weather } = dados;
        const tempoHTML = `
            <h2>Previsão do tempo para ${name}</h2>
            <p>Temperatura: ${main.temp}°C</p>
            <p>Condição: ${weather[0].description}</p>
        `;
        informacoesTempo.innerHTML = tempoHTML;
    }
});
