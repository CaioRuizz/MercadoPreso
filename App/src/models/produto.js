import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.tb_produtos2');

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
                        'CREATE TABLE IF NOT EXISTS tb_produtos2 (id INTEGER PRIMARY KEY AUTOINCREMENT, descricao TEXT, precoUnitario REAL, categoria TEXT);',
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
                        'INSERT INTO tb_produtos2 (descricao, precoUnitario, categoria) VALUES (?, ?, ?);',
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
                        'SELECT * FROM tb_produtos2;',
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
                        'UPDATE tb_produtos2 SET descricao = ?, precoUnitario = ?, categoria = ? WHERE id = ?;',
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
                        'DELETE FROM tb_produtos2 WHERE id = ?;',
                        [id],
                        (_, { rowsAffected }) => resolve(rowsAffected),
                        (_, error) => reject(error)
                    );
                }
            );
        });
    }
}
