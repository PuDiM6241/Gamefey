import * as React from 'react';
import { TextInput, Text, View, Button, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Accelerometer } from "expo-sensors";

const loggedUser = null;
const StackTab = createNativeStackNavigator();
const Tab = createBottomTabNavigator(); 

const styles = StyleSheet.create({
  buttonBase  : {
    color: "black"
  },
  inputTextBase: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  textBase: {
    marginTop: 10,
    fontSize: 16,
  },
  textLink: {
    color: 'blue', 
    textDecorationLine: 'underline'
  },
  textWarning: {
    color: 'red',
  }
});

class App extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Login">
          <Tab.Screen name="Login" component={Login} />
          <Tab.Screen name="Sign up" component={Register} />
        </Tab.Navigator>
      </NavigationContainer>
    );  
  }
}

class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      user: "",
      password: ""
    };
  }

  verifyAccount() {
    const user = this.state.user;
    const password = this.state.password;

  }

  render(){
    return (
      <View>
        <Text>Login</Text>
          <TextInput
            style={styles.inputTextBase}
            value={this.state.user}
            onChangeText={ 
              (text) => { this.setState({ user: text }); }
            }
          />
          <TextInput
            style={styles.inputTextBase}
            value={this.state.user}
            onChangeText={ 
              (text) => { this.setState({ password: text }); }
            }
          />
          <Button
            style={styles.buttonBase}
            title="login"
            onPress={() =>
              this.verifyAccount()
            }
          />
          <TouchableOpacity
            onPress={
                () => this.props.navigation.navigate('Sign up')
            }>
            <Text 
              style={styles.textLink}>
              Doesn't have an account?
            </Text>
          </TouchableOpacity>
      </View>
    );
  }
}

class Register extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      user: "",
      password: "",
      response: ""
    };
  }

  subcribeAccount() {
    const user = this.state.user;
    const password = this.state.password;

  }

  render(){
    return (
      <View>
        <Text>Register</Text>
          <TextInput
            style={styles.inputTextBase}
            value={this.state.user}
            onChangeText={ 
              (text) => { this.setState({ user: text }); }
            }
          />
          <TextInput
            style={styles.inputTextBase}
            value={this.state.user}
            onChangeText={ 
              (text) => { this.setState({ password: text }); }
            }
          />
          <Button
            style={styles.buttonBase}
            title="Sign up"
            onPress={() =>
              this.subcribeAccount()
            }
          />
          <TouchableOpacity
            onPress={
                () => this.props.navigation.navigate('Login')
            }>
            <Text 
              style={styles.textLink}>
              Already have an account?
            </Text>
          </TouchableOpacity>
          <Text 
            style={styles.textWarning}>
            {this.state.response}
          </Text>
      </View>
    );
  }
}

export default App;
