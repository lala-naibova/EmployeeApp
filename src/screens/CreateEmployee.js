import React,{ useState } from 'react'
import { StyleSheet, View, Modal, Alert, ActivityIndicator } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

export default function CreateEmployee(props) {

    const getDetails = (type)=>{
        if (props.route.params) {
            return props.route.params.currEmp[type]
        }
        return ''
    }

    const [ name, setName ] = useState(getDetails('name'))
    const [ phone, setPhone ] = useState(getDetails('phone'))
    const [ email, setEmail ] = useState(getDetails('email'))
    const [ salary, setSalary ] = useState(getDetails('salary'))
    const [ picture, setPicture ] = useState(getDetails('picture'))
    const [ position, setPosition ] = useState(getDetails('position'))
    const [ savedIcon, setSavedIcon ] = useState('upload')
    const [ modalVisibility, setModalVisibility ] = useState(false)
    const [ loading, setLoading ] = useState(false)

    const baseUrl = 'http://e7a1018e.ngrok.io'

    const pickFromGallery = async ()=>{
       const {granted} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
       if (granted) {
          let data = await ImagePicker.launchImageLibraryAsync({
               mediaTypes: ImagePicker.MediaTypeOptions.Images,
               allowsEditing : true,
               aspect:[1,1],
               quality: 0.5
           })
           if (!data.cancelled) {
            let newFile = 
            { 
                uri : data.uri, 
                type : `type/${data.uri.split('.')[1]}`, 
                name :`type/${data.uri.split('.')[1]}` 
            }
            handleUpload(newFile)
        }
       }else{
        Alert.alert('Permission', 'You have not permission to open gallery')
       }
    }
    const pickFromCamera = async ()=>{
        const {granted} = await Permissions.askAsync(Permissions.CAMERA)
        if (granted) {
           let data = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing : true,
                aspect:[1,1],
                quality: 0.5
            })
            if (!data.cancelled) {
                let newFile = 
                { 
                    uri : data.uri, 
                    type : `type/${data.uri.split('.')[1]}`, 
                    name :`type/${data.uri.split('.')[1]}` 
                }
                handleUpload(newFile)
            }

        }else{
         Alert.alert('Permission', 'You have not permission to open camera')
        }
     }

     const submitdata = async () => {
         try {
            const response = await fetch(`${baseUrl}/send-data`, {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    picture,
                    salary,
                    position
                })
            })
            const data = await response.json()
            Alert.alert(`${data.name} saved successfuly`)
            console.log(data);
            props.navigation.navigate('Home')
         } 
         catch (error) {
            Alert.alert('Error', 'Something went wrong while saving data')
         }
        
     }

     const updateData = async () => {
        try {
           const response = await fetch(`${baseUrl}/update`, {
               method: 'POST',
               headers:{
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify({
                   id: props.route.params.currEmp._id,
                   name,
                   email,
                   phone,
                   picture,
                   salary,
                   position
               })
           })
           const data = await response.json()
           Alert.alert(`${data.name} updated successfuly`)
           console.log(data);
           props.navigation.navigate('Home')
        } 
        catch (error) {
           Alert.alert('Error', 'Something went wrong while updating data')
        }
       
    }

        const handleUpload = (image)=> {
            setLoading(true)
            const data = new FormData();
            data.append('file', image)
            data.append('upload_preset','EmployeeApp')
            data.append('cloud_name', 'dmnxzcioy')
            fetch('http://api.cloudinary.com/v1_1/dmnxzcioy/image/upload',
            {
                method:'post',
                body: data
            }).then(res => res.json())
            .then(data=>{
                setPicture(data.url)  
                setLoading(false)
                setSavedIcon('check')
                setModalVisibility(false)
            })
            .catch(err => {
                Alert.alert('Error', 'Something went wrong while uploading')
            })
        }
    return (
       <View style={styles.root}>
            <TextInput
            style={styles.inputStyle}
            label='Name'
            mode='outlined'
            value={name}
            onChangeText={setName}
            />
            <TextInput
            style={styles.inputStyle}
            label='Email'
            mode='outlined'
            value={email}
            onChangeText={setEmail}
            autoCapitalize='none'
            />
            <TextInput
            style={styles.inputStyle}
            label='Phone number'
            mode='outlined'
            keyboardType='number-pad'
            value={phone}
            onChangeText={setPhone}
            />
            <TextInput
            style={styles.inputStyle}
            label='Position'
            mode='outlined'
            value={position}
            onChangeText={setPosition}
            />
            <TextInput
            style={styles.inputStyle}
            label='Salary'
            mode='outlined'
            value={salary}
            onChangeText={setSalary}
            />
            <Button 
            style={styles.inputStyle}
            icon={savedIcon} 
            mode='contained' 
            onPress={() => setModalVisibility(true)}>
                Upload a photo
            </Button>
            <Button 
            style={styles.inputStyle}
            icon='content-save'
            mode='contained' 
            onPress={() => props.route.params? updateData() : submitdata()}>
                {props.route.params ?'Update': 'Save'}
            </Button>
            <Modal
            animationType='slide'
            transparent={ true }
            visible={ modalVisibility }
            onRequestClose={() => setModalVisibility(false)}>
            <View style={styles.modalView}>
                <View style={styles.modalButtons}>
                    <Button 
                    icon='camera' 
                    mode='contained' 
                    onPress={() => {
                        pickFromCamera();
                    }}>
                        Camera
                    </Button>

                    <Button 
                    icon='image-area' 
                    mode='contained' 
                    onPress={() => {
                        pickFromGallery();
                    }}>
                        Gallery
                    </Button>
                </View>

                <Button 
                icon='close' 
                onPress={() => setModalVisibility(false)}>
                    Cancel
                </Button>

            </View>
                    
            </Modal>
            {loading && <ActivityIndicator size='large' color='#7520a8'/>}
       </View>
    )
}
const styles= StyleSheet.create({
    root:{
        flex:1
    },
    inputStyle:{
        margin:6
    },
    modalView:{
        position:'absolute',
        bottom:6,
        width:'100%',
        backgroundColor: 'white'//'#e3cef0',
       // marginBottom:40
    },
    modalButtons:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginVertical:20
    }
})