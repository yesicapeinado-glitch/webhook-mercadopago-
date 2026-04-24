export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const data = req.body;

    console.log('🔔 Webhook recebido:', JSON.stringify(data, null, 2));

    if (data?.type === 'payment' || data?.action?.includes('payment')) {
      console.log('💰 Evento de pagamento detectado');

      const paymentId = data?.data?.id;

      console.log('🧾 Payment ID:', paymentId);
    }

    return res.status(200).json({ ok: true });

  } catch (error) {
    console.error('❌ Erro no webhook:', error);
    return res.status(500).json({ error: 'Erro no webhook' });
  }
}
