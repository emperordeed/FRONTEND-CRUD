import React, { useState } from 'react';

function FormTambahSiswa({ onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    kode_siswa: '',
    nama_siswa: '',
    alamat_siswa: '',
    tgl_lahir: '',
    jurusan: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi
    if (!formData.kode_siswa || !formData.nama_siswa || !formData.alamat_siswa || !formData.tgl_lahir || !formData.jurusan) {
      alert('❌ Semua field harus diisi!');
      return;
    }

    setLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
        <h2 className="text-xl font-bold text-white">➕ Tambah Siswa Baru</h2>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {/* Kode Siswa */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Kode Siswa</label>
          <input
            type="text"
            name="kode_siswa"
            value={formData.kode_siswa}
            onChange={handleChange}
            placeholder="Contoh: 003"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>

        {/* Nama Siswa */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Nama Siswa</label>
          <input
            type="text"
            name="nama_siswa"
            value={formData.nama_siswa}
            onChange={handleChange}
            placeholder="Masukkan nama lengkap"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>

        {/* Alamat */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Alamat</label>
          <textarea
            name="alamat_siswa"
            value={formData.alamat_siswa}
            onChange={handleChange}
            placeholder="Masukkan alamat"
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>

        {/* Tanggal Lahir */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Tanggal Lahir</label>
          <input
            type="date"
            name="tgl_lahir"
            value={formData.tgl_lahir}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>

        {/* Jurusan */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Jurusan</label>
          <select
            name="jurusan"
            value={formData.jurusan}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            <option value="">-- Pilih Jurusan --</option>
            <option value="Teknik Informatika">Teknik Informatika</option>
            <option value="Teknik Komputer">Teknik Komputer</option>
            <option value="Teknik Elektro">Teknik Elektro</option>
            <option value="Teknik Mesin">Teknik Mesin</option>
            <option value="Teknik Sipil">Teknik Sipil</option>
            <option value="Manajemen">Manajemen</option>
            <option value="Akuntansi">Akuntansi</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {loading ? '⏳ Menyimpan...' : '✅ Simpan'}
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex-1 bg-gray-400 text-white py-2 rounded-lg font-semibold hover:bg-gray-500 transition disabled:bg-gray-300"
          >
            ❌ Batal
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormTambahSiswa;
