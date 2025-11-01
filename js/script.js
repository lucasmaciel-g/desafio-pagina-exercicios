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
    
    alternativasDestaQuestao.forEach((item) => {
      item.classList.remove('bg-[#c2d4ff]', 'border-2', 'border-[#144bc8]');
      item.classList.add('group', 'hover:border-gray-800', 'hover:bg-gray-100', 'opacity-80');
      item.firstElementChild.classList.add('bg-gray-100', 'border-[#e0e0e0]');
      item.firstElementChild.classList.remove('bg-[#144bc8]', 'text-white', 'border-[#144bc8]');
    });
    if (!verificaSelecionada) {
      alternativaClicada.classList.remove('group', 'hover:border-gray-800', 'hover:bg-gray-100', 'opacity-80');
      alternativaClicada.classList.add('bg-[#c2d4ff]', 'border-2', 'border-[#144bc8]');
      alternativaClicada.firstElementChild.classList.remove('bg-gray-100', 'border-[#e0e0e0]');
      alternativaClicada.firstElementChild.classList.add('bg-[#144bc8]', 'text-white', 'border-[#144bc8]');
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
  secoesQuestoes.forEach((secao, index) => {
    const topoSecao = secao.getBoundingClientRect().top;
    const fundoSecao = secao.getBoundingClientRect().bottom;

    const secaoVisivel = (topoSecao - 100) < 0 && (fundoSecao - 100) > 0;
    if (secaoVisivel) {
      linksMenuLateral[index].classList.remove('border-[1px]', 'border-[#e0e0e0]');
      linksMenuLateral[index].classList.add('border-2', 'border-[#121212]');
    } else {
      linksMenuLateral[index].classList.remove('border-2', 'border-[#121212]');
      linksMenuLateral[index].classList.add('border-[1px]', 'border-[#e0e0e0]');
    }
  });

  window.addEventListener('scroll', marcaQuestaoAtual);
}
marcaQuestaoAtual();