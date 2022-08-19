import React, { useContext, useState, useEffect } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, TouchableWithoutFeedback, View, ScrollView } from 'react-native'
import { createWorker, getWorkersCategorias, getWorkerIdUsuario, deleteWorker } from '../../api/WorkersEndpoint'
import { Formik } from 'formik'
import * as yup from 'yup'
import { showMessage } from 'react-native-flash-message'
import { brandPrimary, brandBackground, brandPrimaryDisabled, brandPrimaryTap, brandSecondary, flashStyle, flashTextStyle } from '../../styles/GlobalStyles'
import InputItem from '../../components/InputItem'
import TextRegular from '../../components/TextRegular'
import TextError from '../../components/TextError'
import { AuthorizationContext } from '../../context/AuthorizationContext'
import DropDownPicker from 'react-native-dropdown-picker'


export default function WorkerRegisterScreen({ navigation }) {
  const loggedInUser = useContext(AuthorizationContext)
  const [backendErrors, setBackendErrors] = useState()
  const [open, setOpen] = useState(false)
  const [categorias, setCategorias] = useState([])
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('10')
  const initialWorkerValues = { profesion: '', descripcion: '', localidad: '', categoria:''}

  useEffect(() => {
    async function obtenerWorkerCategorias() {
      try {
        const categoriasObtenidas = await getWorkersCategorias()
        const categoriasModeladas = categoriasObtenidas.map((e) => {
          return {
            label: e.nombre,
            value: e.id
          }
        })
        setCategorias(categoriasModeladas)
        
      } catch (error) {
        showMessage({
          message: `No se han podido obtener las categorias. ${error} `,
          type: 'error',
          style: flashStyle,
          titleStyle: flashTextStyle
        })
      }
    }
    obtenerWorkerCategorias()
  }, [])

  useState(() => {
    async function obtenerWorkerExistente() {
      try {
        const workerExistente = await getWorkerIdUsuario()
        initialWorkerValues.profesion = workerExistente.profesion
        initialWorkerValues.descripcion = workerExistente.descripcion
        initialWorkerValues.localidad = workerExistente.localidad
        initialWorkerValues.categoria = workerExistente.workercategoriaId
      } catch (error) {
        showMessage({
          message: `Todavía no tiene un anuncio worker creado, cree uno para publicitarse en iWorker.`,
          type: 'error',
          style: flashStyle,
          titleStyle: flashTextStyle
        })
      }
    }
    obtenerWorkerExistente()
  }, [])
  const validationSchema = yup.object().shape({
    profesion: yup
      .string()
      .max(100, 'La empresa es demasiado larga')
      .required('La empresa es obligatoria'),
    descripcion: yup
      .string()
      .max(150, 'La descripción es demasiado larga')
      .required('La descripción es obligatoria'),
    localidad: yup
      .string()
      .max(50, 'La localidad es demasiado larga')
      .required('La localidad es obligatoria'),
  })
  const registerWorker = (data) => {
    setBackendErrors([])
    data.categoria = categoriaSeleccionada
    createWorker(data).then(showMessage({
      message: `Anuncio guardado correctamente`,
      type: 'success',
      style: flashStyle,
      titleStyle: flashTextStyle
    })).finally(navigation.reset({routes: [{name: 'PerfilScreen'}]}))    
  }
  const deleteAnuncio = () => {
    setBackendErrors([]) 
    deleteWorker(loggedInUser, () => showMessage({
      message: 'Anuncio borrado',
      type: 'success',
      style: flashStyle,
      titleStyle: flashTextStyle
    }),
    (error) => {
      setBackendErrors(error.errors)
    })
    //window.location.reload(true)
    navigation.reset({routes: [{name: 'PerfilScreen'}]})   
  }
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialWorkerValues}
      onSubmit={registerWorker}>
      {({ handleSubmit, isValid }) => (
        <ScrollView>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={75}>
            <TouchableWithoutFeedback onPress={Platform.OS === 'ios' ? Keyboard.dismiss : undefined}>
              <View style={{ alignItems: 'center' }}>
                <View style={styles.container}>
                  <View style={{ flexDirection: 'row', marginTop: 30 }}>
                  </View>
                  <InputItem
                    name='profesion'
                    label='Nombre de la empresa'
                    textContentType='profesion'
                  />
                  <InputItem
                    name='descripcion'
                    label='Describe brevemente a que se dedica.'
                    textContentType='descripcion'
                  />
                  <InputItem
                    name='localidad'
                    label='Localidad en la que trabaja'
                    textContentType='localidad'
                  />
                                    {backendErrors &&
                    backendErrors.map((error, index) => <TextError key={index}>{error.message}</TextError>)
                  }
                  <DropDownPicker
                    open={open}
                    value={categoriaSeleccionada}
                    items={categorias}
                    setOpen={setOpen}
                    onSelectItem={item => {
                      setCategoriaSeleccionada(item.value)
                    }}
                    setItems={setCategorias}
                    placeholder="Elija una categoria"
                    textStyle={{ color:brandPrimary , fontSize:20, textAlign:'center'}}
                    containerStyle={{ height: 40, marginTop: 20, width:'40%',marginBottom:10}}
                    style={{ backgroundColor: brandSecondary, borderRadius:5, textAlign:'center', borderColor: brandPrimary, borderWidth: 1,}}
                    dropDownContainerStyle={{searchable:true, showTickIcon:false }}
                  />

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
                    <TextRegular textStyle={styles.text}>Guardar Worker</TextRegular>
                  </Pressable>
                  <Pressable onPress={() => deleteAnuncio()}
                          style={({ pressed }) => [
                            {
                              backgroundColor: pressed
                                ? brandPrimaryTap
                                : brandPrimary
                            },
                            styles.button]} >
                      <TextRegular textStyle={styles.text}>Borrar Anuncio</TextRegular>
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
    width: 100,
    height: 100,
    borderColor: brandPrimary,
    borderWidth: 1,
    borderRadius: 50,
    marginTop: -20,
    alignSelf: 'center'
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
    fontSize: 16,
    color: brandSecondary,
    textAlign: 'center',
    minWidth:300,
  }
})
