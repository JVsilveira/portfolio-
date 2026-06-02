document.querySelectorAll(".navbar a").forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault()

    const target = document.querySelector(this.getAttribute("href"))
    if (!target) return

    const targetPosition =
      target.getBoundingClientRect().top + window.pageYOffset - 200
    const startPosition = window.pageYOffset
    const distance = targetPosition - startPosition
    const duration = 1500
    let start = null

    function animation(currentTime) {
      if (start === null) start = currentTime
      const progress = currentTime - start
      const easing = easeInOutQuad(progress / duration)
      window.scrollTo(0, startPosition + distance * easing)
      if (progress < duration) requestAnimationFrame(animation)
    }

    function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
    }

    requestAnimationFrame(animation)
  })
})

const projetos = [
  {
    nome: "Bactérias",
    tecnologias: ["NEST", "CSS", "JavaScript, NEXT, POSTGRESQL"],
    descricao: `
    Desenvolvi uma aplicação full stack para gerenciamento e consulta de bactérias utilizando Next.js, NestJS, PostgreSQL e Prisma. O sistema possui cadastro e pesquisa de registros, validações de dados e integração entre frontend e API REST. O projeto foi implantado em produção utilizando Vercel e desenvolvido com foco em escalabilidade, organização do código e boas práticas de arquitetura de software. A experiência permitiu aprofundar conhecimentos em desenvolvimento full stack, banco de dados relacionais, APIs REST e deploy de aplicações modernas.`,
    link: "<a href='https://bacterias-psi.vercel.app/' class= 'contact-link' target='_blank'>Ver projeto</a>",
  },
  {
    nome: "CRUD",
    tecnologias: ["HTML, CSS, Javascript, Axios, React.js"],
    descricao: `
    Esse projeto foi desenvolvido no curso da Cod3r focado no desenvolvimento de uma crud simples de usuários, onde aprendi o conceito do Create, Read, Update e Delete.`,
    link: "<a href='https://crud-omega-one.vercel.app/' class= 'contact-link' target='_blank'>Ver projeto</a>",
  },
  {
    nome: "Mercado",
    tecnologias: ["Javascript, HTML, CSS"],
    descricao: `
    Aplicação web desenvolvida com HTML, CSS e JavaScript puro, simulando a interface de um supermercado online. O projeto foi criado com o objetivo de praticar conceitos fundamentais de desenvolvimento Front-End, incluindo responsividade, manipulação do DOM, organização de componentes visuais e interatividade utilizando JavaScript.`,

    link: "<a href='https://jvsilveira.github.io/supermarket/?#' class= 'contact-link' target='_blank'>Ver projeto</a>",
  },
  {
    nome: "Calculadora React",
    tecnologias: ["HTML", "CSS", "JavaScript, React.js"],
    descricao: `
    Projeto desenvolvido juntamente ao curso da Cod3r, onde aprendi a executar funções, construtores e props no react para criar uma calculadora funcional.`,
    link: "<a href='https://calculadora-rho-vert.vercel.app/' class= 'contact-link' target='_blank'>Ver projeto</a>",
  },
]

let index = 0

const projetoSection = document.querySelector("#whatido")

function atualizarProjeto() {
  if (!projetoSection) return

  const p = projetos[index]

  projetoSection.innerHTML = `
  
    <div class="button">
    <button id="prev" class="arrow">&#10094;</button>
    </div>
    <div class="carrousel">
    <p>
      <span class="pink">function</span> <span class="green">projetos()</span> <span class="white">{</span>
    </p>
    <p class="indent-1">
      <span class="pink">return</span> <span class="white">{</span>
    </p>

    <div class="indent-2 code-line">
        <span class="pink">titulo </span><span class="white">:</span>
      <span class="yellow">"${p.nome}"</span><span class="white">,</span>
    </div>

    <div class="indent-2 code-line descricao">
      <span class="pink">tecnologias</span><span class="white">:</span>
      <span class="yellow">[${p.tecnologias
        .map(t => `"${t}"`)
        .join(", ")}]<span class="white">,</span></span>
    </div>

    <div class="indent-2 code-line multiline">
      <span class="pink">descricao</span><span class="white">:</span>
      <span class="yellow">\`</span>
    </div>

    <pre class="indent-3 descricao">
      ${p.descricao.trim()}
    </pre>

    <p class="indent-2"><span class="yellow">\`</span><span class="white">,</span></p>

    <div class="indent-2 code-line">
      <span class="pink">link</span><span class="white">:</span>
      <span class="yellow">"${p.link}"</span><span class="white">,</span>
    </div>

    <p class="indent-1"><span class="white">}</span></p>
    <p><span class="white">}</span></p>
    </div>
    <div class="button">
    <button id="next" class="arrow">&#10095;</button>
    </div>
    
  `

  document.getElementById("prev").addEventListener("click", () => {
    index = (index - 1 + projetos.length) % projetos.length
    atualizarProjeto()
  })

  document.getElementById("next").addEventListener("click", () => {
    index = (index + 1) % projetos.length
    atualizarProjeto()
  })
}

document.addEventListener("DOMContentLoaded", atualizarProjeto)
