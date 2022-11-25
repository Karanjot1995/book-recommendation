import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {Image, Text, StyleSheet, View , Pressable , TouchableOpacity , TextInput,FlatList, ScrollView} from "react-native";
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
    await fetch('http://10.219.175.225:8085/api/books',{
    // await fetch('https://karanjot1995.pythonanywhere.com/books',{
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((data) => {
      let b = data.filter(b=>b['id'] == id)[0]
      // genres = b.genres.replace(/'/g, '"')
      // b.genres = JSON.parse(genres)
      // a = b.genres.replace(/'/g, '"');
      // a = JSON.parse(a);
      // b.genres = b.genres.replace(/'/g, '"')
      b.genres = JSON.parse(b.genres)
      setBook(b)
      setLoading(false)
      let user = JSON.parse(localStorage.getItem('user'))
      if(user.liked && user['liked'].indexOf(String(b['id'])) >-1){
        setLiked(true)
      }
    });
  }

  async function like(){
    let like = !liked
    setLiked(!liked)
    let body = {
      id:book['id'],
      liked: like
    }
    let opts = {
      method: "POST",
      body:JSON.stringify(body),
      headers: {
        Accept: 'application/json',
        'x-access-token': localStorage.getItem('token'),
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json',
      }
    }      
    await fetch('http://10.219.175.225:8085/api/like', opts)
    // await fetch('http://10.219.175.225:5000/like', opts)
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
  let imgUrl = book["cover_img"]
  if(!imgUrl){
    imgUrl = 'https://img.webnovel.com/bookcover/12301378806233905/300/300.jpg?updateTime=1578397501796'
  }
  if(!loading){
  return (
    <ScrollView style={styles.card}>
    {/* <Button title="Go to Page" onPress={ () => navigation.navigate(nav)} /> */}
      <View style={styles.container}>

          <Image 
            style={styles.thunmbNail}
            source={{uri:imgUrl}}
          />
          <View style={{'alignItems':'center'}}>
            <Text style={styles.title}>{book["title"]}</Text>
            <Text style={styles.text}>Author: {book["author"]}</Text>
            <Text style={styles.text}>Publisher: {book["publisher"]}</Text>
            <Text style={styles.text}>Year of Publication: {book["publication_year"]}</Text>
            <Text style={styles.text}>Pages: {book["pages"]}</Text>
            <Text style={styles.text}>Genre: {book["genres"].join(', ')}</Text>
          </View>

          <Pressable onPress={like}>
            <MaterialCommunityIcons
              name={liked ? "heart" : "heart-outline"}
              size={32}
              color={liked ? "red" : "black"}
            />
          </Pressable>
      </View>
    </ScrollView>
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
        marginBottom:50,
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