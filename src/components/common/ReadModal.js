import { useNavigation } from "@react-navigation/native";
import React, { useState,useEffect } from "react";
import {Modal, Text,Pressable, StyleSheet, View ,Button} from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';

const ReadModal = (props) => {
  const modalVisible = props.modalVisible; 
  const read = props.read; 
  
  const isModalVisible = () => {
    props.isModalVisible(!modalVisible)
  }

  const readStatus = (status) => {
    props.readStatus(status)
  }
  
  return (
    <View style={styles.readModal}>
      <Modal
        style={styles.modal}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          isModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
                style={[styles.readBtn, styles.buttonOpen]}
                onPress={() => readStatus('Want to read')}
            >
                <Text style={styles.textStyle}>Want to read</Text>
            </Pressable>
            <Pressable
                style={[styles.readBtn, styles.buttonOpen]}
                onPress={() => readStatus('Currently reading')}
            >
                <Text style={styles.textStyle}>Currently reading</Text>
            </Pressable>
            <Pressable
                style={[styles.readBtn, styles.buttonOpen]}
                onPress={() => readStatus('Read')}
            >
                <Text style={styles.textStyle}>Read</Text>
            </Pressable>
            <Pressable
                onPress={() => readStatus('Read')}
            >
                <Text style={styles.textStyle}>Read</Text>
            </Pressable>
            <Pressable
                onPress={() => readStatus('')}
            >
                <Text style={styles.remove}>Remove from my shelf <Icon name={'edit'} color={'black'} size={24} /></Text>
            </Pressable>
            <Pressable
              style={[styles.button]}
              onPress={isModalVisible}
            >
              <Text style={styles.buttonClose}>Done</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  )
};

const styles = StyleSheet.create({
  readModal:{
    // height:"100%",
  },
  modalContent: {
    marginRight:5,
    marginBottom:5,
  },
  centeredView: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    height:"100%",
    backgroundColor:"rgba(0, 0, 0, 0.7)",
    paddingTop: "50%"
  },
  modalView: {
    opacity:1,
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
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  readBtn: {
    backgroundColor: "#2196F3",
    textAlign:'center',
    color:'#fff',
    width:"100%",
    borderRadius: 10,
    margin:5,
    padding: 7,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    textAlign:'center',
    color:'#fff',
    borderRadius:10,
    width:100,
    fontSize:20,
    marginTop:10,
    padding:5
  },
  textStyle: {
    color: "white",
    fontSize:20,
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  text:{
    fontSize:20
  },
  remove:{
    color:'#000',
    fontSize:20
  }
})


export default ReadModal