function initConsulta() {
    const inputCep = document.querySelector('#cep');
    const btn = document.querySelector('.btn-cep');

    const saidaCep = document.querySelector('.saida-cep');
    const endereco = document.querySelector('.endereco');
    const bairro = document.querySelector('.bairro');
    const cidade = document.querySelector('.cidade');
    const estado = document.querySelector('.estado');

    const msgErro = document.querySelector('.erro');

    btn.addEventListener('click', handleClick);

    function handleClick(event) {
        event.preventDefault();
        if (inputCep.value.length == 8) {
            consultaCep(inputCep.value);
            msgErro.innerText = ''
            inputCep.classList.remove('focus-erro');
        } else {
            msgErro.innerText = 'Preencha o CEP corretamente.'
            inputCep.classList.add('focus-erro');
            inputCep.focus();
        }
    }

    function consultaCep(cep) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(retornoCEP => {
                const validaCep = retornoCEP.cep;
                if (validaCep) {
                    saidaCep.innerText = `CEP: ${retornoCEP.cep}`;
                    endereco.innerText = `Endereço: ${retornoCEP.logradouro}`;
                    bairro.innerText = `Bairro: ${retornoCEP.bairro}`;
                    cidade.innerText = `Cidade: ${retornoCEP.localidade}`;
                    estado.innerText = `Estado: ${retornoCEP.uf}`;
                } else {
                    saidaCep.innerHTML = 'CEP não localizado';
                    endereco.innerText = '';
                    bairro.innerText = '';
                    cidade.innerText = '';
                    estado.innerText = '';
                }

            })
    }
}


initConsulta();