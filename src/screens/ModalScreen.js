import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableNativeFeedback, Image, Linking, Button,ScrollView } from 'react-native'
import { useSelector } from 'react-redux';
import Modal from 'react-native-modal'
import {Modalize} from 'react-native-modalize'

const ModalScreen = props => {

    const NewsId = props.navigation.getParam('NewsId');

    const selectedNews = useSelector(state =>
        state.news.news.find(prod => prod._id === NewsId)
    );
    const [ModalIsVisible, setModalisVisble] = useState(false)
    console.log(selectedNews)

    const returnToMain = () => {
        props.navigation.navigate('Main');
        setModalisVisble(!ModalIsVisible);
    }

    return (
        <View style={styles.centeredView}>
           
                <Modal
                scrollHorizontal={false}

                    visible={ModalIsVisible}>
                        <ScrollView>
                    <View style={styles.centeredView}>
                        
                        <View style={styles.modalView}>
                            <View>
                                
                                <Image style={styles.image} source={{ uri: selectedNews.image_url }} />
                                <Text style={styles.textStyle}>{selectedNews.lead_paragraph}</Text>
                                <TouchableNativeFeedback onPress={() => { Linking.openURL(selectedNews.web_url) }}>
                                    <Text style={{ ...styles.textStyle, fontWeight: 'bold' }}>{selectedNews.web_url}</Text>
                                </TouchableNativeFeedback>
                               
                            </View>
                            <Button title="Close Button"
                                color="black"
                                style={{ ...styles.openButton, backgroundColor: "2196F3" }}
                                onPress={() => { returnToMain() }}>
                            </Button>
                        </View>
                        
                    </View>
                    </ScrollView>
                </Modal>
                <Button title="Open Modal" color="black" style={styles.openButton} onPress={() => setModalisVisble(true)} />

                
        </View>)
}

const styles = StyleSheet.create({

    centeredView: {
        flex: 1,
        width:"100%",
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        height: "100%",        
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 40,
        elevation: 2
    },
    textStyle: {
        fontSize: 13,
        margin: 20,
        color: "black",
        padding: 15,
        fontFamily: '',
        textAlign: "left",

    },
    image: {

        resizeMode: "stretch",
        width: 350,
        height: 200

    }
})

export default ModalScreen