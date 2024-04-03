import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Produto from '../../models/produto';
import styles from './styles';
import Categoria from '../../models/categoria';
import Cell from "../../components/cell";

export default function GerenciarCategorias() {
  const [descricao, setDescricao] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [produtoEditando, setProdutoEditando] = useState(null);

  useEffect(() => {
    async function loadProdutos() {
      await Categoria.criarTabela();
      const categorias = await Categoria.listar();
      setProdutos(categorias);
    }
    loadProdutos();
  }, []);

  const handleAdicionar = async () => {
    if (produtoEditando) {
      const produtoAtualizado = new Produto(produtoEditando.id, descricao);
      await Categoria.atualizar(produtoEditando.id, produtoAtualizado).catch(console.log);
      const index = produtos.findIndex((p) => p.id === produtoEditando.id);
      if (index !== -1) {
        const novosProdutos = [...produtos];
        novosProdutos[index] = { ...produtoEditando, descricao };
        setProdutos(novosProdutos);
      }
      setProdutoEditando(null);
    } else {
      const produto = new Categoria('', descricao);
      const insertId = await Categoria.adicionar(produto).catch(console.log);
      const novoProduto = { id: insertId, descricao};
      setProdutos([...produtos, novoProduto]);
    }
  };

  const handleEditar = (produto) => {
    setProdutoEditando(produto);
    setDescricao(produto.descricao);
  };

  const handleRemover = async (id) => {
    const confirmarRemocao = await new Promise((resolve) => {
      Alert.alert(
        'Remover Produto',
        'Tem certeza que deseja remover este produto?',
        [
          {
            text: 'Cancelar',
            onPress: () => resolve(false),
            style: 'cancel',
          },
          {
            text: 'Remover',
            onPress: () => resolve(true),
          },
        ],
        { cancelable: false }
      );
    });
  
    if (confirmarRemocao) {
      await Categoria.remover(id).catch(console.log);
      const novosProdutos = produtos.filter(produto => produto.id !== id);
      setProdutos(novosProdutos);
    }
  };  

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Descrição"
          value={descricao}
          onChangeText={setDescricao}
        />
        <Button title={produtoEditando ? 'Atualizar' : 'Adicionar'} onPress={handleAdicionar} />
      </View>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Cell text={item.descricao} handleEditar={handleEditar} handleRemover={handleRemover} />
        )}
      />
    </View>
  );
}
