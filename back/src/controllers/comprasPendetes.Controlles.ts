export default class ComprasPendentesController {
    public get(req: any, res: any): void {
        res.json({ message: 'Compras pendentes' });
    }
}