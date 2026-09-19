export function validarCPF(cpf) {
    const numeros = cpf.replace(/\D/g, '');

    if (numeros.length !== 11 || /^(\d)\1{10}$/.test(numeros)) {
        return false;
    }

    let soma = 0;
    for (let indice = 0; indice < 9; indice += 1) {
        soma += Number(numeros[indice]) * (10 - indice);
    }

    let resto = (soma * 10) % 11;
    const primeiroDigito = resto === 10 ? 0 : resto;
    if (primeiroDigito !== Number(numeros[9])) {
        return false;
    }

    soma = 0;
    for (let indice = 0; indice < 10; indice += 1) {
        soma += Number(numeros[indice]) * (11 - indice);
    }

    resto = (soma * 10) % 11;
    const segundoDigito = resto === 10 ? 0 : resto;
    return segundoDigito === Number(numeros[10]);
}

export function exportarTXT(dados) {
    const conteudo = [
        '=== COMPROVANTE ROCK IN RIO ===',
        `Nome: ${dados.nome}`,
        `CPF: ${dados.cpf}`,
        `E-mail: ${dados.email}`,
        `Data de Nascimento: ${dados.dataNascimento}`,
        '================================'
    ].join('\n');
    const blob = new Blob([conteudo], { type: 'text/plain;charset=utf-8' });
    const linkDownload = document.createElement('a');
    const nomeArquivo = dados.nome.trim().toLowerCase().replace(/[^a-z0-9]+/gi, '_');

    linkDownload.href = URL.createObjectURL(blob);
    linkDownload.download = `ingresso_${nomeArquivo}.txt`;
    document.body.appendChild(linkDownload);
    linkDownload.click();
    linkDownload.remove();
    URL.revokeObjectURL(linkDownload.href);
}