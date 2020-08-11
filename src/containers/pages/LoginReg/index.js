import React, { Component } from 'react';
import { Dimensions, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { withNavigation } from 'react-navigation';


class LoginReg extends Component {
    render(props) {
        return (
           
                <View style={styles.container}>
                    <StatusBar barStyle='default' backgroundColor='#15558a'/>
                    <View style={styles.header}>
                      
                    </View>
                    <Animatable.View
                        animation='slideInUp'
                        style={styles.footer}>
                        <Text style={styles.title}>Selamat Datang </Text>
                        <View style={styles.logoContainer2}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('LoginClient')}
                                style={styles.buttonDaftar2}>
                                <Text style={styles.textMasuk2}>MASUK</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}
                                style={styles.buttonDaftar2}>
                                <Text style={styles.textMasuk2}>DAFTAR</Text>
                            </TouchableOpacity>
                        </View>
                    </Animatable.View>
                </View>
          
        )
    }
}
export default withNavigation(LoginReg);
const { height } = Dimensions.get('screen');
const height_logo = height * 0.7 * 0.4;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#15558a'

    },
    logoContainer: {
        paddingHorizontal: 17,
        justifyContent: 'center',
        alignItems: "center",
        marginVertical: 100


    },
    logoContainer2: {
        justifyContent:'space-evenly',
        flexDirection: "row",
        marginTop: 50,


    },
    logoFacebook: {

        height: 30,
        width: 30,
        marginHorizontal: 20,
        marginVertical: 5,
        position: 'absolute'
    },
    title: {

        color: '#15558a',
        fontSize: 30,
        fontWeight: 'bold',

    },
    title2: {

        color: 'white',
        fontSize: 15,
        textAlign: 'center'
    },
    title3: {

        color: 'white',
        fontSize: 15,
        textAlign: 'center',
        paddingTop: 40
    },
    logo: {
        height: height_logo,
        width: height_logo,
        marginHorizontal: 20,
        marginVertical: 10,

    },
    logo2: {
        height: 223,
        width: 230,
        marginHorizontal: 20,
        marginTop: 100
    },
    buttonDaftar: {
        flexDirection: 'column',
        backgroundColor: '#15558a',
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#fff',
        width: 50,
        marginVertical: 5,
        marginHorizontal: 10,
        borderBottomLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 5,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 2,
        shadowRadius: 15,
        shadowOffset: { width: 1, height: 13 },
    },
    buttonDaftar2: {
       
        backgroundColor: '#15558a',
        paddingVertical: 10,

        borderColor: '#15558a',
        width: 150,
        marginVertical: 5,
        marginHorizontal:10,
        borderBottomLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 5,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 1,
        elevation: 2,
        shadowRadius: 15,
        shadowOffset: { width: 1, height: 13 },
    },
    buttonFacebook: {
        borderWidth: 1,
        backgroundColor: '#1877f2',
        paddingVertical: 10,
        paddingHorizontal: 80,
        marginTop: 20,
        borderBottomLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15,
        shadowOffset: { width: 1, height: 13 },
    },
    textMasuk: {
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold',
        fontSize: 15,
        fontFamily: 'Roboto-Bold',
    },
    textMasuk2: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'Roboto-Bold',
    },
    textFacebook: {
        fontFamily: 'RobotoCondensed-BoldItalic',
        textAlign: 'center',
        color: 'white',
        fontSize: 15
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },

    header: {
        flex: 2,
        justifyContent: "center",
        alignItems: 'center'

    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30,

    }

})