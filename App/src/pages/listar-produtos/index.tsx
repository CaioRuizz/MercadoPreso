import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import Produto from '../../models/produto';
import CarrinhoItem from '../../models/carrinho-item';

export default function ListarProdutos() {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        async function loadProdutos() {
            await CarrinhoItem.criarTabela().catch(console.log);
            await Produto.criarTabela().catch(console.log);
            const produtos = await Produto.listar().catch(console.log);
            console.log(produtos)
            setProdutos(produtos);
        }
        loadProdutos();
    }, []);
    console.log(produtos)

    const handleAdicionarAoCarrinho = async (produto) => {
        const carrinho = await CarrinhoItem.listar().catch(console.log);
        const itemExistente = carrinho.find(item => item.produto_id === produto.id);
      
        if (itemExistente) {
          const quantidade = itemExistente.Quantidade + 1;
          await CarrinhoItem.atualizar(itemExistente.id, new CarrinhoItem(produto, quantidade)).catch(console.log);
        } else {
          const carrinhoItem = new CarrinhoItem(produto, 1);
        //   console.log(carrinhoItem)
          await CarrinhoItem.adicionar(carrinhoItem).catch(console.log);
        }
        console.log('Produto adicionado ao carrinho:', produto);
      };
      

    return (
        <View>
            <Text>Lista de Produtos:</Text>
            <FlatList
                data={produtos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.descricao} - R$ {item.precoUnitario}</Text>
                        <Button title="Adicionar ao Carrinho" onPress={() => handleAdicionarAoCarrinho(item).catch(console.log)} />
                    </View>
                )}
            />
        </View>
    );
}
