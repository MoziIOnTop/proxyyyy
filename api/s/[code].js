// api/s/[code].js
export default async function handler(req, res) {
  try {
    const { code, user } = req.query;

    if (!user) {
      return res.status(400).send("Missing user");
    }

    const railwayHost = process.env.RAILWAY_HOST;

    if (!railwayHost) {
      return res.status(500).send("Server not configured");
    }

    // Link đích thật ở Railway (UI SellAll/panel của bạn)
    const target = `${railwayHost}/panel?user=${encodeURIComponent(
      user
    )}&cmd=${encodeURIComponent("sellall")}`;

    // Redirect 302
    res.writeHead(302, { Location: target });
    res.end();
  } catch (e) {
    console.error("Redirect error:", e);
    return res.status(500).send("Internal error");
  }
}
