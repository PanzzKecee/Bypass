export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({
      success: false,
      error: "Parameter 'url' wajib diisi. Contoh: /api/bypass?url=https://sfl.gl/xxxx",
    });
  }

  const target = `https://omegatech-api.dixonomega.tech/api/tools/All-bypass?url=${encodeURIComponent(
    url
  )}`;

  try {
    const upstream = await fetch(target);
    const data = await upstream.json();

    // Teruskan status & body apa adanya ke frontend
    return res.status(upstream.status).json(data);
  } catch (err) {
    return res.status(502).json({
      success: false,
      error: "Gagal menghubungi API OmegaTech: " + err.message,
    });
  }
}
