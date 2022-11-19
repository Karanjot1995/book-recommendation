import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {Image, Text, StyleSheet, View , Pressable , TouchableOpacity , TextInput,FlatList} from "react-native";
import { Dimensions } from "react-native";
const win = Dimensions.get('window');
import { MaterialCommunityIcons } from "@expo/vector-icons";
// import booksData from './books.json';

const BookDetails = (props) => {
  const [book, setBook] = useState({})
  const [user, setUser] = useState({})
  const [liked, setLiked] = useState(false)
  const [loading, setLoading] = useState(true)

  const navigation = useNavigation();
  let id = props.route.params.id
//   let nav = props.route.params.nav
  // let book = booksData.filter(b=>b['ISBN'] == id)[0]
  async function fetchData (){
    await fetch('https://karanjot1995.pythonanywhere.com/books',{
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((data) => {
      let books = data.slice(0,100)
      let b = books.filter(b=>b['ISBN'] == id)[0]
      setBook(b)
      setLoading(false)
      let user = JSON.parse(localStorage.getItem('user'))
      if(user.liked && user['liked'].indexOf(String(b['ISBN'])) >-1){
        setLiked(true)
      }
    });
  }

  async function like(){
    let like = !liked
    setLiked(!liked)
    let body = {
      id:book['ISBN'],
      liked: like
    }
    let opts = {
      method: "POST",
      body:JSON.stringify(body),
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json',
      }
    }      
    await fetch('http://10.219.175.225:5000/like', opts)
    .then(res=>res.json())
    .then(data=>{
      localStorage.setItem('user', JSON.stringify(data.user))
    })

  }

  useEffect(() => {
    fetchData()
    let u = localStorage.getItem('user')
    setUser(u)
  },[])
  let imgUrl = book["Image-URL-L"] || book["Image-URL-M"] || book["Image-URL-S"]
  if(!imgUrl){
    imgUrl = 'https://img.webnovel.com/bookcover/12301378806233905/300/300.jpg?updateTime=1578397501796'
  }
  if(!loading){
  return (
    <View style={styles.card}>
    {/* <Button title="Go to Page" onPress={ () => navigation.navigate(nav)} /> */}
      <View style={styles.container}>

          <Image 
            style={styles.thunmbNail}
            source={{uri:imgUrl}}
          />
          <View style={{'alignItems':'center'}}>
            <Text style={styles.title}>{book["Book-Title"]}</Text>
            <Text style={styles.text}>Author: {book["Book-Author"]}</Text>
            <Text style={styles.text}>Publisher: {book["Publisher"]}</Text>
            <Text style={styles.text}>Year of Publication: {book["Year-Of-Publication"]}</Text>
          </View>

          <Pressable onPress={like}>
            <MaterialCommunityIcons
              name={liked ? "heart" : "heart-outline"}
              size={32}
              color={liked ? "red" : "black"}
            />
          </Pressable>
      </View>
    </View>
  )}else{
    return (
      <View>
        <Text style={{marginTop:30, textAlign:'center'}}>Loading...</Text>
      </View>
    )
  }
};

const styles = StyleSheet.create({
    container:{
        marginTop:20,
        padding:10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    thunmbNail:{
      alignSelf: 'center',
      alignItems:'center',
      width: win.width/2.2, 
      height:230
    },
    title:{
        fontSize: 25,
        padding:5,
        paddingTop:20,
        fontWeight:'bold',
        textAlign:'center',
      //   color:'#fff',
    },
    text: {
      fontSize: 20,
      padding:5,
    //   color:'#fff',
      alignItems: 'center',
    },
    button: {
      backgroundColor:"transparent",
      color:'#fff',
//      border:"none",
    //   width:"30%",
      margin:5,
      flexDirection:"row"
    },
    incdec: {
      alignItems: 'center',
    },
    center:{
      textAlign:"center"
    }
})


export default BookDetails