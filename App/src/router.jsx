import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from "./pages/home";
import VendedorHome from "./pages/vendedor-home";
import AdministradorHome from "./pages/administrador-home";
import GerenciarProdutos from "./pages/gerenciar-produtos";
import ListarProdutos from "./pages/listar-produtos";
import ListarVendas from "./pages/listar-vendas";
import VerCarrinho from "./pages/ver-carrinho";
import GerenciarCategorias from "./pages/gerenciar-categorias";
import MaisVendidos from "./pages/mais-vendidos";

const Stack = createNativeStackNavigator();

export default function Router() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ title: 'Mercado Preso' }}
                />
                <Stack.Screen
                    name="VendedorHome"
                    component={VendedorHome}
                    options={{ title: 'Mercado Preso - Vendedor' }}
                />
                <Stack.Screen
                    name="AdministradorHome"
                    component={AdministradorHome}
                    options={{ title: 'Mercado Preso - Administrador' }}
                />
                <Stack.Screen
                    name="GerenciarProdutos"
                    component={GerenciarProdutos}
                    options={{ title: 'Mercado Preso - Administrador' }}
                />
                <Stack.Screen
                    name="GerenciarCategorias"
                    component={GerenciarCategorias}
                    options={{ title: 'Mercado Preso - Administrador' }}
                />
                <Stack.Screen
                    name="AdicionarProdutos"
                    component={ListarProdutos}
                    options={{ title: 'Mercado Preso - Vendedor' }}
                />
                <Stack.Screen
                    name="VerCarrinho"
                    component={VerCarrinho}
                    options={{ title: 'Mercado Preso - Vendedor' }}
                />
                <Stack.Screen
                    name="VerVendas"
                    component={ListarVendas}
                    options={{ title: 'Mercado Preso - Vendedor' }}
                />
                <Stack.Screen
                    name="Extra"
                    component={MaisVendidos}
                    options={{ title: 'Mercado Preso - Extra' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}