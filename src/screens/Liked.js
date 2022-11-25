import React,{useState, useEffect} from "react";
import { Text, StyleSheet, View , Button , TouchableOpacity , ScrollView, TextInput,FlatList} from "react-native";
import Card from "../components/common/Card";
import {useIsFocused } from '@react-navigation/native';


const Liked = ({navigation}) => {
  // const [state, setState] = useState({name:''})
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const isFocused = useIsFocused();

  async function fetchData (){
    // await fetch('https://karanjot1995.pythonanywhere.com/books',{
    await fetch('http://10.219.175.225:8085/api/books',{
        method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((data) => {
        let books = data.slice(0,100)
        let user = JSON.parse(localStorage.getItem('user'))
        if(user['liked']){
            let res = books.filter(b=>{
                for(let id of user['liked']){
                    if(String(b['id']) ==id){
                        return b
                    }
                }
            })
            setBooks(res)
        }else{
            setBooks([])
        }

    });

  }
  useEffect(() => {
    fetchData()
  },[isFocused])

  return(
    <View style={{backgroundColor:'#141414'}}>
      <FlatList
        data={books}
        numColumns={2}
        renderItem={({ item }) =>
        <TouchableOpacity>
         <Card item={item} />
         </TouchableOpacity>
        }
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
export default Liked;
