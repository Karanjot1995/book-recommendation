import React,{useState, useReducer, useEffect} from "react";
import { Text, StyleSheet, View , Button , TouchableOpacity , ScrollView, TextInput,FlatList} from "react-native";
import Card from "../components/common/Card";
import booksData from './books.json';

const Recommendations = ({navigation}) => {
  const [state, setState] = useState({name:''})
  const [token, setToken] = useState("")

  async function fetchData(){
    await fetch('http://10.219.175.225:5000/profile',{
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
    });
  }
  useEffect(() => {
    fetchData()
    setToken(localStorage.getItem('token'))
  },[])
  // const [state, dispatch]= useReducer(reducer,{name:''})
  let books = booksData.slice(100,120)


  return(
    <View style={{backgroundColor:'#141414'}}>
      <FlatList
        data={books}
        numColumns={2}
        renderItem={Card}
        keyExtractor={(item, index) => index}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    
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
