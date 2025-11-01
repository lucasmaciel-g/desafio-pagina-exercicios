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
  
  function selecionarAlternativa(indexClicado) {

    const alternativaSelecionada = alternativa[indexClicado];
    const verificaSelecionada = alternativaSelecionada.classList.contains('bg-[#c2d4ff]');
    
    alternativa.forEach((item) => {
      item.classList.remove('bg-[#c2d4ff]', 'border-2', 'border-[#144bc8]');
      item.classList.add('group', 'hover:border-gray-800', 'hover:bg-gray-100', 'opacity-80');
      item.firstElementChild.classList.add('bg-gray-100', 'border-[#e0e0e0]');
      item.firstElementChild.classList.remove('bg-[#144bc8]', 'text-white', 'border-[#144bc8]');
    });
    if (!verificaSelecionada) {
      alternativaSelecionada.classList.remove('group', 'hover:border-gray-800', 'hover:bg-gray-100', 'opacity-80');
      alternativaSelecionada.classList.add('bg-[#c2d4ff]', 'border-2', 'border-[#144bc8]');
      alternativaSelecionada.firstElementChild.classList.remove('bg-gray-100', 'border-[#e0e0e0]');
      alternativaSelecionada.firstElementChild.classList.add('bg-[#144bc8]', 'text-white', 'border-[#144bc8]');
    }
  }
  
  alternativa.forEach((item, index) => {
    item.addEventListener('click', () => selecionarAlternativa(index));
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