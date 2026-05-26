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

export default class PedidoCompraPendenteController {
  public async PedidoCompraPendente(req: Request, res: Response): Promise<void> {
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
            pc.codigo_pdc,
            pc.dtpreventrega_pdc,
            SUM(pcid.qtdeaberta_pdcitemdet * pcid.vlrunitarioliquido_pdcitemdet) AS valor_total_pendente
        FROM pedido_compra pc
            INNER JOIN pedido_compra_item pci
                on pci.autoincpedido_pdcitem = pc.codigo_pdc
            INNER JOIN pedido_compra_item_detalhe pcid
                on pcid.autoincpdcitem_pdcitemdet = pci.autoinc_pdcitem
            WHERE pcid.qtdeaberta_pdcitemdet > 0
        GROUP BY
            pc.codigo_pdc,
            pc.dtpreventrega_pdc

      `;

      const params: any[] = [];

      console.log('Query:', query);
      console.log('Params:', params);

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
