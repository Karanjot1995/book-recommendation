// import { createAppContainer } from "react-navigation";
// import { createStackNavigator } from "react-navigation-stack";
// import Navigation from "./src/components/Navigation";
import HomeScreen from "./src/screens/HomeScreen";
import Search from "./src/screens/Search";
import React, { useState, useEffect } from "react";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'localstorage-polyfill';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from "./src/screens/Login";
import Recommendations from "./src/screens/Recommendations";
import BookDetails from "./src/screens/BookDetails";
import { Button } from "react-native-elements";
import Profile from "./src/screens/Profile";
import SignUp from "./src/screens/SignUp";
import Liked from "./src/screens/Liked";
import Icon from 'react-native-vector-icons/AntDesign';
import BookShelf from "./src/screens/BookShelf";

// import { Linking } from 'expo';
// const prefix = Linking.createURL('/');
const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

function HomeStack(){

  return (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Book Details"
      component={BookDetails}
      options={{
        // headerRight: () => (
        //   <Button
        //     onPress={() => navigation.navigate('Home')}
        //     color="#fff"
        //   />
        // ),
      }}
      // options={{ headerShown: false }}
    />
  </Stack.Navigator>
  )

}

function MyTabs() {
  const [token, setToken] = useState("")
  const navigation = useNavigation();

  useEffect(() => {
    let t = localStorage.getItem("token")
    setToken(t)
    if(!t){
      navigation.navigate('Login')
    }
  },[])
  const screenOptions = (route, color) => {
    let iconName;
  
    switch (route.name) {
      case 'Home':
        iconName = 'home';
        break;
      case 'Search':
        iconName = 'search1';
        break;
      case 'Recommended':
        iconName = 'smileo';
        break;
      case 'Liked':
        iconName = 'staro';
        break;
      case 'Book Shelf':
        iconName = 'book';
        break;
      case 'Profile':
        iconName = 'user';
        break;
      default:
        break;
    }
  
    return <Icon name={iconName} color={color} size={24} />;
  };
  return (
    <Tab.Navigator screenOptions={({route}) => ({
      tabBarIcon: ({color}) => screenOptions(route, color),
    })}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Recommended" component={Recommendations} />
      <Tab.Screen name="Liked" component={Liked} />
      <Tab.Screen name="Book Shelf" component={BookShelf} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        /> 
        <Stack.Screen
          name="Sign Up"
          component={SignUp}
          options={{ headerShown: false }}
        /> 
        <Stack.Screen
          name="Tab Navigator"
          component={MyTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};



// function AuthNavigator() {

//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Login" component={Login} />
//       <Tab.Screen name="Search" component={Search} />
//     </Tab.Navigator>
//   );
// }

// export default function App() {
//   const [token, setToken] = useState("")

//   useEffect(() => {
//     setToken(localStorage.getItem("token"))
//   },[])
//   return (
//     <NavigationContainer>
//       {token?<MyTabs />:<AuthNavigator/>}
//     </NavigationContainer>
//   );
// }

// const navigator = createStackNavigator(
//   {
//     Home: {
//       screen: HomeScreen,
//       // navigationOptions: {
//       //   headerTitle: ()=> <Navigation/>
//       // }
//     },
//     Navigation: Navigation,
//     Search: Search,
//     Movies: MoviesScreen
//   },
//   {
//     initialRouteName: "Home",
//     defaultNavigationOptions: {
//       title: "App",
//     },
//     headerMode: 'screen',
//     cardStyle: { backgroundColor: '#141414' },

//   }

// );

// export default createAppContainer(MyTabs);



// AIzaSyDW4UKBQ0_CLrOI2WJTXVrmii9rurxXqrI