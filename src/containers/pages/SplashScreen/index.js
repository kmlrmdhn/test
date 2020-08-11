import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { ImageBackground, StatusBar, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';




class Splash extends Component {

    constructor(props) {
        super(props);
        this.state = { isLoggedIn: false };
    }
    componentDidMount() {
        
        AsyncStorage.getItem('loggedInStatus',
            (value) => {
                this.setState({ loggedInStatus: value });
            });
        AsyncStorage.removeItem('userdata');
        setTimeout(() => {
            AsyncStorage.getItem('userdata', (error, result) => {
                if (result) {
                this.setState({
                    userId: JSON.parse(result).seller_id,
                    auth: JSON.parse(result).auth_code
                });
                fetch('https://kenalsapa.com/api/user/umkm/'+this.state.userId+'/get', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        id: this.state.userId,
                    }),
                }).then((response) => response.json())
                    .then((responseJson) => {
                        if (responseJson["status"] == "error") {

                            this.setState({ ErrorMessage: Array.isArray(responseJson["message"]) ? responseJson["message"].join("\n") : responseJson["message"] })
                            this.AlertPro.open();
                        } else if (responseJson["status"] == "success") {
                            if(responseJson['message']['EMID'] ?? false) {
                                AsyncStorage.setItem("user_umkm",JSON.stringify(responseJson['message']));
                            } else {
                                // kalo ga ada
                            }

                        } else {
                        }
                        
                    })
                    .catch((error) => {
                });
                    this.props.navigation.navigate('BotNavbar');
                } else {
                    this.props.navigation.navigate('LoginReg');
                }
            });

        }, 2000)
    }
    render() {
    console.disableYellowBox = true;
        return (
            <Animatable.View
            animation='fadeIn'
            style={styles.container}>
                 <StatusBar barStyle='default' backgroundColor='#15558a'/>
                 {/* <OfflineNotice/> */}
                
                    
           
            </Animatable.View>



        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    text: {
        color: "grey",
        fontSize: 30,
        fontWeight: "bold"
      }



});


export default Splash;