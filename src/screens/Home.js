import React,{ useEffect, useState } from 'react'
import { StyleSheet, View , FlatList, ActivityIndicator, Alert } from 'react-native';
import { FAB } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux'

import Card from '../components/Card'

export default function Home(props) {
    const baseUrl = 'http://e7a1018e.ngrok.io/'

    // const [ data, setData ] = useState([])
    // const [ loading, setLoading ] = useState(true)
    const dispatch = useDispatch()
    const { data, loading } = useSelector( state => state)

    const fetchData = ()=>{
        fetch(`${baseUrl}`)
        .then( res => res.json())
        .then( results => {
            // setData(results) 
            // setLoading(false)
            dispatch({ type: 'FETCH_DATA', payload: results })
            dispatch({ type:'SET_LOADING', payload: false })
        })
        .catch(err => {
            Alert.alert('Error', 'Something went wrong')
        })
    }

    useEffect(()=>{
        fetchData();
    },[])

    if (loading) 
    {
        return (
            <View style={styles.loadingStyle}>
                    <ActivityIndicator size='large' color='#7520a8'/>
            </View>
        )
    }
    return (
        <View style={{flex:1}}>
            <FlatList
            keyExtractor={item=>item._id}
            data={data}
            onRefresh={()=>{fetchData()}}
            refreshing={loading}
            renderItem={({item}) => <Card item = { item } navigation={props.navigation}/> }/>
            <FAB
                style={styles.fab}
                small={false}
                icon="plus"
                theme={{colors:{accent:'#7520a8'}}} //you add your theme here as color --primary or accent
                onPress={() => props.navigation.navigate('Create')}
            />
            
        </View>
        
    )
}
const styles= StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
      }, 
      loadingStyle: {
          flex:1, 
          flexDirection:'row', 
          alignItems:'center', 
          justifyContent:'center'
        }
})