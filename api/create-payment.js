import mercadopago from "mercadopago";

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN, // 🔒 segurança correta
});

export default async function handler(req, res) {
  try {
    const preference = {
      items: [
        {
          title: "Sessão de Terapia - Jéssica Peinado",
          quantity: 1,
          unit_price: 100,
          currency_id: "BRL",
        },
      ],
      back_urls: {
        success: "https://yesicapeinatotransforma.com/obrigado/",
        failure: "https://yesicapeinatotransforma.com/erro",
        pending: "https://yesicapeinatotransforma.com/pendente",
      },
      auto_return: "approved",
    };

    const response = await mercadopago.preferences.create(preference);

    res.status(200).json({
      link_pagamento: response.body.init_point,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
