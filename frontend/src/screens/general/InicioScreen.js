import React from 'react'
import { StyleSheet, View, Pressable, Image } from 'react-native'
import TextRegular from '../../components/TextRegular'
import { brandPrimary, brandPrimaryTap, brandSecondary, flashStyle, flashTextStyle } from '../../styles/GlobalStyles'
import logo from '../../../assets/logo.png'
import TextSemiBold from '../../components/TextSemibold'

export default function InicioScreen({ navigation }) {
    const handleClickLogin = () => {
        navigation.navigate('Login')
    }
    const handleClickRegistro = () => {
        navigation.navigate('Registro')
    }


    return (
        <View style={{ alignItems: 'center' }}>

            <View style={styles.container}>
                <Image style={styles.image} source={logo} />
                <TextSemiBold textStyle={styles.title}>Bienvenido a IWorker</TextSemiBold>

                <Pressable
                    onPress={handleClickLogin}
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed
                                ? brandPrimaryTap
                                : brandPrimary
                        },
                        styles.button
                    ]}>
                    <TextRegular textStyle={styles.text}>
                        Iniciar Sesión
                    </TextRegular>
                </Pressable>
                <Pressable
                    onPress={handleClickRegistro}
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed
                                ? brandPrimaryTap
                                : brandPrimary
                        },
                        styles.button
                    ]}>
                    <TextRegular textStyle={styles.text}>
                        Crear una cuenta
                    </TextRegular>
                </Pressable>


            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '60%'
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
    button: {
        borderRadius: 8,
        height: 40,
        margin: 12,
        padding: 10,
        width: '80%',
        minWidth:300,
    },
    text: {
        fontSize: 20,
        color: '#FFFFFF',
        textAlign: 'center',
        minWidth:300,
    },
    title: {
        fontSize: 35
    },
    
})
