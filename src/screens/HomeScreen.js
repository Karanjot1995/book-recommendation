import React,{useState, useReducer, useEffect} from "react";
import { Text, StyleSheet, View , Button , TouchableOpacity , ScrollView, TextInput,FlatList} from "react-native";
import Card from "../components/common/Card";


const HomeScreen = ({navigation}) => {
  // const [state, setState] = useState({name:''})
  const [books, setBooks] = useState([])

  async function fetchData (){
    // let res = axios.get('http://127.0.0.1:5000/books')
    
    // await fetch('http://10.219.175.225:5000/books',{
    await fetch('https://karanjot1995.pythonanywhere.com/books',{
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((data) => {
      setBooks(data.slice(0,100))
    });

  }
  useEffect(() => {
    fetchData()
  },[])
  
  // const [state, dispatch]= useReducer(reducer,{name:''})
  const data = [
    {url:"",text:"Forest"},
    {url:"",text:"Beach"},
    {url:"",text:"Mountain"},

  ]

  return(
    <View style={{backgroundColor:'#141414'}}>
      {/* <Navigation navigation={navigation}/> */}
      {/* <View>
        <List/>
      </View> */}
      <FlatList
        data={books}
        numColumns={2}
        renderItem={({ item }) =>
        <TouchableOpacity  onPress={() => navigation.navigate("Book Details",{id:item['ISBN'],item,nav:'Home'})} >
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
export default HomeScreen;
