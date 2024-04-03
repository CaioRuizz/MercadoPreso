import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import CarrinhoItem from '../../models/carrinho-item';
import Produto from '../../models/produto';
import HistoricoVendas from '../../models/historico-vendas';

export default function Carrinho() {
    const [carrinho, setCarrinho] = useState([]);

    useEffect(() => {
        async function loadCarrinho() {
            await HistoricoVendas.criarTabela();
            console.log('aaaa')
            const itensCarrinho = await CarrinhoItem.listar();
            console.log(itensCarrinho)
            const itensComProduto = await Promise.all(itensCarrinho.map(async (item) => {
                const produtos = await Produto.listar();
                const produto = produtos.find(p => p.id === item.produto_id);
                return { ...item, produto };
            }));
            setCarrinho(itensComProduto);
        }
        loadCarrinho();
    }, []);

    const handleRemoverDoCarrinho = async (produto) => {
        const itemExistente = carrinho.find(item => item.produto_id === produto.id);
        if (itemExistente && itemExistente.quantidade > 1) {
            const novaQuantidade = itemExistente.quantidade - 1;
            await CarrinhoItem.atualizar(itemExistente.id, {
                Produto: {
                    id: produto.id,
                },
                Quantidade: novaQuantidade,
            });
            const novoCarrinho = carrinho.map(item => {
                if (item.id === itemExistente.id) {
                    return { ...item, quantidade: novaQuantidade };
                }
                return item;
            });
            setCarrinho(novoCarrinho);
        } else {
            await CarrinhoItem.remover(itemExistente.id);
            const novoCarrinho = carrinho.filter(item => item.id !== itemExistente.id);
            setCarrinho(novoCarrinho);
        }
    };

    const handleAdicionarAoCarrinho = async (produto) => {
        const itemExistente = carrinho.find(item => item.produto_id === produto.id);
        if (itemExistente) {
            const novaQuantidade = itemExistente.quantidade + 1;
            await CarrinhoItem.atualizar(itemExistente.id, {
                Produto: {
                    id: produto.id,
                },
                Quantidade: novaQuantidade,
            });
            const novoCarrinho = carrinho.map(item => {
                if (item.id === itemExistente.id) {
                    return { ...item, quantidade: novaQuantidade };
                }
                return item;
            });
            setCarrinho(novoCarrinho);
        } else {
            const carrinhoItem = new CarrinhoItem(produto.id, 1);
            await CarrinhoItem.adicionar(carrinhoItem);
            setCarrinho([...carrinho, carrinhoItem]);
        }
    };

    const handleFinalizarCompra = async () => {
        const idVenda = Date.now(); // Gerar um ID único para a venda
        await Promise.all(carrinho.map(async (item) => {
            console.log('Item vendido:' + item);

            await HistoricoVendas.adicionar(item.produto_id, item.quantidade, `${idVenda}`);
        }));
        await CarrinhoItem.limpar(); // Limpa o carrinho após finalizar a compra
        setCarrinho([]); // Zera o carrinho local
        console.log('Compra finalizada!');
    };
    return (
        <View>
            <Text>Carrinho de Compras:</Text>
            <FlatList
                data={carrinho}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.produto.descricao} - R$ {item.produto.precoUnitario} - Quantidade: {item.quantidade}</Text>
                        <Button title="Adicionar ao Carrinho" onPress={() => handleAdicionarAoCarrinho(item.produto).catch(console.log)} />
                        <Button title="Remover do Carrinho" onPress={() => handleRemoverDoCarrinho(item.produto).catch(console.log)} />
                    </View>
                )}
            />
            <Button title="Finalizar Compra" onPress={() => handleFinalizarCompra().catch(console.log)} />
        </View>
    );
}
