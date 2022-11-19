// import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {useNavigation} from '@react-navigation/native';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Pressable,
} from "react-native";
import useToken from '../components/UseToken'

 
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("")
  const navigation = useNavigation();

  // const { token, removeToken, setToken } = useToken();

  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  // if (reg.test(email) === true) {
  //   console.log("Valid");
  // }

  async function login(){
    let body = {
      email:email,
      password: password
    }

    let opts = {
      method: "POST",
      body:JSON.stringify(body),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }
    // https://karanjot1995.pythonanywhere.com
    
    await fetch('http://10.219.175.225:5000/token', opts).then(res=>{
      if(res.status==200){
        return res.json()
      }else{
        alert('Incorrect email or password!')
      }
    }).then(data=>{
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setToken(data.access_token)
      if(data.access_token){
        navigation.navigate('Tab Navigator')
      }
    })
  }

  return (
    <View style={styles.container}>
      {/* <Image style={styles.image} source={require("./assets/log2.png")} /> */}
 
      {/* <StatusBar style="auto" /> */}
      <View style={styles.inputView}>
        <TextInput
          style={styles.Input}
          placeholder="Email"
          placeholderTextColor="#000"
          autoCapitalize="none" 
          autoCorrect={false}
          onChangeText={(email) => setEmail(email)}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.Input}
          placeholder="Password"
          placeholderTextColor="#000"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
 
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
 
      {/* <Pressable style={styles.submit} onPress={login}>
        <Text style={styles.btnText}>LOGIN</Text>
      </Pressable> */}
      <TouchableOpacity onPress={login} style={styles.submit}>
        <Text style={styles.btnText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>navigation.navigate('Sign Up')}>
        <Text style={{marginTop:20, fontSize:20}}>Dont have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

 
  inputView: {
    backgroundColor: "#e0e0e0",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
    // textAlign:'center'
  },
 
  Input: {
    height: 50,
    flex: 1,
    padding: 10,
    textAlign:'center'
    // marginLeft: 20,
  },
 
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
 
  submit: {
    width: 150,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0e0e0e",
    paddingVertical: 12,
    paddingHorizontal: 32,
  },

  btnText:{
    color:'#fff'
  }
});

// import React,{useReducer, useState} from "react";
// import { Text, StyleSheet,View, Image, Button,TextInput,FlatList } from "react-native";

// const Login = (props) => {
//   // const [counter, setCounter,] = useState(0);
//   const [state, setState] = useState({name:''})
  
//   // const [state, dispatch]= useReducer(reducer,{name:''})
//   const data = [
//     {url:"",text:"Forest"},
//     {url:"",text:"Beach"},
//     {url:"",text:"Mountain"},

//   ]
//   const [text,setText] = useState('');
//   const [pass,setPass] = useState('')

//     return (
//        <View style={styles.incdec}>
//         <Text>Movies Page</Text>
        
//             <View style={{padding: 20}}>
//                 <Text style={{fontSize: 30}}>
//                 Enter Name: {state.name}
//                 </Text>
//                 <TextInput
//                 style={styles.input}
//                 placeholder="Type your name here"
//                 // onChangeText={(text)=> dispatch({type:'name', text:text})}
//                 defaultValue={state.name}
//                 />
//                 <Text style={{fontSize: 30}}>
//                 Enter Password: 
//                 </Text>
//                 {/* <TextInput
//                 style={styles.input}
//                 autoCapitalize="none"
//                 autoCorrect={false}
//                 placeholder="Enter password"
//                 // onChangeText={pass => setPass(pass)}
//                 defaultValue={pass}
//                 />
//                 <Text>{pass.length>5?'password strength good':'password must be greater than 5 chars'}</Text>
            
//                 <TouchableOpacity  onPress={()=>navigation.navigate('Components')}>
//                 <Text style={{fontSize:30, textAlign:"center",backgroundColor:"#e0e0e0"}}>Login</Text>
//                 </TouchableOpacity>
//                 */}
//             </View>
//         {/* <TextInput  style={{backgroundColor:color}} ></TextInput> */}
//       </View>
   
//   )
// };


// const styles = StyleSheet.create({
//     text:{
//       textAlign:"center"
//         // backgroundColor:color
//     }
  
// })

// export default Login