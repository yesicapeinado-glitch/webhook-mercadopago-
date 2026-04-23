export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const data = req.body;

      console.log('Pagamento recebido:', data);

      // Aqui você pode validar o pagamento
      if (data.type === 'payment') {
        
        // Simulação: pagamento aprovado
        console.log('Pagamento confirmado!');

        // Aqui você vai integrar com Google Ads depois

      }

      return res.status(200).json({ received: true });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro no webhook' });
    }
  }

  res.status(405).json({ message: 'Método não permitido' });
}
