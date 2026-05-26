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

export default class ItensCompraPendenteController {
  public async ItensCompraPendente(req: Request, res: Response): Promise<void> {
    Firebird.attach(options, (err: any, db: Database) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao conectar' });
      }

      //const classeFiltro = new CClasseFiltro<CPedidoCompraPendenteModel>(
      //  req.body,
      //) as CClasseFiltro<CPedidoCompraPendenteModel>;

      let query = `
        SELECT
            pci.item_pdcitem,
            i.descricao_item,
            SUM(pcid.qtdeaberta_pdcitemdet) AS quantidade_itens_pendetes,
            SUM(pcid.qtdeaberta_pdcitemdet * pcid.vlrunitarioliquido_pdcitemdet) AS valor_total_pendente,
            AVG(pcid.vlrunitarioliquido_pdcitemdet) AS media_valor_un
        FROM pedido_compra_item pci
            INNER JOIN item i
                on i.codigo_item = pci.item_pdcitem
            INNER JOIN pedido_compra_item_detalhe pcid
                on pcid.autoincpdcitem_pdcitemdet = pci.autoinc_pdcitem
            WHERE pcid.qtdeaberta_pdcitemdet > 0
        GROUP BY
            pci.item_pdcitem,
            i.descricao_item
      `;

      const params: any[] = [];

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
