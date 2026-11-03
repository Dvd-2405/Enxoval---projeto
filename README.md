Enxoval Digital 🏠
Aplicação web full stack para criação e gerenciamento de listas de presentes de casamento. O projeto nasceu de uma necessidade real: montar uma lista de presentes sem depender de plataformas que cobram taxas dos convidados.

A proposta é oferecer uma experiência simples para os convidados e um painel de acompanhamento para os noivos, sem exigir cadastro e sem cobrar taxas sobre os presentes ou pagamentos via Pix.

🌐 Demonstração: enxovalcasamento.com.br/matheus-e-julia
Funcionalidades
Para os convidados
- Visualização dos presentes organizados por cômodo.
- Busca e filtros para localizar itens.
- Barra de progresso dinâmica da lista.
- Reserva de presentes por até 30 dias, sem necessidade de criar uma conta.
- Envio de aviso por e-mail antes do vencimento da reserva.
- Acesso à loja para comprar o presente ou opção de presentear via Pix, com QR Code e chave copiável.
Para os noivos
- Painel administrativo para acompanhar a lista e as movimentações dos presentes.
- Visualização dos estados dos itens: disponível, reservado ou comprado.
- Gerenciamento das reservas e dos presentes.
Tecnologias
Área	Tecnologias
Front-end	React, TypeScript e Vite
Back-end	Node.js e Express
Comunicação	API REST
Banco de dados	PostgreSQL (Neon)
E-mails	Resend
Versionamento	Git e GitHub
Deploy	Vercel (front-end) e Render (back-end)


Arquitetura
A aplicação é dividida em front-end e back-end. O front-end apresenta a lista e consome os endpoints da API REST. O back-end concentra as regras de negócio, gerencia os dados no PostgreSQL e integra o envio de e-mails pelo Resend.
Convidado / Painel administrativo
              │
              ▼
      React + TypeScript
       (Vercel / Vite)
              │
          API REST
              │
              ▼
       Node.js + Express
           (Render)
          /         \
         ▼           ▼
   PostgreSQL      Resend
      (Neon)     (e-mails)
Decisões técnicas
- Reserva sem cadastro: elimina uma etapa para o convidado e reduz barreiras durante a escolha do presente.
- Protótipo antes do back-end: o primeiro fluxo foi desenvolvido com HTML, CSS e JavaScript para validar a experiência antes da implementação da API.
- Migração de SQLite para PostgreSQL: a persistência foi migrada para PostgreSQL, utilizando o Neon como serviço gerenciado em produção.
- Pix sem integração bancária: a aplicação disponibiliza QR Code e chave copiável, mas não processa nem confirma transferências automaticamente. Essa escolha mantém o fluxo mais simples e evita integrar um serviço bancário ao projeto.
- Separação entre front-end e back-end: permite organizar a interface e as regras de negócio em aplicações distintas, comunicando-se por uma API REST.
Segurança e configuração
Foram adotadas medidas básicas para reduzir riscos na aplicação:
- CORS configurado para restringir as origens autorizadas.
- Rate limiting na API para limitar a frequência de requisições.
- Variáveis de ambiente para configurações e credenciais sensíveis.
- Acesso administrativo protegido por chave.
Importante: nenhuma chave, senha ou credencial deve ser versionada no Git. Para executar o projeto localmente, configure as variáveis de ambiente exigidas por cada aplicação e utilize credenciais próprias de desenvolvimento.
Serviços externos
- Neon: hospedagem do banco de dados PostgreSQL.
- Resend: envio de notificações por e-mail relacionadas às reservas.
- Vercel: hospedagem do front-end.
- Render: hospedagem do back-end.
Execução local
O front-end e o back-end são mantidos em repositórios separados. As instruções de instalação, os comandos disponíveis no package.json e a lista completa de variáveis de ambiente devem ser documentados nos respectivos repositórios junto com a publicação dos códigos.
Observações sobre a demonstração
Esta é uma versão de demonstração do Enxoval Digital. O fluxo de Pix não possui integração bancária nem confirmação automática de pagamento. A aplicação apresenta os dados necessários para que o convidado faça a transferência diretamente.
Desenvolvido como projeto de portfólio para aplicar conhecimentos de desenvolvimento front-end, back-end, banco de dados, integração com serviços externos e publicação de uma aplicação web em produção.
