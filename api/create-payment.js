export default async function handler(req, res) {
  try {
    const { tipo, gclid } = req.query;

    const produtos = {
      individual: {
        price: 120,
        title: "Sessão de Terapia - Yesica Peinado"
      },
      mensal: {
        price: 360,
        title: "Acompanhamento Mensal - Yesica Peinado"
      }
    };

    const produto = produtos[tipo] || produtos.individual;

    const preference = {
      items: [
        {
          title: produto.title,
          quantity: 1,
          unit_price: produto.price,
          currency_id: "BRL",
        },
      ],

      metadata: {
        gclid: gclid || null
      },

      back_urls: {
        success: "https://yesicapeinadotransforma.com/obrigado/",
        failure: "https://yesicapeinadotransforma.com/falho/",
        pending: "https://yesicapeinadotransforma.com/pendente/",
      },

      auto_return: "approved",
    };

    const response = await mercadopago.preferences.create(preference);

    return res.redirect(response.body.init_point);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro ao criar pagamento" });
  }
}
