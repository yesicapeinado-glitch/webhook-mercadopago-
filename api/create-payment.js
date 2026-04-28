import mercadopago from "mercadopago";

mercadopago.configurations.setAccessToken(process.env.MP_ACCESS_TOKEN);

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

    const response = await mercadopago.preferences.create({
      items: [
        {
          title: produto.title,
          unit_price: produto.price,
          quantity: 1,
          currency_id: "BRL"
        }
      ],

      back_urls: {
        success: `https://yesicapeinadotransforma.com/obrigado?tipo=${tipo}&gclid=${gclid || ''}`,
        failure: "https://yesicapeinadotransforma.com/erro",
        pending: "https://yesicapeinadotransforma.com/pendente"
      },

      auto_return: "approved",

      metadata: {
        tipo: tipo,
        gclid: gclid || null
      }
    });

    // 🔥 REDIRECIONA DIRETO PARA O CHECKOUT
    return res.redirect(response.body.init_point);

  } catch (error) {
    console.error("ERRO REAL:", error);
    return res.status(500).json({ erro: "Erro ao criar pagamento" });
  }
}
