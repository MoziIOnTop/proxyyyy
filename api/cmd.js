// api/cmd.js
export default async function handler(req, res) {
  try {
    const { user } = req.query;

    if (!user) {
      return res.status(400).json({ ok: false, error: "Missing user" });
    }

    const railwayHost = process.env.RAILWAY_HOST;
    const railwayKey = process.env.RAILWAY_KEY;

    if (!railwayHost || !railwayKey) {
      return res.status(500).json({ ok: false, error: "Server env not set" });
    }

    const url = `${railwayHost}/api/get-command?user=${encodeURIComponent(
      user
    )}&key=${encodeURIComponent(railwayKey)}`;

    const rsp = await fetch(url, { method: "GET" });
    const text = await rsp.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { ok: false, raw: text };
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("CMD gateway error:", err);
    return res.status(500).json({ ok: false, error: "Internal error" });
  }
}
