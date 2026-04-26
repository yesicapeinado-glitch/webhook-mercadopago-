import mercadopago from "mercadopago";

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

export default async function handler(req, res) {
  try {
    const preference = {
      items: [
        {
          title: "Sessão de Terapia - yesica Peinado",
          quantity: 1,
          unit_price: 120,
          currency_id: "BRL",
        },
      ],

      back_urls: {
        success: "https://yesicapeinadotransforma.com/obrigado/",
        failure: "https://yesicapeinadotransforma.com/obrigado/",
        pending: "https://yesicapeinadotransforma.com/obrigado//",
      },

      auto_return: "approved",
    };

    const response = await mercadopago.preferences.create(preference);

    return res.status(200).json({
      link_pagamento: response.body.init_point,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: "Erro ao criar pagamento",
      detalhe: error.message,
    });
  }
}
