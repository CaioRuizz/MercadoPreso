import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.tb_carrinho_1');

export default class CarrinhoItem {
  Produto
  Quantidade

  constructor(produto, quantidade) {
    this.Produto = produto;
    this.Quantidade = quantidade;
  }

  static async criarTabela() {
    return new Promise((resolve, reject) => {
      db.transaction(
        tx => {
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS tb_carrinho_1 (id INTEGER PRIMARY KEY AUTOINCREMENT, produto_id INTEGER, quantidade INTEGER);',
            [],
            (_, { rowsAffected }) => resolve(rowsAffected),
            (_, error) => reject(error)
          );
        }
      );
    });
  }

  static async adicionar(item) {
    return new Promise((resolve, reject) => {
      db.transaction(
        tx => {
          tx.executeSql(
            'INSERT INTO tb_carrinho_1 (produto_id, quantidade) VALUES (?, ?);',
            [item.Produto.id, item.Quantidade],
            (_, { insertId }) => resolve(insertId),
            (_, error) => reject(error)
          );
        }
      );
    });
  }

  static async listar() {
    return new Promise((resolve, reject) => {
      db.transaction(
        tx => {
          tx.executeSql(
            'SELECT * FROM tb_carrinho_1;',
            [],
            (_, { rows }) => resolve(rows._array),
            (_, error) => reject(error)
          );
        }
      );
    });
  }

  static async atualizar(id, item) {
    return new Promise((resolve, reject) => {
      db.transaction(
        tx => {
          tx.executeSql(
            'UPDATE tb_carrinho_1 SET produto_id = ?, quantidade = ? WHERE id = ?;',
            [item.Produto.id, item.Quantidade, id],
            (_, { rowsAffected }) => resolve(rowsAffected),
            (_, error) => reject(error)
          );
        }
      );
    });
  }

  static async remover(id) {
    return new Promise((resolve, reject) => {
      db.transaction(
        tx => {
          tx.executeSql(
            'DELETE FROM tb_carrinho_1 WHERE id = ?;',
            [id],
            (_, { rowsAffected }) => resolve(rowsAffected),
            (_, error) => reject(error)
          );
        }
      );
    });
  }

  static async limpar() {
    return new Promise((resolve, reject) => {
      db.transaction(
        tx => {
          tx.executeSql(
            'DELETE FROM tb_carrinho_1;',
            [],
            (_, { rowsAffected }) => resolve(rowsAffected),
            (_, error) => reject(error)
          );
        }
      );
    });
  }
}