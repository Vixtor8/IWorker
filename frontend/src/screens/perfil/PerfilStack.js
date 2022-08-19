import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useContext } from 'react'
import PerfilScreen from './PerfilScreen'
import WorkerRegisterScreen from './WorkerRegisterScreen'

const StackPerfil = createNativeStackNavigator()

export default function PerfilStack() {

  return (
    <StackPerfil.Navigator screenOptions={{ headerShown: true }}>
          <StackPerfil.Screen name='PerfilScreen' options={{ title: 'Perfil' }} component={PerfilScreen} />
          <StackPerfil.Screen name='WorkerRegister' options={{ title: 'Worker Registro' }} component={WorkerRegisterScreen} />
    </StackPerfil.Navigator>

  )
}
