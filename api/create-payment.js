import mercadopago from "mercadopago";

mercadopago.configure({
  access_token: "SEU_ACCESS_TOKEN_AQUI",
});

export default async function handler(req, res) {
  try {
    const preference = {
      items: [
        {
          title: "Sessão de Terapia",
          quantity: 1,
          unit_price: 100,
        },
      ],
      back_urls: {
        success: "https://SEU-DOMINIO.com/obrigado",
        failure: "https://SEU-DOMINIO.com/erro",
        pending: "https://SEU-DOMINIO.com/pendente",
      },
      auto_return: "approved",
    };

    const response = await mercadopago.preferences.create(preference);

    return res.status(200).json({
      link: response.body.init_point,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao criar pagamento" });
  }
}
