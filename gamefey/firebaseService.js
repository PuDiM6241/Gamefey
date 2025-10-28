import { getDatabase, ref, get, child } from "firebase/database";
const DBURL = "https://gamefey-5e4e4-default-rtdb.firebaseio.com/";

export async function getUserData(username) {
  try {
    const response = await fetch(`${DBURL}/users/${username}.json`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return null;
  }
}

export async function createUser(username, password) {
  try {
    const response = await fetch(`${DBURL}/users/${username}.json`, {
      method: 'PUT',
      body: JSON.stringify({ password }),
    });
    return true;
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return false;
  }
}