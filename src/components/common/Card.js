import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {Image, Text, StyleSheet, View , Button , TouchableOpacity , TextInput,FlatList} from "react-native";
import { Dimensions } from "react-native";
const win = Dimensions.get('window');

const Card = ({navigation,item}) => {
  // const navigation = useNavigation();

  let imgUrl = item["Image-URL-L"] || item["Image-URL-M"] || item["Image-URL-S"]
  if(!imgUrl){
    imgUrl = 'https://img.webnovel.com/bookcover/12301378806233905/300/300.jpg?updateTime=1578397501796'
  }
  return (
    <View style={styles.card}>
      <View style={styles.container}>
        {/* <TouchableOpacity
          onPress={()=>navigation.navigate('Recommended')}
        > */}
          <Image 
            style={styles.thunmbNail}
            source={{uri:imgUrl}}
          />
        {/* </TouchableOpacity> */}
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
    card:{
      flex: 1,
      flexDirection: 'column',
    },
    container:{
      width: win.width/2,
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
    text: {
      fontSize: 20,
      color:'#fff',
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


export default Card