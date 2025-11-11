import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as LocalDB from '../../LocalAsyncStorage.js';

export default class PudimClicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pudins: 0,
    };
  }

  async addPudim() {
    const newCount = this.state.pudins + 1;
    this.setState({ pudins: newCount });
    await this.checkAchievements(newCount);
  }

  async checkAchievements(count) {
    const { player } = this.props;
    if (!player) return;

    try {
      //  1
      if (count === 1) {
        await LocalDB.addAchievementUser(
          player.username,
          'Pudim Clicker',
          '1 pudim clicado',
          'O início',
          5
        );
      }

      //  10
      if (count === 10) {
        await LocalDB.addAchievementUser(
          player.username,
          'Pudim Clicker',
          '10 pudins clicados',
          'Aprendiz',
          20
        );
      }

      //  100
      if (count === 100) {
        await LocalDB.addAchievementUser(
          player.username,
          'Pudim Clicker',
          '100 pudins clicados',
          'Diabético',
          50
        );
      }

      //  1.000.000
      if (count === 1000000) {
        await LocalDB.addAchievementUser(
          player.username,
          'Pudim Clicker',
          '1.000.000 pudins clicados',
          'Mago dos Doces',
          100
        );
      }

    } catch (err) {
      console.error('Erro ao conceder conquista:', err);
    }
  }

  render() {
    const { pudins } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}> Pudim Clicker </Text>

        <Text style={styles.counter}>Pudins: {pudins.toLocaleString()}</Text>

        <TouchableOpacity onPress={() => this.addPudim()} activeOpacity={0.7}>
          <Image source={require('./cover.png')} style={styles.pudimImage} />
        </TouchableOpacity>

        <Text style={styles.tip}>Clique no pudim e alcance o doce sucesso!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff6e6', 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#a86c3d',
  },
  counter: {
    fontSize: 22,
    color: '#5a3b1e',
    marginBottom: 20,
  },
  pudimImage: {
    width: 220,
    height: 220,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  tip: {
    marginTop: 25,
    color: '#7a5b3a',
    fontStyle: 'italic',
    fontSize: 16,
  },
});
