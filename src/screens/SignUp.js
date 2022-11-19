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

 
export default function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  async function signup(){
		if (reg.test(email) === true) {
			let body = {
				name:name,
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
			
			await fetch('http://10.219.175.225:5000/sign-up', opts)
			.then(res=>res.json())
			.then(data=>{
				if(data.msg=='success'){
					alert('Successfully signed up! Login to continue.')
					navigation.navigate('Login')
				}else{
					alert('Email already registered!')
				}
			})
		}else{
			alert('Please provide a valid email!')
		}
  }

  return (
    <View style={styles.container}>

      <View style={styles.inputView}>
        <TextInput
          style={styles.Input}
          placeholder="Name."
          placeholderTextColor="#000"
          autoCapitalize="none" 
          autoCorrect={false}
          onChangeText={(name) => setName(name)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.Input}
          placeholder="Email."
          placeholderTextColor="#000"
          autoCapitalize="none" 
          autoCorrect={false}
          onChangeText={(email) => setEmail(email)}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.Input}
          placeholder="Password."
          placeholderTextColor="#000"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

			<TouchableOpacity onPress={signup} style={styles.submit}>
        <Text style={styles.btnText}>SIGNUP</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
        <Text style={{marginTop:20, fontSize:20}} >Already a member? Login.</Text>
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
