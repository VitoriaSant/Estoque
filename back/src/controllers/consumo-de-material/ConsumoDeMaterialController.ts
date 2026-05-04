import Firebird, { Database } from "node-firebird";
import options from "../../database/conection";
import { Request, response, Response } from "express";
import CClasseFiltro, { CFiltro } from "../base/CClasseFiltro";

export default class ConsumoDeMaterialController {
    public consumoDeMaterial(req: Request, res: Response): void {
        Firebird.attach(options, (err: any, db: Database) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Erro ao conectar" });
        }
        let query = `
            Select
                requisicaoestoque_item.item_itemreq,
                item.descricao_item,
                requisicaoestoque_item.variacao_itemreq,
                variacao.descricao_variacao,
                requisicaoestoque_item.cor_itemreq,
                cor.descricao_cor,
                requisicaoestoque_item.acabamento_itemreq,
                acabamento.descricao_acabamento,
                requisicaoestoque_item.qtderequisicao_itemreq,
                requisicaoestoque.data_reqest
            from requisicaoestoque_item
                left join item on (item.codigo_item = requisicaoestoque_item.item_itemreq)
                left join variacao on (variacao.codigo_variacao = requisicaoestoque_item.variacao_itemreq)
                left join cor on (cor.codigo_cor = requisicaoestoque_item.cor_itemreq)
                left join acabamento on (acabamento.codigo_acabamento= requisicaoestoque_item.acabamento_itemreq)
                left join requisicaoestoque on (requisicaoestoque.autoinc_reqest = requisicaoestoque_item.autoincrequisicao_itemreq)
            where requisicaoestoque.ordemproducao_reqest <> 0
        `;
        
            db.query(query, [], (err: any, result: any) => {
                if (err) {
                    console.error(err);
                    db.detach();
                    return res.status(500).json({ error: "Erro na query" });
                }

                try {
            
        
            const response = {
                dados: result
            };

            res.json(response);
            db.detach();
            } catch (error) {
                db.detach();
                return res.status(500).json({ error: "Erro ao processar dados" });
            }
            });
        }
        );
    }
}
