/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

export default class App extends Component<Props> {

  constructor(){
    super();
    this.state = {
      todos: [],
      newTodo: '',
    }
  }

  _handleChange(text){
    this.setState({newTodo: text});
  }

  _handlePress(e){
    e.preventDefault();
    const todos = [...this.state.todos, this.state.newTodo];
    this.setState({todos, newTodo: ''});
  }

  _removeTodo(index){
    const todos = this.state.todos;
    todos.splice(index, 1);
    this.setState({todos});
  }

  render() {
    return (
      <View style={styles.container}>

        <TextInput
          value={this.state.newTodo}
          onChangeText={this._handleChange.bind(this)}
          placeholder='Name the Todo'
        />

        <TouchableOpacity onPress={this._handlePress.bind(this)}>
          <Text>Add Todo</Text>
        </TouchableOpacity>

        {this.state.todos.map((todo, index) =>
          <TouchableHighlight onPress={() => this._removeTodo.call(this, index)} key={index}>
            <View>
              <Text>{todo}</Text>
            </View>
          </TouchableHighlight>
        )}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
