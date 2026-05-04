export default async function handler(req, res) {
  try {
    console.log("Webhook recebido");

    return res.status(200).json({ ok: true });

  } catch (error) {
    console.error("Erro webhook:", error);
    return res.status(500).json({ erro: "erro webhook" });
  }
}
