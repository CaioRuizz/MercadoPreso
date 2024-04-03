import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.tb_historico_5');

export default class HistoricoVendas {
    id
    produto_id
    quantidade
    venda_id

    constructor(id, produto_id, quantidade, venda_id) {
        [this.id, this.produto_id, this.Quantidade, this.venda_id] = [id, produto_id, quantidade, venda_id];
    }

    static async criarTabela() {
        return new Promise((resolve, reject) => {
            db.transaction(
                tx => {
                    tx.executeSql(
                        'CREATE TABLE IF NOT EXISTS tb_historico_5 (id INTEGER PRIMARY KEY AUTOINCREMENT, produto_id INTEGER, quantidade INTEGER, venda_id TEXT);',
                        [],
                        (_, { rowsAffected }) => resolve(rowsAffected),
                        (_, error) => reject(error)
                    );
                }
            );
        });
    }

    static async maisVendidos() {
        return new Promise((resolve, reject) => {
            db.transaction(
                tx => {
                    tx.executeSql(
                        'SELECT produto_id, SUM(quantidade) as quantidade FROM tb_historico_5 GROUP BY produto_id ORDER BY SUM(quantidade) desc;',
                        [],
                        (_, { rows }) => resolve(rows._array),
                        (_, error) => reject(error)
                    );
                }
            );
        });
    }

    static async adicionar(produto_id, quantidade, venda_id) {
        return new Promise((resolve, reject) => {
            // console.log(produto_id, quantidade, venda_id)
            db.transaction(
                tx => {
                    tx.executeSql(
                        'INSERT INTO tb_historico_5 (produto_id, quantidade, venda_id) VALUES (?, ?, ?);',
                        [produto_id, quantidade, venda_id],
                        (_, { insertId }) => resolve(insertId),
                        (_, error) => reject(error),
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
                        'SELECT * FROM tb_historico_5;',
                        [],
                        (_, { rows }) => resolve(rows._array),
                        (_, error) => reject(error)
                    );
                }
            );
        });
    }

    static async atualizar(id, produto_id, quantidade, venda_id) {
        return new Promise((resolve, reject) => {
            db.transaction(
                tx => {
                    tx.executeSql(
                        'UPDATE tb_historico_5 SET produto_id = ?, quantidade = ?, venda_id = ? WHERE id = ?;',
                        [produto_id, quantidade, venda_id, id],
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
                        'DELETE FROM tb_historico_5 WHERE id = ?;',
                        [id],
                        (_, { rowsAffected }) => resolve(rowsAffected),
                        (_, error) => reject(error)
                    );
                }
            );
        });
    }
}
