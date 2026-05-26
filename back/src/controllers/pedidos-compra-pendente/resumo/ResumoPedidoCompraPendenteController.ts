//Node
import Firebird, { Database } from 'node-firebird';
//Database
import options from '../../../database/conection';
//Express
import { Request, Response } from 'express';
//Classes
import CClasseFiltro, { CFiltro } from '../../base/CClasseFiltro';
//Model
import CResumoPedidoCompraPendente from '../resumo/CResumoPedidoCompraPendenteModel';

export default class ResumoPedidoCompraPendenteController {
  public async resumoPedidoCompraPendente(req: Request, res: Response): Promise<void> {
    Firebird.attach(options, (err: any, db: Database) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao conectar' });
      }
      let query = `
                SELECT
                    COUNT(DISTINCT pc.codigo_pdc) AS total_pedidos_com_saldo,
                    SUM(pcid.qtdeaberta_pdcitemdet * pcid.vlrunitarioliquido_pdcitemdet) AS valor_total,
                    COUNT(DISTINCT CASE WHEN pc.dtpreventrega_pdc < CURRENT_DATE THEN pc.codigo_pdc END) AS total_pedidos_atrasados,
                    SUM(CASE WHEN pc.dtpreventrega_pdc < CURRENT_DATE THEN pcid.qtdeaberta_pdcitemdet * pcid.vlrunitarioliquido_pdcitemdet ELSE 0 END) AS valor_total_atrasado
                    FROM pedido_compra pc
                    INNER JOIN pedido_compra_item pci
                        on pci.autoincpedido_pdcitem = pc.codigo_pdc
                    INNER JOIN pedido_compra_item_detalhe pcid
                        on pcid.autoincpdcitem_pdcitemdet = pci.autoinc_pdcitem
                    WHERE pcid.qtdeaberta_pdcitemdet > 0
                `;

      const params: any[] = [];

      const classeFiltro = new CClasseFiltro<CResumoPedidoCompraPendente>(
        req.body,
      ) as CClasseFiltro<CResumoPedidoCompraPendente>;

      console.log('ClasseFiltro:', classeFiltro);

      if (classeFiltro.dataInicio && classeFiltro.dataFim) {
        query += ` AND dtemissao_pdc >= ? AND dtpreventrega_pdc <= ?`;
        params.push(classeFiltro.dataInicio);
        params.push(new Date(classeFiltro.dataFim));
      }

      for (const filtro of classeFiltro.filtros) {
        if (filtro.campo == 'empresaId') {
          query += ` AND pedido_compra.empresa_pdc ${CFiltro.toOperadorSQL(filtro.operador)} ?`;
          if (filtro.operador != 'CONTEM') {
            params.push(filtro.valor);
          } else {
            params.push(`%${filtro.valor}%`);
          }
        }

        if (filtro.campo == 'fornecedorId') {
          query += ` AND pedido_compra.fornecedor_pdc ${CFiltro.toOperadorSQL(filtro.operador)} ?`;
          if (filtro.operador != 'CONTEM') {
            params.push(filtro.valor);
          } else {
            params.push(`%${filtro.valor}%`);
          }
        }

        if (filtro.campo == 'razaoSocialFornecedor') {
          query += ` AND pessoa.razaosocial_pessoa ${CFiltro.toOperadorSQL(filtro.operador)} ?`;
          if (filtro.operador != 'CONTEM') {
            params.push(filtro.valor);
          } else {
            params.push(`%${filtro.valor}%`);
          }
        }

        if (filtro.campo == 'itemId') {
          query += ` AND item.codigo_item ${CFiltro.toOperadorSQL(filtro.operador)} ?`;
          if (filtro.operador != 'CONTEM') {
            params.push(filtro.valor);
          } else {
            params.push(`%${filtro.valor}%`);
          }
        }

        if (filtro.campo == 'descricaoItem') {
          query += ` AND item.descricao_item ${CFiltro.toOperadorSQL(filtro.operador)} ?`;
          if (filtro.operador != 'CONTEM') {
            params.push(filtro.valor);
          } else {
            params.push(`%${filtro.valor}%`);
          }
        }

        if (filtro.campo == 'variacaoId') {
          query += ` AND pedido_compra_item.variacao_pdcitem ${CFiltro.toOperadorSQL(filtro.operador)} ?`;
          if (filtro.operador != 'CONTEM') {
            params.push(filtro.valor);
          } else {
            params.push(`%${filtro.valor}%`);
          }
        }
        if (filtro.campo == 'descricaoVariacao') {
          query += ` AND variacao.descricao_variacao ${CFiltro.toOperadorSQL(filtro.operador)} ?`;
          if (filtro.operador != 'CONTEM') {
            params.push(filtro.valor);
          } else {
            params.push(`%${filtro.valor}%`);
          }
        }

        if (filtro.campo == 'corId') {
          query += ` AND pedido_compra_item.cor_pdcitem ${CFiltro.toOperadorSQL(filtro.operador)} ?`;
          if (filtro.operador != 'CONTEM') {
            params.push(filtro.valor);
          } else {
            params.push(`%${filtro.valor}%`);
          }
        }

        if (filtro.campo == 'descricaoCor') {
          query += ` AND cor.descricao_cor ${CFiltro.toOperadorSQL(filtro.operador)} ?`;
          if (filtro.operador != 'CONTEM') {
            params.push(filtro.valor);
          } else {
            params.push(`%${filtro.valor}%`);
          }
        }

        if (filtro.campo == 'acabamentoId') {
          query += ` AND pedido_compra_item.acabamento_pdcitem ${CFiltro.toOperadorSQL(filtro.operador)} ?`;
          if (filtro.operador != 'CONTEM') {
            params.push(filtro.valor);
          } else {
            params.push(`%${filtro.valor}%`);
          }
        }
        if (filtro.campo == 'descricaoAcabamento') {
          query += ` AND acabamento.descricao_acabamento ${CFiltro.toOperadorSQL(filtro.operador)} ?`;
          if (filtro.operador != 'CONTEM') {
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
          return res.status(500).json({ error: 'Erro na query' });
        }
        const response = {
          dados: result,
        };

        res.json(response);
        db.detach();
      });
    });
  }
}
