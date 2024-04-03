import React from 'react';
import { View, Text, Button } from 'react-native';

const ProdutoItem = ({ produto, onAddToCart }) => {
  return (
    <View>
      <Text>{produto.descricao} - R$ {produto.precoUnitario}</Text>
      <Button title="Adicionar ao Carrinho" onPress={() => onAddToCart(produto)} />
    </View>
  );
};

export default ProdutoItem;
