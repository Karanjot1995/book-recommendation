// import React,{useState} from "react";
// import { Text, StyleSheet,View, Image ,TextInput,FlatList, TouchableOpacity} from "react-native";


// const Search = ({navigation,pagelist}) => {
//     const [query, setQuery] = useState('')
//     // console.log('hi',pagelist.map((item)=>item))
//     // console.log(query,pagelist)

//   return (
      
//      <View>
//         <View style={styles.search}>

          
//            <TextInput style={styles.input}
//            placeholder="Enter query"
//            onChangeText={query => setQuery(query)}
//            defaultValue={query}
//         //    onChangeText={(query)=> myFunction(query,pagelist)}
//            />
//            <Image source={require('../../assets/search.png')}
//             style={styles.img}
//            />
//         </View>
//         {/* {pagelist.map((item)=>{
//             return <Text onPress={()=>navigation.navigate(item)}>>Go to {item}Demo</Text>
//         })} */}

   

//       </View>   
    
//   )
// };
// const styles = StyleSheet.create({
//     search:{
//        flexDirection:'row',
//        margin:10,
//        backgroundColor:'white',
//        borderColor:'black',
//        borderRadius:5,
//        borderWidth:2
//     },
//     img:{
//         backgroundColor:'white',
//         width:30,
//         height:35
//     },
//     input:{
//         fontSize:20,
//         width:'91%',
//         padding:5
//     }
// })

// export default Search

import React,{useState, useReducer, useEffect} from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import filter from "lodash.filter";
import booksData from './books.json';
import Card from "../components/common/Card";

const Item = ({ title }) => {
return (
	<View style={styles.item}>
	<Text>{title}</Text>
	</View>
);
};

const Search  = () => {
	const [books, setBooks] = useState([])
	const [searchValue, setSearchValue] = useState('')
	const [search, setSearch] = useState({value:'',data:[]})
	

	const fetchData = async () =>{
		// let res = axios.get('http://10.219.175.225:5000/books')
		// console.log(res.data)
		await fetch('http://10.219.175.225:8085/api/books',{
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		}
		})
		.then((response) => response.json())
		.then((data) => {
		    setBooks(data.slice(0,100))
			setSearch({data:data})
		});
		
	}
	useEffect(() => {
		fetchData()
	},[])

	const searchFunction = (text) => {
		const updatedData = books.filter((item) => {
		const item_data = `${item["title"].toUpperCase()})`;
		const text_data = text.toUpperCase();
		return item_data.indexOf(text_data) > -1;
		});
		setSearch({data:updatedData, value:text})
		// setSearchValue(text)
		// this.setState({ data: updatedData, searchValue: text });
	};

	return (
	<View style={styles.container}>
		<SearchBar
		placeholder="Search Here..."
		lightTheme
		round
		value={search.value}
		onChangeText={(text) => searchFunction(text)}
		autoCorrect={false}
		/>
		<FlatList
        data={search.data}
        numColumns={2}
        renderItem={Card}
        keyExtractor={(item, index) => index}
        />
		{/* <FlatList
		data={this.state.data}
		renderItem={renderItem}
		keyExtractor={(item) => item.id}
		/> */}
	</View>
	);
}

export default Search;

const styles = StyleSheet.create({

item: {
	backgroundColor: "#f5f520",
	padding: 20,
	marginVertical: 8,
	marginHorizontal: 16,
},
});
