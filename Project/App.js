import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, TextInput, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

	export default class App extends React.Component {
    state = {
      inputValue: '',
      todos: [],
      isCrossed : false,
    }

    changeText = value => {
      this.setState({
        inputValue: value
      })
    };

    addItem = () => {
      if (this.state.inputValue !== '') {
        this.setState(prevState => {
          const newToDo = {
            title: this.state.inputValue,
            createdAt: Date.now()
          };

          var todos = this.state.todos.concat(newToDo);

          this.setState({
            todos: todos
          });
        });
      }
    };
	  render() {
      const todos = this.state.todos.reverse().map((todo,key) => 
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <Text style={{ paddingLeft: 15, marginTop:10, fontSize: 24, color: 'white'}}>{todo.title}</Text>
        </View>
      );

      const placeholderText = "Type here to add a to do."

      const onButtonClick = () => {
        this.setState({todos:[]});
      };

      const isStrikeThru = false;

      const crossLine = event => {
        // const element = event.target;
        // element.classList.toggle("crossed-line");
        this.setState({isCrossed : true});

    };

	    return (
        <LinearGradient colors={['#2c3e50', '#3498db']} style={{ flex:1 }}>
          <View style={styles.container}>
          <Button onPress={onButtonClick} title="Delete All" color="#000000" />
          </View>
          <StatusBar barStyle="light-content" />
          <TextInput
          style={styles.input}
          onSubmitEditing={this.addItem}
          placeholder= {placeholderText}
          placeholderTextColor={'#fff'}
          autoCapitalize="sentences"
          returnKeyType="done"
          maxLength={30}
          multiline={true}
          value={this.state.inputValue}
          onChangeText={this.changeText}
          blurOnSubmit={true}
        />
        <View onClick={() => crossLine()} style={ [this.state.isCrossed ? styles.strikeThru : ""]}>
        {todos
        
        }


        </View>
        </LinearGradient>
	    );
      
	  }
	}
	

	const styles = StyleSheet.create({
	  input:
    {
    marginTop: 30,
    paddingTop: 10,
    paddingRight: 15,
    paddingLeft: 15,
    fontSize: 24,
    color: 'white',
    fontWeight: '500'
    },

    container: {
    paddingTop: 50,  
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    },
    strikeThru :{
    textDecoration: 'line-through'
    },
	});
