import { Container } from 'native-base';
import React, { Component } from 'react';
import { Alert, Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AlertPro from "react-native-alert-pro";
import * as Animatable from 'react-native-animatable';
import SpinnerButton from 'react-native-spinner-button';
import { Fumi } from 'react-native-textinput-effects';
import Icon from 'react-native-vector-icons/FontAwesome';
class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ErrorMessage: '',
            name: '',
            email: '',

            username: '',
            re_password: '',
            password: '',
            hidePassword: true
        };
    };
    setPasswordVisibility = () => {
        this.setState({ hidePassword: !this.state.hidePassword });
    }

    render() {
        const { showAlert } = this.state
        return (

            <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#fff" }} behavior='padding'>
                <Container style={styles.container}>
                    <View style={styles.header}>
                        <Animatable.Text
                            animation='slideInLeft'
                            duration={1500}
                            style={styles.title}>Daftar Member</Animatable.Text>
                    </View>
                    <Animatable.View
                        animation='slideInUp'
                        duration={1500}
                        style={styles.footer}>
                        <ScrollView style={{ backgroundColor: '#fff', borderRadius: 5, flex: 1, width: '100%' }}
                            showsVerticalScrollIndicator={false}>
                            <View style={{ backgroundColor: 'transparent', borderRadius: 5, flex: 1, width: '100%' }}>
                                <Fumi
                                    label={'Username'}
                                    onChangeText={username => this.setState({ username })}
                                    iconClass={Icon}
                                    iconName={'user'}
                                    iconColor={'#15558a'}
                                    inputStyle={{ color: '#555555' }}
                                    iconSize={20}
                                    iconWidth={40}
                                    inputPadding={16}
                                    style={{ marginVertical: 5, borderRadius: 5 }}
                                />

                                <Fumi
                                    label={'Email'}
                                    onChangeText={email => this.setState({ email })}
                                    iconClass={Icon}
                                    iconName={'envelope'}
                                    inputStyle={{ color: '#555555' }}
                                    iconColor={'#15558a'}
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


                                <View style={{ justifyContent: "center", alignContent: "center", alignSelf: 'center', width: '100%' }}>
                                    <SpinnerButton onPress={() => {
                                        const { username } = this.state;
                                        const { password } = this.state;
                                        const { re_password } = this.state;
                                        const { email } = this.state;
                                        const { name } = this.state;
                                        var dataValid = true;
                                        this.setState({ pacmanLoading: true });
                                        setTimeout(() => {
                                            this.setState({ pacmanLoading: false });
                                        }, 5000);
                                        if (!username || !password || !email) {
                                            this.setState({ ErrorMessage: "Isi data terlebih dahulu" })
                                            this.AlertPro.open("");
                                            return;
                                        }

                                        fetch('http://18.141.178.15:8080/register', {
                                            method: 'POST',
                                            headers: {
                                                Accept: 'application/json',
                                                'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify(
                                                {
                                                    email: email,
                                                    username: username,
                                                    password: password,



                                                }),
                                        })
                                            .then((response) => response.json())
                                            .then((responseJson) => {
                                                if (responseJson["statusCode"] == "400") {

                                                    this.setState({ ErrorMessage: Array.isArray(responseJson["errorMessage"]) ? responseJson["errorMessage"].join("\n") : responseJson["errorMessage"] })
                                                    this.AlertPro.open();
                                                } else if (responseJson["statusCode"] == "2000") {

                                                    this.props.navigation.navigate('FinishPage');

                                                } else {
                                                    Alert.alert(responseJson["errorMessage"]);
                                                }
                                            })
                                            .catch((error) => {
                                            });
                                    }}
                                        style={styles.buttonMasuk}
                                        isLoading={this.state.pacmanLoading}
                                        buttonStyle={styles.buttonMasuk}
                                        indicatorCount={1}
                                        spinnerType='UIActivityIndicator'
                                        size={8} >
                                        <Text style={styles.textMasuk}>DAFTAR</Text>
                                    </SpinnerButton>
                                </View>

                            </View>
                        </ScrollView>


                        <AlertPro
                            ref={ref => {
                                this.AlertPro = ref;
                            }}
                            onConfirm={() => this.AlertPro.close()}
                            title="PERINGATAN"
                            message={this.state.ErrorMessage}
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
                                    borderRadius: 20,
                                },
                                buttonCancel: {
                                    backgroundColor: "#15558a"
                                },
                                buttonConfirm: {
                                    backgroundColor: "#15558a"
                                }
                            }}
                        />
                    </Animatable.View>


                </Container>
            </KeyboardAvoidingView>
        )
    }
}
export default Register;
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
        flex: 2,
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 28,
        paddingVertical: 30,
        justifyContent: 'center',
        alignItems: "center"

    },

    box: {
        justifyContent: 'center',
        alignContent: "center",
        paddingTop: 25,
        backgroundColor: '#15558a',
    },
    logoContainer: {
        alignSelf: "center",
        backgroundColor: '#15558a',
        justifyContent: 'center',
    },
    logoArrow: {
        resizeMode: 'cover',
        height: 50,
        width: 50
    },
    title: {
        color: '#fff',
        fontSize: 30,
        textAlign: 'left',
        fontWeight: 'bold',

    },
    buttonMasuk: {
        backgroundColor: '#15558a',
        width: '100%',
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
    textMasuk: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold'
    },

    input: {
        height: 40,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: '#efefef',
        width: 270,
        borderBottomLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 5,
        marginBottom: 30,

        paddingLeft: 0,
        paddingRight: 20,
    },
    touachableButton: {
        position: 'absolute',
        alignSelf: 'flex-end',
        height: 35,
        width: 30,
        marginVertical: 5

    },
    buttonImage: {
        resizeMode: 'contain',
        height: '100%',
        width: '100%',
        top: 16

    }
})