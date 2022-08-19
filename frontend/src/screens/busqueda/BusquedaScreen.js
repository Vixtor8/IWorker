import React, { useState, useEffect } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, TouchableWithoutFeedback, View, FlatList, ScrollView } from 'react-native'

import { brandPrimary, brandPrimaryDisabled, brandPrimaryTap, brandSecondary, flashStyle, flashTextStyle } from '../../styles/GlobalStyles'
import { showMessage } from 'react-native-flash-message'
import { getWorkersBusqueda } from '../../api/WorkersEndpoint'
import { getWorkersCategorias } from '../../api/WorkersEndpoint'
import { getUsuario } from '../../api/AuthEndpoints'

import { Formik } from 'formik'
import * as yup from 'yup'
import WorkerItem from '../../components/WorkerItem'
import TextRegular from '../../components/TextRegular'
import DropDownPicker from 'react-native-dropdown-picker'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function BusquedaScreen({navigation}) {

    const [backendErrors, setBackendErrors] = useState()
    const [open, setOpen] = useState(false)
    const [categorias, setCategorias] = useState([])
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('10')
    const initialWorkerValues = { categoria: '' }
    const [workersEncontrados, setworkersEncontrados] = useState([])

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
    const validationSchema = yup.object().shape({})

    const datosWorker = async (w) => {
        const res = []
        for (let i = 0; i < w.length; i++) {
            const worker = w[i]
            res.push(Object.assign({}, worker, await getUsuario(worker.idUsuario)))
        }
        return res
    }

    const buscarWorker = async (data) => {
        setworkersEncontrados([])
        setBackendErrors([])
        data.categoria = categoriaSeleccionada
        setworkersEncontrados(await datosWorker(await getWorkersBusqueda(data.categoria)))
    }


    return (
        <ScrollView style={{marginBottom:20}}>
            <SafeAreaView>
                <View style={{ position: "relative", zIndex: 10, }}>

                    <Formik
                        validationSchema={validationSchema}
                        initialValues={initialWorkerValues}
                        onSubmit={buscarWorker}>
                        {({ handleSubmit, isValid }) => (
                            <KeyboardAvoidingView
                                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                                keyboardVerticalOffset={75}>
                                <TouchableWithoutFeedback onPress={Platform.OS === 'ios' ? Keyboard.dismiss : undefined}>
                                    <View style={{ alignItems: 'center' }}>
                                        <View style={styles.container}>
                                            <View style={{ flexDirection: 'row', marginTop: 30 }}>
                                            </View>
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
                                                containerStyle={{ height: 40, marginTop: 20, width:'40%', marginBottom:10, minWidth:300, }}
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
                                                <TextRegular textStyle={styles.text}>Buscar Worker</TextRegular>
                                            </Pressable>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            </KeyboardAvoidingView>
                        )}
                    </Formik>
                </View>

                <FlatList
                    data={workersEncontrados}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) =><WorkerItem item={item} navi={navigation} />}
                />
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '60%'
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
});