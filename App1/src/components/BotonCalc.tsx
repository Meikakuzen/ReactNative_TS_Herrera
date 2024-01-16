import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

interface Props{
    texto: string,
    color?: string,
    ancho?: boolean
}

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
    </TouchableOpacity>
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