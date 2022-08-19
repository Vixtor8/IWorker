import * as ExpoImagePicker from 'expo-image-picker'
import React, { useContext, useState } from 'react'
import { Image, Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View, ScrollView } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { AuthorizationContext } from '../../context/AuthorizationContext'
import { Formik } from 'formik'
import * as yup from 'yup'
import { showMessage } from 'react-native-flash-message'
import { brandPrimary, brandPrimaryDisabled, brandPrimaryTap, brandSecondary, flashStyle, flashTextStyle } from '../../styles/GlobalStyles'
import maleAvatar from '../../../assets/maleAvatar.png'
import InputItem from '../../components/InputItem'
import TextRegular from '../../components/TextRegular'
import TextError from '../../components/TextError'

export default function RegisterScreen ({ navigation }) {
  const { signUp } = useContext(AuthorizationContext)
  const [backendErrors, setBackendErrors] = useState()
  const initialUserValues = { nombre: '', apellidos: '', correo: '', password: '', telefono: '' }

  const validationSchema = yup.object().shape({
    nombre: yup
      .string()
      .max(30, 'Nombre demasiado largo')
      .required('Nombre requerido'),
    apellidos: yup
      .string()
      .max(40, 'Apellidos demasiados largos')
      .required('Apellidos requeridos'),
    correo: yup
      .string()
      .email('Introduzca un correo válido')
      .required('Correo requerido'),
    password: yup
      .string()
      .min(3, ({ min }) => `La contraseña debe tener más de ${min} carácteres`)
      .required('Contraseña requerida'),
    telefono: yup
      .string()
      .min(9, ({ min }) => `El teléfono debe tener ${min} carácteres`)
      .required('Teléfono requerido')
  })

  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ExpoImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
          alert('Lo sentimos, se necesitan los permisos de la cámara para continuar.')
        }
      }
    })()
  }, [])

  const pickImage = async (onSuccess) => {
    const result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    })
    if (!result.cancelled) {
      if (onSuccess) {
        onSuccess(result)
      }
    }
  }

  const register = (data) => {
    setBackendErrors([])
    signUp(data, () => {showMessage({
      message: `Perfecto. ${data.nombre}, bienvenido a IWorker! 😀`,
      type: 'success',
      style: flashStyle,
      titleStyle: flashTextStyle
    }),
    navigation.reset({routes: [{name: 'General'}]})},
    (error) => {
      setBackendErrors(error.errors)
    })
  }
  return (
        <Formik
          validationSchema={validationSchema}
          initialValues={initialUserValues}
          onSubmit={register}>
          {({ handleSubmit, setFieldValue, values, isValid }) => (
            <ScrollView>
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={75}>
                <TouchableWithoutFeedback onPress={Platform.OS === 'ios' ? Keyboard.dismiss : undefined}>
                  <View style={{ alignItems: 'center' }}>
                    <View style={styles.container}>
                      <View style={{ flexDirection: 'row', marginTop: 30 }}>
                      <TouchableOpacity onPress={() =>
                        pickImage(
                          async result => {
                            await setFieldValue('fotoPerfil', result)
                          }
                        )
                      }>
                        <Image style={styles.image} source={values.fotoPerfil ? { uri: values.fotoPerfil.uri } : maleAvatar} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={values.fotoPerfil
                        ? async () => await setFieldValue('fotoPerfil', null)
                        : () =>
                            pickImage(
                              async result => {
                                await setFieldValue('fotoPerfil', result)
                              }
                            )
                      }>
                        <View style={{ paddingRight: 0, height: 30 }}>
                          {values.fotoPerfil
                            ? <MaterialCommunityIcons name='close' style={{ marginLeft: 0 }} size={30} />
                            : <MaterialCommunityIcons name='pencil' style={{ marginLeft: 0 }} size={30} />
                          }
                        </View>
                      </TouchableOpacity>
                      </View>
                      <InputItem
                        name='nombre'
                        label='Nombre'
                        textContentType='name'
                      />
                      <InputItem
                        name='apellidos'
                        label='Apellidos'
                        textContentType='familyName'
                      />
                      <InputItem
                        name='correo'
                        label='Correo'
                        textContentType='emailAddress'
                        placeholder="ejemplo@gmail.com"
                      />
                      <InputItem
                        name='password'
                        label='Contraseña'
                        textContentType='password'
                        secureTextEntry={true}
                      />
                      <InputItem
                        name='telefono'
                        label='Teléfono'
                        textContentType='telephoneNumber'
                      />
                      {backendErrors &&
                        backendErrors.map((error, index) => <TextError key={index}>{error.message}</TextError>)
                      }

                      <Pressable disabled={!isValid} onPress={handleSubmit}
                        style={({ pressed }) => [
                          {
                            backgroundColor: pressed
                              ? brandPrimaryTap
                              : brandPrimary
                          },
                          {
                            backgroundColor: !isValid
                              ? brandPrimaryDisabled
                              : brandPrimary
                          },
                          styles.button]}
                      >
                        <TextRegular textStyle={styles.text}>Registrarse</TextRegular>
                      </Pressable>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </KeyboardAvoidingView>
            </ScrollView>
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
    width: 200,
    height: 200,
    borderColor: brandPrimary,
    borderWidth: 2,
    borderRadius: 50,
    marginTop: -20,
    alignSelf: 'center',
    backgroundColor: brandSecondary
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
})
