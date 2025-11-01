// Aumenta e diminui o tamanho da fonte
function aumentaFonte() {
  const btnAumentaFonte = document.querySelector('.aumenta-fonte');
  const containerQuestoes = document.querySelector('.container-questoes');

  btnAumentaFonte.addEventListener('click', () => {
    containerQuestoes.classList.toggle('text-[150%]');
  });
}

aumentaFonte();

// Marca a alternativa selecionada
function marcaAlternativa () {
  const alternativa = document.querySelectorAll('.alternativa');
    
  function selecionarAlternativa(alternativaClicada) {

    const verificaSelecionada = alternativaClicada.classList.contains('bg-[#c2d4ff]');
    const questaoPai = alternativaClicada.closest('.questao');
    const alternativasDestaQuestao = questaoPai.querySelectorAll('.alternativa');
    
    // --- Reset das alternativas ---
    alternativasDestaQuestao.forEach((item) => {
      // Comportamento default. Sem nenhuma marcação
      item.classList.remove('bg-[#c2d4ff]', 'border-2', 'border-[#144bc8]');
      item.classList.add('group', 'hover:border-gray-800', 'hover:bg-gray-100', 'opacity-80');
      item.firstElementChild.classList.add('bg-gray-100', 'border-[#e0e0e0]');
      item.firstElementChild.classList.remove('bg-[#144bc8]', 'text-white', 'border-[#144bc8]');
    });

    // Pega o ID da questão para encontrar o link correspondente no aside
    const idDaQuestao = questaoPai.id; 
    // Cria o seletor para o link
    const seletorDoLink = `a[href="#${idDaQuestao}"]`;
    // Encontra o link exato no aside
    const linkNoAside = document.querySelector(seletorDoLink);

    // --- LÓGICA DE APLICAÇÃO) ---
    if (!verificaSelecionada) {
      // O usuário está SELECIONANDO
      
      // Marca a questão como 'respondida'
      questaoPai.classList.add('respondida');

      // Adiciona a classe no link do aside
      if (linkNoAside) { // verifica se o link existe
        linkNoAside.classList.add('bg-[#c2d4ff]', 'border-[#144bc8]');
      }

      // Estiliza a alternativa clicada
      alternativaClicada.classList.remove('group', 'hover:border-gray-800', 'hover:bg-gray-100', 'opacity-80');
      alternativaClicada.classList.add('bg-[#c2d4ff]', 'border-2', 'border-[#144bc8]');
      alternativaClicada.firstElementChild.classList.remove('bg-gray-100', 'border-[#e0e0e0]');
      alternativaClicada.firstElementChild.classList.add('bg-[#144bc8]', 'text-white', 'border-[#144bc8]');

    } else {
      // O usuário está DESMARCANDO
      
      // Remove a classe 'respondida' da questão
      questaoPai.classList.remove('respondida');

      // Remove a classe do link do aside
      if (linkNoAside) {
        linkNoAside.classList.remove('bg-[#c2d4ff]', 'border-[#144bc8]');
      }
    }
  }
  
  alternativa.forEach((item) => {
    item.addEventListener('click', () => selecionarAlternativa(item));
  });
}
marcaAlternativa();


// Navegação entre questões
function navegaQuestoes() {
  const linksQuestoes = document.querySelectorAll('a[href^="#"]');
  console.log(linksQuestoes)

  function scrollToSection(event) {
    event.preventDefault();
    const href = event.currentTarget.getAttribute('href');
    const section = document.querySelector(href);
    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  linksQuestoes.forEach((link) => {
    link.addEventListener('click', scrollToSection)
  });
}
navegaQuestoes();


// Marcação da questão atual no menu lateral
function marcaQuestaoAtual() {
  const secoesQuestoes = document.querySelectorAll('.questao');
  const linksMenuLateral = document.querySelectorAll('a[href^="#"]');
  const classesAtivas = ['ring-2', 'ring-[#121212]'];
  
  secoesQuestoes.forEach((secao, index) => {
    const topoSecao = secao.getBoundingClientRect().top;
    const fundoSecao = secao.getBoundingClientRect().bottom;

    const secaoVisivel = (topoSecao - 100) < 0 && (fundoSecao - 100) > 0;
    
    // Pega o link correspondente
    const link = linksMenuLateral[index];

    if (secaoVisivel) {            
      link.classList.add(...classesAtivas);      
    } else {
      link.classList.remove(...classesAtivas);
    }
  });

  window.addEventListener('scroll', marcaQuestaoAtual);
}
marcaQuestaoAtual();
