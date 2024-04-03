import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import Produto from '../../models/produto';
import CarrinhoItem from '../../models/carrinho-item';
import ProdutoItem from '../../components/Produto';
import styles from "../gerenciar-produtos/styles";
import {Picker} from "@react-native-picker/picker";
import Categoria from "../../models/categoria";

export default function ListarProdutos() {
    const [produtos, setProdutos] = useState([]);
    const [categoria, setCategoria] = React.useState('');
    const [categorias, setCategorias] = React.useState([]);
    useEffect(() => {
        async function loadProdutos() {
            const categorias = await Categoria.listar();
            const descricoes = categorias.map(c => c.descricao);
            setCategorias(['Selecionar Categoria', ...descricoes]);
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
            <Picker
                selectedValue={categoria}
                style={styles.input}
                onValueChange={(itemValue) => setCategoria(itemValue)}
            >
                {categorias.map((cat) => (
                    <Picker.Item key={cat} label={cat} value={cat} />
                ))}
            </Picker>
            <Text>Lista de Produtos:</Text>
            <FlatList
                data={produtos.filter(p => p.categoria === categoria || categoria === 'Selecionar Categoria')}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ProdutoItem produto={item} onAddToCart={handleAdicionarAoCarrinho} />
                )}
            />
        </View>
    );
}
