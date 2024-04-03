import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, Divider} from 'react-native';
import HistoricoVendas from '../../models/historico-vendas';
import Produto from '../../models/produto';

const styles = StyleSheet.create({
    vendaContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    produtoContainer: {
        paddingLeft: 20,
        paddingTop: 5,
    },
    produtoText: {
        fontSize: 16,
    },
});

export default function MaisVendidos() {
    const [vendas, setVendas] = useState([]);

    useEffect(() => {
        async function loadVendas() {
            await HistoricoVendas.criarTabela();
            const vendas = await HistoricoVendas.maisVendidos();
            // console.log(vendas);
            const itensComProduto = await Promise.all(vendas.map(async (item) => {
                const produtos = await Produto.listar();
                const produto = produtos.find(p => p.id === item.produto_id);
                return {...item, produto};
            }));
            const ordenado = itensComProduto;
            console.log(ordenado)
            setVendas(ordenado);
        }

        loadVendas();
    }, []);

    let count = 0;

    vendas.forEach(x => console.log(x))

    return (

        <FlatList
            data={vendas}
            keyExtractor={item => item.produto.descricao}
            renderItem={({item}) => {
                console.log(item)
                return <View key={item.produto} style={styles.vendaContainer}>
                    <Text>Produto: {item.produto.descricao} Quantidade: {item.quantidade}</Text>
                </View>
            }}
        />

    );
}