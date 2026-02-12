export const deleteImage = async (image) => {
  if (image) {
    await cloudinary.uploader.destroy(image);
  }
};

export const updateImage = async (file, image) => {
  if (file) {
    //? Hapus gambar lama di Cloudinary
    deleteImage(image);
    //? Update dengan gambar baru
    updateData.imageUrl = file.path;
    updateData.public_id = file.filename;
  }
};
