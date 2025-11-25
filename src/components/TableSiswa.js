import React from 'react';

function TableSiswa({ data, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <tr>
            <th className="px-6 py-4 text-left font-semibold">No</th>
            <th className="px-6 py-4 text-left font-semibold">Kode Siswa</th>
            <th className="px-6 py-4 text-left font-semibold">Nama</th>
            <th className="px-6 py-4 text-left font-semibold">Alamat</th>
            <th className="px-6 py-4 text-left font-semibold">Tgl Lahir</th>
            <th className="px-6 py-4 text-left font-semibold">Jurusan</th>
            <th className="px-6 py-4 text-center font-semibold">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                📭 Tidak ada data siswa
              </td>
            </tr>
          ) : (
            data.map((siswa, index) => (
              <tr
                key={siswa.id}
                className="border-b border-gray-200 hover:bg-blue-50 transition duration-200"
              >
                <td className="px-6 py-4 text-gray-700">{index + 1}</td>
                <td className="px-6 py-4 font-semibold text-blue-600">{siswa.kode_siswa}</td>
                <td className="px-6 py-4 text-gray-800">{siswa.nama_siswa}</td>
                <td className="px-6 py-4 text-gray-600">{siswa.alamat_siswa}</td>
                <td className="px-6 py-4 text-gray-600">
                  {new Date(siswa.tgl_lahir).toLocaleDateString('id-ID')}
                </td>
                <td className="px-6 py-4 text-gray-600">{siswa.jurusan}</td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => onEdit(siswa)}
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600 transition text-sm font-semibold"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => onDelete(siswa.kode_siswa)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm font-semibold"
                  >
                    🗑️ Hapus
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TableSiswa;
