import React, { Component } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ImageBackground,
  Image,
  Text,
} from "react-native";
import axios from "axios";
import { RFValue } from "react-native-responsive-fontsize";
import Star from 'react-native-star-view';

export default class LikedMoviesScreen extends Component {
  constructor(props) {
    super(props);
    this.state={
      data:[],
      ngrok_url:""
    };
  }

  componentdidMount(){
    this.getData();
  }

  getData=()=>{
    const url=this.state.ngrok_url+"/liked";
    axios
      .get(url)
      .then(async(response)=>{
        this.setState({data:response.data.data});
      })
      .catch((error)=>{
        console.log(error.message);
      });
  };

  keyExtractor=(item,index)=> index.toString();

  renderItems=({item,index})=>{
    <View style={styles.cadContainer}>
      <Image
      styles={styles.posterImage}
      source={{url:item.poster_link}}
      ></Image>
      <View style={styles.movieTitleContainer}>
        <Text style={styles.title}>{item.original_title}</Text>
        <View style={{flexDirection:"row"}}>
          <Text style={styles.subtitle}>{item.duration} mins | </Text>
          </View>
        </View>
      </View>
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  cardContainer: {
    borderRadius: RFValue(10),
    height: RFValue(200),
    marginHorizontal: RFValue(20),
    marginVertical: RFValue(15),
  },
  posterImage: {
    flex: 1,
    borderRadius: RFValue(10),
  },
  title: {
    fontSize: RFValue(15),
    fontWeight: "bold",
    color: "#3c8ed9",
    fontFamily: "monospace",
    marginVertical: RFValue(2),
  },
  subtitle: {
    fontSize: RFValue(10),
    fontWeight: "bold",
    color: "#3c8ed9",
    fontFamily: "monospace",
    marginVertical: RFValue(2),
  },
  movieTitleContainer: {
    position: "absolute",
    backgroundColor: "white",
    width:RFValue(250),
    padding: RFValue(10),
    bottom: RFValue(10),
    left: RFValue(10),
    borderRadius: RFValue(10),
    borderWidth:RFValue(2),
    borderColor:"#3c8ed9"
  },
  starStyle: {
    width: RFValue(75),
    height: RFValue(15),
  }
});
