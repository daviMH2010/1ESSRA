import { exportarTXT, validarCPF } from './utils.js';

const campoNome = document.getElementById('campoNome');
const campoCpf = document.getElementById('campoCpf');
const campoEmail = document.getElementById('campoEmail');
const campoData = document.getElementById('campoData');
const campoSenha = document.getElementById('campoSenha');
const btnCadastrar = document.getElementById('btnCadastrar');
const painelResultado = document.getElementById('painelResultado');
const listaCampos = [campoNome, campoCpf, campoEmail, campoData, campoSenha];

campoCpf.addEventListener('input', () => {
    let valor = campoCpf.value.replace(/\D/g, '').slice(0, 11);
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    campoCpf.value = valor;
});

btnCadastrar.addEventListener('click', () => {
    let formularioValido = true;

    listaCampos.forEach((campo) => {
        const preenchido = campo.value.trim() !== '';
        campo.classList.toggle('campo-erro', !preenchido);
        formularioValido = formularioValido && preenchido;
    });

    const cpfValido = validarCPF(campoCpf.value);
    campoCpf.classList.toggle('campo-erro', !cpfValido);
    formularioValido = formularioValido && cpfValido;

    if (!formularioValido) {
        painelResultado.className = 'msg-erro';
        painelResultado.innerText = 'Atenção: preencha todos os campos e informe um CPF válido!';
        return;
    }

    const dadosUsuario = {
        nome: campoNome.value.trim(),
        cpf: campoCpf.value.trim(),
        email: campoEmail.value.trim(),
        dataNascimento: campoData.value
    };

    exportarTXT(dadosUsuario);
    painelResultado.className = 'msg-sucesso';
    painelResultado.innerText = `Cadastro de ${dadosUsuario.nome} realizado com sucesso!`;
});