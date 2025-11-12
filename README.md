🎮 Gamefey

Um hub de mini-jogos desenvolvido em React Native com Expo, com sistema de login, conquistas, amigos e perfis de jogador.
Cada jogo é carregado dinamicamente e pode interagir com o sistema local de conquistas do app.

💡 Ideia Geral

O Gamefey nasceu da ideia de unir vários mini-jogos em um único aplicativo,
mantendo um perfil unificado para o jogador — com conquistas, pontuação total e amigos.

A proposta é oferecer um arcade pessoal onde cada jogo adiciona progresso ao seu perfil,
incentivando a competição amigável e o senso de evolução.

🎯 Motivação

Criar um ambiente simples e divertido para armazenar e jogar pequenos games dentro de um só app.

Muitos mini-jogos são criados isoladamente, sem progressão ou integração entre eles.
O Gamefey foi pensado como uma plataforma local de jogos,
que conecta tudo em um sistema único de perfil, pontuação e conquistas —
sem depender de servidor online.

🧩 Objetivo

Unificar jogos simples em uma plataforma modular.

Fornecer um sistema de login e armazenamento local de progresso.

Criar conquistas e pontuação global entre os jogos.

Permitir adicionar amigos e visualizar o progresso deles.

Fornecer uma base expansível para futuros mini-games.

📱 Funcionalidades Principais

✅ Login e Cadastro de Usuário

Armazenamento local com AsyncStorage (sem servidor externo).

Validação de conta e autenticação simples.

✅ Perfil do Jogador

Mostra conquistas, pontuação total e informações do usuário.

Permite alterar a senha se for o próprio perfil logado.

Suporte para visualizar o perfil de outros jogadores (amigos).

✅ Sistema de Amigos

Adicione amigos pelo nome de usuário.

Veja as conquistas deles.

Acesse o perfil de amigos diretamente.

✅ Hub de Jogos Dinâmico

Os jogos são carregados automaticamente a partir da pasta /games.

Cada jogo tem seu próprio info.json, cover.png e main.js.

Suporte para conquistas específicas por jogo, integradas ao usuário logado.

✅ Sistema de Conquistas

Cada jogo pode chamar addAchievementUser() do módulo LocalAsyncStorage.js.

Inclui som de conquista (AchievementSound.mp3).

Pontos são somados ao total do jogador.

🕹️ Estrutura do Projeto
Gamefey{
  assets{
    AchievementSound.mp3
    GenericFriendsIcon.png
    UserGenericIcon.png
  }

  games{
    PudimClicker{
      main.js
      info.json
      cover.png
    }

    # outros jogos seguem o mesmo padrão
    OutroJogo{
      main.js
      info.json
      cover.png
    }
  }

  app.js
  LocalAsyncStorage.js
  package.json
  README.md
}

🧩 Estrutura de um Jogo
games{
  NomeDoJogo{
    main.js        # código do jogo (componente React)
    info.json      # metadados (nome e descrição)
    cover.png      # imagem de capa para o GameHub
  }
}

Exemplo de info.json
{
  "name": "Pudim Clicker",
  "description": "Clique no pudim e ganhe conquistas deliciosas!"
}

🧠 Exemplo de Conquista (dentro de um jogo)
await LocalDB.addAchievementUser(
  player.username,        // Usuário logado
  'Pudim Clicker',        // Nome do jogo
  '10 pudins clicados',   // Nome da conquista
  'Aprendiz',             // Descrição
  20                      // Pontos
);

🔊 Toca o som de conquista e salva o progresso no AsyncStorage.

🧑‍💻 Tecnologias Utilizadas
Tecnologia	Descrição
React Native (Expo)	Framework principal do app
React Navigation	Sistema de navegação com Stack e Tabs
AsyncStorage	Banco de dados local
Expo AV	Reprodução de sons (efeitos de conquista)
Lucide Icons (opcional)	Ícones modernos
ES6 Classes	Estrutura de componentes (sem hooks)
🚀 Como Executar o Projeto
1️⃣ Clonar o repositório
git clone https://github.com/seu-usuario/Gamefey.git
cd Gamefey

2️⃣ Instalar as dependências
npm install
# ou
yarn install

3️⃣ Iniciar o projeto
npx expo start

4️⃣ Abrir no celular

Escaneie o QR code no terminal com o app Expo Go (Android/iOS).

🧩 Arquivo Principal: LocalAsyncStorage.js

Gerencia toda a “mini base de dados” local de usuários:

addUser() – Cria novo usuário

getUser() – Busca usuário existente

updateUser() – Atualiza dados (senha, conquistas, etc.)

addUserFriend() – Adiciona amigo

addAchievementUser() – Adiciona conquista ao jogador

👤 Telas Principais
Tela	Função
Login / Register	Cria e acessa contas
<img width="379" height="803" alt="Captura de tela 2025-11-12 144056" src="https://github.com/user-attachments/assets/a16b353d-e079-4b1c-94a7-b859cc72ae85" />
GameHub	Lista todos os jogos
<img width="369" height="801" alt="Captura de tela 2025-11-12 144113" src="https://github.com/user-attachments/assets/a339970b-086b-48d2-8b64-7f8471739bc1" />
GamePage	Abre o jogo selecionado
<img width="377" height="802" alt="Captura de tela 2025-11-12 144259" src="https://github.com/user-attachments/assets/ea34d2ef-de35-4d2b-b061-88ed8502924a" />
UserProfile	Mostra perfil e conquistas
<img width="377" height="798" alt="Captura de tela 2025-11-12 144122" src="https://github.com/user-attachments/assets/0086bcef-7902-4777-9e00-9ff7ffdb223c" />
FriendsPage	Gerencia e exibe amigos
<img width="376" height="797" alt="image" src="https://github.com/user-attachments/assets/94c71ad5-8f35-4b1f-9bc9-602d23fd4f66" />

🎨 Tema Visual

O app segue uma paleta moderna e consistente:

🧠 Roadmap Futuro

🚧 Funcionalidades planejadas:

Sistema de ranking global (pontuação total)

Sincronização com servidor remoto

Mais mini-jogos integrados

🏆 Autor

Davi S. Loureiro

📄 Licença

Este projeto é de código aberto sob a licença MIT
.

Sinta-se à vontade para clonar, modificar e criar seus próprios jogos dentro do Gamefey!

🧡 Exemplo de tela

(adicione prints depois que o app estiver rodando no Expo)

📱 Login Page
📱 GameHub
📱 Perfil de Usuário
📱 Conquistas desbloqueadas
