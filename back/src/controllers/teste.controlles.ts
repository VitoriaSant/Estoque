import Firebird from 'node-firebird';
import options from '../database/conection';

export default class ComprasPendentesController {
  public get(req: any, res: any): void {
    Firebird.attach(options, (err: any, db: any) => {
      res.json({ message: 'Teste de conexao funcionando!' });
    });
  }
}
