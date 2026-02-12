import * as dokumenterService from "../services/dokumenterService.js";

export const getAllDokumenter = async (req, res) => {
  try {
    const allDokumenter = await dokumenterService.getAllDokumenService();
    res.json({ success: true, allDokumenter });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addDokumenter = async (req, res) => {
  try {
    await dokumenterService.addDokumenService(req.body, req.file);
    res.json({ success: true, message: "Dokumenter berhasil ditambahkan" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateDokumenter = async (req, res) => {
  try {
    const { id } = req.params;
    await dokumenterService.updateDokumenService(id, req.body, req.file);
    res.json({ success: true, message: "Dokumenter berhasil diperbarui" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteDokumenter = async (req, res) => {
  try {
    const { id } = req.params;
    await dokumenterService.deleteDokumenService(id);
    res.json({ success: true, message: "Dokumenter berhasil di hapus" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
