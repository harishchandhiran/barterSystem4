import React from 'react'
import { View,Text,FlatList,StyleSheet, TouchableOpacity } from 'react-native'
import { ListItem } from 'react-native-elements'
import MyHeader from "../components/MyHeader"
import firebase from "firebase"
import db from "../config";

export default class DonateScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            allRequests: []
        }
        this.requestRef = null
    }

    keyExtractor = (item,index) => { index.toString() }

    getRequestList = async() => {
        this.requestRef = db.collection("requested_books")
            .onSnapshot((snapshot) => {
                var requestedBookList = snapshot.docs.map(document => document.data())
                this.setState({ allRequests:requestedBookList })
            })
    }

    componentDidMount(){
        this.getRequestList();
    }

    componentWillUnmount(){
        this.requestRef();
    }

    renderItem = ({ item, i }) => {
        return (
            <ListItem 
                key={i} 
                title={item.object_name}
                titleStyle={{ color: 'orange',fontWeight: 'bold' }}
                rightElement={
                    <TouchableOpacity style={styles.button} >
                        <Text style={{ color: 'white' }}>Exchange</Text>
                    </TouchableOpacity>
                }
                bottomDivider
             />
        )
    }

    render(){
        return (
            <View style={{ flex: 1 }}>
                <MyHeader title="Barter System" />
                <View style={{ flex: 1 }}>
                    {
                        this.state.allRequests.length===0
                        ?
                        (
                            <View style={styles.subContainer}>
                                <Text style={{ fontSize: 20,textAlign: 'center',marginTop: 100 }}>
                                    No requests found
                                </Text>
                            </View>
                        )
                        : 
                        (
                            <FlatList 
                                keyExtractor={this.state.keyExtractor} 
                                data={this.state.allRequests}
                                renderItem={this.renderItem} />
                        )
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button:{
        width:100,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#ff5722",
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 8
        }
    }
})