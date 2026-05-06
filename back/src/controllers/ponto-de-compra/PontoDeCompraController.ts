import Firebird, { Database } from "node-firebird";
import options from "../../database/conection";
import { Request, response, Response } from "express";
import CClasseFiltro, { CFiltro } from "../base/CClasseFiltro";
import CPontoDeCompraModel from "./CPontoDeCompraModel";

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
                item_saldo.empresa_item_saldo,
                pedido_compra.empresa_pdc,
                requisicaoestoque.empresa_reqest,
                item_saldo.variacao_item_saldo,
                variacao.descricao_variacao,
                item_saldo.cor_item_saldo,
                cor.descricao_cor,
                item_saldo.acabamento_item_saldo,
                acabamento.descricao_acabamento,
                item_saldo.saldoatual_item_saldo,
                item_saldo.custocompraatual_item_saldo,
                item_saldo.estoqueminimo_item_saldo,
                item_saldo.estoquemaximo_item_saldo,
                pedido_compra.codigo_pdc,
                pedido_compra.dtemissao_pdc,
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

            const params: any[] = [];
            
            const classeFiltro = new CClasseFiltro<CPontoDeCompraModel>(
                req.body,
            ) as CClasseFiltro<CPontoDeCompraModel>;

            for (const filtro of classeFiltro.filtros) {
                if (filtro.campo == "empresaItem") {
                    query += ` AND item_saldo.empresa_item_saldo ${CFiltro.toOperadorSQL(filtro.operador)} ?
                            `;
                    if (filtro.operador != "CONTEM") {
                        params.push(filtro.valor);
                    } else {
                        params.push(`%${filtro.valor}%`);
                    }
                }

                if(filtro.campo == "itemId") {
                    query += ` AND item_saldo.item_item_saldo ${CFiltro.toOperadorSQL(filtro.operador)} ?`;
                    if (filtro.operador != "CONTEM") {
                        params.push(filtro.valor);
                    } else {
                        params.push(`%${filtro.valor}%`);
                    }
                }

                if(filtro.campo == "descricaoItem") {
                    query += ` AND item.descricao_item ${CFiltro.toOperadorSQL(filtro.operador)} ?`;
                    if (filtro.operador != "CONTEM") {
                        params.push(filtro.valor);
                    } else {
                        params.push(`%${filtro.valor}%`);
                    }
                }

                if(filtro.campo == "corId") {
                    query += ` AND item_saldo.cor_item_saldo ${CFiltro.toOperadorSQL(filtro.operador)} ?`;
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

                if (filtro.campo == "variacaoId") {
                    query += ` AND item_saldo.variacao_item_saldo ${CFiltro.toOperadorSQL(filtro.operador)} ?`;
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

                if (filtro.campo == "acabamentoId") {
                    query += ` AND item_saldo.acabamento_item_saldo ${CFiltro.toOperadorSQL(filtro.operador)} ?`;
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

                try {

//----------------------------------------------------------------------------------------------------
// Contagem de valores: Valor todol em estoque, Valor de pedido pendente, Valor total
//----------------------------------------------------------------------------------------------------
                const valorTotalEmEstoque = result.reduce((acc: number, item: any) => {
                    return acc + (item.CUSTOCOMPRAATUAL_ITEM_SALDO * item.SALDOATUAL_ITEM_SALDO || 0);
                }, 0);

                const valorTotalDePedidosPendentes = result.reduce((acc: number, item: any) => {
                    return acc + (item.QTDEABERTA_PDCITEMDET * item.VLRUNITARIOLIQUIDO_PDCITEMDET || 0);
                }, 0);

                const valorTotal = valorTotalEmEstoque + valorTotalDePedidosPendentes;

//----------------------------------------------------------------------------------------------------
// Relatorio de ponto de compra
//----------------------------------------------------------------------------------------------------
                const pontoDeCompra = result.reduce((acc: any, item: any) => {
                    const itemId = item.ITEM_ITEM_SALDO;
                    const descricaoItem = item.DESCRICAO_ITEM;
                    const saldoDisponivel = item.SALDOATUAL_ITEM_SALDO;
                    const saldoMinimo = item.ESTOQUEMINIMO_ITEM_SALDO;
                    const saldoMaximo = item.ESTOQUEMAXIMO_ITEM_SALDO;
                    const quantidadePedido = item.QTDEABERTA_PDCITEMDET || 0;

                    //Pedido de compra pendente por item
                    if (!acc[itemId]) {
                        acc[itemId] = {
                        itemId,
                        descricaoItem,
                        saldoDisponivel,
                        saldoMinimo,
                        saldoMaximo,
                        pedidoCompraPendente: 0,
                        prazoEntrega: 0,
                        consumoDiario: 0,
                        diasDeDuracao: 0,
                        corDeAlerta: ''
                        };
                    }

                    // Somar quantidade do pedido pendente
                    acc[itemId].pedidoCompraPendente += quantidadePedido;
                    
                    // Calcular prazo de entrega em dias
                    const dataEmissao = new Date(item.DTEMISSAO_PDC);
                    const dataPrevisaoEntrega = new Date(item.DTPREVENTREGA_PDC);
                    const diferencaTempo = Math.abs(dataPrevisaoEntrega.getTime() - dataEmissao.getTime());
                    const prazoEntregaDias = Math.ceil(diferencaTempo / (1000 * 60 * 60 * 24));
                    
                    acc[itemId].prazoEntrega = prazoEntregaDias;

                    //Calculo do consumo diario - soma quantidade de requisições dos ultimos 90 dias
                    const dataRequisicao = new Date(item.DATA_REQEST);
                    const dataLimite = new Date();
                    dataLimite.setDate(dataLimite.getDate() - 90); // 90 dias atrás
                    
                    if (dataRequisicao >= dataLimite) {
                        acc[itemId].consumoDiario += (item.QTDEREQUISICAO_ITEMREQ || 0);
                    }

                    // Calcular dias de duração
                    const diasDeDuracao = acc[itemId].saldoDisponivel / acc[itemId].consumoDiario;
                    acc[itemId].diasDeDuracao = diasDeDuracao;

                    //Valida cor de alerta
                    const metadeDoMaximo = acc[itemId].saldoMaximo / 2;
                    if (acc[itemId].saldoDisponivel < acc[itemId].saldoMinimo) {
                        acc[itemId].corDeAlerta = 'Vermelho';
                    } else if (acc[itemId].saldoDisponivel < metadeDoMaximo) {
                        acc[itemId].corDeAlerta = 'Amarelo';
                    }

                    return acc;
                }, {});

//----------------------------------------------------------------------------------------------------
// Transforma o Relatorio de ponto de compra em array
//----------------------------------------------------------------------------------------------------
                const listaPontoDeCompra = Object.values(pontoDeCompra).map((item: any) => ({
                    itemId: item.itemId,
                    descricaoItem: item.descricaoItem,
                    saldoDisponivel: Number((item.saldoDisponivel || 0).toFixed(2)),
                    saldoMinimo: Number((item.saldoMinimo || 0).toFixed(2)),
                    saldoMaximo: Number((item.saldoMaximo || 0).toFixed(2)),
                    pedidoCompraPendente: Number((item.pedidoCompraPendente || 0).toFixed(2)),
                    prazoEntrega: Number((item.prazoEntrega || 0).toFixed(2)),
                    consumoDiario: Number(((item.consumoDiario || 0) / 90).toFixed(2)),
                    diasDeDuracao: Number((item.diasDeDuracao || 0).toFixed(2)),
                    corDeAlerta: item.corDeAlerta || '',
                }));

                console.log("Dados com corDeAlerta:", JSON.stringify(listaPontoDeCompra.slice(0, 3), null, 2));

//----------------------------------------------------------------------------------------------------
// Response
//----------------------------------------------------------------------------------------------------
                const response = {
                    resumo: {
                        valorTotalEmEstoque: Number((valorTotalEmEstoque || 0).toFixed(2)),
                        valorTotalDePedidosPendentes: Number((valorTotalDePedidosPendentes || 0).toFixed(2)),
                        valorTotal: Number((valorTotal || 0).toFixed(2)),
                    },
                    //dados: result,
                    pontoDeCompra: listaPontoDeCompra,
                };

                res.json(response);
                db.detach();

                } catch (error) {
                    console.error('Error processing data:', error);
                    db.detach();
                    return res.status(500).json({ error: "Erro ao processar dados" });
                }
            });
        }
        );
    }
}


