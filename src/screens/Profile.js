import React,{useState, useReducer, useEffect} from "react";
import { Text, StyleSheet, View , Button , TouchableOpacity , ScrollView, TextInput,FlatList} from "react-native";
import {useNavigation} from '@react-navigation/native';

const Profile = () => {
  const [state, setState] = useState({name:''})
  const [token, setToken] = useState("")
  const navigation = useNavigation();

  useEffect(() => {
    setToken(localStorage.getItem('token'))
  },[])

  async function logout(){
    await fetch('http://10.219.175.225:5000/logout')
    .then(res=>res.json())
    .then(data=>{
      localStorage.setItem('token', "");
      navigation.navigate('Login')
      alert(data.msg)
    })
  }
  return(
    <View style={{backgroundColor:'#141414'}}>
      <TouchableOpacity>
        <Button title="LOGOUT" onPress={logout}></Button>
      </TouchableOpacity>
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
export default Profile;
