import { useNavigation } from "@react-navigation/native";
import React, { useState,useEffect } from "react";
import {Modal, Text,Pressable, StyleSheet, View ,FlatList} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CheckBox from 'expo-checkbox';

const FilterModal = (props) => {
  const [modalVisible, setModalVisible] = useState(false);    
  const [checked, setChecked] = useState(false);  
  const [books, setBooks] = useState(props.books);
  const checkboxes = [
    { id: 1, txt: 'Horror', isChecked: false },
    { id: 2, txt: 'Young Adult', isChecked: false },
    { id: 3, txt: 'Fiction', isChecked: false },
    { id: 4, txt: 'Dystopia', isChecked: false },
    { id: 5, txt: 'Science Fiction', isChecked: false },
    { id: 6, txt: 'Romance', isChecked: false },
    { id: 7, txt: 'Adventure', isChecked: false },
    { id: 8, txt: 'Literature', isChecked: false },
    { id: 9, txt: 'Historical', isChecked: false },
    { id: 10, txt: 'Action', isChecked: false },
    { id: 11, txt: 'Childrens', isChecked: false },
    { id: 12, txt: 'Classics', isChecked: false },
    { id: 13, txt: 'Adult', isChecked: false },
    { id: 14, txt: 'Audio Book', isChecked: false },
    { id: 15, txt: 'Science Fiction Fantasy', isChecked: false },
    { id: 17, txt: 'Teen', isChecked: false },
    { id: 18, txt: 'Novels', isChecked: false }
  ];

  const [filters, setFilters] = useState(checkboxes);
  const filterBooks = props.filterBooks

  

  // console.log(books)


  const handleChange = (id) => {
    let fltrs = [];
    let temp = filters.map((filter) => {
      if (id === filter.id) {
          return { ...filter, isChecked: !filter.isChecked };
      }
      return filter;
    });
    Object.keys(temp).map(key=>{
      if(temp[key].isChecked){
        fltrs.push(temp[key].txt)
      }
    })
    setFilters(temp);
    let filteredBooks = books.filter(b=>{
      let genres = JSON.parse(b.genres)
      let genre_in_filter = false
      genres.map(g=>{
        if(fltrs.indexOf(g)>-1){
          genre_in_filter = true
        }
      })
      if(genre_in_filter){
        return b
      }
    })

    if(fltrs.length == 0){
      filterBooks(books)
    }else{
      filterBooks(filteredBooks)
    }
  };


  return (
    <View >
      <Modal
        style={styles.modal}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>

          <View style={styles.modalView}>
            <Text style={styles.text}>Filters</Text>
            <FlatList
              numColumns={2}
              data={filters}
              extraData={filters}
              renderItem={({ item }) => (
                <View style={styles.modalContent}>
                  <View
                    style={{
                        flexDirection: 'row',
                        flex: 1,
                    }}>
                    <Pressable onPress={() => handleChange(item.id)} >
                        <MaterialCommunityIcons name={item.isChecked ? 'checkbox-marked' : 'checkbox-blank-outline'} size={24} color="#000" />
                    </Pressable>
                    {/* <CheckBox
                      value={item.isChecked}
                      onChange={() => {
                        onValueChange(item.id);
                      }}
                      color={item.isChecked ? '#4630EB' : undefined}
                    /> */}
                    <Text style={styles.text}>{item.txt}</Text>
                  </View>
                </View>
              )}
            />

            <Pressable
              style={[styles.button]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.buttonClose}>Done</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.filterBtn, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Filter</Text>
      </Pressable>
      
    </View>
  )
};

const styles = StyleSheet.create({
  modalContent: {
    marginRight:5,
    marginBottom:5
  },
  centeredView: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: 50
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  filterBtn: {
    borderRadius: 20,
    width:50,
    padding: 7,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#2196F3",
    marginTop:10,
    marginLeft:10
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    textAlign:'center',
    color:'#fff',
    fontSize:20,
    marginTop:20,
    padding:5
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  text:{
    fontSize:20
  }
})


export default FilterModal