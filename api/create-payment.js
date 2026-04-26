export default async function handler(req, res) {
  try {
    const { tipo } = req.query;

    let price = 120;
    let title = "Sessão de Terapia - Yesica Peinado";

    if (tipo === "mensal") {
      price = 360;
      title = "Acompanhamento Mensal - Yesica Peinado";
    }

    const preference = {
      items: [
        {
          title,
          quantity: 1,
          unit_price: price,
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
