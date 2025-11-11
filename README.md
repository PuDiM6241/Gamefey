🎮 Gamefey

Um mini hub de jogos desenvolvido em React Native + Expo, com sistema de login, conquistas, amigos e perfis de jogador.
Cada jogo pode ser integrado dinamicamente, armazenando progresso e conquistas localmente.

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
GameHub	Lista todos os jogos
GamePage	Abre o jogo selecionado
UserProfile	Mostra perfil e conquistas
FriendsPage	Gerencia e exibe amigos
🎨 Tema Visual

O app segue uma paleta moderna e consistente:

Cor	Uso
#0d0d0d	Fundo principal (preto carvão)
#1a1a1a	Cartões e blocos de conteúdo
#ff9100	Destaques, botões e ícones
#cccccc	Textos secundários
🧠 Roadmap Futuro

🚧 Funcionalidades planejadas:

Sistema de ranking global (pontuação total)

Sincronização com servidor remoto

Mais mini-jogos integrados

Avatares e personalização de perfil

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
