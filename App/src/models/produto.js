import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.tb_produtos');

export default class Produto {
    Id
    Descricao
    PrecoUnitario
    Categoria

    constructor(id, descricao, precoUnitario, categoria) {
        [this.Id, this.Descricao, this.PrecoUnitario, this.Categoria] = [id, descricao, precoUnitario, categoria];
    }

    static async criarTabela() {
        return new Promise((resolve, reject) => {
            db.transaction(
                tx => {
                    tx.executeSql(
                        'CREATE TABLE IF NOT EXISTS tb_produtos (id INTEGER PRIMARY KEY AUTOINCREMENT, descricao TEXT, precoUnitario REAL, categoria TEXT);',
                        [],
                        (_, { rowsAffected }) => resolve(rowsAffected),
                        (_, error) => reject(error)
                    );
                }
            );
        });
    }

    static async adicionar(produto) {
        return new Promise((resolve, reject) => {
            db.transaction(
                tx => {
                    tx.executeSql(
                        'INSERT INTO tb_produtos (descricao, precoUnitario, categoria) VALUES (?, ?, ?);',
                        [produto.Descricao, produto.PrecoUnitario, produto.Categoria],
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
                        'SELECT * FROM tb_produtos;',
                        [],
                        (_, { rows }) => resolve(rows._array),
                        (_, error) => reject(error)
                    );
                }
            );
        });
    }

    static async atualizar(id, produto) {
        return new Promise((resolve, reject) => {
            db.transaction(
                tx => {
                    tx.executeSql(
                        'UPDATE tb_produtos SET descricao = ?, precoUnitario = ?, categoria = ? WHERE id = ?;',
                        [produto.Descricao, produto.PrecoUnitario, produto.Categoria, id],
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
                        'DELETE FROM tb_produtos WHERE id = ?;',
                        [id],
                        (_, { rowsAffected }) => resolve(rowsAffected),
                        (_, error) => reject(error)
                    );
                }
            );
        });
    }
}
