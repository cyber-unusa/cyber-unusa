import * as kegiatanService from "../services/kegiatanService.js";

export const getAllKegiatan = async (req, res) => {
  try {
    const allKegiatans = await kegiatanService.getAllKegiatansService();
    res.json({ success: true, allKegiatans });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addKegiatan = async (req, res) => {
  try {
    await kegiatanService.addKegiatanService(req.body, req.file);
    res.json({ success: true, message: "Kegiatan berhasil ditambahkan" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateKegiatan = async (req, res) => {
  try {
    const { id } = req.params;
    await kegiatanService.updateKegiatanService(id, req.body, req.file);
    res.json({ success: true, message: "Kegiatan berhasil diperbarui" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteKegiatan = async (req, res) => {
  try {
    const { id } = req.params;
    await kegiatanService.deleteKegiatanService(id);
    res.json({ success: true, message: "Kegiatan berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
