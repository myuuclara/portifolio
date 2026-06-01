const tabs = Array.from(document.querySelectorAll("[role='tab']"));
const panels = Array.from(document.querySelectorAll("[role='tabpanel']"));
const filters = Array.from(document.querySelectorAll(".filter"));
const techItems = Array.from(document.querySelectorAll(".tech"));
const techCategories = Array.from(document.querySelectorAll("[data-tech-category]"));
const toast = document.querySelector(".toast");
const sectionShortcuts = Array.from(document.querySelectorAll("[data-section-shortcut]"));
const resumeShell = document.querySelector(".resume-shell");
const paperIntro = document.querySelector(".paper-intro");
const letterOpen = document.querySelector("[data-open-letter]");
const metaDescription = document.querySelector("meta[name='description']");
const languageSwitch = document.querySelector(".language-switch");
const languageButtons = Array.from(document.querySelectorAll("[data-language-option]"));
const projectCards = Array.from(document.querySelectorAll("[data-project]"));
const projectModalLayer = document.querySelector("[data-project-modal]");
const projectModal = projectModalLayer?.querySelector(".project-modal");
const projectModalTitle = document.querySelector("#project-modal-title");
const projectModalCategory = document.querySelector("[data-project-modal-category]");
const projectModalSummary = document.querySelector("[data-project-modal-summary]");
const projectModalDetails = document.querySelector("[data-project-modal-details]");
const projectModalActions = document.querySelector("[data-project-modal-actions]");
const tabOrder = tabs.map((tab) => tab.dataset.tab || tab.dataset.goTab);
let activeTabId = null;
let currentLanguage = "pt";
let activeProjectId = null;
let lastFocusedElement = null;

const projectDossiers = {
  pt: {
  "rastreabilidade-biotron": {
    title: "Rastreabilidade Biotron",
    category: "Projeto profissional",
    summary:
      "Sistema interno desenvolvido para organizar registros, consultas e acompanhamento de rastreabilidade. O projeto envolve banco de dados, autenticação, controle de acesso e estruturação de informações operacionais.",
    details: [
      {
        title: "Problema",
        body:
          "Registros operacionais precisam ser organizados de forma rastreável, com consultas consistentes e acesso adequado para diferentes perfis."
      },
      {
        title: "Solução",
        body:
          "Estrutura de sistema interno para cadastro, consulta e acompanhamento de dados de rastreabilidade, com atenção à organização das informações e ao uso em rotina operacional."
      },
      {
        title: "Meu papel",
        body:
          "Atuação no desenvolvimento da interface, estrutura de dados, autenticação, controle de acesso e manutenção das funcionalidades relacionadas ao fluxo."
      },
      {
        title: "Status",
        body: "Sistema interno em desenvolvimento e evolução."
      },
      {
        title: "Tecnologias e recursos",
        tags: ["PostgreSQL", "Firestore", "SQLite", "Autenticação", "Controle de acesso"]
      }
    ]
  },
  "biotron-app": {
    title: "Biotron App",
    category: "Projeto profissional",
    summary:
      "Aplicativo mobile desenvolvido para apoiar registros operacionais e fluxos internos da empresa, com foco em praticidade, organização de dados e uso em diferentes contextos de trabalho.",
    details: [
      {
        title: "Problema",
        body:
          "Processos internos podem depender de registros dispersos e pouco práticos para uso em campo ou em diferentes ambientes de trabalho."
      },
      {
        title: "Solução",
        body:
          "Aplicação mobile voltada a registros operacionais, organização de dados e suporte a fluxos internos, incluindo uso offline quando necessário."
      },
      {
        title: "Meu papel",
        body:
          "Participação ampla na interface, desenvolvimento mobile, estruturação de dados, autenticação e manutenção das telas e fluxos criados."
      },
      {
        title: "Status",
        body: "Aplicação interna em desenvolvimento e evolução."
      },
      {
        title: "Tecnologias e recursos",
        tags: ["React Native", "Expo", "TypeScript", "Firebase", "SQLite", "Sincronização offline"]
      }
    ]
  },
  "biotron-site": {
    title: "Biotron Site",
    category: "Projeto profissional",
    summary:
      "Site institucional desenvolvido para apresentar produtos, facilitar solicitações de orçamento e oferecer experiências digitais como visualização 360/AR e assistente virtual com IA.",
    details: [
      {
        title: "Problema",
        body:
          "A apresentação institucional de produtos precisa ser clara, acessível e útil para pessoas que procuram informações ou desejam solicitar orçamento."
      },
      {
        title: "Solução",
        body:
          "Site com catálogo de produtos, fluxo de orçamento e recursos digitais de apoio à visualização e ao atendimento."
      },
      {
        title: "Meu papel",
        body:
          "Desenvolvimento da interface, organização das seções, estruturação dos fluxos de produto e integração de recursos digitais."
      },
      {
        title: "Status",
        body: "Site institucional em desenvolvimento e evolução."
      },
      {
        title: "Tecnologias e recursos",
        tags: ["HTML", "CSS", "JavaScript", "Catálogo", "Visualização 360/AR", "Assistente virtual com IA"]
      }
    ]
  },
  inspace: {
    title: "In Space",
    category: "Projeto acadêmico e premiado",
    summary:
      "Projeto educacional voltado à alfabetização lúdica, com cabine interativa tematizada no sistema solar. Premiado como melhor projeto na área de educação.",
    details: [
      {
        title: "Problema",
        body:
          "Atividades de alfabetização podem se tornar mais envolventes quando combinam conteúdo pedagógico, narrativa e interação física."
      },
      {
        title: "Solução",
        body:
          "Cabine interativa tematizada no sistema solar para apoiar uma experiência de alfabetização lúdica."
      },
      {
        title: "Meu papel",
        body:
          "Participação na construção da proposta, organização da experiência e apresentação técnica do projeto."
      },
      {
        title: "Status",
        body: "Projeto acadêmico premiado em 2023."
      },
      {
        title: "Tecnologias e recursos",
        tags: ["Experiência interativa", "Prototipagem", "Apresentação técnica"]
      }
    ]
  },
  ecosmart: {
    title: "EcoSmart",
    category: "Projeto acadêmico e premiado",
    summary:
      "Lixeira inteligente com separação de resíduos e aplicativo de monitoramento. Premiado como melhor projeto apresentado em inglês.",
    details: [
      {
        title: "Problema",
        body:
          "A separação de resíduos pode ser prejudicada por falta de orientação, acompanhamento e organização do descarte."
      },
      {
        title: "Solução",
        body:
          "Proposta de lixeira inteligente com separação de resíduos e aplicativo para acompanhamento das informações."
      },
      {
        title: "Meu papel",
        body:
          "Participação na estruturação da proposta, organização da experiência de uso e apresentação técnica em inglês."
      },
      {
        title: "Status",
        body: "Projeto acadêmico premiado em 2024."
      },
      {
        title: "Tecnologias e recursos",
        tags: ["Aplicativo de monitoramento", "Prototipagem", "Apresentação em inglês"]
      }
    ]
  },
  naya: {
    title: "Naya",
    category: "Projeto acadêmico documentado",
    summary:
      "Solução voltada à dermatologia, com anamnese automatizada, padronização de imagens e apoio à organização de tratamentos com fototerapia.",
    details: [
      {
        title: "Problema",
        body:
          "Processos dermatológicos podem depender de registros manuais, imagens pouco padronizadas e acompanhamento fragmentado, dificultando a organização das informações do paciente e do tratamento."
      },
      {
        title: "Solução",
        body:
          "O Naya propõe uma ferramenta de apoio à dermatologia com anamnese automatizada, padronização de imagens e organização de dados para acompanhamento de tratamentos com fototerapia."
      },
      {
        title: "Meu papel",
        body:
          "Atuei na estruturação da proposta, organização da experiência de uso, definição das funcionalidades principais, documentação do processo e desenvolvimento da apresentação técnica do projeto."
      },
      {
        title: "Status",
        body: "Projeto acadêmico / protótipo documentado."
      },
      {
        title: "Tecnologias e recursos",
        tags: ["Anamnese automatizada", "Padronização de imagens", "Documentação", "Apresentação técnica"]
      }
    ],
    link: {
      label: "Ver diário de bordo",
      href:
        "https://wonderful-alpaca-9aa.notion.site/Di-rio-de-Bordo-Naya-3202-BIO-25f303cd2aaf80e8a500e6ac9f59d6c8"
    }
  },
  vital: {
    title: "Vital",
    category: "Projeto acadêmico",
    summary:
      "Solução voltada à segurança no reprocessamento de produtos para a saúde, com foco em organização, controle e confiabilidade dos processos.",
    details: [
      {
        title: "Problema",
        body:
          "Processos de reprocessamento de produtos para a saúde exigem organização, controle e informações confiáveis para reduzir falhas operacionais."
      },
      {
        title: "Solução",
        body:
          "Proposta técnica voltada ao apoio da segurança no reprocessamento, com foco em controle, clareza de etapas e confiabilidade das informações."
      },
      {
        title: "Meu papel",
        body:
          "Participação na estruturação da solução, organização dos fluxos e apresentação técnica do projeto."
      },
      {
        title: "Status",
        body: "Projeto acadêmico / proposta técnica."
      },
      {
        title: "Tecnologias e recursos",
        tags: ["Organização de processos", "Controle operacional", "Documentação técnica"]
      }
    ]
  }
  },
  en: {
    "rastreabilidade-biotron": {
      title: "Biotron Traceability",
      category: "Professional project",
      summary:
        "Internal system developed to organize records, searches and traceability tracking. The project involves databases, authentication, access control and structured operational information.",
      details: [
        {
          title: "Problem",
          body:
            "Operational records need to be organized in a traceable way, with consistent searches and appropriate access for different user profiles."
        },
        {
          title: "Solution",
          body:
            "Internal system structure for registration, searching and tracking traceability data, with attention to information organization and daily operational use."
        },
        {
          title: "My role",
          body:
            "Worked on interface development, data structure, authentication, access control and maintenance of features related to the flow."
        },
        {
          title: "Status",
          body: "Internal system in development and ongoing improvement."
        },
        {
          title: "Technologies and resources",
          tags: ["PostgreSQL", "Firestore", "SQLite", "Authentication", "Access control"]
        }
      ]
    },
    "biotron-app": {
      title: "Biotron App",
      category: "Professional project",
      summary:
        "Mobile app developed to support operational records and internal workflows, focused on practicality, data organization and use in different work contexts.",
      details: [
        {
          title: "Problem",
          body:
            "Internal processes can depend on scattered records that are not practical for field use or different work environments."
        },
        {
          title: "Solution",
          body:
            "Mobile application for operational records, data organization and support for internal workflows, including offline use when needed."
        },
        {
          title: "My role",
          body:
            "Broad participation in interface design, mobile development, data structure, authentication and maintenance of the screens and flows created."
        },
        {
          title: "Status",
          body: "Internal application in development and ongoing improvement."
        },
        {
          title: "Technologies and resources",
          tags: ["React Native", "Expo", "TypeScript", "Firebase", "SQLite", "Offline sync"]
        }
      ]
    },
    "biotron-site": {
      title: "Biotron Website",
      category: "Professional project",
      summary:
        "Institutional website developed to present products, support quote requests and offer digital experiences such as 360/AR visualization and an AI virtual assistant.",
      details: [
        {
          title: "Problem",
          body:
            "The institutional presentation of products needs to be clear, accessible and useful for people looking for information or requesting a quote."
        },
        {
          title: "Solution",
          body:
            "Website with product catalog, quote flow and digital resources to support visualization and service."
        },
        {
          title: "My role",
          body:
            "Interface development, section organization, product flow structure and integration of digital resources."
        },
        {
          title: "Status",
          body: "Institutional website in development and ongoing improvement."
        },
        {
          title: "Technologies and resources",
          tags: ["HTML", "CSS", "JavaScript", "Catalog", "360/AR visualization", "AI virtual assistant"]
        }
      ]
    },
    inspace: {
      title: "In Space",
      category: "Academic and awarded project",
      summary:
        "Educational project focused on playful literacy, with an interactive booth themed around the solar system. Awarded best project in the education category.",
      details: [
        {
          title: "Problem",
          body:
            "Literacy activities can become more engaging when they combine pedagogical content, narrative and physical interaction."
        },
        {
          title: "Solution",
          body:
            "Interactive booth themed around the solar system to support a playful literacy experience."
        },
        {
          title: "My role",
          body:
            "Participated in shaping the proposal, organizing the experience and preparing the technical presentation."
        },
        {
          title: "Status",
          body: "Academic project awarded in 2023."
        },
        {
          title: "Technologies and resources",
          tags: ["Interactive experience", "Prototyping", "Technical presentation"]
        }
      ]
    },
    ecosmart: {
      title: "EcoSmart",
      category: "Academic and awarded project",
      summary:
        "Smart trash bin with waste separation and a monitoring app. Awarded best project presented in English.",
      details: [
        {
          title: "Problem",
          body:
            "Waste separation can be affected by lack of guidance, tracking and organization during disposal."
        },
        {
          title: "Solution",
          body:
            "Smart trash bin proposal with waste separation and an app to monitor information."
        },
        {
          title: "My role",
          body:
            "Participated in structuring the proposal, organizing the user experience and presenting the project in English."
        },
        {
          title: "Status",
          body: "Academic project awarded in 2024."
        },
        {
          title: "Technologies and resources",
          tags: ["Monitoring app", "Prototyping", "English presentation"]
        }
      ]
    },
    naya: {
      title: "Naya",
      category: "Documented academic project",
      summary:
        "Dermatology-focused solution with automated anamnesis, image standardization and support for organizing phototherapy treatments.",
      details: [
        {
          title: "Problem",
          body:
            "Dermatology processes may depend on manual records, poorly standardized images and fragmented follow-up, making patient and treatment information harder to organize."
        },
        {
          title: "Solution",
          body:
            "Naya proposes a dermatology support tool with automated anamnesis, image standardization and data organization for monitoring phototherapy treatments."
        },
        {
          title: "My role",
          body:
            "Worked on structuring the proposal, organizing the user experience, defining core features, documenting the process and developing the technical presentation."
        },
        {
          title: "Status",
          body: "Academic project / documented prototype."
        },
        {
          title: "Technologies and resources",
          tags: ["Automated anamnesis", "Image standardization", "Documentation", "Technical presentation"]
        }
      ],
      link: {
        label: "View project log",
        href:
          "https://wonderful-alpaca-9aa.notion.site/Di-rio-de-Bordo-Naya-3202-BIO-25f303cd2aaf80e8a500e6ac9f59d6c8"
      }
    },
    vital: {
      title: "Vital",
      category: "Academic project",
      summary:
        "Solution focused on safety in the reprocessing of healthcare products, with emphasis on organization, control and process reliability.",
      details: [
        {
          title: "Problem",
          body:
            "Healthcare product reprocessing requires organization, control and reliable information to reduce operational failures."
        },
        {
          title: "Solution",
          body:
            "Technical proposal to support reprocessing safety, focused on control, clearer steps and reliable information."
        },
        {
          title: "My role",
          body:
            "Participated in structuring the solution, organizing flows and preparing the technical presentation."
        },
        {
          title: "Status",
          body: "Academic project / technical proposal."
        },
        {
          title: "Technologies and resources",
          tags: ["Process organization", "Operational control", "Technical documentation"]
        }
      ]
    }
  }
};

const pageCopy = {
  pt: {
    htmlLang: "pt-BR",
    title: "Maria Clara Dias | Developer & Designer",
    metaDescription:
      "Portfólio de Maria Clara Dias, desenvolvedora de sistemas com projetos web, mobile, APIs, automações e produtos digitais.",
    titlebar: {
      languageLabel: "Idioma do portfólio",
      tag: "software developer"
    },
    intro: {
      dialogLabel: "Carta de abertura do portfólio",
      title: "portfólio",
      subtitle: "Desenvolvedora de Sistemas | Automação de Processos | Produto Digital",
      open: "abrir portfólio",
      code: ['const dev = "Maria Clara Dias";', "open(portfólio);"]
    },
    hero: {
      eyebrow: "portfólio",
      role: "Desenvolvedora de Sistemas | Mobile, Web & Produto Digital",
      note:
        "Foco em interfaces limpas e funcionais, pensadas para transformar processos complexos em experiências simples, úteis e bem organizadas.",
      actionsLabel: "Ações principais do portfólio",
      actions: ["Ver projetos", "Ver currículo", "Entrar em contato"]
    },
    menu: {
      aria: "Índice do currículo",
      head: ["Índice", "abrir"],
      tabs: [
        { title: "Resumo", small: "eu.exe" },
        { title: "Biotron", small: "sistemas" },
        { title: "Projetos", small: "entregas" },
        { title: "Stack", small: "tools" },
        { title: "Formação", small: "base" },
        { title: "Contato", small: "links" },
        { title: "Original", small: "png" }
      ]
    },
    stepperLabel: "Navegação entre seções",
    nextLabel: "Ir para",
    summary: {
      profile: "perfil.exe",
      kicker: "</>dev",
      title: "Resumo profissional",
      paragraphs: [
        "Sou desenvolvedora de sistemas com experiência em aplicações web, mobile, APIs, automações e produtos digitais. Atuo no desenvolvimento de soluções internas para a Biotron, transformando processos operacionais em sistemas mais organizados, rastreáveis e fáceis de usar.",
        "Hoje participo de etapas importantes do ciclo dos sistemas: levantamento de necessidades, interface, desenvolvimento, banco de dados, autenticação, automação e manutenção."
      ],
      code: ['const foco = "interface + processo";', 'const mood = "criatividade e curiosidade";'],
      proofLabel: "Resumo em números",
      proof: [
        { small: "agora", strong: "2026-atual", span: "Biotron Equipamentos Médicos" },
        { small: "atuação", strong: "responsabilidade técnica direta", span: "soluções internas e produtos digitais" },
        { small: "portfólio", strong: "7 projetos", span: "profissionais, acadêmicos e premiados" }
      ],
      foldersLabel: "Áreas do resumo profissional",
      folders: [
        {
          small: "folder 01",
          title: "web.mobile",
          body: "Desenvolvimento de interfaces web e mobile com React Native, Expo, TypeScript, HTML, CSS e JavaScript."
        },
        {
          small: "folder 02",
          title: "api.data",
          body: "Desenvolvimento de APIs, integrações e estruturas de dados com FastAPI, Supabase, Firebase e PostgreSQL."
        },
        {
          small: "folder 03",
          title: "produto.ui",
          body: "Criação de soluções digitais para processos internos, catálogos, registros operacionais e experiências de uso mais claras."
        },
        {
          small: "folder 04",
          title: "autonomia",
          body: "Participação ampla em decisões de interface, estrutura, banco de dados, autenticação e manutenção dos sistemas."
        }
      ]
    },
    experience: {
      eyebrow: "Trajetória",
      title: "Experiência profissional",
      date: "2026 - atual",
      role: "Estagiária em Desenvolvimento de Software",
      description:
        "Desenvolvimento de sistemas internos, aplicações mobile, APIs e soluções digitais para apoiar processos operacionais da empresa.",
      bullets: [
        "Desenvolvimento de aplicações web e mobile com React Native, Expo, TypeScript, HTML, CSS e JavaScript.",
        "Criação de sistemas para registro de vendas, operações internas e automação de processos.",
        "Desenvolvimento de APIs e integrações usando Python, FastAPI, Supabase e Firebase.",
        "Implementação de autenticação, controle de acesso por perfil e gerenciamento de sessões.",
        "Criação de sistemas de rastreabilidade com PostgreSQL, Firestore e SQLite.",
        "Implementação de funcionamento offline com sincronização posterior.",
        "Desenvolvimento de site institucional com catálogo de produtos, orçamento, visualização 360/AR e assistente virtual com IA.",
        "Responsabilidade técnica direta pela manutenção, evolução e organização das aplicações desenvolvidas."
      ],
      ribbonLabel: "Áreas de atuação na experiência",
      ribbon: ["Aplicações internas", "Automação", "Autenticação", "Rastreabilidade", "IA aplicada"]
    },
    projects: {
      eyebrow: "Portfólio",
      title: "Projetos",
      professional: "Projetos profissionais",
      academic: "Projetos acadêmicos e premiados",
      cardAction: "Abrir dossiê",
      cards: {
        "rastreabilidade-biotron": {
          type: "Biotron",
          title: "Rastreabilidade Biotron",
          description: "Sistema interno desenvolvido para organizar registros, consultas e acompanhamento de rastreabilidade.",
          tags: ["Sistema interno", "Dados", "Acesso"],
          aria: "Abrir dossiê do projeto Rastreabilidade Biotron"
        },
        "biotron-app": {
          type: "Biotron",
          title: "Biotron App",
          description: "Aplicativo mobile desenvolvido para apoiar registros operacionais e fluxos internos da empresa.",
          tags: ["Mobile", "Offline", "Operações"],
          aria: "Abrir dossiê do projeto Biotron App"
        },
        "biotron-site": {
          type: "Biotron",
          title: "Biotron Site",
          description: "Site institucional desenvolvido para apresentar produtos, orçamentos e experiências digitais.",
          tags: ["Site", "Catálogo", "IA"],
          aria: "Abrir dossiê do projeto Biotron Site"
        },
        inspace: {
          type: "Educação",
          title: "In Space",
          description: "Projeto educacional voltado à alfabetização lúdica, com cabine interativa tematizada no sistema solar.",
          tags: ["Educação", "Interativo", "Premiado"],
          aria: "Abrir dossiê do projeto In Space"
        },
        ecosmart: {
          type: "Sustentabilidade",
          title: "EcoSmart",
          description: "Lixeira inteligente com separação de resíduos e aplicativo de monitoramento.",
          tags: ["Sustentabilidade", "App", "Inglês"],
          aria: "Abrir dossiê do projeto EcoSmart"
        },
        naya: {
          type: "Saúde",
          title: "Naya",
          description: "Solução voltada à dermatologia, com anamnese automatizada, padronização de imagens e fototerapia.",
          tags: ["Saúde", "Documentado", "Fototerapia"],
          aria: "Abrir dossiê do projeto Naya"
        },
        vital: {
          type: "Saúde",
          title: "Vital",
          description: "Solução voltada à segurança no reprocessamento de produtos para a saúde.",
          tags: ["Saúde", "Processos", "Segurança"],
          aria: "Abrir dossiê do projeto Vital"
        }
      }
    },
    tech: {
      eyebrow: "Stack",
      title: "Tecnologias",
      filtersLabel: "Filtros de tecnologias",
      filters: ["Todas", "Mobile & Front-end", "Back-end & APIs", "Banco de dados", "Produto & Ferramentas"],
      boardLabel: "Lista de tecnologias",
      categories: ["Mobile & Front-end", "Back-end & APIs", "Banco de dados & Dados", "Produto & Ferramentas"]
    },
    formation: {
      eyebrow: "Formação",
      title: "Técnica, saúde e sistemas",
      school: "Base técnica",
      degree: "Eletrônica Biomédica como base para software aplicado",
      period: "ETE FMC | Ensino médio concluído em 2025",
      note:
        "Minha formação técnica aproximou minha prática de equipamentos biomédicos, documentação, rastreabilidade e processos de saúde. No portfólio, essa base aparece em sistemas internos, protótipos acadêmicos e soluções pensadas para uso real.",
      tagsLabel: "Áreas conectadas à formação",
      tags: ["equipamentos", "rastreabilidade", "produto digital"],
      languagesTitle: "Comunicação no trabalho",
      languages: [
        {
          label: "Português",
          note: "documentação e alinhamento técnico",
          level: "nativo",
          meter: "100%",
          dots: 6,
          aria: "Português: nativo"
        },
        {
          label: "Inglês",
          note: "apresentações e projetos bilíngues",
          level: "avançado",
          meter: "84%",
          dots: 5,
          aria: "Inglês: avançado"
        },
        {
          label: "Mandarim",
          note: "base inicial de estudo",
          level: "básico",
          meter: "24%",
          dots: 1,
          aria: "Mandarim: básico"
        }
      ],
      highlightsTitle: "Meu jeito de aplicar",
      highlights: [
        "Gosto de transformar uma ideia técnica em algo claro, apresentável e possível de testar.",
        "Minha formação em saúde me ajuda a pensar em sistemas com processo, documentação e responsabilidade.",
        "Comunicação é parte do meu trabalho: apresentar, explicar decisões e organizar pessoas em volta do projeto."
      ]
    },
    contact: {
      eyebrow: "Conexão",
      title: "Contato",
      labels: ["E-mail", "Localização"],
      values: [
        "mariaclara.mariaclaradias@gmail.com",
        "Minas Gerais, Brasil"
      ],
      copyValues: [
        "mariaclara.mariaclaradias@gmail.com",
        "Minas Gerais, Brasil"
      ],
      socialsLabel: "Redes sociais",
      githubAria: "Abrir GitHub de Maria Clara",
      linkedinAria: "Abrir LinkedIn de Maria Clara",
      whatsappAria: "Abrir WhatsApp de Maria Clara"
    },
    original: {
      eyebrow: "Referência",
      title: "Currículo original",
      helper: "PNG em alta qualidade",
      action: "Baixar currículo original"
    },
    modal: {
      close: "Fechar dossiê do projeto"
    },
    toastCopied: "Copiado."
  },
  en: {
    htmlLang: "en",
    title: "Maria Clara Dias | Developer & Designer",
    metaDescription:
      "Portfolio of Maria Clara Dias, a software developer with web, mobile, API, automation and digital product projects.",
    titlebar: {
      languageLabel: "Portfolio language",
      tag: "software developer"
    },
    intro: {
      dialogLabel: "Portfolio opening letter",
      title: "portfolio",
      subtitle: "Systems Developer | Process Automation | Digital Product",
      open: "open portfolio",
      code: ['const dev = "Maria Clara Dias";', "open(portfolio);"]
    },
    hero: {
      eyebrow: "portfolio",
      role: "Software Developer | Mobile, Web & Digital Product",
      note:
        "Focused on clean, functional interfaces designed to turn complex processes into simple, useful and well-organized experiences.",
      actionsLabel: "Main portfolio actions",
      actions: ["View projects", "View resume", "Get in touch"]
    },
    menu: {
      aria: "Resume index",
      head: ["Index", "open"],
      tabs: [
        { title: "Summary", small: "me.exe" },
        { title: "Biotron", small: "systems" },
        { title: "Projects", small: "work" },
        { title: "Stack", small: "tools" },
        { title: "Education", small: "base" },
        { title: "Contact", small: "links" },
        { title: "Resume", small: "png" }
      ]
    },
    stepperLabel: "Section navigation",
    nextLabel: "Go to",
    summary: {
      profile: "profile.exe",
      kicker: "</>dev",
      title: "Professional summary",
      paragraphs: [
        "I am a software developer with experience in web and mobile applications, APIs, automations and digital products. I work on internal solutions for Biotron, turning operational processes into systems that are more organized, traceable and easier to use.",
        "Today I participate in important stages of the systems cycle: requirements discovery, interface design, development, databases, authentication, automation and maintenance."
      ],
      code: ['const focus = "interface + process";', 'const mood = "creativity and curiosity";'],
      proofLabel: "Summary highlights",
      proof: [
        { small: "now", strong: "2026-present", span: "Biotron Equipamentos Médicos" },
        { small: "scope", strong: "direct technical responsibility", span: "internal solutions and digital products" },
        { small: "portfolio", strong: "7 projects", span: "professional, academic and awarded work" }
      ],
      foldersLabel: "Professional summary areas",
      folders: [
        {
          small: "folder 01",
          title: "web.mobile",
          body: "Web and mobile interface development with React Native, Expo, TypeScript, HTML, CSS and JavaScript."
        },
        {
          small: "folder 02",
          title: "api.data",
          body: "API, integration and data structure development with FastAPI, Supabase, Firebase and PostgreSQL."
        },
        {
          small: "folder 03",
          title: "product.ui",
          body: "Digital solutions for internal processes, catalogs, operational records and clearer user experiences."
        },
        {
          small: "folder 04",
          title: "autonomy",
          body: "Broad participation in interface, structure, database, authentication and system maintenance decisions."
        }
      ]
    },
    experience: {
      eyebrow: "Experience",
      title: "Professional experience",
      date: "2026 - present",
      role: "Software Development Intern",
      description:
        "Development of internal systems, mobile applications, APIs and digital solutions to support company operational processes.",
      bullets: [
        "Development of web and mobile applications with React Native, Expo, TypeScript, HTML, CSS and JavaScript.",
        "Creation of systems for sales records, internal operations and process automation.",
        "Development of APIs and integrations using Python, FastAPI, Supabase and Firebase.",
        "Implementation of authentication, role-based access control and session management.",
        "Creation of traceability systems with PostgreSQL, Firestore and SQLite.",
        "Implementation of offline functionality with later synchronization.",
        "Development of an institutional website with product catalog, quote requests, 360/AR visualization and an AI virtual assistant.",
        "Direct technical responsibility for maintaining, evolving and organizing the applications developed."
      ],
      ribbonLabel: "Experience areas",
      ribbon: ["Internal apps", "Automation", "Authentication", "Traceability", "Applied AI"]
    },
    projects: {
      eyebrow: "Portfolio",
      title: "Projects",
      professional: "Professional projects",
      academic: "Academic and awarded projects",
      cardAction: "Open dossier",
      cards: {
        "rastreabilidade-biotron": {
          type: "Biotron",
          title: "Biotron Traceability",
          description: "Internal system developed to organize records, searches and traceability tracking.",
          tags: ["Internal system", "Data", "Access"],
          aria: "Open dossier for Biotron Traceability"
        },
        "biotron-app": {
          type: "Biotron",
          title: "Biotron App",
          description: "Mobile app developed to support operational records and internal workflows.",
          tags: ["Mobile", "Offline", "Operations"],
          aria: "Open dossier for Biotron App"
        },
        "biotron-site": {
          type: "Biotron",
          title: "Biotron Website",
          description: "Institutional website developed to present products, quote requests and digital experiences.",
          tags: ["Website", "Catalog", "AI"],
          aria: "Open dossier for Biotron Website"
        },
        inspace: {
          type: "Education",
          title: "In Space",
          description: "Educational project focused on playful literacy, with an interactive solar-system-themed booth.",
          tags: ["Education", "Interactive", "Awarded"],
          aria: "Open dossier for In Space"
        },
        ecosmart: {
          type: "Sustainability",
          title: "EcoSmart",
          description: "Smart trash bin with waste separation and a monitoring app.",
          tags: ["Sustainability", "App", "English"],
          aria: "Open dossier for EcoSmart"
        },
        naya: {
          type: "Health",
          title: "Naya",
          description: "Dermatology-focused solution with automated anamnesis, image standardization and phototherapy support.",
          tags: ["Health", "Documented", "Phototherapy"],
          aria: "Open dossier for Naya"
        },
        vital: {
          type: "Health",
          title: "Vital",
          description: "Solution focused on safety in the reprocessing of healthcare products.",
          tags: ["Health", "Processes", "Safety"],
          aria: "Open dossier for Vital"
        }
      }
    },
    tech: {
      eyebrow: "Stack",
      title: "Technologies",
      filtersLabel: "Technology filters",
      filters: ["All", "Mobile & Front-end", "Back-end & APIs", "Databases", "Product & Tools"],
      boardLabel: "Technology list",
      categories: ["Mobile & Front-end", "Back-end & APIs", "Databases & Data", "Product & Tools"]
    },
    formation: {
      eyebrow: "Education",
      title: "Technology, healthcare and systems",
      school: "Technical base",
      degree: "Biomedical Electronics as a base for applied software",
      period: "ETE FMC | High school completed in 2025",
      note:
        "My technical training brought my practice closer to biomedical equipment, documentation, traceability and healthcare processes. In this portfolio, that base appears in internal systems, academic prototypes and solutions designed for real use.",
      tagsLabel: "Areas connected to my training",
      tags: ["equipment", "traceability", "digital product"],
      languagesTitle: "Communication at work",
      languages: [
        {
          label: "Portuguese",
          note: "documentation and technical alignment",
          level: "native",
          meter: "100%",
          dots: 6,
          aria: "Portuguese: native"
        },
        {
          label: "English",
          note: "presentations and bilingual projects",
          level: "advanced",
          meter: "84%",
          dots: 5,
          aria: "English: advanced"
        },
        {
          label: "Mandarin",
          note: "early study foundation",
          level: "basic",
          meter: "24%",
          dots: 1,
          aria: "Mandarin: basic"
        }
      ],
      highlightsTitle: "My way of applying it",
      highlights: [
        "I like turning a technical idea into something clear, presentable and possible to test.",
        "My healthcare background helps me think about systems with process, documentation and responsibility.",
        "Communication is part of how I work: presenting, explaining decisions and organizing people around a project."
      ]
    },
    contact: {
      eyebrow: "Connection",
      title: "Contact",
      labels: ["E-mail", "Location"],
      values: [
        "mariaclara.mariaclaradias@gmail.com",
        "Minas Gerais, Brazil"
      ],
      copyValues: [
        "mariaclara.mariaclaradias@gmail.com",
        "Minas Gerais, Brazil"
      ],
      socialsLabel: "Social links",
      githubAria: "Open Maria Clara's GitHub",
      linkedinAria: "Open Maria Clara's LinkedIn",
      whatsappAria: "Open Maria Clara's WhatsApp"
    },
    original: {
      eyebrow: "Reference",
      title: "Original resume",
      helper: "High-quality PNG",
      action: "Download original resume"
    },
    modal: {
      close: "Close project dossier"
    },
    toastCopied: "Copied."
  }
};

function getCopy() {
  return pageCopy[currentLanguage] || pageCopy.pt;
}

function getInitialLanguage() {
  try {
    const storedLanguage = window.localStorage.getItem("portfolio-language");
    if (pageCopy[storedLanguage]) {
      return storedLanguage;
    }
  } catch {
    return "pt";
  }

  return "pt";
}

function saveLanguage(language) {
  try {
    window.localStorage.setItem("portfolio-language", language);
  } catch {
    // Local files and privacy settings can block localStorage.
  }
}

function setText(selector, text, scope = document) {
  const element = scope.querySelector(selector);
  if (element && text !== undefined) {
    element.textContent = text;
  }
}

function setAttribute(selector, attribute, value, scope = document) {
  const element = scope.querySelector(selector);
  if (element && value !== undefined) {
    element.setAttribute(attribute, value);
  }
}

function updateList(selector, values, callback, scope = document) {
  const items = Array.from(scope.querySelectorAll(selector));
  items.forEach((item, index) => {
    if (values[index] !== undefined) {
      callback(item, values[index], index);
    }
  });
}

function getProjectDossier(projectId) {
  return projectDossiers[currentLanguage]?.[projectId] || projectDossiers.pt[projectId];
}

function updateStepperLabels() {
  const copy = getCopy();

  document.querySelectorAll(".panel-stepper").forEach((stepper) => {
    stepper.setAttribute("aria-label", copy.stepperLabel);
  });

  document.querySelectorAll(".next-panel-button").forEach((button) => {
    const nextTabId = button.dataset.goTab;
    button.setAttribute("aria-label", `${copy.nextLabel} ${getTabLabel(nextTabId)}`);
  });
}

function resetActiveTabs() {
  resumeShell.hidden = true;
  resumeShell?.classList.remove("has-active-panel", "deck-forward", "deck-back");
  activeTabId = null;

  tabs.forEach((tab) => {
    tab.classList.remove("is-active");
    tab.setAttribute("aria-selected", "false");
    tab.tabIndex = 0;
  });

  panels.forEach((panel) => {
    panel.classList.remove("is-active");
    panel.hidden = true;
  });

  sectionShortcuts.forEach((shortcut) => shortcut.classList.remove("is-active"));
}

function applyLanguage(language, shouldPersist = false) {
  currentLanguage = pageCopy[language] ? language : "pt";
  const copy = getCopy();

  document.documentElement.lang = copy.htmlLang;
  document.title = copy.title;
  metaDescription?.setAttribute("content", copy.metaDescription);
  languageSwitch?.setAttribute("aria-label", copy.titlebar.languageLabel);

  languageButtons.forEach((button) => {
    const isActive = button.dataset.languageOption === currentLanguage;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  setAttribute(".paper-intro", "aria-label", copy.intro.dialogLabel);
  setText(".site-titlebar > span", copy.titlebar.tag);
  setText(".envelope-letter strong", copy.intro.title);
  setText(".envelope-letter small", copy.intro.subtitle);
  setText(".letter-open", copy.intro.open);
  updateList(".intro-code-card span", copy.intro.code, (item, text) => {
    item.textContent = text;
  });

  setText(".name-block .eyebrow", copy.hero.eyebrow);
  setText(".role", copy.hero.role);
  setText(".hero-note", copy.hero.note);
  setAttribute(".hero-actions", "aria-label", copy.hero.actionsLabel);
  updateList(".hero-action", copy.hero.actions, (item, text) => {
    item.textContent = text;
  });

  setAttribute(".section-menu", "aria-label", copy.menu.aria);
  setAttribute(".section-list", "aria-label", copy.menu.aria);
  updateList(".finder-head span", copy.menu.head, (item, text) => {
    item.textContent = text;
  });
  tabs.forEach((tab, index) => {
    const tabCopy = copy.menu.tabs[index];
    if (!tabCopy) {
      return;
    }

    setText("strong", tabCopy.title, tab);
    setText("small", tabCopy.small, tab);
  });

  setText(".profile-chip span", copy.summary.profile);
  setText(".summary-kicker", copy.summary.kicker);
  setText("#panel-resumo h2", copy.summary.title);
  updateList("#panel-resumo .summary-lede", copy.summary.paragraphs, (item, text) => {
    item.textContent = text;
  });
  updateList(".summary-code-card span", copy.summary.code, (item, text) => {
    item.textContent = text;
  });
  setAttribute(".summary-proof", "aria-label", copy.summary.proofLabel);
  updateList(".summary-proof article", copy.summary.proof, (item, proof) => {
    setText("small", proof.small, item);
    setText("strong", proof.strong, item);
    setText("span", proof.span, item);
  });
  setAttribute(".summary-folders", "aria-label", copy.summary.foldersLabel);
  updateList(".summary-folders article", copy.summary.folders, (item, folder) => {
    setText("small", folder.small, item);
    setText("h3", folder.title, item);
    setText("p", folder.body, item);
  });

  setText("#panel-experiencia .section-heading .eyebrow", copy.experience.eyebrow);
  setText("#panel-experiencia .section-heading h2", copy.experience.title);
  setText(".timeline-date", copy.experience.date);
  setText(".timeline-body .subtle", copy.experience.role);
  setText(".timeline-body > p:not(.subtle)", copy.experience.description);
  updateList(".timeline-body .feature-list li", copy.experience.bullets, (item, text) => {
    item.textContent = text;
  });
  setAttribute(".process-ribbon", "aria-label", copy.experience.ribbonLabel);
  updateList(".process-ribbon span", copy.experience.ribbon, (item, text) => {
    item.textContent = text;
  });

  setText("#panel-projetos .section-heading .eyebrow", copy.projects.eyebrow);
  setText("#panel-projetos .section-heading h2", copy.projects.title);
  setText("#professional-projects", copy.projects.professional);
  setText("#academic-projects", copy.projects.academic);
  projectCards.forEach((card) => {
    const cardCopy = copy.projects.cards[card.dataset.project];
    if (!cardCopy) {
      return;
    }

    card.setAttribute("aria-label", cardCopy.aria);
    setText(".project-card-type", cardCopy.type, card);
    setText(".project-card-title", cardCopy.title, card);
    setText(".project-description", cardCopy.description, card);
    setText(".project-card-action", copy.projects.cardAction, card);
    updateList(".project-card-tags span", cardCopy.tags || [], (item, text) => {
      item.textContent = text;
    }, card);
  });

  setText("#panel-tecnologias .section-heading .eyebrow", copy.tech.eyebrow);
  setText("#panel-tecnologias .section-heading h2", copy.tech.title);
  setAttribute(".filters", "aria-label", copy.tech.filtersLabel);
  updateList(".filter", copy.tech.filters, (item, text) => {
    item.textContent = text;
  });
  setAttribute(".tech-board", "aria-label", copy.tech.boardLabel);
  updateList(".tech-category h3", copy.tech.categories, (item, text) => {
    item.textContent = text;
  });

  setText("#panel-formacao .section-heading .eyebrow", copy.formation.eyebrow);
  setText("#panel-formacao .section-heading h2", copy.formation.title);
  setText(".education-block .eyebrow", copy.formation.school);
  setText(".education-block h3", copy.formation.degree);
  setText(".education-block .education-period", copy.formation.period);
  setText(".education-block .formation-note", copy.formation.note);
  setAttribute(".formation-tags", "aria-label", copy.formation.tagsLabel);
  updateList(".formation-tags span", copy.formation.tags, (item, text) => {
    item.textContent = text;
  });
  setText(".language-panel h3", copy.formation.languagesTitle);
  updateList(".language-row", copy.formation.languages, (item, languageInfo) => {
    const label = item.querySelector("span");
    const note = item.querySelector("small");
    const level = item.querySelector("strong");
    const dotGroup = item.querySelector(".language-dots");
    const dots = Array.from(item.querySelectorAll(".language-dots i"));

    if (label) {
      label.textContent = languageInfo.label;
    }
    if (note) {
      note.textContent = languageInfo.note;
    }
    if (level) {
      level.textContent = languageInfo.level;
    }
    if (dotGroup) {
      dotGroup.setAttribute("aria-label", languageInfo.aria);
    }
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("empty", dotIndex >= (languageInfo.dots || 0));
    });

    item.style.setProperty("--language-level", languageInfo.meter || "0%");
    item.setAttribute("aria-label", languageInfo.aria);
  });
  setText(".highlights-block h3", copy.formation.highlightsTitle);
  updateList(".highlights-block .formation-points li", copy.formation.highlights, (item, text, index) => {
    const marker = item.querySelector("span");
    const paragraph = item.querySelector("p");

    if (marker) {
      marker.textContent = String(index + 1).padStart(2, "0");
    }
    if (paragraph) {
      paragraph.textContent = text;
    }
  });

  setText("#panel-contato .section-heading .eyebrow", copy.contact.eyebrow);
  setText("#panel-contato .section-heading h2", copy.contact.title);
  updateList(".copy-list button", copy.contact.labels, (item, label, index) => {
    setText("span", label, item);
    setText("strong", copy.contact.values[index], item);
    item.dataset.copy = copy.contact.copyValues[index];
  });
  setAttribute(".social-list", "aria-label", copy.contact.socialsLabel);
  const socialLinks = Array.from(document.querySelectorAll(".social-list a"));
  socialLinks[0]?.setAttribute("aria-label", copy.contact.githubAria);
  socialLinks[1]?.setAttribute("aria-label", copy.contact.linkedinAria);
  socialLinks[2]?.setAttribute("aria-label", copy.contact.whatsappAria);

  setText("#panel-original .section-heading .eyebrow", copy.original.eyebrow);
  setText("#panel-original .section-heading h2", copy.original.title);
  setText(".original-download span", copy.original.helper);
  setText(".original-download strong", copy.original.action);

  setAttribute(".project-modal-close", "aria-label", copy.modal.close);
  updateStepperLabels();

  if (activeProjectId && !projectModalLayer?.hidden) {
    renderProjectDossier(activeProjectId);
  }

  if (shouldPersist) {
    saveLanguage(currentLanguage);
  }
}

function getTabLabel(tabId) {
  const tab = tabs.find((item) => (item.dataset.tab || item.dataset.goTab) === tabId);
  return tab?.querySelector("strong")?.textContent?.trim() || tabId;
}

function createPanelSteppers() {
  panels.forEach((panel) => {
    const tabId = panel.id.replace("panel-", "");
    const currentIndex = tabOrder.indexOf(tabId);

    if (currentIndex === -1 || panel.querySelector(".panel-stepper")) {
      return;
    }

    const nextTabId = tabOrder[(currentIndex + 1) % tabOrder.length];
    const stepper = document.createElement("nav");
    const button = document.createElement("button");

    stepper.className = "panel-stepper";
    stepper.setAttribute("aria-label", getCopy().stepperLabel);

    button.className = "next-panel-button";
    button.type = "button";
    button.dataset.goTab = nextTabId;
    button.setAttribute("aria-label", `${getCopy().nextLabel} ${getTabLabel(nextTabId)}`);

    stepper.append(button);
    panel.append(stepper);
  });
}

function unlockResume(shouldAnimate = true) {
  if (!document.body.classList.contains("index-only")) {
    return;
  }

  if (shouldAnimate) {
    resumeShell?.classList.add("is-unlocked");
    resumeShell?.addEventListener(
      "animationend",
      () => resumeShell.classList.remove("is-unlocked"),
      { once: true }
    );
  }

  document.body.classList.remove("index-only");
}

function playRevealAnimations(scope = document) {
  const revealItems = Array.from(scope.querySelectorAll(".reveal"));
  if (scope.classList?.contains("reveal")) {
    revealItems.unshift(scope);
  }

  revealItems.forEach((item) => item.classList.remove("is-visible"));
  revealItems.forEach((item, index) => {
    window.setTimeout(() => item.classList.add("is-visible"), index * 55);
  });
}

function activateTab(tabId, shouldFocus = false, shouldUpdateHash = true) {
  const nextTab = tabs.find((tab) => (tab.dataset.tab || tab.dataset.goTab) === tabId) || tabs[0];
  const nextTabId = nextTab.dataset.tab || nextTab.dataset.goTab;
  const currentIndex = activeTabId ? tabOrder.indexOf(activeTabId) : -1;
  const nextIndex = tabOrder.indexOf(nextTabId);
  const direction =
    currentIndex === -1 || nextIndex === -1 || currentIndex === nextIndex
      ? "same"
      : nextIndex > currentIndex
        ? "forward"
        : "back";

  if (resumeShell) {
    resumeShell.hidden = false;
    resumeShell.classList.add("has-active-panel");
  }

  resumeShell?.classList.remove("deck-forward", "deck-back");
  if (direction !== "same") {
    resumeShell?.classList.add(`deck-${direction}`);
  }

  tabs.forEach((tab) => {
    const isActive = tab === nextTab;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
    tab.tabIndex = isActive ? 0 : -1;
  });

  panels.forEach((panel) => {
    const isActive = panel.id === `panel-${nextTabId}`;
    panel.classList.toggle("is-active", isActive);
    panel.hidden = !isActive;
  });

  sectionShortcuts.forEach((shortcut) => {
    shortcut.classList.toggle("is-active", shortcut.dataset.goTab === nextTabId);
  });

  if (shouldFocus) {
    nextTab.focus({ preventScroll: true });
  }

  const activePanel = document.querySelector(`#panel-${nextTabId}`);
  if (activePanel) {
    playRevealAnimations(activePanel);
  }

  if (shouldUpdateHash) {
    history.replaceState(null, "", `#${nextTabId}`);
  }

  activeTabId = nextTabId;
}

function revealPortfolio() {
  document.body.classList.remove("intro-locked");
  document.body.classList.add("portfolio-revealed");

  const activePanel = document.querySelector(".panel.is-active");
  if (activePanel) {
    window.setTimeout(() => playRevealAnimations(activePanel), 180);
  }
}

if (paperIntro) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion) {
    paperIntro.classList.add("is-done");
    revealPortfolio();
  } else {
    window.setTimeout(() => {
      paperIntro.classList.add("is-ready");
      letterOpen?.focus({ preventScroll: true });
    }, 3100);

    letterOpen?.addEventListener("click", () => {
      if (paperIntro.classList.contains("is-open")) {
        return;
      }

      paperIntro.classList.remove("is-ready");
      paperIntro.classList.add("is-open");
      window.setTimeout(revealPortfolio, 620);
      window.setTimeout(() => paperIntro.classList.add("is-done"), 1250);
    });
  }
} else {
  revealPortfolio();
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    if (!tab.dataset.goTab) {
      activateTab(tab.dataset.tab);
    }
  });
  tab.addEventListener("keydown", (event) => {
    const keyMap = {
      ArrowRight: 1,
      ArrowLeft: -1,
      Home: -index,
      End: tabs.length - index - 1,
    };

    if (!(event.key in keyMap)) {
      return;
    }

    event.preventDefault();
    const nextIndex = (index + keyMap[event.key] + tabs.length) % tabs.length;
    activateTab(tabs[nextIndex].dataset.tab || tabs[nextIndex].dataset.goTab, true);
  });
});

applyLanguage(getInitialLanguage());
createPanelSteppers();
resetActiveTabs();

const initialTabId = decodeURIComponent(window.location.hash.replace("#", ""));
if (tabOrder.includes(initialTabId)) {
  unlockResume(false);
  activateTab(initialTabId, false, false);
} else if (window.location.hash) {
  history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => applyLanguage(button.dataset.languageOption, true));
});

function updateTechCategories(group = "all") {
  techCategories.forEach((category) => {
    const hasVisibleItem = Array.from(category.querySelectorAll(".tech")).some(
      (item) => !item.classList.contains("is-hidden")
    );

    category.classList.toggle("is-hidden", group !== "all" && !hasVisibleItem);
  });
}

filters.forEach((filter) => {
  filter.setAttribute("aria-pressed", String(filter.classList.contains("is-active")));

  filter.addEventListener("click", () => {
    const group = filter.dataset.filter;

    filters.forEach((item) => {
      const isActive = item === filter;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    techItems.forEach((item) => {
      const groups = item.dataset.groups?.split(" ") || [];
      item.classList.toggle("is-hidden", group !== "all" && !groups.includes(group));
    });

    updateTechCategories(group);
  });
});

function showToast(message) {
  if (!toast) {
    return;
  }

  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("is-visible"), 1900);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast(getCopy().toastCopied);
  } catch {
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.append(field);
    field.select();
    document.execCommand("copy");
    field.remove();
    showToast(getCopy().toastCopied);
  }
}

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", () => copyText(button.dataset.copy));
});

document.querySelectorAll("[data-go-tab]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    if (!document.querySelector(`#panel-${link.dataset.goTab}`)) {
      return;
    }

    unlockResume();
    activateTab(link.dataset.goTab);
    document.querySelector(".resume-shell")?.scrollIntoView({ block: "start", behavior: "smooth" });
  });
});

function createTextElement(tagName, className, text) {
  const element = document.createElement(tagName);

  if (className) {
    element.className = className;
  }

  element.textContent = text;
  return element;
}

function createDetailBlock(detail) {
  const block = document.createElement("article");
  block.className = "project-modal-detail";
  block.append(createTextElement("h3", "", detail.title));

  if (detail.body) {
    block.append(createTextElement("p", "", detail.body));
  }

  if (detail.tags?.length) {
    const tagList = document.createElement("div");
    tagList.className = "project-tag-list";

    detail.tags.forEach((tag) => {
      tagList.append(createTextElement("span", "project-tag", tag));
    });

    block.append(tagList);
  }

  return block;
}

function getModalFocusableElements() {
  if (!projectModal) {
    return [];
  }

  return Array.from(
    projectModal.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    )
  ).filter((element) => !element.hasAttribute("hidden"));
}

function renderProjectDossier(projectId) {
  const project = getProjectDossier(projectId);

  if (!project || !projectModalTitle || !projectModalCategory || !projectModalSummary || !projectModalDetails || !projectModalActions) {
    return;
  }

  projectModalTitle.textContent = project.title;
  projectModalCategory.textContent = project.category;
  projectModalSummary.textContent = project.summary;
  projectModalDetails.textContent = "";
  projectModalActions.textContent = "";

  project.details.forEach((detail) => {
    projectModalDetails.append(createDetailBlock(detail));
  });

  if (project.link) {
    const link = createTextElement("a", "project-modal-link", project.link.label);
    link.href = project.link.href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    projectModalActions.hidden = false;
    projectModalActions.append(link);
  } else {
    projectModalActions.hidden = true;
  }
}

function openProjectDossier(projectId) {
  const project = getProjectDossier(projectId);

  if (!project || !projectModalLayer || !projectModal) {
    return;
  }

  lastFocusedElement = document.activeElement;
  activeProjectId = projectId;
  renderProjectDossier(projectId);
  projectModalLayer.hidden = false;
  document.body.classList.add("modal-open");
  projectModal.focus({ preventScroll: true });
}

function closeProjectDossier() {
  if (!projectModalLayer || projectModalLayer.hidden) {
    return;
  }

  projectModalLayer.hidden = true;
  document.body.classList.remove("modal-open");
  lastFocusedElement?.focus?.({ preventScroll: true });
  activeProjectId = null;
  lastFocusedElement = null;
}

projectCards.forEach((card) => {
  const projectId = card.dataset.project;

  if (!projectDossiers.pt[projectId]) {
    card.disabled = true;
    card.setAttribute("aria-disabled", "true");
    return;
  }

  card.addEventListener("click", () => openProjectDossier(projectId));
});

document.querySelectorAll("[data-close-project]").forEach((button) => {
  button.addEventListener("click", closeProjectDossier);
});

document.addEventListener("keydown", (event) => {
  if (!projectModalLayer || projectModalLayer.hidden) {
    return;
  }

  if (event.key === "Escape") {
    event.preventDefault();
    closeProjectDossier();
    return;
  }

  if (event.key !== "Tab") {
    return;
  }

  const focusableElements = getModalFocusableElements();

  if (!focusableElements.length) {
    event.preventDefault();
    projectModal?.focus({ preventScroll: true });
    return;
  }

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));

window.addEventListener("pointermove", (event) => {
  document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
  document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
});
