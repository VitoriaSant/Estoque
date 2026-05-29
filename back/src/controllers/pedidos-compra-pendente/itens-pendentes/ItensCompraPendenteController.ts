//Node
import Firebird, { Database } from 'node-firebird';
//Database
import options from '../../../database/conection';
//Express
import { Request, Response } from 'express';
//Classes
import CClasseFiltro, { CFiltro } from '../../base/CClasseFiltro';
import CResponseConsultaPaginada from '../../base/CResponseConsultaPaginada';
import CPedidoCompraPendenteGeralModel from '../CPedidoCompraPendenteGeralModel';
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

      const classeFiltro = new CClasseFiltro<CPedidoCompraPendenteGeralModel>(
        req.body,
      ) as CClasseFiltro<CPedidoCompraPendenteGeralModel>;

      const pagina = Number(req.body?.paginacao?.pagina) > 0 ? Number(req.body.paginacao.pagina) : 1;
      const limite = Number(req.body?.paginacao?.limite) > 0 ? Number(req.body.paginacao.limite) : 10;
      const skip = (pagina - 1) * limite;

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
                  pedido_compra_item.item_pdcitem,
                  item.descricao_item`;

      const countQuery = `
        SELECT COUNT(*) AS TOTAL_DE_REGISTROS
        FROM (${query}) consulta
      `;

      const queryPaginada = `
        SELECT FIRST ? SKIP ?
          consulta.item_pdcitem,
          consulta.descricao_item,
          consulta.quantidade_itens_pendetes,
          consulta.valor_total_pendente,
          consulta.media_valor_un
        FROM (${query}) consulta
        ORDER BY consulta.item_pdcitem
      `;

      db.query(countQuery, params, (err: any, countResult: any) => {
        if (err) {
          console.error('Erro completo:', err);
          console.error('Mensagem:', err.message);
          db.detach();
          return res.status(500).json({ error: 'Erro na query' });
        }
        db.query(queryPaginada, [limite, skip, ...params], (err: any, result: any) => {
          if (err) {
            console.error('Erro completo:', err);
            console.error('Mensagem:', err.message);
            db.detach();
            return res.status(500).json({ error: 'Erro na query', details: err.message });
          }

          const dadosMapeados = Array.isArray(result)
            ? result.map((row) => CItensCompraPendente.mapearParaModel(row))
            : result
              ? CItensCompraPendente.mapearParaModel(result)
              : [];

          const totalDeRegistros = Array.isArray(countResult)
            ? Number(countResult[0]?.TOTAL_DE_REGISTROS ?? 0)
            : Number(countResult?.TOTAL_DE_REGISTROS ?? 0);

          const response = new CResponseConsultaPaginada<CItensCompraPendente>({
            paginacao: {
              pagina,
              limite,
              totalDeRegistros,
            },
            registros: Array.isArray(dadosMapeados) ? dadosMapeados : [dadosMapeados],
          });

          res.json(response);
          db.detach();
        });
      });
    });
  }
}
