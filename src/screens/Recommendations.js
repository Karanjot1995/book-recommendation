import {HOST} from '@env';
import React,{useState, useReducer, useEffect} from "react";
import { Text, StyleSheet, View , Button , TouchableOpacity , ScrollView, TextInput,FlatList} from "react-native";
import Card from "../components/common/Card";
// import booksData from './books.json';
import uuid from 'react-native-uuid';

const Recommendations = ({navigation}) => {
  const [state, setState] = useState({name:''})
  const [books, setBooks] = useState({})
  const [genreBooks, setGenreBooks] = useState({})
  const [token, setToken] = useState("")

  async function fetchData(){
    let opts = {
      method: "GET",
      headers: {
        Accept: 'application/json',
        'x-access-token': localStorage.getItem('token'),
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json',
      }
    }
    await fetch(`${HOST}/api/recommendations`,opts)
    .then((response) => response.json())
    .then((data) => {
      setGenreBooks(data.genre_books)
    });
  }
  useEffect(() => {
    fetchData()
  },[])
  // const [state, dispatch]= useReducer(reducer,{name:''})
  // let books = booksData.slice(100,120)

  return(
    <ScrollView style={{backgroundColor:'#141414'}}>
      {Object.keys(genreBooks).map(genre=>
        <View>
          <Text style={styles.text}>{genre}</Text>
          <FlatList
            data={genreBooks[genre].sort(() => Math.random() - 0.5)}
            renderItem={Card}
            horizontal={true}
            keyExtractor={(item, index) => uuid.v4()}
          />
        </View>
        // <Text style={styles.text}>{genre}</Text>
      )}
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    color:'#fff'
  },
  input:{
    height: 50,
    fontSize: 25,
    // marginBottom:50,
    borderColor:'#e0e0e0',
    borderWidth:1,
    padding:10
  },
  button: {
    backgroundColor:"#e0e0e0",
    borderColor:"black",
    borderWidth:1,
    borderRadius:10,
    width:"30%",
    margin:5,
    padding:10,
    flexDirection:"row"
  },
  incdec: {
    alignItems: 'center',
  },
  center:{
    textAlign:"center"
  },
  list:{
    flex:2,
    flexDirection:'row',
    flexWrap:'wrap',
    marginHorizontal:'auto'
    // justifyContent:'space-around',
    // alignItems:'flex-start'
  }

});
export default Recommendations;
