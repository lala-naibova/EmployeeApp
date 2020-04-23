import React from 'react'
import { StyleSheet, Text, View , Image } from 'react-native';
import {Card} from 'react-native-paper'

export default function CardContainer(props) {

    return (
        <Card style={styles.card}
        onPress={()=>{
            props.navigation.navigate('Profile', { item : props.item })
            
        }}>
        <View style={styles.cardContainer}>
            <Image 
            source={{uri: props.item.picture}}
            style={styles.image}/>
            <View style={styles.textcontainer}>
                <Text style={styles.text}>{props.item.name}</Text>
                <Text>{props.item.position}</Text>
            </View>
            
        </View>
        
    </Card>
    )
}
const styles= StyleSheet.create({
    card:{
        margin:5,
    },
    image:{
        width:60,
        height:60,
        borderRadius:30,
        margin :15
    },
    cardContainer:{
        flexDirection:'row',
        //padding:6
    },
    text:{
        fontSize:20,
    },
    textcontainer:{
        fontSize:20,
        justifyContent:'center'
    }
})