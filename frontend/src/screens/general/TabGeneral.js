import React, { useContext } from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { AuthorizationContext } from '../../context/AuthorizationContext'

import PerfilStack from '../perfil/PerfilStack'
import BusquedaStack from '../busqueda/BusquedaStack'


const TabGeneral = createBottomTabNavigator()

export default function GeneralTab() {
    const { loggedInUser } = useContext(AuthorizationContext)


    return (
        <TabGeneral.Navigator screenOptions={{ headerShown: false }}>
            <TabGeneral.Screen name='Busqueda' options={{ title: 'Workers' }} component={BusquedaStack} />
            <TabGeneral.Screen name='Perfil' options={{ title: 'Mi Perfil', independent: true}} component={PerfilStack} />
        </TabGeneral.Navigator>

    )
}