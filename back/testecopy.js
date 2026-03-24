const Firebird = require("node-firebird");

const options = {
    host: "DESKTOP-OTFSD0S",
    port: 3050,
    database: "C:/Users/Vitoria/Desktop/Tek/DADOSMC.FDB",
    user: "SYSDBA",
    password: "masterkey"
};

Firebird.attach(options, function (err, db) {
    if (err) return console.log(err);

    db.query("select pedido_compra.codigo_pdc, pedido_compra.empresa_pdc, pedido_compra.dtemissao_pdc, pedido_compra.dtpreventrega_pdc, pedido_compra.fornecedor_pdc, pessoa.razaosocial_pessoa, pedido_compra_item.item_pdcitem, item.descricao_item, pedido_compra_item.variacao_pdcitem, variacao.descricao_variacao, pedido_compra_item.cor_pdcitem, cor.descricao_cor, pedido_compra_item.acabamento_pdcitem, acabamento.descricao_acabamento, pedido_compra_item_detalhe.qtdeaberta_pdcitemdet, pedido_compra_item_detalhe.vlrunitarioliquido_pdcitemdet from pedido_compra left join pedido_compra_item on pedido_compra_item.autoincpedido_pdcitem = pedido_compra.codigo_pdc  join pedido_compra_item_detalhe  on pedido_compra_item_detalhe.autoincpdcitem_pdcitemdet = pedido_compra_item.autoinc_pdcitem left join item on item.codigo_item = pedido_compra_item.item_pdcitem left join variacao on variacao.codigo_variacao = pedido_compra_item.variacao_pdcitem left join cor on cor.codigo_cor = pedido_compra_item.cor_pdcitem left join acabamento on acabamento.codigo_acabamento = pedido_compra_item.acabamento_pdcitem left join pessoa on pessoa.codigo_pessoa = pedido_compra.fornecedor_pdc where pedido_compra_item_detalhe.qtdeaberta_pdcitemdet > 0 ",function (err, result) {
        if (err) return console.log(err);

        console.log(result);

        db.detach();
    });
});