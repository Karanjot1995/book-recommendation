import {HOST} from '@env';
import React,{useState, useReducer, useEffect} from "react";
import { Text, StyleSheet, View , Button , TouchableOpacity , Image, FlatList} from "react-native";
import {useNavigation} from '@react-navigation/native';
import Card from "../components/common/Card";
import {useIsFocused } from '@react-navigation/native';

const Profile = () => {
  const [state, setState] = useState({name:''})
  const [token, setToken] = useState("")
  const [user, setUser] = useState({})
  const [books, setBooks] = useState([])
  const [shelfBooks, setShelfBooks] = useState({})
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    getShelf()
    setToken(localStorage.getItem('token'))
    setUser(JSON.parse(localStorage.getItem('user')))
  },[isFocused])

  async function logout(){
    await fetch(`${HOST}/api/logout`)
    .then(res=>res.json())
    .then(data=>{
      localStorage.setItem('token', "");
      navigation.navigate('Login')
      alert("Logged out successfully!")
    })
  }

  async function getShelf(){
    await fetch(`${HOST}/api/shelf`,{
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
        setShelfBooks(data.shelf_books)
        setBooks(data.books)
      });
  }
  let imgUrl = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png';
  return(
    <View style={styles.view}>
      <View style={{marginBottom:20}}>
        <Image 
          style={styles.thumbNail}
          source={{uri:imgUrl}}
        />
        <Text style={styles.text}>Name: {user.name}</Text>
        <Text style={styles.text}>Email: {user.email}</Text>
      </View>
        
        <Text style={[styles.text, {textDecorationLine:'underline', fontWeight:'bold'}]}>{user.name}'s bookshelf</Text>
        <FlatList
            data={Object.keys(shelfBooks)}
            renderItem={({ item }) =>
            <TouchableOpacity  onPress={() => navigation.navigate("Book Details",{id:item['id'],item,nav:'Home'})} >
            <Text style={styles.text}>
              {item.split('_').join(' ')}: {shelfBooks[item].length}
            </Text>
            </TouchableOpacity>
            }
            keyExtractor={(item, index) => index}
        />

        <TouchableOpacity style={styles.button} onPress={logout}>
          <Text style={styles.btnTxt}>LOGOUT</Text>
        </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  view:{
    flex: 1,
    justifyContent: "center",
    width:'100%',
    alignItems:'center'
  },
  text: {
    fontSize: 20,
    color:'#000',
    marginTop:10,
    textAlign:'center'
  },
  btnTxt:{
    fontSize: 25,
    color:'#fff',
    textAlign:'center'
  },

  thumbNail:{
    alignSelf: 'center',
    alignItems:'center',
    marginTop:20,
    width: 200, 
    height:200,
    borderRadius:200/2
  },
  
  button: {
    height: 50,
    marginVertical:20,
    alignSelf:'center',
    backgroundColor:"#000",
    borderColor:"#fff",
    justifyContent:'center',
    borderWidth:1,
    borderRadius:10,
    width:"50%",
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
export default Profile;
