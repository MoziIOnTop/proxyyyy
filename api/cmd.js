// api/cmd.js
export default async function handler(req, res) {
  try {
    const { user } = req.query;

    if (!user) {
      return res.status(400).json({ ok: false, error: "Missing user" });
    }

    // URL + KEY THẬT chỉ nằm trong ENV
    const railwayHost = process.env.RAILWAY_HOST; // vd: https://roblox-command-panel-production.up.railway.app
    const railwayKey  = process.env.RAILWAY_KEY;  // vd: moziu-super-secret

    if (!railwayHost || !railwayKey) {
      return res.status(500).json({ ok: false, error: "Server env not set" });
    }

    const url = `${railwayHost}/api/get-command?user=${encodeURIComponent(
      user
    )}&key=${encodeURIComponent(railwayKey)}`;

    const rsp = await fetch(url, { method: "GET" });
    const text = await rsp.text();

    // Nếu backend trả JSON thì parse, không thì trả raw
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { ok: true, raw: text };
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("CMD gateway error:", err);
    return res.status(500).json({ ok: false, error: "Internal error" });
  }
}
