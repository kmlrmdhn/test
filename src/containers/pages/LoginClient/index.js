import AsyncStorage from '@react-native-community/async-storage';
import { Container } from 'native-base';
import React from 'react';
import { Alert, AppRegistry, Image, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AlertPro from "react-native-alert-pro";
import * as Animatable from 'react-native-animatable';
import SpinnerButton from 'react-native-spinner-button';
import { Fumi } from 'react-native-textinput-effects';
import Icon from 'react-native-vector-icons/FontAwesome';

class LoginClient extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            username: this.props.username || '',
            password: '',
            hidePassword: true,
            user:{},
            token:''

        };
    };



    setPasswordVisibility = () => {
        this.setState({ hidePassword: !this.state.hidePassword });
    }
    render() {

        return (

            <KeyboardAvoidingView style={{flex:1, backgroundColor:"#fff"}} behavior='padding'>
                <Container style={styles.container}>
                    <View style={styles.header}>
                        <Animatable.Text
                            duration={1500}
                            animation='slideInLeft'
                            style={styles.title}>Login Member</Animatable.Text>
                    </View>
                    <Animatable.View
                        duration={1500}
                        animation='slideInUp'
                        style={styles.footer}>
                        <View style={{ backgroundColor: 'transparent', borderRadius: 5, flex: 1, width: '100%' }}>
                            <Fumi
                                label={'Username atau Email'}
                                onChangeText={username => this.setState({ username: username })}
                                iconClass={Icon}
                                iconName={'user'}
                                iconColor={'#15558a'}
                                returnKeyType='next'
                                inputStyle={{ color: '#555555' }}
                                iconSize={20}
                                iconWidth={40}
                                inputPadding={16}
                                style={{ marginVertical: 5, borderRadius: 5 }}
                            />
                            <View>
                                <Fumi
                                    label={'Password'}
                                    onChangeText={password => this.setState({ password })}
                                    iconClass={Icon}
                                    iconName={'lock'}
                                    secureTextEntry={this.state.hidePassword}
                                    iconColor={'#15558a'}
                                    iconSize={20}
                                    inputStyle={{ color: '#555555' }}
                                    iconWidth={40}
                                    inputPadding={16}
                                    style={{ marginVertical: 5, borderRadius: 5 }}
                                />

                                <TouchableOpacity activeOpacity={0.8} style={styles.touachableButton} onPress={this.setPasswordVisibility}>
                                    <Image source={(this.state.hidePassword) ? require('../../../images/hide.png') : require('../../../images/show.png')} style={styles.buttonImage} />
                                </TouchableOpacity>
                            </View>
                            <Text onPress={() => this.props.navigation.navigate('Forgetpass')}
                                style={{
                                    marginVertical: 20,
                                    color: '#15558a',
                                    fontWeight: 'bold',
                                    textAlign: 'left'
                                }}>Lupa Password ?</Text>
                            <SpinnerButton onPress={() => {
                                const { username } = this.state;
                                const { password } = this.state;
                                this.setState({ pacmanLoading: true });
                                setTimeout(() => {
                                    this.setState({ pacmanLoading: false });
                                }, 3000);
                                fetch('http://18.141.178.15:8080/login', {
                                    method: 'POST',
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        username: username,
                                        password: password,
                                        
                                    }),
                                }).then((response) => response.json())
                                    .then((responseJson) => {
                                        if (responseJson["statusCode"] == "401") {
                                            this.setState({
                                                messageError: responseJson['errorMessage'],
                                            });
                                            this.AlertPro.open(this.state.messageError);
                                        } else if (responseJson["statusCode"] = "2110") {
                                         
                                            AsyncStorage.setItem("user", JSON.stringify(responseJson["data"]));
                                            
                                            this.props.navigation.navigate('Home');

                                        } else {
                                            Alert.alert(responseJson["errorMessage"]);
                                        }
                                    })
                                    .catch((error) => {
                                    });
                            }}
                                isLoading={this.state.pacmanLoading}
                                buttonStyle={styles.buttonMasuk}
                                indicatorCount={1}
                                spinnerType='UIActivityIndicator'
                                size={8} >
                                <Text style={styles.textMasuk}>MASUK</Text>
                            </SpinnerButton>

                            <AlertPro
                                ref={ref => {
                                    this.AlertPro = ref;
                                }}
                                onConfirm={() => this.AlertPro.close()}
                                title="PERINGATAN"
                                message={this.state.messageError}
                                showCancel={false}
                                textConfirm="OK"
                                customStyles={{
                                    mask: {
                                        backgroundColor: "transparent"
                                    },
                                    container: {

                                        borderWidth: 1,
                                        borderColor: "#15558a",
                                        shadowColor: "#000000",
                                        shadowOpacity: 0.1,
                                        shadowRadius: 10,
                                        borderRadius: 10,
                                    },
                                    buttonCancel: {
                                        backgroundColor: "#15558a"
                                    },
                                    buttonConfirm: {
                                        backgroundColor: "#15558a"
                                    }
                                }}
                            />
                        </View>
                    </Animatable.View>
                </Container>
            </KeyboardAvoidingView>
        );
    };
};
export default LoginClient;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#15558a'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 1,
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 28,
        paddingVertical: 30,
        justifyContent: 'center',
        alignItems: "center"

    },
    logoContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#15558a',
        justifyContent: 'center',

    },
    logo: {
        width: 345,
        height: 51,
    },
    title: {
        color: '#fff',
        fontSize: 30,

        fontWeight: 'bold'
    },
    title2: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center'
    },
    title3: {
        fontFamily: 'Roboto-Bold',
        color: 'black',
        fontSize: 15,
        textAlign: 'center',
        paddingTop: 40,
        paddingBottom: 40,
        marginHorizontal: 30
    },
    buttonMasuk: {
        backgroundColor: '#15558a',

        borderWidth: 0.5,
        borderColor: '#ffe425',
        paddingVertical: 10,

        borderBottomLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 5,


        borderColor: '#fff',
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15,
        shadowOffset: { width: 1, height: 13 },
    },
    buttonDaftar: {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginTop: 20,
        borderBottomLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 5,

    },
    textMasuk: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold'
    },

    input: {
        height: 50,
        backgroundColor: '#15558a',
        borderBottomWidth: 1,
        borderColor: '#fff',
        color: '#fff',
        width: 270,
        paddingLeft: 0,
        paddingRight: 20,
        borderBottomLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 5,
        marginBottom: 20,

    },
    logoFacebook: {
        resizeMode: 'contain',
        marginTop: 20,
        marginRight: 60,

        height: 50,
        width: 50
    },
    logoGugel: {
        resizeMode: 'cover',
        marginTop: 20,
        marginLeft: 60,
        height: 50,
        width: 50,
        position: 'absolute',
    },
    touachableButton: {
        position: 'absolute',
        alignSelf: 'flex-end',
        alignContent: "flex-end",
        alignItems: 'flex-end',
        height: 35,
        width: 30,

        marginVertical: 5

    },
    buttonImage: {
        resizeMode: 'contain',
        height: '100%',
        justifyContent: 'flex-end',
        width: '100%',
        top: 16
    }
});

const mapStateToProps = state => ({
    user: state.user,
});


AppRegistry.registerComponent('Login', () => Login);