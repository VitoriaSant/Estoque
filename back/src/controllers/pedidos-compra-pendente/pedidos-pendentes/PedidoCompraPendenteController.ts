//Node
import Firebird, { Database } from 'node-firebird';
//Database
import options from '../../../database/conection';
//Express
import { Request, Response } from 'express';
//Classes
import CClasseFiltro, { CFiltro } from '../../base/CClasseFiltro';
import CResponseConsultaPaginada from '../../base/CResponseConsultaPaginada';

//Model
import CPedidoCompraPendenteGeralModel from '../CPedidoCompraPendenteGeralModel';
import CPedidoCompraPendenteModel from './CPedidoCompraPendenteModel';

//Base
import CQueryBuilderSQL from '../../base/CQueryBuilderSQL';
import PedidosCompraPendenteSQL from '../base/PedidosCompraPendenteSQL';

export default class PedidoCompraPendenteController {
  public async PedidoCompraPendente(req: Request, res: Response): Promise<void> {
    Firebird.attach(options, (err: any, db: Database) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao conectar' });
      }

      const classeFiltro = new CClasseFiltro<CPedidoCompraPendenteGeralModel>(
        req.body,
      ) as CClasseFiltro<CPedidoCompraPendenteGeralModel>;

      let query = `
        SELECT
          pedido_compra.codigo_pdc,
          pedido_compra.dtpreventrega_pdc,
          SUM(pedido_compra_item_detalhe.qtdeaberta_pdcitemdet * pedido_compra_item_detalhe.vlrunitarioliquido_pdcitemdet) AS valor_total_pendente
        FROM pedido_compra
          INNER JOIN pedido_compra_item
            on pedido_compra_item.autoincpedido_pdcitem = pedido_compra.codigo_pdc
          INNER JOIN pedido_compra_item_detalhe
            on pedido_compra_item_detalhe.autoincpdcitem_pdcitemdet = pedido_compra_item.autoinc_pdcitem
      `;

      if (CQueryBuilderSQL.verificarExistencia<CPedidoCompraPendenteGeralModel>('descricaoAcabamento', classeFiltro)) {
        query += PedidosCompraPendenteSQL.JOIN_ACABAMENTO('LEFT JOIN');
      } else if (CQueryBuilderSQL.verificarExistencia<CPedidoCompraPendenteGeralModel>('descricaoCor', classeFiltro)) {
        query += PedidosCompraPendenteSQL.JOIN_COR('LEFT JOIN');
      } else if (
        CQueryBuilderSQL.verificarExistencia<CPedidoCompraPendenteGeralModel>('descricaoVariacao', classeFiltro)
      ) {
        query += PedidosCompraPendenteSQL.JOIN_VARIACAO('LEFT JOIN');
      } else if (CQueryBuilderSQL.verificarExistencia<CPedidoCompraPendenteGeralModel>('descricaoItem', classeFiltro)) {
        query += PedidosCompraPendenteSQL.JOIN_ITEM('LEFT JOIN');
      } else if (
        CQueryBuilderSQL.verificarExistencia<CPedidoCompraPendenteGeralModel>('razaoSocialFornecedor', classeFiltro)
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
        const valorFormatado = CQueryBuilderSQL.obterValorFormatado(filtro);
        const operadorSQL = CFiltro.toOperadorSQL(filtro.operador);

        if (CQueryBuilderSQL.verificarExistencia<CPedidoCompraPendenteGeralModel>('fornecedorId', classeFiltro)) {
          query += PedidosCompraPendenteSQL.WHERE_ID_FORNECEDO(operadorSQL);
          params.push(valorFormatado);
        } else if (
          CQueryBuilderSQL.verificarExistencia<CPedidoCompraPendenteGeralModel>('razaoSocialFornecedor', classeFiltro)
        ) {
          query += PedidosCompraPendenteSQL.WHERE_DESCRICAO_FORNECEDOR(operadorSQL);
          params.push(valorFormatado);
        } else if (CQueryBuilderSQL.verificarExistencia<CPedidoCompraPendenteGeralModel>('itemId', classeFiltro)) {
          query += PedidosCompraPendenteSQL.WHERE_ID_ITEM(operadorSQL);
          params.push(valorFormatado);
        } else if (
          CQueryBuilderSQL.verificarExistencia<CPedidoCompraPendenteGeralModel>('descricaoItem', classeFiltro)
        ) {
          query += PedidosCompraPendenteSQL.WHERE_DESCRICAO_ITEM(operadorSQL);
          params.push(valorFormatado);
        } else if (CQueryBuilderSQL.verificarExistencia<CPedidoCompraPendenteGeralModel>('variacaoId', classeFiltro)) {
          query += PedidosCompraPendenteSQL.WHERE_ID_VARIACAO(operadorSQL);
          params.push(valorFormatado);
        } else if (
          CQueryBuilderSQL.verificarExistencia<CPedidoCompraPendenteGeralModel>('descricaoVariacao', classeFiltro)
        ) {
          query += PedidosCompraPendenteSQL.WHERE_DESCRICAO_VARIACAO(operadorSQL);
          params.push(valorFormatado);
        } else if (CQueryBuilderSQL.verificarExistencia<CPedidoCompraPendenteGeralModel>('corId', classeFiltro)) {
          query += PedidosCompraPendenteSQL.WHERE_ID_COR(operadorSQL);
          params.push(valorFormatado);
        } else if (
          CQueryBuilderSQL.verificarExistencia<CPedidoCompraPendenteGeralModel>('descricaoCor', classeFiltro)
        ) {
          query += PedidosCompraPendenteSQL.WHERE_DESCRICAO_COR(operadorSQL);
          params.push(valorFormatado);
        } else if (
          CQueryBuilderSQL.verificarExistencia<CPedidoCompraPendenteGeralModel>('acabamentoId', classeFiltro)
        ) {
          query += PedidosCompraPendenteSQL.WHERE_ID_ACABAMENTO(operadorSQL);
          params.push(valorFormatado);
        } else if (
          CQueryBuilderSQL.verificarExistencia<CPedidoCompraPendenteGeralModel>('descricaoAcabamento', classeFiltro)
        ) {
          query += PedidosCompraPendenteSQL.WHERE_DESCRICAO_ACABAMENTO(operadorSQL);
          params.push(valorFormatado);
        }
      }

      query += `GROUP BY
                    pedido_compra.codigo_pdc,
                    pedido_compra.dtpreventrega_pdc`;

      db.query(query, params, (err: any, result: any) => {
        if (err) {
          console.error('Erro completo:', err);
          console.error('Mensagem:', err.message);
          db.detach();
          return res.status(500).json({ error: 'Erro na query', details: err.message });
        }

        const dadosMapeados = Array.isArray(result)
          ? result.map((row) => CPedidoCompraPendenteModel.fromDatabaseRow(row))
          : CPedidoCompraPendenteModel.fromDatabaseRow(result);

        const response = {
          dados: Array.isArray(dadosMapeados) ? dadosMapeados : [dadosMapeados],
        };

        res.json(response);
        db.detach();
      });
    });
  }
}
