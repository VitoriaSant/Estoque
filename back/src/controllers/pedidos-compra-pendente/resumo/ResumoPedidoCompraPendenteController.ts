//Node
import Firebird, { Database } from 'node-firebird';
//Database
import options from '../../../database/conection';
//Express
import { Request, Response } from 'express';
//Classes
import CClasseFiltro, { CFiltro } from '../../base/CClasseFiltro';
//Model
import CPedidoCompraPendenteModel from '../CPedidoCompraPendenteModel';

//Base
import CQueryBuilderSQL from '../../base/CQueryBuilderSQL';
import PedidosCompraPendenteSQL from '../base/PedidosCompraPendenteSQL';

export default class ResumoPedidoCompraPendenteController {
  public async ResumoPedidoCompraPendente(req: Request, res: Response): Promise<void> {
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

      if (CQueryBuilderSQL.verificarExistencia<CPedidoCompraPendenteModel>('descricaoAcabamento', classeFiltro)) {
        query += PedidosCompraPendenteSQL.JOIN_ACABAMENTO('LEFT JOIN');
      } else if (CQueryBuilderSQL.verificarExistencia<CPedidoCompraPendenteModel>('descricaoCor', classeFiltro)) {
        query += PedidosCompraPendenteSQL.JOIN_COR('LEFT JOIN');
      } else if (CQueryBuilderSQL.verificarExistencia<CPedidoCompraPendenteModel>('descricaoVariacao', classeFiltro)) {
        query += PedidosCompraPendenteSQL.JOIN_VARIACAO('LEFT JOIN');
      } else if (CQueryBuilderSQL.verificarExistencia<CPedidoCompraPendenteModel>('descricaoItem', classeFiltro)) {
        query += PedidosCompraPendenteSQL.JOIN_ITEM('LEFT JOIN');
      } else if (
        CQueryBuilderSQL.verificarExistencia<CPedidoCompraPendenteModel>('razaoSocialFornecedor', classeFiltro)
      ) {
        query += PedidosCompraPendenteSQL.JOIN_PESSOA('LEFT JOIN');
      }

      query += `WHERE pedido_compra_item_detalhe.qtdeaberta_pdcitemdet > 0`;

      const params: any[] = [];

      if (classeFiltro.dataInicio && classeFiltro.dataFim) {
        query += PedidosCompraPendenteSQL.WHERE_DATA_EMISSAO();
        params.push(classeFiltro.dataInicio, classeFiltro.dataFim);
      }

      for (const filtro of classeFiltro.filtros) {
        if (CQueryBuilderSQL.verificarExistencia<CPedidoCompraPendenteModel>('fornecedorId', classeFiltro)) {
          query += PedidosCompraPendenteSQL.WHERE_ID_FORNECEDO(CFiltro.toOperadorSQL(filtro.operador));
          params.push(CQueryBuilderSQL.obterValorFormatado(filtro));
        } else if (
          CQueryBuilderSQL.verificarExistencia<CPedidoCompraPendenteModel>('razaoSocialFornecedor', classeFiltro)
        ) {
          query += PedidosCompraPendenteSQL.WHERE_DESCRICAO_FORNECEDOR(CFiltro.toOperadorSQL(filtro.operador));
          params.push(CQueryBuilderSQL.obterValorFormatado(filtro));
        } else if (CQueryBuilderSQL.verificarExistencia<CPedidoCompraPendenteModel>('itemId', classeFiltro)) {
          query += PedidosCompraPendenteSQL.WHERE_ID_ITEM(CFiltro.toOperadorSQL(filtro.operador));
          params.push(CQueryBuilderSQL.obterValorFormatado(filtro));
        } else if (CQueryBuilderSQL.verificarExistencia<CPedidoCompraPendenteModel>('descricaoItem', classeFiltro)) {
          query += PedidosCompraPendenteSQL.WHERE_DESCRICAO_ITEM(CFiltro.toOperadorSQL(filtro.operador));
          params.push(CQueryBuilderSQL.obterValorFormatado(filtro));
        } else if (CQueryBuilderSQL.verificarExistencia<CPedidoCompraPendenteModel>('variacaoId', classeFiltro)) {
          query += PedidosCompraPendenteSQL.WHERE_ID_VARIACAO(CFiltro.toOperadorSQL(filtro.operador));
          params.push(CQueryBuilderSQL.obterValorFormatado(filtro));
        } else if (
          CQueryBuilderSQL.verificarExistencia<CPedidoCompraPendenteModel>('descricaoVariacao', classeFiltro)
        ) {
          query += PedidosCompraPendenteSQL.WHERE_DESCRICAO_VARIACAO(CFiltro.toOperadorSQL(filtro.operador));
          params.push(CQueryBuilderSQL.obterValorFormatado(filtro));
        } else if (CQueryBuilderSQL.verificarExistencia<CPedidoCompraPendenteModel>('corId', classeFiltro)) {
          query += PedidosCompraPendenteSQL.WHERE_ID_COR(CFiltro.toOperadorSQL(filtro.operador));
          params.push(CQueryBuilderSQL.obterValorFormatado(filtro));
        } else if (CQueryBuilderSQL.verificarExistencia<CPedidoCompraPendenteModel>('descricaoCor', classeFiltro)) {
          query += PedidosCompraPendenteSQL.WHERE_DESCRICAO_COR(CFiltro.toOperadorSQL(filtro.operador));
          params.push(CQueryBuilderSQL.obterValorFormatado(filtro));
        } else if (CQueryBuilderSQL.verificarExistencia<CPedidoCompraPendenteModel>('acabamentoId', classeFiltro)) {
          query += PedidosCompraPendenteSQL.WHERE_ID_ACABAMENTO(CFiltro.toOperadorSQL(filtro.operador));
          params.push(CQueryBuilderSQL.obterValorFormatado(filtro));
        } else if (
          CQueryBuilderSQL.verificarExistencia<CPedidoCompraPendenteModel>('descricaoAcabamento', classeFiltro)
        ) {
          query += PedidosCompraPendenteSQL.WHERE_DESCRICAO_ACABAMENTO(CFiltro.toOperadorSQL(filtro.operador));
          params.push(CQueryBuilderSQL.obterValorFormatado(filtro));
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
