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
          } 
        

        db.query(query, params, (err: any, result: any) => {
          if (err) {
            console.error(err);
            db.detach();
            return res.status(500).json({ error: "Erro na query" });
          }

          //Calculos
          const somaTotal = result.reduce((acc: number, item: any) => {
            return acc + (item.VLRUNITARIOLIQUIDO_PDCITEMDET || 0);
          }, 0);

          const totalDePedidos = result.length;

          const qntPedidoEmAtraso = result.reduce((acc: number, item: any) => {
            if (
              item.DTPREVENTREGA_PDC &&
              new Date(item.DTPREVENTREGA_PDC) < new Date()
            ) {
              return acc + 1;
            }
            return acc;
          }, 0);

          const somaPedidoEmAtraso = result
            .filter((item: any) => {
              return (
                item.DTPREVENTREGA_PDC &&
                new Date(item.DTPREVENTREGA_PDC) < new Date()
              );
            })
            .reduce((acc: number, item: any) => {
              return acc + (item.VLRUNITARIOLIQUIDO_PDCITEMDET || 0);
            }, 0);

          // Contagem de pedidos diferentes por fornecedor
          const pedidosPorFornecedor = result.reduce((acc: any, item: any) => {
            const fornecedorId = item.FORNECEDOR_PDC;
            const fornecedorNome = item.RAZAOSOCIAL_PESSOA;
            const pedidoId = item.CODIGO_PDC;
            const valorTotal = item.VLRUNITARIOLIQUIDO_PDCITEMDET || 0;

            if (!acc[fornecedorId]) {
              acc[fornecedorId] = {
                fornecedorId,
                fornecedorNome,
                pedidos: new Set(),
                quantidadePedidos: 0,
                valorTotal: 0,
              };
            }

            acc[fornecedorId].pedidos.add(pedidoId);
            acc[fornecedorId].quantidadePedidos =
              acc[fornecedorId].pedidos.size;
            acc[fornecedorId].valorTotal += valorTotal;

            return acc;
          }, {});

          // Converter para array PedidoPorFornecedor
          const listaPedidosPorFornecedor = Object.values(
            pedidosPorFornecedor,
          ).map((item: any) => ({
            fornecedorId: item.fornecedorId,
            fornecedorNome: item.fornecedorNome,
            quantidadePedidos: item.quantidadePedidos,
            valorTotal: Number(item.valorTotal.toFixed(2)),
          }));

          // Contagem de valor por pedido
          const pedidosPendentes = result.reduce((acc: any, item: any) => {
            const pedidoId = item.CODIGO_PDC;
            const valorTotal = item.VLRUNITARIOLIQUIDO_PDCITEMDET || 0;

            if (!acc[pedidoId]) {
              acc[pedidoId] = {
                pedidoId,
                previsaoEntrega: item.PREVISAOENTREGA_PDC,
                fornecedorNome: item.RAZAOSOCIAL_PESSOA,
                valorTotal: 0,
              };
            }
            acc[pedidoId].valorTotal += valorTotal;

            return acc;
          }, {});

          //Transforma em Array Pedidopendente
          const listaPedidosPendentes = Object.values(pedidosPendentes).map(
            (item: any) => ({
              pedidoId: item.pedidoId,
              previsaoEntrega: item.previsaoEntrega,
              fornecedorNome: item.fornecedorNome,
              valorTotal: Number(item.valorTotal.toFixed(2)),
            }),
          );

          //Contagem de valor por item
          const ItensPendetes = result.reduce((acc: any, item: any) => {
            const itemId = item.ITEM_PDCITEM; // Usar ITEM_PDCITEM em vez de CODIGO_PDCITEMDET
            const valorTotal = (item.VLRUNITARIOLIQUIDO_PDCITEMDET || 0) * (item.QTDEABERTA_PDCITEMDET || 0);
            const quantidadeItens = item.QTDEABERTA_PDCITEMDET || 0;

            if (!acc[itemId]) {
              acc[itemId] = {
                itemId,
                descricao: item.DESCRICAO_ITEM,
                valorUnitario: 0,
                valorTotal: 0,
                quantidadeItens: 0,
              };
            }
            acc[itemId].valorTotal += valorTotal;
            acc[itemId].quantidadeItens += quantidadeItens;
            acc[itemId].valorUnitario = valorTotal / quantidadeItens;

            return acc;
          }, {});

          //Transforma em Array Itempendente
          const listaItensPendentes = Object.values(ItensPendetes).map(
            (item: any) => ({
              itemId: item.itemId,
              descricao: item.descricao,
              valorTotal: Number(item.valorTotal.toFixed(2)),
              quantidadeItens: item.quantidadeItens,
              valorUnitario: Number(item.valorUnitario.toFixed(2)),
            }),
          );


          const response = {
            resumo: {
              qntPedidoEmAtraso,
              somaPedidoEmAtraso: Number(somaPedidoEmAtraso.toFixed(2)),
              totalDePedidos,
              somaTotal: Number(somaTotal.toFixed(2)),
            },
            // dados: result,
            pedidosPorFornecedor: listaPedidosPorFornecedor,
            pedidosPendentes: listaPedidosPendentes,
            itensPendentes: listaItensPendentes,
          };

          res.json(response);
          db.detach();
        });
      },
    );
  }
}
