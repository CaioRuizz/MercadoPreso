import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Produto from '../../models/produto';
import styles from './styles';
import Categoria from '../../models/categoria';

export default function GerenciarProdutos() {
  const [categorias, setCategorias] = useState([]);
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState(categorias[0]);
  const [produtos, setProdutos] = useState([]);
  const [produtoEditando, setProdutoEditando] = useState(null);

  useEffect(() => {
    async function loadProdutos() {
      const categorias = await Categoria.listar();
      const descricoes = categorias.map(c => c.descricao);
      setCategorias(descricoes);
      await Produto.criarTabela().catch(console.log);
      const produtos = await Produto.listar().catch(console.log);
      console.log(produtos);
      setProdutos(produtos);
    }
    loadProdutos();
  }, []);

  const handleAdicionar = async () => {
    if (produtoEditando) {
      const produtoAtualizado = new Produto(produtoEditando.id, descricao, parseFloat(preco.replace(',', '.')), categoria);
      await Produto.atualizar(produtoEditando.id, produtoAtualizado).catch(console.log);
      const index = produtos.findIndex((p) => p.id === produtoEditando.id);
      if (index !== -1) {
        const novosProdutos = [...produtos];
        novosProdutos[index] = { ...produtoEditando, descricao, preco, categoria };
        setProdutos(novosProdutos);
      }
      setProdutoEditando(null);
    } else {
      const produto = new Produto('', descricao, parseFloat(preco.replace(',', '.')), categoria);
      const insertId = await Produto.adicionar(produto).catch(console.log);
      const novoProduto = { id: insertId, descricao, preco, categoria };
      setProdutos([...produtos, novoProduto]);
    }
    setDescricao('');
    setPreco('');
    setCategoria(categorias[0]);
  };

  const handleEditar = (produto) => {
    setProdutoEditando(produto);
    setDescricao(produto.descricao);
    setPreco(produto.precoUnitario.toString());
    setCategoria(produto.categoria);
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
      await Produto.remover(id).catch(console.log);
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
        <TextInput
          style={styles.input}
          placeholder="Preço"
          value={preco}
          onChangeText={setPreco}
          keyboardType="numeric"
        />
        <Picker
          selectedValue={categoria}
          style={styles.input}
          onValueChange={(itemValue) => setCategoria(itemValue)}
        >
          {categorias.map((cat) => (
            <Picker.Item key={cat} label={cat} value={cat} />
          ))}
        </Picker>
        <Button title={produtoEditando ? 'Atualizar' : 'Adicionar'} onPress={handleAdicionar} />
      </View>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.descricao} - R$ {item.precoUnitario  ?? item.preco} - {item.categoria}</Text>
            <Button title="🖊" onPress={() => handleEditar(item)} />
            <Button title="❌" onPress={() => handleRemover(item.id)} />
          </View>
        )}
      />
    </View>
  );
}
