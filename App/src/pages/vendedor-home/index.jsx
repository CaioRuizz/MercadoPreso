import React, { TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import Styles from "./styles"
import NavigateButton from "../../components/navigate-button";

export default function VendedorHome ({ navigation }) {
    return (
        <View style={Styles.container}>
            <NavigateButton
                navigation={navigation}
                navigateToPage="AdicionarProdutos"
                title="Adicionar Produtos"
            />
            <NavigateButton
                navigation={navigation}
                navigateToPage="VerCarrinho"
                title="Visualizar Carrinho"
            />
        </View>
    )
}