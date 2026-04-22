import Firebird, { Database } from "node-firebird";
import options from "../../database/conection";
import { Request, Response } from "express";
import CClasseFiltro, { CFiltro } from "../base/CClasseFiltro";
import CPedidoCompraPendenteModel from "./CPedidoCompraPendenteModel";

export default class PedidosCompraPendentesControlles {
  public post(req: Request, res: Response): void {
        Firebird.attach(options, (err: any, db: Database) => {
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

        const classeFiltro = new CClasseFiltro<CPedidoCompraPendenteModel>(
          req.body,
        ) as CClasseFiltro<CPedidoCompraPendenteModel>;

        console.log("ClasseFiltro:", classeFiltro);

        if (classeFiltro.dataInicio && classeFiltro.dataFim) {
          query += ` AND dtemissao_pdc >= ? AND dtpreventrega_pdc <= ?`; 
          params.push(classeFiltro.dataInicio);
          params.push(new Date(classeFiltro.dataFim));
        }

        for (const filtro of classeFiltro.filtros) {
            if (filtro.campo == "empresaId") {
              query += ` AND pedido_compra.empresa_pdc ${CFiltro.toOperadorSQL(filtro.operador)} ?`;
              if (filtro.operador != "CONTEM") {
                params.push(filtro.valor);
              } else {
                params.push(`%${filtro.valor}%`);
              }
            }

            if (filtro.campo == "fornecedorId") {
              query += ` AND pedido_compra.fornecedor_pdc ${CFiltro.toOperadorSQL(filtro.operador)} ?`;
              if (filtro.operador != "CONTEM") {
                params.push(filtro.valor);
              } else {
                params.push(`%${filtro.valor}%`);
              }
            }

            if (filtro.campo == "razaoSocialFornecedor") {
              query += ` AND pessoa.razaosocial_pessoa ${CFiltro.toOperadorSQL(filtro.operador)} ?`;
              if (filtro.operador != "CONTEM") {
                params.push(filtro.valor);
              } else {
                params.push(`%${filtro.valor}%`);
              }
            }

            if (filtro.campo == "itemId") {
              query += ` AND item.codigo_item ${CFiltro.toOperadorSQL(filtro.operador)} ?`;
              if (filtro.operador != "CONTEM") {
                params.push(filtro.valor);
              } else {
                params.push(`%${filtro.valor}%`);
              }
          }

            if (filtro.campo == "descricaoItem") {
              query += ` AND item.descricao_item ${CFiltro.toOperadorSQL(filtro.operador)} ?`;
              if (filtro.operador != "CONTEM") {
                params.push(filtro.valor);
              } else {
                params.push(`%${filtro.valor}%`);
              }
            }

            if (filtro.campo == "variacaoId") {
              query += ` AND pedido_compra_item.variacao_pdcitem ${CFiltro.toOperadorSQL(filtro.operador)} ?`;
              if (filtro.operador != "CONTEM") {
                params.push(filtro.valor);
              } else {
                params.push(`%${filtro.valor}%`);
              }
            }
            if (filtro.campo == "descricaoVariacao") {
              query += ` AND variacao.descricao_variacao ${CFiltro.toOperadorSQL(filtro.operador)} ?`;
              if (filtro.operador != "CONTEM") {
                params.push(filtro.valor);
              } else {
                params.push(`%${filtro.valor}%`);
              }
            }

            if (filtro.campo == "corId") {
              query += ` AND pedido_compra_item.cor_pdcitem ${CFiltro.toOperadorSQL(filtro.operador)} ?`;
              if (filtro.operador != "CONTEM") {
                params.push(filtro.valor);
              } else {
                params.push(`%${filtro.valor}%`);
              }
            }

            if (filtro.campo == "descricaoCor") {
              query += ` AND cor.descricao_cor ${CFiltro.toOperadorSQL(filtro.operador)} ?`;
              if (filtro.operador != "CONTEM") {
                params.push(filtro.valor);
              } else {
                params.push(`%${filtro.valor}%`);
              }
            }

            if (filtro.campo == "acabamentoId") {
              query += ` AND pedido_compra_item.acabamento_pdcitem ${CFiltro.toOperadorSQL(filtro.operador)} ?`;
              if (filtro.operador != "CONTEM") {
                params.push(filtro.valor);
              } else {
                params.push(`%${filtro.valor}%`);
              }
            }
            if (filtro.campo == "descricaoAcabamento") {
              query += ` AND acabamento.descricao_acabamento ${CFiltro.toOperadorSQL(filtro.operador)} ?`;
              if (filtro.operador != "CONTEM") {
                params.push(filtro.valor);
              } else {
                params.push(`%${filtro.valor}%`);
              }
            }
            // if (filtro.campo == "dataEmissao") {
            //   query += ` AND pedido_compra.dtemissao_pdc ${CFiltro.toOperadorSQL(filtro.operador)} ?`;
            // }

            // if (filtro.campo == "dataPrevisaoEntrega") {
            //   query += ` AND pedido_compra.dtpreventrega_pdc ${CFiltro.toOperadorSQL(filtro.operador)} ?`;
            // } 
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
      },
    );
  }
}
