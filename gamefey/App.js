import * as React from 'react';
import { Image, TextInput, Text, View, Button, StyleSheet, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as LocalDB from './LocalAsyncStorage.js';
import { gameModules, infoModules, coverModules } from './games/index.js';

const StackTab = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
let loggedUser = null;

/* ------------------------------ ESTILOS BASE ------------------------------ */
const colors = {
  background: '#0d0d0d',
  card: '#1a1a1a',
  accent: '#ff9100',
  textPrimary: '#ffffff',
  textSecondary: '#cccccc',
  border: '#333333',
};

const styles = StyleSheet.create({
  viewBase: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    padding: 20,
  },
  inputTextBase: {
    height: 45,
    borderColor: colors.accent,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: colors.textPrimary,
    backgroundColor: '#1a1a1a',
  },
  button: {
    backgroundColor: colors.accent,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  textLink: {
    color: colors.accent,
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginTop: 10,
  },
  bigText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: colors.accent,
  },
  warning: { color: '#ff3d00', textAlign: 'center', marginTop: 10 },
});

const profileStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0d0d0d', padding: 20 },
  section: { marginBottom: 25 },
  bigText: {
    color: '#ff9100',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subTitle: {
    color: '#ff9100',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: { color: '#ccc', marginBottom: 5, fontSize: 16 },
  readonlyBox: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#ff9100',
    borderRadius: 8,
    paddingHorizontal: 10,
    color: '#fff',
    height: 40,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#ff9100',
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  noAchievements: { color: '#888', textAlign: 'center', marginTop: 10 },
  achievementBox: {
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  achievementName: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  achievementPoints: { color: '#00ff80', fontWeight: 'bold' },
  achievementDesc: { color: '#ccc', marginTop: 5 },
  achievementGame: { color: '#aaa', fontStyle: 'italic', marginTop: 5 },
  totalPoints: {
    color: '#ff9100',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
    fontSize: 18,
  },
});

/* ------------------------------ APP ROOT ------------------------------ */
class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Login"
          screenOptions={{
            tabBarStyle: { display: 'none' },
          }}
        >
          <Tab.Screen 
            name="Login" 
            component={Login}
            options={{
              headerStyle: { backgroundColor: '#0d0d0d' },
              headerTintColor: '#ff9100',
            }}
          />
          <Tab.Screen
            name="Sign up"
            component={Register} 
            options={{
              headerStyle: { backgroundColor: '#0d0d0d' },
              headerTintColor: '#ff9100',
            }}
          />
          <Tab.Screen
            name="MainHub"
            component={MainHub}
            options={{
              headerStyle: { backgroundColor: '#0d0d0d' },
              headerTintColor: '#ff9100',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

/* ------------------------------ HUB ESTRUTURAR ------------------------------ */
class MainHub extends React.Component {
  render() {
    return (
      <StackTab.Navigator initialRouteName="GameHub">
        <StackTab.Screen
          name="GameHub"
          component={GameHub}
          options={{
            title: 'Spotifei Arcade',
            headerStyle: { backgroundColor: '#0d0d0d' },
            headerTintColor: '#ff9100',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />

        <StackTab.Screen
          name="UserProfile"
          component={UserProfile}
          options={{
            title: 'Perfil do Usuário',
            headerStyle: { backgroundColor: '#0d0d0d' },
            headerTintColor: '#ff9100',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />

        <StackTab.Screen
          name="FriendsPage"
          component={FriendsPage}
          options={{
            title: 'Amigos',
            headerStyle: { backgroundColor: '#0d0d0d' },
            headerTintColor: '#ff9100',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />

        <StackTab.Screen
          name="GamePage"
          component={GamePage}
          options={{
            title: 'Jogo',
            headerShown: true,
            headerStyle: { backgroundColor: '#0d0d0d' },
            headerTintColor: '#ff9100',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
      </StackTab.Navigator>
    );
  }
}


/* ------------------------------ LOGIN ------------------------------ */
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: '', password: '' };
  }

  async verifyAccount() {
    try {
      const user = await LocalDB.getUser(this.state.user);
      if (!user || user.password !== this.state.password) {
        Alert.alert('Erro', 'Usuário ou senha incorretos');
        return;
      }
      loggedUser = user;
      Alert.alert('Sucesso', 'Logado com sucesso');
      this.props.navigation.navigate('MainHub');
    } catch (error) {
      console.error('Erro ao verificar conta:', error);
      Alert.alert('Erro ao autenticar');
    }
  }

  render() {
    return (
      <View style={styles.viewBase}>
        <Text style={styles.bigText}>Login</Text>
        <TextInput
          style={styles.inputTextBase}
          placeholder="Usuário"
          placeholderTextColor="#888"
          value={this.state.user}
          onChangeText={(text) => this.setState({ user: text })}
        />
        <TextInput
          style={styles.inputTextBase}
          placeholder="Senha"
          placeholderTextColor="#888"
          secureTextEntry
          value={this.state.password}
          onChangeText={(text) => this.setState({ password: text })}
        />
        <TouchableOpacity style={styles.button} onPress={() => this.verifyAccount()}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Sign up')}>
          <Text style={styles.textLink}>Não tem uma conta? Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

/* ------------------------------ REGISTRO ------------------------------ */
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: '', password: '' };
  }

  async subcribeAccount() {
    const { user, password } = this.state;
    if (!user || !password) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    const existing = await LocalDB.getUser(user);
    if (existing) {
      Alert.alert('Erro', 'Usuário já existe!');
      return;
    }

    if (await LocalDB.addUser({ username: user, password })) {
      Alert.alert('Sucesso', 'Conta criada!');
      this.props.navigation.navigate('Login');
    }
  }

  render() {
    return (
      <View style={styles.viewBase}>
        <Text style={styles.bigText}>Registrar</Text>
        <TextInput
          style={styles.inputTextBase}
          placeholder="Usuário"
          placeholderTextColor="#888"
          value={this.state.user}
          onChangeText={(text) => this.setState({ user: text })}
        />
        <TextInput
          style={styles.inputTextBase}
          placeholder="Senha"
          placeholderTextColor="#888"
          secureTextEntry
          value={this.state.password}
          onChangeText={(text) => this.setState({ password: text })}
        />
        <TouchableOpacity style={styles.button} onPress={() => this.subcribeAccount()}>
          <Text style={styles.buttonText}>Criar Conta</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={styles.textLink}>Já tem uma conta? Faça login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

/* ------------------------------ GAME HUB ------------------------------ */
class GameHub extends React.Component {
  constructor(props) {
    super(props);
    this.state = { games: [], loading: true };
  }

  async componentDidMount() {
    await this.loadGames();
  }

  async loadGames() {
    try {
      const gameList = Object.keys(infoModules).map((key) => ({
        key,
        name: infoModules[key].name || key,
        description: infoModules[key].description || '',
        cover: coverModules[key] || null,
      }));

      this.setState({ games: gameList, loading: false });
    } catch (error) {
      console.error('Erro ao carregar jogos:', error);
      this.setState({ loading: false });
    }
  }
//botoes de user e userfriends
  renderHeader(navigation) {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 15,
          paddingTop: 10,
          paddingBottom: 10,
          backgroundColor: '#b06a02',
        }}
      >
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={{
          backgroundColor: '#1a1a1a',
          padding: 8,
          borderRadius: 8,
          marginRight: 10,
        }}>
        <Text style={{ color: '#ff9100', fontWeight: 'bold' }}>Sair</Text>
      </TouchableOpacity>

        <Text style={{ color: '#ff9100', fontSize: 26, fontWeight: 'bold' }}>Gamefey ArcadeGames</Text>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <TouchableOpacity
          onPress={() =>
            navigation.navigate('UserProfile', {
              username: loggedUser?.username,
            })
          }>
          <View
            style={{
              backgroundColor: '#ff9100',
              borderRadius: 20,
              padding: 3,
            }}>
            <Image
              source={require('./assets/UserGenericIcon.png')}
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
              }}/>
          </View>
          </TouchableOpacity>


          <TouchableOpacity
            onPress={() => navigation.navigate('FriendsPage')}>
            <View
              style={{
                backgroundColor: '#ff9100',
                borderRadius: 20,
                padding: 3,
                marginRight: 5,
              }}>
              <Image
                source={require('./assets/GenericFriendsIcon.png')}
                style={{ width: 36, height: 36, borderRadius: 18}}/>
            </View>
          </TouchableOpacity>

        </View>
      </View>
    );
  }

  render() {
    const { games, loading } = this.state;
    const { navigation } = this.props;

    if (loading) {
      return (
        <View style={{ flex: 1, backgroundColor: '#0d0d0d', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#ff9100" />
          <Text style={{ color: '#ccc', textAlign: 'center', marginTop: 10 }}>
            Carregando jogos...
          </Text>
        </View>
      );
    }

    return (
      <ScrollView style={{ backgroundColor: '#0d0d0d'  }}>
        {this.renderHeader(navigation)}

        {games.length === 0 ? (
          <Text style={{ color: '#888', textAlign: 'center' }}>Nenhum jogo encontrado.</Text>
        ) : (
          games.map((game, index) => (
            <View
              key={index}
              style={{
                backgroundColor: '#1a1a1a',
                marginHorizontal: 20,
                marginBottom: 25,
                borderRadius: 12,
                overflow: 'hidden',
                borderColor: '#333',
                borderWidth: 1,
                shadowColor: '#000',
                shadowOpacity: 0.3,
                shadowOffset: { width: 0, height: 3 },
                shadowRadius: 5,
              }}
            >
              {game.cover ? (
                <Image source={game.cover} style={{ width: '100%', height: 180 }} />
              ) : (
                <View
                  style={{
                    width: '100%',
                    height: 180,
                    backgroundColor: '#333',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: '#888' }}>Sem imagem</Text>
                </View>
              )}
              <View style={{ padding: 15 }}>
                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
                  {game.name}
                </Text>
                <Text style={{ color: '#ccc', marginVertical: 8 }}>{game.description}</Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#ff9100',
                    paddingVertical: 10,
                    borderRadius: 8,
                    alignItems: 'center',
                  }}
                  onPress={() => navigation.navigate('GamePage', {
                    folder: game.key,
                    player: loggedUser,
                  })}>

                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>Jogar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    );
  }
}

/* ------------------------------ GAME PAGE ------------------------------ */
class GamePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { GameComponent: null };
  }

  componentDidMount() {
    const folder = this.props.route.params?.folder;
    const GameComponent = gameModules[folder];
    this.setState({ GameComponent });
  }

  render() {
    const { navigation } = this.props;
    const { GameComponent } = this.state;

    const player = this.props.route.params?.player;

    if (!GameComponent) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Falha ao carregar o jogo.</Text>
          <Button title="Voltar" onPress={() => navigation.goBack()} />
        </View>
      );
    }

    const Game = GameComponent;
    return (
      <View style={{ flex: 1 }}>
        <Game player={player} />
      </View>
    );
  }
}

/* ------------------------------ PERFIL ------------------------------ */
class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.route.params?.username || '',
      password: '',
      achievements: [],
      totalPoints: 0,
      isOwnProfile: false,
    };
  }

  async componentDidMount() {
    await this.loadUser();
  }

  async loadUser() {
    try {
      const { username } = this.state;
      const user = await LocalDB.getUser(username);

      if (!user) {
        Alert.alert('Erro', 'Usuário não encontrado!');
        return;
      }

      this.setState({
        password: user.password,
        achievements: user.achievements || [],
        totalPoints: user.totalPoints || 0,
        isOwnProfile: loggedUser?.username === username,
      });
    } catch (err) {
      console.error(err);
      Alert.alert('Erro ao carregar dados do usuário.');
    }
  }

  async savePassword() {
    const { username, password } = this.state;
    try {
      await LocalDB.updateUser(username, { password });
      Alert.alert('Sucesso', 'Senha atualizada com sucesso!');
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível atualizar a senha.');
      console.error(err);
    }
  }

  render() {
    const { username, password, achievements, totalPoints, isOwnProfile } = this.state;

    return (
      <ScrollView style={profileStyles.container}>
        <Text style={profileStyles.bigText}>{username}</Text>

        <View style={profileStyles.section}>
          {isOwnProfile && (
            <>
              <Text style={profileStyles.label}>Nova Senha</Text>
              <TextInput
                style={profileStyles.input}
                secureTextEntry
                value={password}
                onChangeText={(text) => this.setState({ password: text })}
                placeholder="Digite a nova senha"
                placeholderTextColor="#888"
              />

              <TouchableOpacity
                style={profileStyles.button}
                onPress={() => this.savePassword()}
              >
                <Text style={profileStyles.buttonText}>Salvar Alterações</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        <View style={profileStyles.section}>
          <Text style={profileStyles.subTitle}>Conquistas</Text>
          {achievements.length === 0 ? (
            <Text style={profileStyles.noAchievements}>Nenhuma conquista ainda.</Text>
          ) : (
            achievements.map((a, i) => (
              <View key={i} style={profileStyles.achievementBox}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={profileStyles.achievementName}>{a.name}</Text>
                  <Text style={profileStyles.achievementPoints}>+{a.points} pts</Text>
                </View>
                <Text style={profileStyles.achievementDesc}>{a.description}</Text>
                <Text style={profileStyles.achievementGame}> {a.game}</Text>
              </View>
            ))
          )}
          <Text style={profileStyles.totalPoints}>Total de Pontos: {totalPoints}</Text>
        </View>
      </ScrollView>
    );
  }
}

/* ------------------------------ PERFIL AMIGOS ------------------------------ */
class FriendsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      newFriend: '',
    };
  }

  async componentDidMount() {
    await this.loadFriends();
  }

  async loadFriends() {
    const user = await LocalDB.getUser(loggedUser.username);
    this.setState({ friends: user?.friends || [] });
  }

  async addFriend() {
    const { newFriend } = this.state;

    if (!newFriend.trim()) {
      Alert.alert('Erro', 'Digite o nome de um usuário!');
      return;
    }

    if (newFriend === loggedUser.username) {
      Alert.alert('Erro', 'Você não pode se adicionar!');
      return;
    }

    const success = await LocalDB.addUserFriend(loggedUser.username, newFriend);
    if (success) {
      Alert.alert('Amigo adicionado!', `${newFriend} agora é seu amigo.`);
      this.setState({ newFriend: '' });
      this.loadFriends();
    }
  }

  render() {
    const { navigation } = this.props;
    const { friends, newFriend } = this.state;

    return (
      <ScrollView style={{ backgroundColor: '#0d0d0d', padding: 20 }}>
        <Text style={profileStyles.bigText}> Amigos de {loggedUser.username}</Text>

        <View style={{ marginBottom: 20 }}>
          <TextInput
            style={profileStyles.input}
            placeholder="Nome do usuário"
            placeholderTextColor="#888"
            value={newFriend}
            onChangeText={(text) => this.setState({ newFriend: text })}
          />
          <TouchableOpacity style={profileStyles.button} onPress={() => this.addFriend()}>
            <Text style={profileStyles.buttonText}>Adicionar Amigo</Text>
          </TouchableOpacity>
        </View>

        {friends.length === 0 ? (
          <Text style={{ color: '#888', textAlign: 'center', marginTop: 10 }}>
            Nenhum amigo adicionado ainda.
          </Text>
        ) : (
          friends.map((f, i) => (
            <TouchableOpacity
              key={i}
              style={profileStyles.achievementBox}
              onPress={() => navigation.navigate('UserProfile', { username: f })}
            >
              <Text style={{ color: '#fff', fontSize: 18 }}>{f}</Text>
              <Text style={{ color: '#ff9100', fontSize: 14 }}>Ver perfil</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    );
  }
}

export default App;
