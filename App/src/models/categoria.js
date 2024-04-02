import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.tb_categorias');

export default class Categoria {
    Id
    Descricao

    constructor(id, descricao) {
        [this.Id, this.Descricao] = [id, descricao];
    }

    static async criarTabela() {
        return new Promise((resolve, reject) => {
            db.transaction(
                tx => {
                    tx.executeSql(
                        'CREATE TABLE IF NOT EXISTS tb_categorias (id INTEGER PRIMARY KEY AUTOINCREMENT, descricao TEXT);',
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
                        'INSERT INTO tb_categorias (descricao) VALUES (?);',
                        [produto.Descricao],
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
                        'SELECT * FROM tb_categorias;',
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
                        'UPDATE tb_categorias SET descricao = ? WHERE id = ?;',
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
                        'DELETE FROM tb_categorias WHERE id = ?;',
                        [id],
                        (_, { rowsAffected }) => resolve(rowsAffected),
                        (_, error) => reject(error)
                    );
                }
            );
        });
    }
}
