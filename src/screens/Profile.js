import React from 'react';
import { StyleSheet, Text, View, Image, Platform, Linking, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Title, Card, Button } from 'react-native-paper'
import { MaterialIcons, Entypo, FontAwesome } from '@expo/vector-icons'

export default function Profile(props) {
    const baseUrl = 'http://e7a1018e.ngrok.io/'

    const currEmp = props.route.params.item;
    const openDial = () => {
        if (Platform.OS === 'android') {
            Linking.openURL(`tel:${currEmp.phone}`)
        }
        else{
            Linking.openURL(`telprompt:${currEmp.phone}`)
        }
    }
    const deleteHandle = () =>{
        Alert.alert(
            "Warning!!",
            "Are you sure to fire this employee?",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => {
                fetch(`${baseUrl}delete`,
                {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id : currEmp._id })
                })
                .then(res => res.json())
                .then(deletedEmp => {Alert.alert(`${deletedEmp.name} is deleted`)})
                .catch(err => {Alert.alert(`Something went wrong`)})
                props.navigation.navigate('Home')
              } }
            ],
            { cancelable: false }
          );
        
    }
    return (
        <View style={styles.root}>
            <LinearGradient
          colors={['#4c0975', 'transparent']}
          style={{  height: '20%' }}
        />
        <View style={styles.imageContainer}>
             <Image style={styles.image}
        source={{ uri : currEmp.picture }}/>
        </View>
        <View style={styles.textContainer}>
            <Title>{currEmp.name}</Title>
            <Text style={{fontSize:17}}>{currEmp.position}</Text>
        </View>
       <Card style={styles.cardStyle}
        onPress={ () =>  Linking.openURL(`mailto:${currEmp.email}`)}>
        <View style={styles.cartContainer}>
            <MaterialIcons 
            name='email'
            size={32}
            color='#7520a8'/>
            <Text style={styles.textStyle}>{currEmp.email}</Text>
        </View>
       </Card>
       <Card style={styles.cardStyle}
       onPress={()=>{ openDial() }}>
        <View style={styles.cartContainer}>
            <Entypo 
            name='old-phone'
            size={32}
            color='#7520a8'/>
            <Text style={styles.textStyle}>{currEmp.phone}</Text>
        </View>
       </Card>
       <Card style={styles.cardStyle}>
        <View style={styles.cartContainer}>
            <FontAwesome 
            name='money'
            size={32}
            color='#7520a8'/>
            <Text style={styles.textStyle}>{currEmp.salary} $</Text>
        </View>
       </Card>
       <View style={styles.buttonContainer}>
           <Button icon="account-edit" mode="contained" onPress={() => props.navigation.navigate('Create',{currEmp})}>Edit</Button>
           <Button icon="delete" mode="contained" onPress={() => deleteHandle()}>Fire</Button>
       </View>
        </View>
    )
}
const styles=StyleSheet.create({
    root:{
        flex:1
    },
    image:{
        width:150,
        height:150,
        borderRadius:75,
        marginTop:-60
    },
    imageContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    textContainer:{
       alignItems:'center',
       margin:15
    },
    cardStyle:{
        margin:5
    },
    cartContainer:{
        flexDirection:'row',
        alignItems:'center',
        padding:10
    },
    textStyle:{
        marginLeft:6,
        fontSize:17
    },
    buttonContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:25,
    }
})