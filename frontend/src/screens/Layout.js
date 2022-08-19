import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React, { useContext, useEffect } from 'react'
import { flashStyle, flashTextStyle, navigationTheme } from '../styles/GlobalStyles'
//pantallas 
import TabGeneral from './general/TabGeneral'
import InicioScreen from './general/InicioScreen'
import LoginScreen from './general/LoginScreen'
import RegisterScreen from './general/RegisterScreen'


// eslint-disable-next-line camelcase
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat'
import FlashMessage, { showMessage } from 'react-native-flash-message'
import { AuthorizationContext } from '../context/AuthorizationContext'
import { AppContext } from '../context/AppContext'
import { ApiError } from '../api/helpers/Errors'

const HomeStack = createNativeStackNavigator()

export default function Layout () {
  const { getToken, signOut } = useContext(AuthorizationContext)
  const { error, setError } = useContext(AppContext)

  const init = async () => {
    await getToken(
      (recoveredUser) => showMessage({
        message: `Sesión recuperada. ${recoveredUser.nombre}`,
        type: 'success',
        style: flashStyle,
        titleStyle: flashTextStyle
      }),
      (error) => showMessage({
        message: `No se ha podido recuperar la sesión. Inicia sesión. ${error} `,
        type: 'warning',
        style: flashStyle,
        titleStyle: flashTextStyle
      })
    )
  }

  React.useEffect(() => {
    if (error) {
      showMessage({
        message: error.message,
        type: 'danger',
        style: flashStyle,
        titleStyle: flashTextStyle
      })
      if (error instanceof ApiError && (error.code === 403 || error.code === 401)) {
        signOut()
      }
      setError(null)
    }
  }, [error])

  useEffect(() => {
    init()
  }, [])

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold
  })

  return (
    <>
    {fontsLoaded &&
    <NavigationContainer theme={navigationTheme}>
      <HomeStack.Navigator>
      <HomeStack.Screen 
        name="Inicio" 
        component={InicioScreen}
        options={{ 
          title: "IWorker"
        }}
        />
        <HomeStack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{ 
          title: "Login"
        }}
        />
        <HomeStack.Screen 
        name="Registro" 
        component={RegisterScreen}
        options={{ 
          title: "Registro"
        }}
        />
        <HomeStack.Screen 
        name="General" 
        component={TabGeneral}
        options={{ 
          title: "IWorker"
        }}
        />
      </HomeStack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
    }
    </>
  )
}
