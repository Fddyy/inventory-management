document.getElementById('btnTransaksi').addEventListener('click', function () {
  const formModal = new bootstrap.Modal(document.getElementById('transaksiModal'));
    formModal.show();
  });

const form = document.getElementById('formTransaksi');
const itemsContainer = document.getElementById('itemsContainer');
const tambahBarangBtn = document.getElementById('tambahBarangBtn');
const alertTransaksi = document.getElementById('alert');
const innerAlert = `<button type="button" class="btn-close position-absolute end-0" data-bs-dismiss="alert" aria-label="Close"></button>`;

function tambahBarang() {
  const barangDiv = document.createElement('div');
  barangDiv.className = 'barang-item mb-3';
  barangDiv.innerHTML = `
    <div class="row">
      <div class="col-6">
        <input type="text" class="form-control" name="nama" placeholder="Nama Barang" required />
      </div>
      <div class="col-4">
        <input type="number" class="form-control" name="jumlah" placeholder="Jumlah" min="1" required />
      </div>
      <div class="col-1">
        <button type="button" class="btn btn-danger btn-sm hapusBarang">X</button>
      </div>
    </div>
  `;

  itemsContainer.appendChild(barangDiv);

  barangDiv.querySelector('.hapusBarang').addEventListener('click', () => {
    barangDiv.remove();
  });
};


tambahBarangBtn.addEventListener('click', tambahBarang);


form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const items = [];
  document.querySelectorAll('.barang-item').forEach((item) => {
    const nama = item.querySelector('input[name="nama"]').value.trim();
    const jumlah = parseInt(item.querySelector('input[name="jumlah"]').value.trim(), 10);
    
    if (nama && jumlah > 0) {
      items.push({ nama, jumlah});
    }
  });

  if (items.length === 0) {
    alertTransaksi.classList.add('alert' ,'alert-danger');
      alertTransaksi.innerHTML = `Harap tambahkan minimal satu barang ${innerAlert}`;
    return;
  }

  try {
    const response = await fetch('/transaksi/tambah', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items }),
    });

    const result = await response.json();

    if (result.status) {
        alertTransaksi.classList.add('alert' ,'alert-success');
        alertTransaksi.innerHTML = `${result.message} ${innerAlert}`
        alertTransaksi.addEventListener('click', ()=> {
          window.location.reload();
        })

    } else {
      alertTransaksi.classList.add('alert' ,'alert-danger');
      alertTransaksi.innerHTML = `${result.message} ${innerAlert}`;
    }

  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    alertTransaksi.classList.add(`alert' ,'alert-danger');
    alertTransaksi.innerHTML = 'Terjadi kesalahan saat memproses transaksi. Pastikan nama, harga barang sesuai, dan stok tersedia. ${innerAlert}`);
  }
});
