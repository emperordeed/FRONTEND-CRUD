import React, { useState, useEffect } from 'react';
import { siswaAPI } from './services/api';
import TableSiswa from './components/TableSiswa';
import FormTambahSiswa from './components/FormTambahSiswa';
import FormEditSiswa from './components/FormEditSiswa';
import './App.css';

function App() {
  const [siswaList, setSiswaList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showFormTambah, setShowFormTambah] = useState(false);
  const [showFormEdit, setShowFormEdit] = useState(false);
  const [selectedSiswa, setSelectedSiswa] = useState(null);

  const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3001';

  const fetchSiswa = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await siswaAPI.getAll();
      setSiswaList(res.data || []);
    } catch (err) {
      setError('Gagal memuat data siswa: ' + (err.message || err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSiswa();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTambahSiswa = async (dataSiswa) => {
    try {
      await siswaAPI.create(dataSiswa);
      setShowFormTambah(false);
      fetchSiswa();
      alert('✅ Data siswa berhasil ditambahkan!');
    } catch (err) {
      alert('❌ Gagal menambahkan data: ' + (err.message || err));
    }
  };

  const handleEditSiswa = (siswa) => {
    setSelectedSiswa(siswa);
    setShowFormEdit(true);
  };

  const handleUpdateSiswa = async (dataSiswa) => {
    try {
      await siswaAPI.update(selectedSiswa.kode_siswa, dataSiswa);
      setShowFormEdit(false);
      setSelectedSiswa(null);
      fetchSiswa();
      alert('✅ Data siswa berhasil diperbarui!');
    } catch (err) {
      alert('❌ Gagal memperbarui data: ' + (err.message || err));
    }
  };

  const handleHapusSiswa = async (kodeSiswa) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus data ini?')) return;
    try {
      await siswaAPI.delete(kodeSiswa);
      fetchSiswa();
      alert('✅ Data siswa berhasil dihapus!');
    } catch (err) {
      alert('❌ Gagal menghapus data: ' + (err.message || err));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">📚 APK CRUD Siswa</h1>
            <p className="text-blue-100 mt-2">Manajemen Data Biodata Siswa</p>
          </div>
          <button
            onClick={() => setShowFormTambah(true)}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-300 shadow-md"
          >
            ➕ Tambah Siswa
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            <p className="font-bold">Terjadi Kesalahan</p>
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
            <p className="text-gray-600 mt-4">Memuat data...</p>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <TableSiswa data={siswaList} onEdit={handleEditSiswa} onDelete={handleHapusSiswa} />
            </div>

            {siswaList.length === 0 && !loading && (
              <div className="bg-white rounded-lg shadow-lg p-8 text-center mt-6">
                <p className="text-gray-500 text-lg">📭 Tidak ada data siswa</p>
                <button
                  onClick={() => setShowFormTambah(true)}
                  className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Tambah Data Pertama
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {showFormTambah && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-screen overflow-y-auto">
            <FormTambahSiswa onSubmit={handleTambahSiswa} onClose={() => setShowFormTambah(false)} />
          </div>
        </div>
      )}

      {showFormEdit && selectedSiswa && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-screen overflow-y-auto">
            <FormEditSiswa
              siswa={selectedSiswa}
              onSubmit={handleUpdateSiswa}
              onClose={() => { setShowFormEdit(false); setSelectedSiswa(null); }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
