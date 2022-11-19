import React from "react";
import { Text, StyleSheet, View , Button , TouchableOpacity , TextInput,FlatList} from "react-native";
import Search from "../screens/Search";


const Navigation = ({navigation}) => {
    const pagelist = [
        'TV Shows','Movies','My List'
        // {page:'Components'},
        // {page:'List'},
        // {page:'Image'},
        // {page:'Counter'}

    ]
  return (
    <View >
      <Search navigation={navigation} pagelist={pagelist}/>


    {/* <View style={styles.button}>
      <TouchableOpacity 
        onPress={()=>navigation.navigate('Components')}>
        <Text style={styles.center}>Go to Components Demo</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.button}>
      <TouchableOpacity 
        onPress={()=>navigation.navigate('List')}>
        <Text style={styles.center}>Go to List Demo</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.button}>
      <TouchableOpacity 
        onPress={()=>navigation.navigate('Image')}>
        <Text style={styles.center}>Go to Image Demo</Text>
      </TouchableOpacity>

    </View>
    <View style={styles.button}>
      <TouchableOpacity 
        onPress={()=>navigation.navigate('Counter')}>
        <Text style={styles.center}>Go to Counter Demo</Text>
      </TouchableOpacity>

    </View> */}
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data = {
        pagelist
      }
      renderItem={({item})=>{
        return (
            <View style={{}}>
            <TouchableOpacity 
                onPress={()=>navigation.navigate(item)}>
                <Text style={styles.button}>{item}</Text>
            </TouchableOpacity>
            </View>
        )
      }}
     
    />

  </View>
    
  )
};

const styles = StyleSheet.create({
    text: {
      fontSize: 30,
      
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
  

export default Navigation