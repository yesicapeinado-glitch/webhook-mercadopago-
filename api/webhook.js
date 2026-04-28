import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  try {
    const data = req.body;

    console.log("📩 Webhook recebido:", JSON.stringify(data, null, 2));

    // 👉 Verifica se é evento de pagamento
    if (data.type === "payment") {

      const paymentId = data.data.id;

      console.log("💰 ID do pagamento:", paymentId);

      // 🔐 Token vem da Vercel (já configurado)
      const MP_TOKEN = process.env.MP_ACCESS_TOKEN;

      // 🔎 Busca dados do pagamento no Mercado Pago
      const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${MP_TOKEN}`
        }
      });

      const pagamento = await response.json();

      console.log("📊 Status:", pagamento.status);

      // ✅ Só dispara se pagamento aprovado
      if (pagamento.status === "approved") {

        const valor = pagamento.transaction_amount || 0;

        console.log("✅ Pagamento aprovado:", valor);

        // 🔥 DADOS DO GOOGLE ADS
        const CONVERSION_ID = "17622796473";
        const LABEL = "JNa0CPqbzqEcELmRmtNB";

        // 🚀 ENVIA CONVERSÃO
        const url = `https://www.googleadservices.com/pagead/conversion/${CONVERSION_ID}/?label=${LABEL}&value=${valor}&currency_code=BRL`;

        await fetch(url, { method: "GET" });

        console.log("🚀 Conversão enviada para Google Ads!");
      }
    }

    return res.status(200).json({ ok: true });

  } catch (error) {
    console.error("❌ Erro no webhook:", error);
    return res.status(500).json({ error: "Erro interno" });
  }
}
