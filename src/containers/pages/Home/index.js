import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { Alert, Dimensions, Image, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/FontAwesome';
import { withNavigation } from 'react-navigation';

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      dataFeatured: [],
      username: '',
      data: '',
      password: '',
      isLoading: true,
      itemToRender: this.itemToRender,
      refreshing: false,
      isVisible: true,
      refreshing: false,

    }
  };



  componentDidMount() {
    AsyncStorage.getItem("user", (error, result) => {
      this.setState({
        username: JSON.parse(result).username,
        password: JSON.parse(result).password,
        data: JSON.parse(result).data,

      });
      fetch('http://18.141.178.15:8080/checklist',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            {
              username: this.state.username,
              data: this.state.data,
            }),
        }).then((response) => response.json())
        .then((responseJson) => {
          if (responseJson["statusCode"] == "401") {
            Alert.alert(responseJson["errorMessage"]);

          } else if (responseJson["statusCode"] == "2110") {
            Alert.alert(responseJson["errorMessage"]);

            // this.props.navigation.navigate('WebView1', { url: responseJson.data })
          }

        })
        .catch((error) => {

        });
    })
  }



  render() {
    const { Loading } = this.state;
    const { navigate } = this.props.navigation;
    return (


      <View
        style={{ flex: 1, backgroundColor: '#15558a', }}>
        <StatusBar barStyle='default' backgroundColor='#15558a' />
        <View

          style={{ backgroundColor: "#15558a", width: '100%', height: 40, alignItems: 'center' }}>

        </View>
        <View

          style={{ alignItems: "center", backgroundColor: "#15558a", height: '25%' }}>

        </View>

        <Animatable.View
          animation='slideInUp'
          duration={2000}
          style={{ flex: 3, marginTop: 10 }}>
          <ScrollView style={{

            backgroundColor: "#fff",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingHorizontal: 10,
          }}
            showsVerticalScrollIndicator={false}>

            <View style={{ flex: 1, marginTop: 20, justifyContent: "center", backgroundColor: 'transparent' }}>

              {/* 
                <FlatList
                  data={this.state.dataFeatured}

                  showsHorizontalScrollIndicator={false}
                  horizontal
                  renderItem={this.renderItem2}
                  keyExtractor={(item, index) => index.toString()}
                /> */}
            </View>

          </ScrollView>
        </Animatable.View>
      </View>


    )
  }
}
export default withNavigation(Home);
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#15558a',

    justifyContent: 'center',

  },
  container2: {
    height: 17,
    backgroundColor: '#F2f2f4',
    marginTop: 20
  },
  button: {
    width: 170,
    height: 300,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 2,
    shadowRadius: 10,
    shadowOffset: { width: 1, height: 13 },
  },
  container3: {
    width: 150,

    alignSelf: "center",
    marginVertical: 5,
    marginHorizontal: 5,
    height: 200

  },
  container4: {
    flex: 1.1,
    borderRadius: 5,

  },
  button: {

    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 2,
    // borderColor: '#15558a',
    // borderWidth: 2,
    shadowRadius: 10,
    shadowOffset: { width: 1, height: 13 },
  },
  gambar: {
    width: 25,
    height: 25,
    margin: 10,
    borderRadius: 100,

    alignSelf: 'flex-start',
  },
  gambar2: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    resizeMode: 'cover'
  },
  name: {
    fontSize: 13,
    textAlign: 'left',
    fontWeight: 'bold',


  },
  textname: {
    fontSize: 11,
    textAlign: 'left',

    marginHorizontal: 10
  },
  textmulai: {
    fontSize: 9,

    marginHorizontal: 10
  },
  textharga: {
    fontSize: 11,
    color: 'blue',

    marginVertical: 1,
    marginHorizontal: 10
  },

})