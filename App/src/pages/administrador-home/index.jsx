import React, { TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import Styles from "./styles"
import NavigateButton from "../../components/navigate-button";

export default function AdministradorHome({ navigation }) {
    return (
        <View style={Styles.container}>
            <NavigateButton
                navigation={navigation}
                navigateToPage="GerenciarCategorias"
                title="Gerenciar Categorias"
            />
            <NavigateButton
                navigation={navigation}
                navigateToPage="GerenciarProdutos"
                title="Gerenciar Produtos"
            />
            <NavigateButton
                navigation={navigation}
                navigateToPage="VerVendas"
                title="Visualizar Vendas"
            />
        </View>
    )
}