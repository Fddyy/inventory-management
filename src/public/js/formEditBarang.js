// KODE EDIT BARANG
document.addEventListener('DOMContentLoaded', () => {
    const editButtons = document.querySelectorAll('.btn-edit');
    const deleteButtons = document.querySelectorAll('.btn-delete');
    const confirmDeleteButton = document.getElementById('confirmDelete'); // Tombol konfirmasi
    let dataId = null;

    const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    const modal = new bootstrap.Modal(document.getElementById('editModal'));

    const editForm = document.getElementById('editForm');

    editButtons.forEach(button => {
      button.addEventListener('click', async () => {
        const id = button.getAttribute('data-id');
        try {
          const response = await fetch(`/edit-barang/${id}`);
          if (!response.ok) throw new Error('Gagal mendapatkan data barang');

          const data = await response.json();
        
          document.getElementById('editNama').value = data.nama_brg;
          document.getElementById('editJumlah').value = data.jumlah_brg;
          document.getElementById('editHarga').value = String(data.harga_brg);
          document.getElementById('editStatus').value = data.status_brg;
          document.getElementById('editKategori').value = data.kategori_brg;
          document.getElementById('editId').value = data.id_brg;

          modal.show();
        } catch (error) {
          console.error(error);
          alert('Terjadi kesalahan saat memuat data barang.');
        }
      });
    });

    // hapus barang
    deleteButtons.forEach(b => {
      b.addEventListener('click', async () => {
              dataId = b.getAttribute('data-id');
              deleteModal.show(); 
      })
    });

    confirmDeleteButton.addEventListener('click', async () => {
      if (dataId) {
          try {
              const response = await fetch(`/edit-barang/${dataId}/delete`, {
                  method: 'DELETE',
              });
              if (!response.ok) {
                  const errorData = await response.json();
                  throw new Error(errorData.message);
              }
              alert('Barang berhasil dihapus.');
              location.reload();
          } catch (err) {
              console.error(err);
              alert(err.message || 'Terjadi kesalahan saat menghapus barang.');
          } finally {
              deleteModal.hide();
              dataId = null;
          }
      }
  });
  // end hapus barang

    editForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(editForm);
      const id = formData.get('id');
      try {
        const response = await fetch(`/edit-barang/${id}/update`, {
          method: 'POST',
          body: new URLSearchParams(...[formData]),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        
        if (response.ok) {
          alert('Barang berhasil diperbarui!');
          location.reload();
        } else {
          throw new Error('Gagal memperbarui barang');
        }
      } catch (error) {
        console.error(error);
        alert('Terjadi kesalahan saat memperbarui barang.');
      }
    });
  });