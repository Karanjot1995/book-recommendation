import React,{useState, useReducer, useEffect} from "react";
import { Text, StyleSheet, View , Button , TouchableOpacity , ScrollView, TextInput,FlatList, Modal, Pressable} from "react-native";
import Card from "../components/common/Card";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FilterModal from "../components/common/FilterModal";
import {useIsFocused } from '@react-navigation/native';

const BookShelf = ({navigation}) => {
  // const [state, setState] = useState({name:''})
  const [books, setBooks] = useState([])
  const [shelfBooks, setShelfBooks] = useState({})
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = React.useState([]);
  const isFocused = useIsFocused();

  async function fetchData (){
    await fetch('http://10.219.175.225:8085/api/shelf',{
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
      setBooks(data.books)
      setShelfBooks(data.shelf_books)
      setIsLoading(false)
    });

  }
  useEffect(() => {
    fetchData()
  },[isFocused])

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
      <View style={styles.view}>
        <FlatList
            data={Object.keys(shelfBooks)}
            renderItem={({ item }) => 
              <View>
                <Text style={styles.text}>{item.split('_').join(' ')}</Text>
                <FlatList
                    data={shelfBooks[item]}
                    horizontal={true}
                    renderItem={({ item }) =>
                    <TouchableOpacity  onPress={() => navigation.navigate("Book Details",{id:item['id'],item,nav:'Home'})} >
                    <Card item={item} />
                    </TouchableOpacity>
                    }
                    keyExtractor={(item, index) => index}
                />
              </View>
              
            }
            keyExtractor={item => item._id}
        />
        {/* <FlatList
          data={books}
          numColumns={2}
          renderItem={({ item }) =>
          <TouchableOpacity  onPress={() => navigation.navigate("Book Details",{id:item['id'],item,nav:'Home'})} >
          <Card item={item} />
          </TouchableOpacity>
          }
          keyExtractor={(item, index) => index}
        /> */}
      </View>
    )
  }
};

const styles = StyleSheet.create({

  view:{
    backgroundColor:'#141414',
    paddingVertical:5
  },
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
  },

});
export default BookShelf;
