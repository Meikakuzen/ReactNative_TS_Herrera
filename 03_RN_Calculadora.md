## REACT NATIVE - Calculadora

- Primero se hará código libre, luego se refactorizará y se creará un custom hook para realizar las operaciones (suma, resta, etc)
- Para crear un nuevo proyecto

> npx react-native init calculator --template react-native-template-typescript

## Estructura inicial

- En src/screens creo **CalculadoraScreen.tsx** con un View y un Text (uso el snippet personalizado rcv- React Component View)
- Renderizo CalculadoraScreen en App.tsx
- Para que no choque con el notch meto el View en un **SafeAreaView**
- Para colocar el fondo en negro creo la carpeta src/theme y dentro **AppTheme.tsx**
- Creo la hoja de estilos con el snippet personalizado **stles**

~~~js
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    fondo:{
        flex:1,
        backgroundColor: 'black'
    },
    texto:{
        color: 'white',
        fontSize: 20
    }
})
~~~

- Se lo aplico al SafeAreaView

~~~js
import React from 'react'
import { CalculadoraScreen } from './src/screens/CalculadoraScreen'
import { SafeAreaView } from 'react-native'
import { styles } from './src/themes/AppTheme'



const App = () => {
  return ( 

    <SafeAreaView style={styles.fondo}>
        <CalculadoraScreen />
    </SafeAreaView>

  )
}

export default App
~~~
 
- Añado los estilos al texto de la calculadora

~~~js
import { Text, View } from "react-native"
import { styles } from "../themes/AppTheme"


export const CalculadoraScreen = ()=>{
return (
 <View>
     <Text style={styles.texto}>Calculadora</Text>
</View>
)}
~~~

- Manejar los estilos de esta manera (global) nos **quita flexibilidad**
- Hay otra manera de trabajar los estilos **basado en el context** (spoiler!) 
- Hay una cosa que quiero cambiar
  - En Android no me gusta que quede esa barra gris del status bar
  - En ios quiero que se mantenga el status bar 
- Coloco el **StatusBar** dentro del SafeAreaView
  - Con la propiedad backgroundColor cambio el color de fondo del StatusBar
  - Con barStyle light-content la de ios
- Puedes pulsar Ctrl + space bar para ver las opciones disponibles

~~~js
import React from 'react'
import { CalculadoraScreen } from './src/screens/CalculadoraScreen'
import { SafeAreaView, StatusBar } from 'react-native'
import { styles } from './src/themes/AppTheme'



const App = () => {
  return ( 

    <SafeAreaView style={styles.fondo}>
      <StatusBar
        backgroundColor= "black"
        barStyle="light-content"          
        />
        <CalculadoraScreen />
    </SafeAreaView>

  )
}

export default App
~~~

### Resumen:

- Creo un StyleSheet **global**. Más adelante se realizará mediante context
- Uso **StatusBar** y las propiedades backgroundColor y barStyle(para ios) para configurar la barra de estado y luzca del color que yo quiero
------

## Botones y estilos

- Quiero que en el Text de Calculadora Screen aparezca el resultado de la calculadora
- Si analizamos la calculadora veremos que es una columna que tiene varias rows
  - La del resultado
  - La de cada fila de números y operaciones matemáticas
- El diseño es **una colección de rows empujada hacia abajo** (porque donde se muestra el resultado en grande, arriba, encima suyo hay mucho aire)
- Cambio la etiqueta de estilos de styles.texto a styles.resultado (tiene más sentido)
  - Le pongo el fontSize de 60
  - Quiero que el texto esté alineado a la derecha, uso **alignText: 'right'**
  - Coloco un paddingHorizontal global 
  - **Si no funciona** puedo crear un calculadoraContainer en la StyleSheet y la coloco en el View de CalculadoraScreen en lugar de aplicarlo de forma global
  - Le coloco un **backgroundColor red** a calculadoraContainer para **poder manejarlo mejor**
  - Si le coloco **flex: 1** ocupará toda la pantalla
  - Como quiero empezar desde abajo usaré justifyContent: 'flex-end'
    - Esto sitúa el texto provisional que tengo **abajo a la derecha**. Puedo quitar el background red
  - Necesito colocar otro resultado más pequeño encima, copio la etiqueta de texto y le añado styles.resultadoPequeno
    - Para hacerlo un poco transparente uso **rgba**

~~~js
import { Text, View } from "react-native"
import { styles } from "../themes/AppTheme"


export const CalculadoraScreen = ()=>{
return (
 <View style={styles.calculadoraContainer}>
     <Text style={styles.resultadoPequeno}>1500</Text>
     <Text style={styles.resultado}>1500</Text>
</View>
)}
~~~

- Los estilos se van viendo así

~~~js
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    fondo:{
        flex:1,
        backgroundColor: 'black',
    },
    calculadoraContainer:{
        paddingHorizontal: 20,
        /*backgroundColor: 'red' //una vez visto que abarca toda la pantalla ya no es necesario */
        flex: 1,
        justifyContent: 'flex-end' //empezaremos desde abajo y las columnas empujarán hacia arriba el resultado
    },
    resultado:{
        color: 'white',
        fontSize: 60,
        textAlign: 'right', //el resultado a la derecha
    },
    resultadoPequeno:{
        color: 'rgba(255,255,255,0.4)', //uso transparencia
        fontSize: 40,
        textAlign: 'right',
    }
})
~~~

- Cada fila la podemos ver como un **View en modo row** con botones
- Cómo el botón tiene que tener un contenido, este estar en el centro, creo otro View
- **Los View son como los divs HTML**
- Creo boton en el StyleSheet para añadirle estilos

~~~js
boton:{
    height: 80,
    width:80,
    backgroundColor: "#333",
    borderRadius: 100
}
~~~

- Se los agrego al View

~~~js
import { Button, Text, View } from "react-native"
import { styles } from "../themes/AppTheme"


export const CalculadoraScreen = ()=>{
return (
 <View style={styles.calculadoraContainer}>
     <Text style={styles.resultadoPequeno}>1500</Text>
     <Text style={styles.resultado}>1500</Text>

    <View>
        <View style={styles.boton}>
            <Text>1</Text>
        </View>
    </View>


</View>
)}
~~~

- Uso el **justifyContent** en center para alinear el contenido (el 1) verticalmente
- Creo botonTexto con **textAlign en center** para alinear el texto horizontalmente

~~~js
boton:{
    height: 80,
    width:80,
    backgroundColor: "#333",
    borderRadius: 100,
    justifyContent: 'center'
},
botonTexto:{
    textAlign: 'center',
    color: 'white',
    padding: 10,
    fontSize: 30,
    fontWeight: '300'
}
~~~

- Aplico los estilos al Text dentro del View con styles.botonTexto
- Cómo voy a usar este componente un montón de veces, en lugar de clonarlo creemos un **componente reutilizable**

## Resumen:

- Ver descripción para la aplicación de estilos
- Uso rgba para la **transparencia**
- Los View **son cómo los divs** de HTML
- Para crear y centrar el contenido del botón uso un View con justifyContent y dentro un Text con alignText
----

## Botón de calculadora y sus filas

- Creo varias copias de los botones que he creado con View y Text para colocar bien una fila con CSS
- En el View dónde están los botones le coloco el estilo fila (que no he creado todavía) donde le diré que es flexDirection: 'row'
- Hay muchas maneras de resolver este diseño, space-between, space-around...pero el botón de 0 que ocupa dos espacios no resuelve bien
  - Podemos hacer un justifyContent: 'center' 
  - Coloco un marginBottom, un paddingHorizontal..
- AppTheme.tsx (StyleSheet)

~~~js
fila:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
        paddingHorizontal: 10
    }
~~~

- Creo el componente del Botón
- Copio y pego el código que tenía en CalculadoraScreen dentro del return
- Puedo seguir usando los estilos globales o crear una hoja de estilos solo para el Botón
- Tiene sentido crearle su propia hoja de estilos, ya que todo lo relacionado al botón va a estar ahí

~~~js
import { StyleSheet, Text, View } from "react-native"

export const BotonCalc = ()=>{
return (
    <View style={styles.boton}>
        <Text style={styles.botonTexto}>1</Text>
    </View>
)}


const styles = StyleSheet.create({
    boton:{
        height: 80,
        width:80,
        backgroundColor: "#333",
        borderRadius: 100,
        justifyContent: 'center'
    },
    botonTexto:{
        textAlign: 'center',
        color: 'white',
        padding: 10,
        fontSize: 30,
        fontWeight: '300'
    }
});
~~~

- En CalculadoraScreen

~~~js
import { Button, Text, View } from "react-native"
import { styles } from "../themes/AppTheme"
import { BotonCalc } from "../components/BotonCalc"


export const CalculadoraScreen = ()=>{
return (
 <View style={styles.calculadoraContainer}>
     <Text style={styles.resultadoPequeno}>1500</Text>
     <Text style={styles.resultado}>1500</Text>

    <View style={styles.fila}>
        <BotonCalc />
        <BotonCalc />
        <BotonCalc />
        <BotonCalc />
    </View>


</View>
)}
~~~

- Todavía no hemos hecho customizable el botón. Todo a su tiempo!
- Ahora creo las propiedades **texto** y **color**
- Necesito tres colores #9B9B9B (gris pálido), #2D2D2D (gris oscuro), #FF9427 (naranja)
- El gris oscuro lo pongo por defecto en boton de la StyleSheet
- Si no declaro un valor por defecto en las props, **EL BOTON QUE NO RECIBE COLOR RECIBE UNDEFINED** y no muestra el backgroundColor 
- Por lo que debo **DEFINIRLO POR DEFECTO EN LAS PROPS**
- **Creo la propiedad color en la interface** de tipo string. La pongo opcional para que si no le envio color por las props no de error y le añada el background por defecto
- La **desestructuro** de las props del componente
- Desestructuro los estilos de styles.boton y le añado backgroundColor, le paso la prop
- Uso la misma estrategia con el color del texto. Si es gris pñalido usaré el negro, si no el blanco

~~~js
import { StyleSheet, Text, View } from "react-native"

interface Props{
    texto: string,
    color?: string
}

export const BotonCalc = ({texto, color="#2D2D2D"}: Props)=>{
return (
    <View style={{
        ...styles.boton,
        backgroundColor: color
    } }>
        <Text style={{
            ...styles.botonTexto,
            color: (color === '#9B9B9B') ? 'black': "white"
        }}>{texto}</Text>
    </View>
)}

const styles = StyleSheet.create({
    boton:{
        height: 80,
        width:80,
        borderRadius: 100,
        justifyContent: 'center',
        
    },
    botonTexto:{
        textAlign: 'center',
        color: 'white',
        padding: 10,
        fontSize: 30,
        fontWeight: '400'
    },

});
~~~

- Copio las filas. Le quito el color a los 3 primeros en las copias para seguir el diseño

~~~js
import { Button, Text, View } from "react-native"
import { styles } from "../themes/AppTheme"
import { BotonCalc } from "../components/BotonCalc"


export const CalculadoraScreen = ()=>{
return (
 <View style={styles.calculadoraContainer}>
     <Text style={styles.resultadoPequeno}>1500</Text>
     <Text style={styles.resultado}>1500</Text>

    <View style={styles.fila}>
        <BotonCalc texto="C" color="#9B9B9B"/>
        <BotonCalc texto="+/-" color="#9B9B9B"/>
        <BotonCalc texto="del" color="#9B9B9B"/>
        <BotonCalc texto="/" color="#FF9427"/>
    </View>
    <View style={styles.fila}>
        <BotonCalc texto="7" />
        <BotonCalc texto="8"/>
        <BotonCalc texto="9"/>
        <BotonCalc texto="X" color="#FF9427"/>
    </View>
    <View style={styles.fila}>
        <BotonCalc texto="4" />
        <BotonCalc texto="5"/>
        <BotonCalc texto="6"/>
        <BotonCalc texto="-" color="#FF9427"/>
    </View>
    <View style={styles.fila}>
        <BotonCalc texto="1" />
        <BotonCalc texto="2"/>
        <BotonCalc texto="3"/>
        <BotonCalc texto="+" color="#FF9427"/>
    </View>
    <View style={styles.fila}>
        <BotonCalc texto="0" />
        <BotonCalc texto="."/>
        <BotonCalc texto="=" color="#FF9427"/>
    </View>

</View>
)}
~~~

- El 0 tiene que ocupar 2 espacios
- Tengo que ser capaz de estirar el botón de 0, pero como puedo saber cuando estirarlo? 
  - Creo **una prop opcional que llamare ancho**
  - La declaro en las props como false para que no devuelva undefined
  - Cuando coloco una propiedad sin declarar en un componente la considera true
  - Tengo que sobreescribir el width. Actualmente el width de los botones es de 80, por lo que si quiero que ocupe el doble serán 160 (pero haciendo pruebas queda mejor 180)
  - Hago la condición
- Para hacer los botones interactivos uso **TouchableOpacity**
~~~js
export const BotonCalc = ({texto, color="#2D2D2D", ancho = false}: Props)=>{
return (
  <TouchableOpacity>
    <View style={{
        ...styles.boton,
        backgroundColor: color,
        width: ancho ? 180 : 80 
    } }>
        <Text style={{
            ...styles.botonTexto,
            color: (color === '#9B9B9B') ? 'black': "white",
        }}>{texto}</Text>
    </View>
    </TouchableOpacity><>
)}
~~~

- El componente del 0:

~~~js
<BotonCalc texto="0" ancho />
~~~

-

