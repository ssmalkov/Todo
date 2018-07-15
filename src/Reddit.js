import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {ADD_POST} from './reducers';

const _Reddit = (props) => (
  <View>
      {props.posts.map((posts, i) => <Text key={i}>{posts.name}</Text>)}
      <TouchableOpacity onPress={props.addRedditPost}>
        <Text>Add</Text>
      </TouchableOpacity>
  </View>
)

const mapStateToProps = (state) => ({
  posts: state.reddit
});

const mapActionsToProps = (dispatch) => ({
  addRedditPost(post = {name: 'new post'}) {
    dispatch({type: ADD_POST, payload: post})
  } 
});

export const Reddit = connect(mapStateToProps, mapActionsToProps)(_Reddit)


// export class Reddit extends Component {

//   constructor(){
//     super();
//     this.state = {
//       posts: []
//     }
//   }

//   componentWillMount(){
//     fetch('https://www.reddit.com/.json', {
//       Accept: 'application/json'
//     })
//     .then(res => res.json())
//     .then(data => {
//       this.setState({posts: data.data.children})
//     });
//   }

//   render() {
//     return(
//       <View>
//         <Text>reddit</Text>
//         <View>
//           {this.state.posts.map((postn, i) => 
//           <Text key={i} >{post.data.author}</Text>
//           )}
//         </View>
//       </View>
//     )
//   }
// }