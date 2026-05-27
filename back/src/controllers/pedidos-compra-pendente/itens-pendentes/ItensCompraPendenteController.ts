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
import CItensCompraPendente from './CItensCompraPendenteModel';

//Base
import CQueryBuilderSQL from '../../base/CQueryBuilderSQL';
import PedidosCompraPendenteSQL from '../base/PedidosCompraPendenteSQL';

export default class ItensCompraPendenteController {
  public async ItensCompraPendente(req: Request, res: Response): Promise<void> {
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
          pedido_compra_item.item_pdcitem,
          item.descricao_item,
          SUM(pedido_compra_item_detalhe.qtdeaberta_pdcitemdet) AS quantidade_itens_pendetes,
          SUM(pedido_compra_item_detalhe.qtdeaberta_pdcitemdet * pedido_compra_item_detalhe.vlrunitarioliquido_pdcitemdet) AS valor_total_pendente,
          AVG(pedido_compra_item_detalhe.vlrunitarioliquido_pdcitemdet) AS media_valor_un
        FROM pedido_compra_item
          INNER JOIN item
            on item.codigo_item = pedido_compra_item.item_pdcitem
          INNER JOIN pedido_compra_item_detalhe
            on pedido_compra_item_detalhe.autoincpdcitem_pdcitemdet = pedido_compra_item.autoinc_pdcitem
          INNER JOIN pedido_compra
            on pedido_compra.codigo_pdc = pedido_compra_item.autoincpedido_pdcitem
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

      query += `GROUP BY
                  pedido_compra_item.item_pdcitem,
                  item.descricao_item`;

      db.query(query, params, (err: any, result: any) => {
        if (err) {
          console.error(err);
          db.detach();
          return res.status(500).json({ error: 'Erro na query' });
        }
        const dadosMapeados = Array.isArray(result)
          ? result.map((row) => CItensCompraPendente.fromDatabaseRow(row))
          : CItensCompraPendente.fromDatabaseRow(result);

        const response = {
          dados: Array.isArray(dadosMapeados) ? dadosMapeados : [dadosMapeados],
        };

        res.json(response);
        db.detach();
      });
    });
  }
}
