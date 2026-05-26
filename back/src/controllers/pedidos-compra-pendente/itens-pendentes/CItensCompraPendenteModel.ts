export default class CItensCompraPendente {
	itemPdc: number = 0;
	descricaoItem: string = '';
	quantidadeItensPendentes: number = 0;
	valorTotalPendente: number = 0;
	mediaValorUn: number = 0;

    private constructor(data: Partial<CItensCompraPendente>) {   '
        Object.assign(this, data);
    }
}