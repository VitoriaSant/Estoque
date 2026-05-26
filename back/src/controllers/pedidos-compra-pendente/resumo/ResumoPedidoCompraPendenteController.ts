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
import CQueryBuilderSQL from '../../base/CQueryBuilderSQL';
import CPedidoCompraPendenteModel from '../CPedidoCompraPendenteModel';
import PedidosCompraPendenteSQL from '../base/PedidosCompraPendenteSQL';

export default class ResumoPedidoCompraPendenteController {
  public async resumoPedidoCompraPendente(req: Request, res: Response): Promise<void> {
    Firebird.attach(options, (err: any, db: Database) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao conectar' });
      }

      const classeFiltro = new CClasseFiltro<CPedidoCompraPendenteModel>(
        req.body,
      ) as CClasseFiltro<CPedidoCompraPendenteModel>;

      let query = `
        SELECT
          COUNT(DISTINCT pedido_compra.codigo_pdc) AS total_pedidos_com_saldo_pendente,
          SUM(pedido_compra_item_detalhe.qtdeaberta_pdcitemdet * pedido_compra_item_detalhe.vlrunitarioliquido_pdcitemdet) AS valor_total_pendente,
          COUNT(DISTINCT CASE WHEN pedido_compra.dtpreventrega_pdc < CURRENT_DATE THEN pedido_compra.codigo_pdc END) AS total_pedidos_atrasados,
          SUM(CASE WHEN pedido_compra.dtpreventrega_pdc < CURRENT_DATE THEN pedido_compra_item_detalhe.qtdeaberta_pdcitemdet * pedido_compra_item_detalhe.vlrunitarioliquido_pdcitemdet ELSE 0 END) AS valor_total_atrasado
        FROM pedido_compra
          INNER JOIN pedido_compra_item
              on pedido_compra_item.autoincpedido_pdcitem = pedido_compra.codigo_pdc
          INNER JOIN pedido_compra_item_detalhe
              on pedido_compra_item_detalhe.autoincpdcitem_pdcitemdet = pedido_compra_item.autoinc_pdcitem
      `;

      if (CQueryBuilderSQL.verificarExistencia<CPedidoCompraPendenteModel>('acabamentoId', classeFiltro)) {
        query += PedidosCompraPendenteSQL.JOIN_ACABAMENTO('LEFT JOIN');
      } else if (CQueryBuilderSQL.verificarExistencia<CPedidoCompraPendenteModel>('corId', classeFiltro)) {
        query += PedidosCompraPendenteSQL.JOIN_COR('LEFT JOIN');
      } else if (CQueryBuilderSQL.verificarExistencia<CPedidoCompraPendenteModel>('variacaoId', classeFiltro)) {
        query += PedidosCompraPendenteSQL.JOIN_VARIACAO('LEFT JOIN');
      } else if (CQueryBuilderSQL.verificarExistencia<CPedidoCompraPendenteModel>('itemId', classeFiltro)) {
        query += PedidosCompraPendenteSQL.JOIN_ITEM('LEFT JOIN');
      } else if (
        CQueryBuilderSQL.verificarExistencia<CPedidoCompraPendenteModel>('razaoSocialFornecedor', classeFiltro)
      ) {
        query += PedidosCompraPendenteSQL.JOIN_PESSOA('LEFT JOIN');
      }

      query += `WHERE pedido_compra_item_detalhe.qtdeaberta_pdcitemdet > 0`;

      const params: any[] = [];

      console.log('Query:', query);
      console.log('Params:', params);
      console.log('ClasseFiltro:', classeFiltro);

      if (classeFiltro.dataInicio && classeFiltro.dataFim) {
        query += ` AND dtemissao_pdc >= ? AND dtpreventrega_pdc <= ?`;
        params.push(classeFiltro.dataInicio);
        params.push(new Date(classeFiltro.dataFim));
      }

      for (const filtro of classeFiltro.filtros) {
        if (CQueryBuilderSQL.verificarExistencia<CPedidoCompraPendenteModel>('fornecedorId', classeFiltro)) {
          query += PedidosCompraPendenteSQL.WHERE_ID_FORNECEDO(CFiltro.toOperadorSQL(filtro.operador));

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
          console.error('Erro completo:', err);
          console.error('Mensagem:', err.message);
          db.detach();
          return res.status(500).json({ error: 'Erro na query', details: err.message });
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
