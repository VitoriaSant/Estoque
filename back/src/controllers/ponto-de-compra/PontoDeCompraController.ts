import Firebird, { Database } from "node-firebird";
import options from "../../database/conection";
import { Request, response, Response } from "express";
import CClasseFiltro, { CFiltro } from "../base/CClasseFiltro";

export default class PontoDeCompraController {
    public pontoDeCompra(req: Request, res: Response): void {
        Firebird.attach(options, (err: any, db: Database) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Erro ao conectar" });
        }
        let query = `
            Select
                item_saldo.item_item_saldo,
                item.descricao_item,
                item_saldo.variacao_item_saldo,
                variacao.descricao_variacao,
                item_saldo.cor_item_saldo,
                cor.descricao_cor,
                item_saldo.acabamento_item_saldo,
                acabamento.descricao_acabamento,
                item_saldo.saldoatual_item_saldo,
                item_saldo.estoqueminimo_item_saldo,
                item_saldo.estoquemaximo_item_saldo,
                pedido_compra.codigo_pdc,
                pedido_compra.empresa_pdc,
                pedido_compra.dtpreventrega_pdc,
                pedido_compra_item.item_pdcitem,
                pedido_compra_item_detalhe.qtdeaberta_pdcitemdet,
                pedido_compra_item_detalhe.vlrunitarioliquido_pdcitemdet,
                requisicaoestoque_item.qtderequisicao_itemreq,
                requisicaoestoque.data_reqest
            from item
                left join item_saldo on (item_saldo.item_item_saldo = item.codigo_item)
                left join variacao on (variacao.codigo_variacao = item_saldo.variacao_item_saldo)
                left join cor on (cor.codigo_cor = item_saldo.cor_item_saldo)
                left join acabamento on (acabamento.codigo_acabamento= item_saldo.acabamento_item_saldo)
                left join pedido_compra_item on (pedido_compra_item.item_pdcitem = item.codigo_item)
                left join pedido_compra on(pedido_compra.codigo_pdc = pedido_compra_item.autoincpedido_pdcitem)
                left join pedido_compra_item_detalhe on (pedido_compra_item_detalhe.autoincpdcitem_pdcitemdet = pedido_compra_item.autoinc_pdcitem)
                left join requisicaoestoque_item on (requisicaoestoque_item.item_original_itemreq = item.codigo_item)
                left join requisicaoestoque on (requisicaoestoque.autoinc_reqest = requisicaoestoque_item.autoincrequisicao_itemreq)
            where pedido_compra_item_detalhe.qtdeaberta_pdcitemdet > 0
            /*and requisicaoestoque.ordemproducao_reqest <> 0*/
            `;

            db.query(query, [], (err: any, result: any) => {
                if (err) {
                    console.error(err);
                    db.detach();
                    return res.status(500).json({ error: "Erro na query" });
                }

            res.json(result);
            db.detach();
            });
        }
        );
    }
}


