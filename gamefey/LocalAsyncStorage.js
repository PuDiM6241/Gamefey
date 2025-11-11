// LocalAsyncStorage.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";
import { Alert } from "react-native";


const STORAGE_KEY = "LocalDB/users";

export async function getAllUsers() {
  try {
    const usersJSON = await AsyncStorage.getItem(STORAGE_KEY);
    return usersJSON ? JSON.parse(usersJSON) : {};
  } catch (e) {
    console.error("Erro ao ler todos os usuários:", e);
    return {};
  }
}

export async function saveAllUsers(users) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  } catch (e) {
    console.error("Erro ao salvar todos os usuários:", e);
  }
}

export async function getUser(username) {
  try {
    const users = await getAllUsers();
    return users[username] || null;
  } catch (e) {
    console.error("Erro em getUser:", e);
    return null;
  }
}

export async function addUser({ username, password, friends = [], achievements = [], totalPoints = 0, email = "" }) {
  try {
    if (!username) {
      console.warn("addUser: username vazio");
      return false;
    }
    const users = await getAllUsers();
    if (users[username]) {
      console.warn(`Usuário ${username} já existe.`);
      return false;
    }

    users[username] = {
      username,
      password,
      friends,
      achievements,
      totalPoints,
      email,
    };

    await saveAllUsers(users);
    console.log(`Usuário ${username} adicionado com sucesso!`);
    return true;
  } catch (error) {
    console.error("Erro ao adicionar usuário:", error);
    return false;
  }
}

export async function updateUser(username, newUserData = {}) {
  try {
    const users = await getAllUsers();
    if (!users[username]) return false;
    users[username] = { ...users[username], ...newUserData };
    await saveAllUsers(users);
    return true;
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return false;
  }
}

export async function deleteUser(username) {
  try {
    const users = await getAllUsers();
    if (!users[username]) return false;
    delete users[username];
    await saveAllUsers(users);
    return true;
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    return false;
  }
}

export async function addUserFriend(currentUsername, friendUsername) {
  try {
    const users = await getAllUsers();
    const currentUser = users[currentUsername];
    const friend = users[friendUsername];
    if (!currentUser || !friend) {
      console.warn("addUserFriend: usuário ou amigo não encontrados");
      return false;
    }
    const friends = currentUser.friends || [];
    if (friends.includes(friendUsername)) {
      Alert.alert(`O usuário ${friendUsername} já é amigo de ${currentUsername}.`);
      return false;
    }
    friends.push(friendUsername);
    currentUser.friends = friends;
    users[currentUsername] = currentUser;
    await saveAllUsers(users);
    Alert.alert(`Amigo ${friendUsername} adicionado ao usuário ${currentUsername}.`);
    return true;
  } catch (error) {
    console.error("Erro ao adicionar amigo:", error);
    return false;
  }
}

export async function addAchievementUser(currentUsername, gameName, achievementName, achievementDescription, achievementPoints) {
  if (achievementPoints > 100 || achievementPoints < 0) {
    console.log(`Erro ao dar achievement a ${currentUsername}: pontos (${achievementPoints}) inválidos.`);
    return false;
  }

  try {
    const users = await getAllUsers();
    const user = users[currentUsername];
    if (!user) {
      console.warn("addAchievementUser: usuário não encontrado");
      return false;
    }

    const achievements = user.achievements || [];
    const exists = achievements.some(a => a.name === achievementName && a.game === gameName);
    if (exists) {
      console.log(`Achievement "${achievementName}" do jogo "${gameName}" já existe para ${currentUsername}.`);
      return false;
    }

    achievements.push({
      game: gameName,
      name: achievementName,
      description: achievementDescription,
      points: achievementPoints,
    });

    user.achievements = achievements;
    user.totalPoints = (user.totalPoints || 0) + achievementPoints;
    users[currentUsername] = user;

    await saveAllUsers(users);

    try {
      const { sound } = await Audio.Sound.createAsync(require("./assets/AchievementSound.mp3"));
      await sound.playAsync();
    } catch (soundError) {
      console.warn("Erro ao tocar som de achievement:", soundError);
    }

    console.log(`Achievement "${achievementName}" adicionado ao usuário ${currentUsername}.`);
    return true;
  } catch (error) {
    console.error("Erro ao adicionar achievement:", error);
    return false;
  }
}
