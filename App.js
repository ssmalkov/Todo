/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Switch,
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
const url = 'http://localhost:3000/todos';

export default class App extends Component<Props> {

  

  constructor() {
    super();
    this.state = {
      todos: [],
      newTodo: '',
    }
  }

  componentWillMount(){
    fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }}
    )
    .then(res => res.json())
    .then(todos => this.setState({todos}))
  }

  _handleChange(text) {
    this.setState({ newTodo: text });
  }

  _handlePress(e) {
    fetch(url, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
          name: this.state.newTodo
        })
    })
    .then(res => res.json())
    .then(todo => {
      const todos = [todo,...this.state.todos];
      this.setState({ todos, newTodo: '' });
    })

    // e.preventDefault();
    // const todos = [...this.state.todos, this.state.newTodo];
    // this.setState({ todos, newTodo: '' });
  }

  _removeTodo(index) {

    const todos = this.state.todos;
    todos.splice(index, 1);
    this.setState({ todos });

    fetch(url + '/' + JSON.stringify(todos[index]), {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      //body: JSON.stringify(todos[index])
    })
      .then(res => res.json())
    // .then(todo => {
    //   const todos = this.state.todos;
    //   this.setState({ todos });
    // })


  }

  render() {
    return (

      <View style={styles.container}>
      <Switch />
        <View style={styles.form}>

          <TextInput
            style={styles.input}
            value={this.state.newTodo}
            onChangeText={this._handleChange.bind(this)}
            placeholder='Name the Todo'
          />

          <TouchableOpacity
            style={styles.button}
            onPress={this._handlePress.bind(this)}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.todos}>
          {this.state.todos.map((todo, index) =>
            <TouchableHighlight onPress={() => this._removeTodo.call(this, index)} key={index}>
              <View style={styles.todo}>
              <Text style={styles.todoText}>{todo.name}</Text>
              </View>
            </TouchableHighlight>
          )}
        </View>

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
    padding: 20
  },
  form: {
    flexDirection: 'row',
  },
  input: {
    flex: 0.7,
    fontSize: 24,
  },
  button: {
    flex: 0.3,
    borderWidth: 1,
    height: 40,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'blue',
    backgroundColor: 'blue',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  todos: {
    marginTop: 60,
  },
  todo: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey'
  },
  todoText: {
    fontSize: 24
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
