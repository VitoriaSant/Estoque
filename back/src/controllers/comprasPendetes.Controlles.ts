import Firebird from "node-firebird";
import options from "../database/conection";

export default class ComprasPendentesController {
    public post(req: any, res: any): void {
        Firebird.attach(options, (err: any, db: any) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Erro ao conectar" });
        }

        let query = `
                    SELECT
                    pedido_compra.codigo_pdc,
                    pedido_compra.empresa_pdc,
                    pedido_compra.dtemissao_pdc,
                    pedido_compra.dtpreventrega_pdc,
                    pedido_compra.fornecedor_pdc,
                    pessoa.razaosocial_pessoa,
                    pedido_compra_item.item_pdcitem,
                    item.descricao_item,
                    pedido_compra_item.variacao_pdcitem,
                    variacao.descricao_variacao,
                    pedido_compra_item.cor_pdcitem,
                    cor.descricao_cor,
                    pedido_compra_item.acabamento_pdcitem,
                    acabamento.descricao_acabamento,
                    pedido_compra_item_detalhe.qtdeaberta_pdcitemdet,
                    pedido_compra_item_detalhe.vlrunitarioliquido_pdcitemdet
                FROM pedido_compra
                LEFT JOIN pedido_compra_item
                    ON pedido_compra_item.autoincpedido_pdcitem = pedido_compra.codigo_pdc
                LEFT JOIN pedido_compra_item_detalhe
                    ON pedido_compra_item_detalhe.autoincpdcitem_pdcitemdet = pedido_compra_item.autoinc_pdcitem
                LEFT JOIN item
                    ON item.codigo_item = pedido_compra_item.item_pdcitem
                LEFT JOIN variacao
                    ON variacao.codigo_variacao = pedido_compra_item.variacao_pdcitem
                LEFT JOIN cor
                    ON cor.codigo_cor = pedido_compra_item.cor_pdcitem
                LEFT JOIN acabamento
                    ON acabamento.codigo_acabamento = pedido_compra_item.acabamento_pdcitem
                LEFT JOIN pessoa
                    ON pessoa.codigo_pessoa = pedido_compra.fornecedor_pdc
                WHERE pedido_compra_item_detalhe.qtdeaberta_pdcitemdet > 0
            `;

        const params: any[] = [];

        const {
            empresa,
            fornecedor,
            descricao,
            variacao,
            cor,
            acabamento,
            dataInicio,
            dataFim,
        } = req.body;    

        if (empresa) {
            query += ` AND pedido_compra.empresa_pdc = ?`;
            params.push(empresa);
        }

        if (fornecedor) {
            query += ` AND pedido_compra.fornecedor_pdc = ?`;
            params.push(fornecedor);
        }

        if (descricao) {
            query += ` AND item.descricao_item LIKE ?`;
            params.push(`%${descricao}%`);
        }

        if (variacao) {
            query += ` AND pedido_compra_item.variacao_pdcitem = ?`;
            params.push(variacao);
        }

        if (cor) {
            query += ` AND pedido_compra_item.cor_pdcitem = ?`;
            params.push(cor);
        }

        if (acabamento) {
            query += ` AND pedido_compra_item.acabamento_pdcitem = ?`;
            params.push(acabamento);
        }

        if (dataInicio && dataFim) {
            query += ` AND pedido_compra.dtemissao_pdc BETWEEN ? AND ?`;
            params.push(dataInicio, dataFim);
        }

        db.query(query, params, (err: any, result: any) => {
            if (err) {
            console.error(err);
            db.detach();
            return res.status(500).json({ error: "Erro na query" });
            }

            res.json(result);
            db.detach();
        });
        });
    }
    }
