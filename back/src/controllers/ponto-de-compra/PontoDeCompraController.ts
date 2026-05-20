//express
import { Request, response, Response } from 'express';
//Classes
import CClasseFiltro, { CFiltro } from '../base/CClasseFiltro';
//Model
import CPontoDeCompraModel from './CPontoDeCompraModel';
//Node
import * as fs from 'fs';
import * as path from 'path';

// Função auxiliar para converter strings no formato brasileiro para números
function convertBrasilianStringToNumber(value: any): number {
  if (value === null || value === undefined || value === '') return 0;
  if (typeof value === 'number') return value;
  // Remove pontos de milhar e substitui vírgula decimal por ponto
  const cleanValue = value.toString().replace(/\./g, '').replace(',', '.');
  const numValue = parseFloat(cleanValue);
  return isNaN(numValue) ? 0 : numValue;
}

export default class PontoDeCompraController {
  public pontoDeCompra(req: Request, res: Response): void {
    try {
      // Ler o arquivo JSON de dados
      const jsonPath = path.join(__dirname, '../../database/ponto-de-compra/PontoDeCompra.json');
      const jsonData = fs.readFileSync(jsonPath, 'utf8');
      let result = JSON.parse(jsonData);

      // Aplicar filtros se existirem
      const classeFiltro = new CClasseFiltro<CPontoDeCompraModel>(req.body) as CClasseFiltro<CPontoDeCompraModel>;

      const dataInicio = classeFiltro.dataInicio;
      const dataFim = classeFiltro.dataFim;

      if (dataInicio && dataFim) {
        dataInicio.setHours(0, 0, 0, 0);
        dataFim.setHours(23, 59, 59, 999);

        result = result.filter((item: any) => {
          const dataPrevisaoEmissao = new Date(item.DTEMISSAO_PDC);
          if (!dataPrevisaoEmissao) return false;
          const valor = dataPrevisaoEmissao >= dataInicio && dataPrevisaoEmissao <= dataFim;
          return valor;
        });
      }

      for (const filtro of classeFiltro.filtros) {
        if (filtro.campo == 'fornecedorId') {
          result = result.filter((item: any) => {
            const valor =
              filtro.operador == 'CONTEM'
                ? item.FORNECEDOR_PDC?.toString().includes(filtro.valor)
                : item.FORNECEDOR_PDC == filtro.valor;
            return valor;
          });
        }

        if (filtro.campo == 'razaoSocialFornecedor') {
          result = result.filter((item: any) => {
            const valor =
              filtro.operador == 'CONTEM'
                ? item.RAZAOSOCIAL_PESSOA?.toString().includes(filtro.valor)
                : item.RAZAOSOCIAL_PESSOA == filtro.valor;
            return valor;
          });
        }

        if (filtro.campo == 'itemId') {
          result = result.filter((item: any) => {
            const valor =
              filtro.operador == 'CONTEM'
                ? item.ITEM_ITEM_SALDO?.toString().includes(filtro.valor)
                : item.ITEM_ITEM_SALDO == filtro.valor;
            return valor;
          });
        }

        if (filtro.campo == 'descricaoItem') {
          result = result.filter((item: any) => {
            const valor =
              filtro.operador == 'CONTEM'
                ? item.DESCRICAO_ITEM?.toString().toLowerCase().includes(filtro.valor.toLowerCase())
                : item.DESCRICAO_ITEM == filtro.valor;
            return valor;
          });
        }

        if (filtro.campo == 'corId') {
          result = result.filter((item: any) => {
            const valor =
              filtro.operador == 'CONTEM'
                ? item.COR_ITEM_SALDO?.toString().includes(filtro.valor)
                : item.COR_ITEM_SALDO == filtro.valor;
            return valor;
          });
        }

        if (filtro.campo == 'descricaoCor') {
          result = result.filter((item: any) => {
            const valor =
              filtro.operador == 'CONTEM'
                ? item.DESCRICAO_COR?.toString().toLowerCase().includes(filtro.valor.toLowerCase())
                : item.DESCRICAO_COR == filtro.valor;
            return valor;
          });
        }

        if (filtro.campo == 'variacaoId') {
          result = result.filter((item: any) => {
            const valor =
              filtro.operador == 'CONTEM'
                ? item.VARIACAO_ITEM_SALDO?.toString().includes(filtro.valor)
                : item.VARIACAO_ITEM_SALDO == filtro.valor;
            return valor;
          });
        }

        if (filtro.campo == 'descricaoVariacao') {
          result = result.filter((item: any) => {
            const valor =
              filtro.operador == 'CONTEM'
                ? item.DESCRICAO_VARIACAO?.toString().toLowerCase().includes(filtro.valor.toLowerCase())
                : item.DESCRICAO_VARIACAO == filtro.valor;
            return valor;
          });
        }

        if (filtro.campo == 'acabamentoId') {
          result = result.filter((item: any) => {
            const valor =
              filtro.operador == 'CONTEM'
                ? item.ACABAMENTO_ITEM_SALDO?.toString().includes(filtro.valor)
                : item.ACABAMENTO_ITEM_SALDO == filtro.valor;
            return valor;
          });
        }

        if (filtro.campo == 'descricaoAcabamento') {
          result = result.filter((item: any) => {
            const valor =
              filtro.operador == 'CONTEM'
                ? item.DESCRICAO_ACABAMENTO?.toString().toLowerCase().includes(filtro.valor.toLowerCase())
                : item.DESCRICAO_ACABAMENTO == filtro.valor;
            return valor;
          });
        }
      }

      try {
        //----------------------------------------------------------------------------------------------------
        // Contagem de valores: Valor todol em estoque, Valor de pedido pendente, Valor total
        //----------------------------------------------------------------------------------------------------
        const valorTotalEmEstoque = result.reduce((acc: number, item: any) => {
          const custo = convertBrasilianStringToNumber(item.CUSTOCOMPRAATUAL_ITEM_SALDO);
          const saldo = convertBrasilianStringToNumber(item.SALDOATUAL_ITEM_SALDO);
          return acc + custo * saldo;
        }, 0);

        const valorTotalDePedidosPendentes = result.reduce((acc: number, item: any) => {
          const qtde = convertBrasilianStringToNumber(item.QTDEABERTA_PDCITEMDET);
          const valor = convertBrasilianStringToNumber(item.VLRUNITARIOLIQUIDO_PDCITEMDET);
          return acc + qtde * valor;
        }, 0);

        const valorTotal = valorTotalEmEstoque + valorTotalDePedidosPendentes;
        //----------------------------------------------------------------------------------------------------
        // Relatorio de ponto de compra
        //----------------------------------------------------------------------------------------------------
        const pontoDeCompra = result.reduce((acc: any, item: any) => {
          const itemId = item.ITEM_ITEM_SALDO;
          const descricaoItem = item.DESCRICAO_ITEM;
          const reqId = item.AUTOINC_REQEST;
          const saldoDisponivel = convertBrasilianStringToNumber(item.SALDOATUAL_ITEM_SALDO);
          const saldoMinimo = convertBrasilianStringToNumber(item.ESTOQUEMINIMO_ITEM_SALDO);
          const saldoMaximo = convertBrasilianStringToNumber(item.ESTOQUEMAXIMO_ITEM_SALDO);
          const quantidadePedido = convertBrasilianStringToNumber(item.QTDEABERTA_PDCITEMDET);

          const hoje = new Date();
          hoje.setHours(0, 0, 0, 0);

          //Pedido de compra pendente por item
          if (!acc[itemId]) {
            acc[itemId] = {
              itemId,
              descricaoItem,
              saldoDisponivel,
              saldoMinimo,
              saldoMaximo,
              pedidoCompraPendente: 0,
              prazoEntrega: 0,
              consumoDiario: 0,
              diasDeDuracao: 0,
              corDeAlerta: '',
              requisicoesProcessadas: new Set(),
              _valorAcumulado: 0,
              _contagemReq: 0,
            };
          }

          //----------------------------------------------------------------------------------------------------
          // Somar quantidade do pedido pendente
          //----------------------------------------------------------------------------------------------------
          acc[itemId].pedidoCompraPendente += quantidadePedido;

          //----------------------------------------------------------------------------------------------------
          // Calcular prazo de entrega em dias
          //----------------------------------------------------------------------------------------------------
          let prazoEntregaDias = 0;

          if (item.DTEMISSAO_PDC) {
            // Tratando a string "23.10.2026 00:00"
            const partes = item.DTEMISSAO_PDC.split(/[. ]/);
            const dataValida = new Date(`${partes[2]}-${partes[1]}-${partes[0]}T${partes[3]}`);
            // Verifica se a conversão deu certo
            if (!isNaN(dataValida.getTime())) {
              const diferencaTempo = Math.abs(hoje.getTime() - dataValida.getTime());
              prazoEntregaDias = Math.ceil(diferencaTempo / (1000 * 60 * 60 * 24));
            }
          }

          acc[itemId].prazoEntrega = prazoEntregaDias;

          //----------------------------------------------------------------------------------------------------
          // Calcular consumo diario nos ultimos 90 dias
          //----------------------------------------------------------------------------------------------------
          const noventaDiasAtras = new Date(hoje);
          noventaDiasAtras.setDate(hoje.getDate() - 90);
          const dataString = item.DATA_REQEST;

          if (dataString) {
            const partes = dataString.split(/[. ]/);
            const dataValida = new Date(`${partes[2]}-${partes[1]}-${partes[0]}T${partes[3] || '00:00'}`);

            if (!isNaN(dataValida.getTime())) {
              if (dataValida >= noventaDiasAtras) {
                if (!acc[itemId].requisicoesProcessadas.has(reqId)) {
                  //acc[itemId].requisicoesProcessadas.add(reqId);

                  const valorAtual = convertBrasilianStringToNumber(item.QTDEREQUISICAO_ITEMREQ);
                  acc[itemId]._valorAcumulado += valorAtual;
                  acc[itemId]._contagemReq += 1;

                  acc[itemId].consumoDiario = acc[itemId]._valorAcumulado / 90;
                }
              }
            }
          }

          //----------------------------------------------------------------------------------------------------
          // Calcular dias de duração
          //----------------------------------------------------------------------------------------------------
          const diasDeDuracao =
            acc[itemId].consumoDiario > 0 ? acc[itemId].saldoDisponivel / acc[itemId].consumoDiario : 0;
          acc[itemId].diasDeDuracao = diasDeDuracao;

          //----------------------------------------------------------------------------------------------------
          // Validar cor de alerta
          //----------------------------------------------------------------------------------------------------
          const metadeDoMaximo = acc[itemId].saldoMaximo / 2;
          if (acc[itemId].saldoDisponivel < acc[itemId].saldoMinimo) {
            acc[itemId].corDeAlerta = 'Vermelho';
          } else if (acc[itemId].saldoDisponivel < metadeDoMaximo) {
            acc[itemId].corDeAlerta = 'Amarelo';
          }

          return acc;
        }, {});
        //----------------------------------------------------------------------------------------------------
        // Transforma o Relatorio de ponto de compra em array
        //----------------------------------------------------------------------------------------------------
        const listaPontoDeCompra = Object.values(pontoDeCompra).map((item: any) => ({
          itemId: item.itemId,
          descricaoItem: item.descricaoItem,
          saldoDisponivel: Number((item.saldoDisponivel || 0).toFixed(2)),
          saldoMinimo: Number((item.saldoMinimo || 0).toFixed(2)),
          saldoMaximo: Number((item.saldoMaximo || 0).toFixed(2)),
          pedidoCompraPendente: Number((item.pedidoCompraPendente || 0).toFixed(2)),
          prazoEntrega: Number((item.prazoEntrega || 0).toFixed(2)),
          consumoDiario: Number((item.consumoDiario || 0).toFixed(2)),
          diasDeDuracao: Number((item.diasDeDuracao || 0).toFixed(2)),
          corDeAlerta: item.corDeAlerta || '',
        }));
        //----------------------------------------------------------------------------------------------------
        // Consumo nos ultimos 12 meses
        //----------------------------------------------------------------------------------------------------
        const consumoUltimos12Meses: Record<string, any> = {};
        const hojeConsumo = new Date();

        // Cria os 12 meses
        for (let i = 11; i >= 0; i--) {
          // Calcula a data do mês
          const data = new Date(hojeConsumo.getFullYear(), hojeConsumo.getMonth() - i, 1);
          // Cria a chave no formato YYYY-MM
          const chave = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}`;

          // Adiciona o mês ao objeto
          consumoUltimos12Meses[chave] = {
            chave,
            mes: String(data.getMonth() + 1).padStart(2, '0'),
            ano: data.getFullYear(),
            total: 0,
          };
        }
        // Preenche os valores de consumo
        result.forEach((item: any) => {
          if (!item.DATA_REQEST) return;
          // Converte a data para Date
          const dataRequisicao = new Date(item.DATA_REQEST);
          if (isNaN(dataRequisicao.getTime())) return;

          // Cria a chave no formato YYYY-MM
          const chave = `${dataRequisicao.getFullYear()}-${String(dataRequisicao.getMonth() + 1).padStart(2, '0')}`;
          const mesEncontrado = consumoUltimos12Meses[chave];

          // Adiciona o consumo ao mês
          if (mesEncontrado) {
            mesEncontrado.total += convertBrasilianStringToNumber(item.QTDEREQUISICAO_ITEMREQ);
          }
        });
        // Converte para array
        const ultimos12MesesArray = Object.values(consumoUltimos12Meses).map((item: any) => ({
          mes: item.mes,
          ano: item.ano,
          total: Number(item.total.toFixed(2)),
        }));

        //----------------------------------------------------------------------------------------------------
        // Response
        //----------------------------------------------------------------------------------------------------
        const response = {
          resumo: {
            valorTotalEmEstoque: Number((valorTotalEmEstoque || 0).toFixed(2)),
            valorTotalDePedidosPendentes: Number((valorTotalDePedidosPendentes || 0).toFixed(2)),
            valorTotal: Number((valorTotal || 0).toFixed(2)),
          },
          //dados: result,
          pontoDeCompra: listaPontoDeCompra,
          consumoUltimos12Meses: ultimos12MesesArray,
        };

        res.json(response);
      } catch (error) {
        console.error('Error processing data:', error);
        res.status(500).json({ error: 'Erro ao processar dados' });
      }
    } catch (error) {
      console.error('Error reading file:', error);
      res.status(500).json({ error: 'Erro ao ler arquivo de dados' });
    }
  }
}
