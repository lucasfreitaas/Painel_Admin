/**
 * Tabela de apostadores para um competidor com ODD e retorno esperado.
 * Recebe dados já processados do GameCard (sem hook próprio).
 */
export default function BettorsTable({ apostas, odd, label, loading, onSetPago, onDeleteAposta }) {
  const total = apostas.reduce((acc, a) => acc + (Number(a.valor) || 0), 0)
  const retornoTotal = total * odd

  return (
    <div className="flex-1 min-w-0">
      {/* Cabeçalho do competidor */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Apostando em
          </p>
          <p className="text-sm font-bold text-gray-800 truncate">{label}</p>
        </div>
        {/* Badge de ODD */}
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg
                         bg-brand-50 border border-brand-100 text-brand-700
                         text-xs font-black tracking-tight flex-shrink-0">
          ODD {odd.toFixed(2)}x
        </span>
      </div>

      {/* Tabela */}
      <div className="rounded-xl border border-gray-100 overflow-x-auto">
        <table className="w-full text-sm min-w-[200px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-2 py-2 text-[10px] font-semibold text-gray-500 uppercase tracking-wide">
                Apostador
              </th>
              <th className="text-right px-2 py-2 text-[10px] font-semibold text-gray-500 uppercase tracking-wide">
                Valor
              </th>
              <th className="text-right px-2 py-2 text-[10px] font-semibold text-gray-500 uppercase tracking-wide">
                A Receber
              </th>
              <th className="text-center px-2 py-2 text-[10px] font-semibold text-gray-500 uppercase tracking-wide">
                Pago?
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-400 text-xs">
                  Carregando…
                </td>
              </tr>
            ) : apostas.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-5 text-gray-400 text-xs">
                  Nenhuma aposta ainda
                </td>
              </tr>
            ) : (
              apostas.map((a) => {
                const retorno = Number(a.valor) * odd
                return (
                  <tr
                    key={a.id}
                    className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors"
                  >
                    <td className="px-2 py-2 text-xs font-medium text-gray-700 truncate max-w-[80px]" title={a.nomeApostador}>
                      {a.nomeApostador}
                    </td>
                    <td className="px-2 py-2 text-right text-xs font-semibold text-gray-600 whitespace-nowrap">
                      {Number(a.valor).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </td>
                    <td className="px-2 py-2 text-right text-xs font-bold text-emerald-600 whitespace-nowrap">
                      {retorno.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </td>
                    <td className="px-2 py-2 text-center whitespace-nowrap">
                      {a.pago ? (
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Pago ✓</span>
                      ) : (
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => onSetPago(a.id)}
                            className="p-1 rounded-md text-emerald-600 hover:bg-emerald-50 transition-colors"
                            title="Marcar como Pago"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                          <button
                            onClick={() => onDeleteAposta(a.id, a.nomeApostador)}
                            className="p-1 rounded-md text-red-600 hover:bg-red-50 transition-colors"
                            title="Aposta não paga (Remover)"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
          {apostas.length > 0 && (
            <tfoot>
              <tr className="bg-brand-50 border-t border-brand-100">
                <td className="px-2 py-2 text-[10px] font-bold text-brand-700 uppercase tracking-wide">
                  Total
                </td>
                <td className="px-2 py-2 text-right text-xs font-bold text-brand-700 whitespace-nowrap">
                  {total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </td>
                <td className="px-2 py-2 text-right text-xs font-bold text-emerald-700 whitespace-nowrap">
                  {retornoTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </td>
                <td></td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  )
}
