import mercadopago from "mercadopago";

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

export default async function handler(req, res) {
  try {
    const { tipo } = req.query;

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

      back_urls: {
        success: "https://yesicapeinadotransforma.com/obrigado/",
        failure: "https://yesicapeinadotransforma.com/obrigado/",
        pending: "https://yesicapeinadotransforma.com/obrigado/",
      },

      auto_return: "approved",
    };

    const response = await mercadopago.preferences.create(preference);

    return res.redirect(response.body.init_point);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: "Erro ao criar pagamento",
    });
  }
}
