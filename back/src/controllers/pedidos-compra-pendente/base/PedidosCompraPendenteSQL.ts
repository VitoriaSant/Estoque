type TJoin = 'LEFT JOIN' | 'INNER JOIN' | 'RIGHT JOIN';
type TOperador = '=' | '<>' | 'LIKE';

const PedidosCompraPendenteSQL = {
  JOIN_ACABAMENTO: (pJoin: TJoin) => `
    ${pJoin} acabamento
      ON acabamento.codigo_acabamento = pedido_compra_item.acabamento_pdcitem
  `,
  JOIN_COR: (pJoin: TJoin) => `
    ${pJoin} cor
      ON cor.codigo_cor = pedido_compra_item.cor_pdcitem
  `,
  JOIN_VARIACAO: (pJoin: TJoin) => `
    ${pJoin} variacao
      ON variacao.codigo_variacao = pedido_compra_item.variacao_pdcitem
  `,
  JOIN_ITEM: (pJoin: TJoin) => `
    ${pJoin} item
      ON item.codigo_item = pedido_compra_item.item_pdcitem
  `,
  JOIN_PESSOA: (pJoin: TJoin) => `
    ${pJoin} pessoa
      ON pessoa.codigo_pessoa = pedido_compra.fornecedor_pdc
  `,
  JOIN_PEDIDO_COMPRA: (pJoin: TJoin) => `
    ${pJoin} pedido_compra
      ON pedido_compra.codigo_pdc = pedido_compra_item.autoincpedido_pdcitem
  `,
  WHERE_ID_FORNECEDO: (pOperador: TOperador) => `
    AND pedido_compra.fornecedor_pdc ${pOperador} ?
  `,
  WHERE_DESCRICAO_FORNECEDOR: (pOperador: TOperador) => `
    AND pessoa.razaosocial_pessoa ${pOperador} ?
  `,
  WHERE_ID_ITEM: (pOperador: TOperador) => `
    AND item.codigo_item ${pOperador} ?
  `,
  WHERE_DESCRICAO_ITEM: (pOperador: TOperador) => `
    AND item.descricao_item ${pOperador} ?
  `,
  WHERE_ID_VARIACAO: (pOperador: TOperador) => `
    AND pedido_compra_item.variacao_pdcitem ${pOperador} ?
  `,
  WHERE_DESCRICAO_VARIACAO: (pOperador: TOperador) => `
    AND variacao.descricao_variacao ${pOperador} ?
  `,
  WHERE_ID_COR: (pOperador: TOperador) => `
    AND pedido_compra_item.cor_pdcitem ${pOperador} ?
  `,
  WHERE_DESCRICAO_COR: (pOperador: TOperador) => `
    AND cor.descricao_cor ${pOperador} ?
  `,
  WHERE_ID_ACABAMENTO: (pOperador: TOperador) => `
    AND pedido_compra_item.acabamento_pdcitem ${pOperador} ?
  `,
  WHERE_DESCRICAO_ACABAMENTO: (pOperador: TOperador) => `
    AND acabamento.descricao_acabamento ${pOperador} ?
  `,
  WHERE_DATA_EMISSAO: () => `
    AND dtemissao_pdc >= ? AND dtpreventrega_pdc <= ?
  `,
};

export default PedidosCompraPendenteSQL;
