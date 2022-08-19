import React from 'react'
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native'
import TextSemiBold from './TextSemibold'
import { brandPrimary, brandSecondary} from '../styles/GlobalStyles'
import maleAvatar from '../../assets/maleAvatar.png'

export default function WorkerItem(props) {

  const goToPerfil = () => {
    props.navi.navigate('WorkerPerfil', { worker: props.item })
  }

  if (props.item.foto) {
    try {
      props.item.foto = { uri: `${process.env.API_BASE_URL}/${props.item.foto.replaceAll('\\', '/')}` }
    } catch { }
  }

  const renderItem = (props) => {

    return (
      <View style={styles.card} >
        <TouchableOpacity style={styles.touchable} onPress={goToPerfil}>
          <View style={styles.cardBody}>
            <View style={styles.columnas}>
            <View style={styles.colIzq}><Image style={styles.image} source={props.item.foto ? { uri: props.item.foto.uri } : maleAvatar} /></View>
            <View style={styles.colDer}>
              <TextSemiBold textStyle={styles.cardTitulo}>{props.item.nombre}</TextSemiBold>
              <TextSemiBold textStyle={styles.cardTitulo}>{props.item.profesion}</TextSemiBold>
              <TextSemiBold textStyle={styles.cardSubtitulo}>{props.item.localidad}</TextSemiBold>
            </View>
            </View>
            <View style={styles.debajo}>
            </View>
          </View>
        </TouchableOpacity>
      </View>

    )
  }
  return (
    <View style={styles.container}>
      {renderItem(props)}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    marginBottom: 20,
    flexShrink:0,
    alignItems: 'flex-start',
    flexDirection: 'row',
    backgroundColor: brandSecondary,
    borderRadius: 10,
    borderColor: brandPrimary,
    borderWidth: 2,
    minWidth:650
  },
  cardBody: {
    flex: 5,
    width: '100%',
    justifyContent: 'flex-start'
  },
  cardTitulo: {
    fontSize: 30
  },
  cardSubtitulo: {
    fontSize: 20
  },
  cardDescripcion: {
    fontSize: 20
  },
  container: {
    alignItems: 'center'
  },
  image: {
    width: 200,
    height: 200,
    borderColor: brandPrimary,
    borderWidth: 2,
    borderRadius: 50,
    backgroundColor: brandSecondary
  },
  touchable: {
    textAlign: 'center',
    width: '100%'
  },
  columnas: {
    flexDirection: 'row',
  },
  colIzq: {
    padding:15,
    flexShrink:0,
  },
  colDer: {
    alignContent:'stretch',
    padding:20,
    flexGrow:1,
  },
})
