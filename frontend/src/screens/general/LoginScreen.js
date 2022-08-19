import React, { useContext, useState } from 'react'
import { StyleSheet, View, Pressable, Image } from 'react-native'
import { brandPrimary, brandPrimaryTap, brandSecondary, flashStyle, flashTextStyle } from '../../styles/GlobalStyles'
import { Formik } from 'formik'
import * as yup from 'yup'
import InputItem from '../../components/InputItem'
import { AuthorizationContext } from '../../context/AuthorizationContext'
import TextRegular from '../../components/TextRegular'
import logo from '../../../assets/logo.png'
import TextError from '../../components/TextError'
import { showMessage } from 'react-native-flash-message'


export default function LoginScreen({ navigation }) {
  const { signIn } = useContext(AuthorizationContext)
  const [backendErrors, setBackendErrors] = useState()
  const validationSchema = yup.object().shape({
    correo: yup
      .string()
      .email('Introduzca un correo válido')
      .required('El correo es obligatorio'),
    password: yup
      .string()
      .min(3, ({ min }) => `La contraseña debe tener al menos ${min} carácteres`)
      .required('La contraseña obligatoria')
  })

  const login = (values) => {
    setBackendErrors([])
    signIn(values,
      (loggedInUser) => {
        showMessage({
          message: `Bienvenido ${loggedInUser.nombre}.`,
          type: 'success',
          style: flashStyle,
          titleStyle: flashTextStyle
        })
        navigation.reset({ routes: [{ name: 'General' }] })
      },
      (error) => {
        setBackendErrors(error.errors)
      })
  }
  return (

    <Formik
      validationSchema={validationSchema}
      initialValues={{ correo: '', password: '' }}
      onSubmit={login}>
      {({ handleSubmit }) => (
        <View style={{ alignItems: 'center' }}>
          <View style={styles.container}>
            <Image style={styles.image} source={logo} />
            <InputItem
              name='correo'
              label='Correo'
              placeholder='ejemplo@gmail.com'
              textContentType='emailAddress'
            />
            <InputItem
              name='password'
              label='Contraseña'
              placeholder='contraseña'
              textContentType='password'
              secureTextEntry={true}
            />
            {backendErrors &&
              backendErrors.map((error, index) => <TextError key={index}>{error.msg}</TextError>)
            }
            <Pressable
              onPress={handleSubmit}
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
            <TextRegular textStyle={styles.title}>¿Todavía no te has unido? Crea tu perfil personal para comenzar.</TextRegular>
            <Pressable
              onPress={() => navigation.navigate('Registro')
              }
              style={({ pressed }) => [
                {
                  backgroundColor: pressed
                    ? brandPrimaryTap
                    : brandPrimary
                },
                styles.button
              ]}>
              <TextRegular textStyle={styles.text}>
                ¡Quiero registrarme!
              </TextRegular>
            </Pressable>
          </View>
        </View>
      )}
    </Formik>
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
    fontSize: 25
  },
})
