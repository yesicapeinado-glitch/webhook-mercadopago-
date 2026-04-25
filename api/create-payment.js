import mercadopago from "mercadopago";

mercadopago.configure({
  access_token: "COLE_SEU_ACCESS_TOKEN_AQUI",
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
        success: "https://projeto-4n8d1.vercel.app/obrigado",
        failure: "https://projeto-4n8d1.vercel.app/erro",
        pending: "https://projeto-4n8d1.vercel.app/pendente",
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
    });
  }
}
