import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

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

    const preference = new Preference(client);

    const response = await preference.create({
      body: {
        items: [
          {
            title: produto.title,
            unit_price: produto.price,
            quantity: 1,
            currency_id: "BRL"
          }
        ],
        back_urls: {
          success: `https://yesicapeinadotransforma.com/obrigado`,
          failure: `https://yesicapeinadotransforma.com/erro`,
          pending: `https://yesicapeinadotransforma.com/pendente`
        },
        auto_return: "approved",
        notification_url: "https://webhook-mercadopago-ten.vercel.app/api/webhook"
      }
    });

    return res.redirect(response.init_point);

  } catch (error) {
    console.error("ERRO:", error);
    return res.status(500).json({ erro: error.message });
  }
}
