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
                title="Entrar Como Administrador"
            />
            <NavigateButton
                navigation={navigation}
                navigateToPage="VendedorHome"
                title="Entrar Como Vendedor"
            />
        </View>
    )
}