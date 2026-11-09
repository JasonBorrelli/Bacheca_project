const formatoEuro = new Intl.NumberFormat('it-IT', {
  style: 'currency',
  currency: 'EUR',
})

export const formattaPrezzo = (prezzo) => {
  if (prezzo === null || prezzo === undefined || prezzo === '') {
    return 'Da concordare'
  }

  const numero = Number(prezzo)
  if (!Number.isFinite(numero)) {
    return 'Da concordare'
  }

  return formatoEuro.format(numero)
}
