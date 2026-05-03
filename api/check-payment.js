export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'payment_id obrigatório' });
  }

  try {
    const response = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erro Mercado Pago:', errorText);
      return res.status(500).json({ error: 'Erro ao consultar pagamento' });
    }

    const data = await response.json();

    return res.status(200).json({
      status: data.status,
      valor: data.transaction_amount || 0,
      tipo: data.metadata?.tipo || 'individual'
    });

  } catch (error) {
    console.error('Erro interno:', error);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
}
