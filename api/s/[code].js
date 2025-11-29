// api/s/[code].js
export default async function handler(req, res) {
  try {
    const { code, user } = req.query;

    if (!user) {
      return res.status(400).send("Missing user");
    }

    // URL THẬT ở Railway, lấy từ ENV
    const railwayHost = process.env.RAILWAY_HOST_SELL; // vd: https://roblox-command-panel-production.up.railway.app

    if (!railwayHost) {
      return res.status(500).send("Server not configured");
    }

    // Link đích thật (panel sellall của bạn)
    const target = `${railwayHost}/panel?user=${encodeURIComponent(
      user
    )}&cmd=${encodeURIComponent("sellall")}`;

    // 302 Redirect
    res.writeHead(302, { Location: target });
    res.end();
  } catch (e) {
    console.error("Redirect error:", e);
    return res.status(500).send("Internal error");
  }
}
