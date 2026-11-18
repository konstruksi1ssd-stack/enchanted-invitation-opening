# Enchanted Invitation Opening

Lanjutkan project undangan digital ini (repo: https://github.com/konstruksi1ssd-stack/pixel-perfect-screenshot.git).

TUJUAN

Ubah ANIMASI di halaman awal (opening/cover), yaitu adegan sebelum masuk ke halaman inti.

YANG DIUBAH

- Saat ini figur manusia yang bergerak/berjalan. Ubah supaya manusia TIDAK lagi menjadi pusat gerakan.

- Figur manusia tetap ada di adegan, tetapi posisinya diam atau hanya bergerak sangat halus (misalnya bernapas pelan, sedikit bergoyang, atau kedipan ringan).

- Tambahkan hewan-hewan yang bergerak sebagai pusat animasi, misalnya:

  - burung terbang melintas

  - kijang atau kelinci berjalan/melompat pelan

  - hewan kecil lain yang cocok dengan suasana adegan

- Gerakan hewan harus halus, natural, dan berulang (loop) selama halaman awal tampil.

- Jangan pakai kupu-kupu sebagai hewan di adegan ini, karena kupu-kupu sudah dipakai di transisi.

YANG TIDAK BOLEH BERUBAH

- Animasi transisi dari halaman awal ke halaman inti (yang memakai kupu-kupu) sudah bagus. JANGAN diubah sama sekali: gerakan, timing, efek, maupun tampilannya.

- Halaman inti dan hiasannya tidak disentuh di tahap ini.

- Isi teks, nama, tanggal, tombol buka undangan, musik, dan fitur lain tetap sama.

ATURAN TEKNIS

- Buat animasi dengan SVG/CSS atau Framer Motion agar ringan dan halus.

- Gunakan warna burgundy (#800020) dan navy (#0B1F3A) agar selaras dengan desain undangan.

- Tetap responsif di mobile (360-430px), tablet, dan desktop.

- Animasi tidak boleh menutupi teks atau tombol.

- Performa ringan, hindari aset besar. Hormati pengaturan prefers-reduced-motion.

HASIL AKHIR

Halaman awal menampilkan adegan dengan manusia yang diam atau bergerak halus, sementara hewan-hewan yang bergerak. Transisi kupu-kupu ke halaman inti tetap persis seperti sebelumnya. Jika ada hal yang tidak bisa dibuat persis, buat versi terdekat dan beri tahu saya apa yang disesuaikan.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0fec9d8c-2483-430a-9486-269396b14be7).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
