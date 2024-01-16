import React from 'react'
import { ContadorScreen } from './src/screens/ContadorScreen'
import { CalculadoraScreen } from './src/screens/CalculadoraScreen'
import { SafeAreaView } from 'react-native'



const App = () => {
  return (
    //<ContadorScreen />

    <SafeAreaView>
        <CalculadoraScreen />
    </SafeAreaView>

  )
}

export default App