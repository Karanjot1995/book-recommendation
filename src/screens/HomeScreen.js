import React,{useState, useReducer, useEffect} from "react";
import { Text, StyleSheet, View , Button , TouchableOpacity , ScrollView, TextInput,FlatList, Modal, Pressable} from "react-native";
import Card from "../components/common/Card";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FilterModal from "../components/common/FilterModal";
import {HOST} from '@env';
import { render, screen, fireEvent } from '@testing-library/react-native';
// import {HOST} from 'react-native-dotenv';


const HomeScreen = ({navigation}) => {
  // const [state, setState] = useState({name:''})
  const [books, setBooks] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = React.useState([]);



  async function fetchData (){
    // https://recommendation-mjfz.onrender.com/
    // let res = axios.get('http://127.0.0.1:5000/books')
    await fetch(`${HOST}/api/books`,{
    // await fetch('https://karanjot1995.pythonanywhere.com/books',{
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then((response) => response.json())
    .then((data) => {
      setBooks(data.slice(0,100))
      setIsLoading(false)
    });

  }
  useEffect(() => {
    fetchData()
  },[])

  function filterBooks(filtered_books){
    setBooks(filtered_books)
  }
  
  // const [state, dispatch]= useReducer(reducer,{name:''})

  if(isLoading){
    return (
      <View>
        <Text style={{textAlign:'center'}}>Loading...</Text>
      </View>
    )
  }else{
  
    return(
      <View style={{backgroundColor:'#141414'}}>
        <FilterModal filterBooks={filterBooks} books={books}/>
        {/* <Pressable
          style={[styles.filterBtn, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Filter</Text>
        </Pressable> */}
        <FlatList
          data={books}
          numColumns={2}
          renderItem={({ item }) =>
          <TouchableOpacity  onPress={() => navigation.navigate("Book Details",{id:item['id'],item,nav:'Home'})} >
          <Card item={item} />
          </TouchableOpacity>
          }
          keyExtractor={(item, index) => index}
        />
      </View>
    )
  }
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
  },
  

});
export default HomeScreen;
