import React, { TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import Styles from "./styles"
import NavigateButton from "../../components/navigate-button";


export default function Home ({ navigation }) {
    return (
        <View style={Styles.container}>
            <NavigateButton
                navigation={navigation}
                navigateToPage="AdministradorHome"
                title="Entrar Como Vendedor"
                style={Styles.botao}
                textStyle={Styles.texto} 
            />
            <NavigateButton
                navigation={navigation}
                navigateToPage="VendedorHome"
                title="Comprar"
            />
            <NavigateButton
                navigation={navigation}
                navigateToPage="Extra"
                title="Ver Itens Mais Vendidos"
            />
        </View>
    )
}