Folder public akan menyimpan aset statis yang digunakan pada proyek, seperti aset gambar, icon, favicon, termasuk web app manifest.

Folder public ini tidak akan diproses oleh webpack seperti pada folder lainnya, webpack hanya menyalin seluruh aset yang ada di dalamnya (menggunakan copy-webpack-plugin) ke output directory ketika menjalankan atau mem-build proyek.