document.addEventListener("DOMContentLoaded", function () {
  loadProduk();
  loadTestimoni();
});

// Load Produk dari JSON
async function loadProduk() {
  const res = await fetch("data/produk.json");
  const data = await res.json();
  const container = document.getElementById("produk-container");

  container.innerHTML = data.map(p => `
    <div class="produk-card animate__animated animate__fadeInUp">
      <img src="produk/${p.gambar}" alt="${p.nama}" class="produk-img" />
      <h3 class="produk-nama">${p.nama}</h3>
      <p class="produk-harga">${p.harga}</p>
      <button class="btn-detail" onclick="showDetail(${encodeURIComponent(JSON.stringify(p))})">Lihat Detail</button>
    </div>
  `).join("");
}

// Tampilkan detail produk dalam popup
function showDetail(dataStr) {
  const data = JSON.parse(decodeURIComponent(dataStr));
  const popup = document.getElementById("produk-popup");
  popup.innerHTML = `
    <div class="popup-content">
      <span class="close" onclick="closePopup()">&times;</span>
      <img src="produk/${data.gambar}" alt="${data.nama}" class="popup-img"/>
      <h2>${data.nama}</h2>
      <p><strong>Harga:</strong> ${data.harga}</p>
      <p><strong>Deskripsi:</strong> ${data.deskripsi}</p>
      <p><strong>Cara Pakai:</strong> ${data.cara_pakai}</p>
      <p><strong>Manfaat:</strong> ${data.manfaat}</p>
      <p><strong>Keunggulan:</strong> ${data.keunggulan}</p>
    </div>
  `;
  popup.classList.add("show");
}

function closePopup() {
  const popup = document.getElementById("produk-popup");
  popup.classList.remove("show");
}

// Load Testimoni dari JSON
async function loadTestimoni() {
  const res = await fetch("data/testimoni.json");
  const data = await res.json();
  const container = document.getElementById("testimoni-container");

  container.innerHTML = data.map(t => `
    <div class="testimoni-card animate__animated animate__fadeIn">
      <img src="avatar/${t.avatar}" alt="${t.nama}" class="avatar">
      <p class="nama">${t.nama}</p>
      <p class="ulasan">"${t.ulasan}"</p>
    </div>
  `).join("");
}
