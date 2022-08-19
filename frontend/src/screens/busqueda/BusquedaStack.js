import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useContext } from 'react'
import { AuthorizationContext } from '../../context/AuthorizationContext'

//Pantallas del stack
import BusquedaScreen from './BusquedaScreen'
import WorkerPerfil from './WorkerScreen'



const BusquedaStack = createNativeStackNavigator()

export default function ProfileStack() {
  const { loggedInUser } = useContext(AuthorizationContext)

  return (
    <BusquedaStack.Navigator>
          <BusquedaStack.Screen name='BusquedaScreen' options={{ title: 'Busqueda' }} component={BusquedaScreen} />
          <BusquedaStack.Screen name='WorkerPerfil' options={{ title: 'Worker' }} component={WorkerPerfil} />
    </BusquedaStack.Navigator>

  )
}
