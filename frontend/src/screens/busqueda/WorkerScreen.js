import React from 'react'
import { StyleSheet, View, Image } from 'react-native'

import { brandPrimary, brandSecondary } from '../../styles/GlobalStyles'

import TextSemiBold from '../../components/TextSemibold'
import maleAvatar from '../../../assets/maleAvatar.png'



export default function WorkerScreen({ route }) {

    const props = route.params.worker

    return (
        <View style={{ alignItems: 'center', }}>
            <View style={styles.container}>
                <View>
                    <Image style={styles.image} source={props.foto ? { uri: props.foto.uri } : maleAvatar} />
                        <TextSemiBold textStyle={styles.text}>{props.nombre} {props.apellidos}</TextSemiBold>
                </View>
                <View style={styles.columnas}>
                    
                    <View style={styles.colIzq}>
                        <TextSemiBold textStyle={styles.text}>{props.localidad}</TextSemiBold>
                        <TextSemiBold textStyle={styles.text}>{props.correo}</TextSemiBold>
                        
                    </View>
                    <View style={styles.colDer}>
                        <TextSemiBold textStyle={styles.text}>{props.profesion}</TextSemiBold>
                        <TextSemiBold textStyle={styles.text}>{props.telefono}</TextSemiBold>
                    </View>
                </View>
                    <TextSemiBold textStyle={styles.descripcion}>{props.descripcion}</TextSemiBold>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin:40,
        alignItems: 'center',
        width: '80%',
        minWidth:800,
        borderRadius:5,
        borderWidth:2,
        borderColor:brandPrimary,
        backgroundColor:brandSecondary,
    },
    image: {
        width: 300,
        height: 300,
        backgroundColor: brandSecondary,
        borderColor: brandPrimary,
        borderWidth: 2,
        borderRadius: 50,
        margin: 50
    },
    text: {
        fontSize: 30,
        color: '#FFFFFF',
        textAlign: 'center',
        minWidth: 300,
    },
    title: {
        fontSize: 35
    },
    columnas: {
        flexDirection: 'row',
        alignContent:'space-between',
        marginBottom:20,
    },
    descripcion: {
        marginBottom:30,
        fontSize: 25,
        color: '#FFFFFF',
    }

})
