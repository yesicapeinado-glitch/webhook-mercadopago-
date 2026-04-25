import mercadopago from "mercadopago";

mercadopago.configure({
  access_token: "APP_USR-4095066286833133-042515-8e4fb68f324b4bfdc99860b2514250dd-3360219462",
});

export default async function handler(req, res) {
  try {
    const preference = {
      items: [
        {
          title: "Sessão de Terapia - Jéssica Peinado",
          quantity: 1,
          unit_price: 100,
        },
      ],
      back_urls: {
        success: "https://webhook-mercadopago-ten.vercel.app/obrigado",
        failure: "https://webhook-mercadopago-ten.vercel.app/erro",
        pending: "https://webhook-mercadopago-ten.vercel.app/pendente",
      },
      auto_return: "approved",
    };

    const response = await mercadopago.preferences.create(preference);

    return res.status(200).json({
      link_pagamento: response.body.init_point,
    });

  } catch (error) {
    console.error("ERRO:", error);
    return res.status(500).json({
      erro: "Erro ao criar pagamento",
      detalhe: error.message,
    });
  }
}
