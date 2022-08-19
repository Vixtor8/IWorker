import * as ExpoImagePicker from 'expo-image-picker'
import React, { useContext, useEffect, useState } from 'react'
import { Image, Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View, ScrollView } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { AuthorizationContext } from '../../context/AuthorizationContext'
import { Formik } from 'formik'
import * as yup from 'yup'
import { showMessage } from 'react-native-flash-message'
import { brandPrimary, brandPrimaryDisabled, brandPrimaryTap, brandSecondary, flashStyle, flashTextStyle, navigationTheme } from '../../styles/GlobalStyles'
import maleAvatar from '../../../assets/maleAvatar.png'
import InputItem from '../../components/InputItem'
import TextRegular from '../../components/TextRegular'
import TextError from '../../components/TextError'


export default function ProfileScreen ({navigation}) {
  const { loggedInUser, signOut, updateProfile, signOutAndDestroy } = useContext(AuthorizationContext)
  const [user, setUser] = useState(null)
  const [backendErrors, setBackendErrors] = useState()

  const validationSchema = yup.object().shape({
    nombre: yup
      .string()
      .max(30, 'Nombre demasiado largo')
      .required('Nombre requerido'),
    apellidos: yup
      .string()
      .max(50, 'Apellidos demasiado largos')
      .required('Apellidos requeridos'),
    telefono: yup
      .string()
      .min(9, ({ min }) => `El teléfono debe tener ${min} carácteres`)
      .required('Teléfono requerido')
  })

  useEffect(() => {
    if (loggedInUser) {
      const userCopy = { ...loggedInUser }
      if (userCopy.foto) {
        userCopy.fotoPerfil = { uri: `${process.env.API_BASE_URL}/${userCopy.foto.replaceAll('\\','/')}` }
      }
      setUser(userCopy)
    }
  }, [loggedInUser])

  const signOutAndNavigate = async () => {
      await signOut(() => showMessage({
      message: 'Hasta la próxima!',
      type: 'success',
      style: flashStyle,
      titleStyle: flashTextStyle,
      backgroundColor: brandSecondary
    }),
    (error) => {
      setBackendErrors(error.errors)
    })
    window.location.reload(true)
  }

  const deletePerfil = () => {
    setBackendErrors([]) 
    signOutAndDestroy(loggedInUser, () => showMessage({
      message: 'Perfil borrado correctamente',
      type: 'success',
      style: flashStyle,
      titleStyle: flashTextStyle
    }),
    (error) => {
      setBackendErrors(error.errors)
    })
    window.location.reload(true)
  }

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

  const update = (data) => {
    setBackendErrors([])
    updateProfile(data, () => showMessage({
      message: 'Perfil actualizado correctamente',
      type: 'success',
      style: flashStyle,
      titleStyle: flashTextStyle
    }),
    (error) => {
      console.log(error.errors)
      setBackendErrors(error.errors)
    })
  }

  const handleClickPerfilWorker = () => {
    navigation.navigate('WorkerRegister')
}

  return (
    <>
      {(user) &&
        <Formik
          validationSchema={validationSchema}
          initialValues={user}
          onSubmit={update}>
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
                      <TouchableOpacity onPress={() => {
                        pickImage(
                          async result => {
                            await setFieldValue('fotoPerfil', result)
                          }
                        )
                      }}>
                        <View style={{ paddingRight: 0, height: 30 }}>
                          <MaterialCommunityIcons name='pencil' style={{ marginLeft: 0 }} size={30} />
                        </View>
                      </TouchableOpacity>
                      </View>
                      <InputItem
                        name='nombre'
                        label='Nombre'
                        textContentType='nombre'
                      />
                      <InputItem
                        name='apellidos'
                        label='Apellidos'
                        textContentType='apellidos'
                      />
                      <InputItem
                        name='correo'
                        label='Email'
                        textContentType='correo'
                        editable={false}
                      />
                      <InputItem
                        name='telefono'
                        label='Teléfono'
                        textContentType='telefono'
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
                        <TextRegular textStyle={styles.text}>Actualizar</TextRegular>
                      </Pressable>
                      <Pressable onPress={() => handleClickPerfilWorker()}
                          style={({ pressed }) => [
                            {
                              backgroundColor: pressed
                                ? brandPrimaryTap
                                : brandPrimary
                            },
                            styles.button]} >
                      <TextRegular textStyle={styles.text}>Tu anuncio Worker</TextRegular>
                      </Pressable>
                      <Pressable onPress={() => signOutAndNavigate()}
                          style={({ pressed }) => [
                            {
                              backgroundColor: pressed
                                ? brandPrimaryTap
                                : brandPrimary
                            },
                            styles.button]} >
                      <TextRegular textStyle={styles.text}>Cerrar Sesión</TextRegular>
                      </Pressable>
                      <Pressable onPress={() => deletePerfil()}
                          style={({ pressed }) => [
                            {
                              backgroundColor: pressed
                                ? brandPrimaryTap
                                : brandPrimary
                            },
                            styles.button]} >
                      <TextRegular textStyle={styles.text}>Borrar Cuenta</TextRegular>
                      </Pressable>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </KeyboardAvoidingView>
            </ScrollView>
          )}
        </Formik>
      }
    </>
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
    margin: 10,
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
