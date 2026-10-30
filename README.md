# 🍨 SweetTongue Ice Cream & Charlie AI Chatbot

Aplikasi web pemesanan kedai es krim artisan **SweetTongue** yang dilengkapi dengan katalog menu interaktif, keranjang belanja, integrasi pemesanan via WhatsApp, serta asisten virtual cerdas **Charlie** yang ditenagai oleh **Google Gemini AI API** (`gemini-2.5-flash`).

---

## 🎨 Tampilan & Desain
- **Tema Warna**: *Pastel Pink* (`#ff5470`) & *Sky Blue* (`#0096c7`) yang ceria, manis, dan menyegarkan khas kedai es krim modern.
- **Tipografi**: Menggunakan font Google **Poppins** (Weights 300 - 800) untuk keterbacaan yang rapi dan elegan.
- **Responsif**: Mendukung tampilan di layar Desktop, Tablet, hingga Ponsel (Mobile).

---

## ✨ Fitur Utama

1. **🍨 Katalog Menu Rasa Es Krim**
   - Menampilkan 10 varian rasa es krim istimewa: *Strawberry, Matcha, Bubblegum, Coklat, Vanilla, Banana, Mint, Blueberry, Red Velvet, dan Avocado*.
   - Badge penanda **⭐ Best Seller** untuk 3 varian terlaris (*Matcha, Bubblegum, Strawberry*).
   - Opsi pilihan scoop pada setiap menu:
     - **1 Scoop**: Rp 20.000
     - **2 Scoop**: Rp 35.000 *(Lebih hemat)*
   - Tombol **+ Keranjang** untuk memasukkan pesanan secara instan.

2. **🛒 Keranjang Belanja Interaktif (Drawer)**
   - Panel keranjang belanja geser (*slide-in drawer*) yang nyaman digunakan.
   - Mengatur kuantitas pesanan (+ / -), menghapus item, serta kalkulasi total harga otomatis dalam format Rupiah.
   - Indikator badge jumlah item pesanan di navigation bar secara real-time.

3. **💬 Pemesanan Melalui WhatsApp (Dummy)**
   - Tombol checkout otomatis merangkum seluruh daftar pesanan dari keranjang belanja.
   - Menghasilkan tautan langsung ke WhatsApp (`https://wa.me/...`) dengan pesan pemesanan yang rapi dan terstruktur.

4. **🤖 Bubble Pop "Tanya Charlie" (Floating AI Assistant)**
   - Tombol pop melayang di pojok kanan bawah dengan animasi menarik dan indikator status *Online*.
   - Jendela obrolan (*popup window*) yang dapat dibuka/tutup dengan mudah.
   - Dilengkapi *Quick Chips* untuk menanyakan rekomendasi populer atau info harga dalam satu klik.

5. **🧠 Otak AI Gemini Multi-Turn Conversation**
   - Didukung oleh backend Node.js + Express yang terhubung ke **Google Gemini 2.5 Flash API**.
   - Menjaga konteks riwayat percakapan (*multi-turn history*).
   - Karakter bot **Charlie** yang ramah, sopan, dan berfokus memberikan rekomendasi es krim terbaik sesuai selera pelanggan.

---

## 📁 Struktur Direktori

```text
gemini-chatbot-api/
├── public/
│   ├── index.html       # Halaman utama (Katalog, Keranjang, & Widget Chat)
│   ├── style.css        # Desain visual bertema Pink & Biru (Font Poppins)
│   └── script.js        # Logika frontend Vanilla JS (Katalog, Keranjang, WhatsApp, & Chat)
├── .env.example         # Template konfigurasi environment variable
├── .gitignore           # Mengabaikan node_modules, .env, dll.
├── index.js             # Server Express & Endpoint API integrasi Gemini AI
├── package.json         # Konfigurasi dependensi Node.js
└── README.md            # Dokumentasi proyek
```

---

## 🚀 Panduan Memulai (Instalasi & Penggunaan)

### 1. Prasyarat
- [Node.js](https://nodejs.org/) versi 18 atau lebih baru.
- Google Gemini API Key (bisa didapatkan gratis di [Google AI Studio](https://aistudio.google.com/)).

### 2. Clone Repository
```bash
git clone https://github.com/charlistioo/gemini-chatbot-api.git
cd gemini-chatbot-api
```

### 3. Install Dependensi
```bash
npm install
```

### 4. Konfigurasi Environment (`.env`)
Buat file bernama `.env` di root folder proyek:
```env
GEMINI_API_KEY=masukkan_api_key_gemini_anda_di_sini
```

### 5. Jalankan Aplikasi
Jalankan server backend:
```bash
node index.js
```
Aplikasi akan aktif di:
👉 **`http://localhost:3000`**

Buka URL tersebut di browser favorit Anda!

---

## 📡 Dokumentasi Endpoint API

### `POST /api/chat`
Mengirimkan riwayat percakapan ke model Gemini AI dan mengembalikan respon teks dari Charlie.

**Request Body:**
```json
{
  "conversation": [
    { "role": "user", "text": "Halo Charlie, ada rekomendasi rasa segar?" },
    { "role": "model", "text": "Halo! Kalau suka yang segar, aku sangat merekomendasikan Strawberry Sparkle atau Wild Blueberry Burst! 🍓🫐" },
    { "role": "user", "text": "Berapa harga 2 scoop?" }
  ]
}
```

**Response Success (200 OK):**
```json
{
  "result": "Untuk 2 scoop harganya cuma Rp35.000 saja, lebih hemat dibanding 1 scoop (Rp20.000). Mau coba kombinasi rasa apa nih?"
}
```

---

## 🛠️ Tech Stack
- **Backend**: Node.js, Express.js, `@google/genai`, `dotenv`, `cors`
- **Frontend**: Vanilla JavaScript (No Frameworks), HTML5, CSS3
- **Font**: [Poppins by Google Fonts](https://fonts.google.com/specimen/Poppins)
- **AI Engine**: Google Gemini 2.5 Flash

---

## 📄 Lisensi
Proyek ini dibuat untuk keperluan pembelajaran dan pengembangan chatbot AI - [Hacktiv8](https://hacktiv8.com/).
