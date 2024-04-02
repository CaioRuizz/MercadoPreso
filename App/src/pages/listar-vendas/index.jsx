import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Divider } from 'react-native';
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

export default function ListaVendas() {
    const [vendas, setVendas] = useState([]);

    useEffect(() => {
        async function loadVendas() {
            await HistoricoVendas.criarTabela();
            const vendas = await HistoricoVendas.listar();
            const vendasComProdutos = {};

            for (let i = 0; i < vendas.length; i++) {
                const v = vendas[i];
                const produtos = await Produto.listar();
                const produto = produtos.find(p => p.id === v.produto_id);
                if (!vendasComProdutos[v.venda_id]) {
                    vendasComProdutos[v.venda_id] = [];
                }
                vendasComProdutos[v.venda_id].push({ produto, quantidade: v.quantidade });
            }

            console.log(vendasComProdutos);
            setVendas(vendasComProdutos);
        }
        loadVendas();
    }, []);

    let count = 0;

    return (
        <>
            {
                Object.keys(vendas).map((vendaId, i) => {
                    return (
                        <View key={vendaId} style={styles.vendaContainer}>
                            <Text>ID da Venda: {vendaId}</Text>
                            <FlatList
                                data={vendas[vendaId]}
                                keyExtractor={() => (i + 2) ** ++count}
                                renderItem={({ item }) => (
                                    <Text>Produto: {item.produto.descricao} Quantidade: {item.quantidade}</Text>
                                )}
                            />
                        </View>
                    )
                })
            }
        </>
    );
}
