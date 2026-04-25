export default async function handler(req, res) {
  // Aceita apenas POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const data = req.body;

    console.log('🔔 Webhook recebido:', JSON.stringify(data, null, 2));

    // Verifica se é evento de pagamento
    if (
      data?.type === 'payment' ||
      data?.action?.includes('payment')
    ) {
      console.log('💰 Evento de pagamento detectado');

      const paymentId = data?.data?.id;

      console.log('🧾 Payment ID:', paymentId);

      // Aqui você pode futuramente validar no Mercado Pago API
    }

    return res.status(200).json({ ok: true });

  } catch (error) {
    console.error('❌ Erro no webhook:', error);
    return res.status(500).json({ error: 'Erro interno' });
  }
}

// deploy trigger
