import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  try {
    const data = req.body;

    console.log("📩 Webhook recebido:", JSON.stringify(data, null, 2));

    // 🔎 Verifica se é evento de pagamento
    if (data.type === "payment") {

      const paymentId = data.data.id;

      console.log("💰 ID pagamento:", paymentId);

      // 🔐 Token Mercado Pago (coloca na Vercel ENV)
      const MP_TOKEN = process.env.MP_ACCESS_TOKEN;

      // 🔎 Consulta pagamento no Mercado Pago
      const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${MP_TOKEN}`
        }
      });

      const pagamento = await response.json();

      console.log("📊 Status pagamento:", pagamento.status);

      // ✅ Só dispara conversão se aprovado
      if (pagamento.status === "approved") {

        const valor = pagamento.transaction_amount;

        console.log("✅ Pagamento aprovado:", valor);

        // 🔥 ENVIA CONVERSÃO PRO GOOGLE ADS
        const GOOGLE_CONVERSION_ID = "17622796473";
        const GOOGLE_LABEL = "JNa0CPqbzqEcELmRmtNB";

        await fetch(`https://www.googleadservices.com/pagead/conversion/${GOOGLE_CONVERSION_ID}/?label=${GOOGLE_LABEL}&value=${valor}&currency_code=BRL`, {
          method: "GET"
        });

        console.log("🚀 Conversão enviada para Google Ads!");
      }
    }

    return res.status(200).json({ ok: true });

  } catch (error) {
    console.error("❌ Erro webhook:", error);
    return res.status(500).json({ error: "Erro interno" });
  }
}
