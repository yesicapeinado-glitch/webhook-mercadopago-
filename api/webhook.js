export default async function handler(req, res) {
  // Só aceita POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const data = req.body;

    console.log('🔔 Webhook recebido:', JSON.stringify(data, null, 2));

    // Verifica se é evento de pagamento
    if (data?.type === 'payment' || data?.action?.includes('payment')) {
      console.log('💰 Evento de pagamento detectado');

      // Aqui você pode pegar o ID do pagamento
      const paymentId = data?.data?.id;

      console.log('🧾 Payment ID:', paymentId);

      // ⚠️ FUTURO:
      // Aqui você deve consultar a API do Mercado Pago
      // para confirmar se o pagamento foi realmente aprovado

      // Exemplo de status fictício
      console.log('✅ Pagamento confirmado (simulação)');
    }

    // SEMPRE responder 200 pro Mercado Pago
    return res.status(200).json({ ok: true });

  } catch (error) {
    console.error('❌ Erro no webhook:', error);
    return res.status(500).json({ error: 'Erro no webhook' });
  }
}
