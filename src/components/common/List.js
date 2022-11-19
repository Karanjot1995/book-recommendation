import React, {useState,  useSelector, useEffect, useDispatch} from "react";
// import { useHistory } from "react-router-dom";
import { Text, StyleSheet, View , Button , TouchableOpacity , TextInput,FlatList, ScrollView} from "react-native";
import Card from "./Card";


const List = ({navigation}) => {
    // const [inList, setInlist] = useState(false)
    // const userData = useSelector(state => state.user.userData)
    // const isLogged = useSelector(state => state.user.isLogged)
    // let history = useHistory();
    // const dispatch = useDispatch()
    // const width = window.innerWidth;
    // function inListItem(uc,id){
    //     let cid = null
    //     uc.map(c=>{
    //         if(c.ContentID == props.item['ContentID']){
    //             cid = c.ContentID
    //             // setInlist(true)
    //         }
    //     })
    //     if(cid == props.item['ContentID']){
    //         setInlist(true)
    //     }else{
    //         setInlist(false)
    //     }
    // }

    // useEffect( () => {
    //     if(userData.userContent?.length){
    //         inListItem(userData.userContent)
    //     }

    // },[]);

    // function addToList(e,cid){
    //     e.stopPropagation();
    //     e.preventDefault();
    //     if(isLogged){
    //         fetch(`/api/add-to-list`,{
    //             method: "POST",
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({userid:userData.userDetails.CustomerID, contentID:cid})
    //         }).then(res=>res.json()).then(data=>{
    //             dispatch(setUserData({userData:{...userData,userContent:data.updatedContent}}))
    //             inListItem(data.updatedContent)
    //         })
    //     }else{
    //         history.push('/login')
    //     }

    // }
    let list =[
        {title:'The Batman', imgSrc:'https://sportshub.cbsistatic.com/i/2022/01/24/44b557ca-5e4e-49dc-b2b5-c3bbc30d7e0f/fj4h-dvwuaymybt.jpg?auto=webp&width=1000&height=1500&crop=0.667:1,smart'},
        {title:'Batman Begins', imgSrc:'https://sportshub.cbsistatic.com/i/2022/01/24/44b557ca-5e4e-49dc-b2b5-c3bbc30d7e0f/fj4h-dvwuaymybt.jpg?auto=webp&width=1000&height=1500&crop=0.667:1,smart'},
        {title:'The Dark Knight', imgSrc:'https://sportshub.cbsistatic.com/i/2022/01/24/44b557ca-5e4e-49dc-b2b5-c3bbc30d7e0f/fj4h-dvwuaymybt.jpg?auto=webp&width=1000&height=1500&crop=0.667:1,smart'},
        {title:'The dark Knight Rises', imgSrc:'https://sportshub.cbsistatic.com/i/2022/01/24/44b557ca-5e4e-49dc-b2b5-c3bbc30d7e0f/fj4h-dvwuaymybt.jpg?auto=webp&width=1000&height=1500&crop=0.667:1,smart'},
        {title:'Batman V Superman', imgSrc:'https://sportshub.cbsistatic.com/i/2022/01/24/44b557ca-5e4e-49dc-b2b5-c3bbc30d7e0f/fj4h-dvwuaymybt.jpg?auto=webp&width=1000&height=1500&crop=0.667:1,smart'},
    ]
    let content = {title:'Top Rated on Netflix'}

    return (
        <View>
            <Text style={styles.text}>{content.title}</Text>
            <ScrollView   
                horizontal={true}
            >
            <View style={styles.list}>
                {list.map(item=>(
                    <View><Card navigation={navigation} {...item}/></View>
                ))}
            </View>
        </ScrollView>

        </View>
        
    )
};

const styles = StyleSheet.create({
    list:{
        flexDirection:"row",
        color:'#fff',
    },
    card:{
        color:'#fff',
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
      padding:10,
      flexDirection:"row"
    },
    incdec: {
      alignItems: 'center',
    },
    center:{
      textAlign:"center"
    }
})


export default List