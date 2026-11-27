/// <reference path="../data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("articles");

  const articlesData = [
    {
      title: "Panduan Praktis Hardening Server Linux Ubuntu untuk Pemula",
      slug: "panduan-praktis-hardening-server-linux-ubuntu",
      category: "linux",
      tags: "linux ubuntu hardening ssh security sysadmin",
      summary: "Langkah-langkah esensial mengamankan server Ubuntu baru mulai dari manajemen SSH key, deaktivasi root login, konfigurasi UFW, hingga audit log.",
      reading_time: "6 menit",
      status: "published",
      author: "Aris Dwi Maulana",
      date: "2026-11-20 09:00:00.000Z",
      content: `<p>Saat meluncurkan server virtual private server (VPS) baru, keamanan adalah prioritas pertama sebelum melakukan deployment aplikasi apa pun. Dalam tulisan ini, saya mendokumentasikan checklist pengamanan standar yang selalu saya terapkan pada instalasi Ubuntu Server.</p>

<h2>Mengapa Hardening Server Sangat Penting?</h2>
<p>Banyak serangan otomasi (botnet dan port scanner) secara konstan memindai IP publik di internet untuk menemukan port SSH default (22) dengan kredensial bawaan. Hardening berlapis meminimalkan celah serangan (attack surface) secara signifikan.</p>

<h2>Langkah 1: Mengatur Akses SSH Key dan Nonaktifkan Password</h2>
<p>Langkah pertama adalah mengganti autentikasi berbasis kata sandi menjadi pasangan kunci SSH (public/private key). Di komputer lokal, hasilkan kunci jika belum memilikinya:</p>
<pre><code>ssh-keygen -t ed25519 -C "admin@seclog.dev"
ssh-copy-id -i ~/.ssh/id_ed25519.pub user@ip_server</code></pre>
<p>Setelah kunci berhasil ditambahkan, edit file konfigurasi SSH di server pada <code>/etc/ssh/sshd_config</code>:</p>
<pre><code>PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes</code></pre>
<p>Terapkan perubahan dengan me-restart service SSH: <code>sudo systemctl restart sshd</code>.</p>

<h2>Langkah 2: Membatasi Akses Port dengan UFW</h2>
<p>Uncomplicated Firewall (UFW) menyediakan cara intuitif untuk mengelola rule iptables. Terapkan konfigurasi dasar yang menolak koneksi masuk dan mengizinkan koneksi keluar secara default:</p>
<pre><code>sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp comment 'SSH Access'
sudo ufw allow 80/tcp comment 'HTTP Web'
sudo ufw allow 443/tcp comment 'HTTPS Web'
sudo ufw enable</code></pre>

<h2>Langkah 3: Menginstal dan Menyiapkan Fail2ban</h2>
<p>Fail2ban berfungsi memantau log autentikasi seperti <code>/var/log/auth.log</code> dan secara otomatis memblokir IP yang gagal login berkali-kali.</p>
<pre><code>sudo apt update && sudo apt install fail2ban -y
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
sudo systemctl enable --now fail2ban</code></pre>

<h2>Langkah 4: Rutinitas Pembaruan dan Audit Log</h2>
<p>Selalu aktifkan paket <code>unattended-upgrades</code> agar patch keamanan sistem operasi diinstal secara otomatis tanpa memerlukan intervensi manual:</p>
<pre><code>sudo apt install unattended-upgrades -y
sudo dpkg-reconfigure --priority=low unattended-upgrades</code></pre>

<h2>Kesimpulan</h2>
<p>Dengan menerapkan SSH key-only authentication, firewall UFW, pencegahan brute-force melalui Fail2ban, dan automatic security updates, server Ubuntu Anda telah memiliki pertahanan dasar yang solid terhadap serangan botnet umum.</p>`
    },
    {
      title: "Manajemen Penyimpanan LVM di Linux: Resize Partisi Tanpa Downtime",
      slug: "manajemen-penyimpanan-lvm-linux-resize-partisi-tanpa-downtime",
      category: "linux",
      tags: "linux lvm storage sysadmin devops",
      summary: "Panduan lengkap memahami arsitektur Logical Volume Manager (LVM) dan cara memperbesar partisi root tanpa perlu me-restart server produksi.",
      reading_time: "7 menit",
      status: "published",
      author: "Aris Dwi Maulana",
      date: "2026-11-21 11:30:00.000Z",
      content: `<p>Kapasitas disk yang menipis pada server produksi merupakan salah satu insiden paling umum yang dihadapi system administrator. Dengan memanfaatkan Logical Volume Manager (LVM), kita dapat mengelola kapasitas penyimpanan secara fleksibel tanpa perlu mematikan mesin (zero downtime).</p>

<h2>Konsep Dasar PV, VG, dan LV</h2>
<p>LVM membagi abstraksi penyimpanan menjadi tiga lapisan hierarki:</p>
<ul>
  <li><strong>Physical Volume (PV):</strong> Disk fisik atau partisi riil (misal <code>/dev/sdb</code>).</li>
  <li><strong>Volume Group (VG):</strong> Kumpulan satu atau beberapa PV yang digabungkan menjadi satu pool storage besar.</li>
  <li><strong>Logical Volume (LV):</strong> Partisi virtual yang dialokasikan dari VG dan diformat dengan sistem berkas (misal ext4 atau xfs).</li>
</ul>

<h2>Memeriksa Status Disk Saat Ini</h2>
<p>Gunakan perintah ringkas berikut untuk melihat pemetaan alokasi ruang penyimpanan pada server:</p>
<pre><code>sudo pvs     # Melihat Physical Volume
sudo vgs     # Melihat Volume Group
sudo lvs     # Melihat Logical Volume
df -hT /     # Melihat kapasitas dan tipe filesystem root</code></pre>

<h2>Menambahkan Disk Baru ke Volume Group</h2>
<p>Setelah memasang drive baru pada server atau menambah kapasitas disk di panel cloud provider, inisialisasi disk menjadi PV dan gabungkan ke Volume Group:</p>
<pre><code>sudo pvcreate /dev/sdb
sudo vgextend ubuntu-vg /dev/sdb</code></pre>

<h2>Memperluas Logical Volume dan Filesystem</h2>
<p>Untuk memperbesar Logical Volume sebesar 20GB sekaligus menyesuaikan filesystem ext4 secara langsung tanpa unmount:</p>
<pre><code># Menambah 20GB ke Logical Volume
sudo lvextend -L +20G /dev/ubuntu-vg/ubuntu-lv

# Memperluas sistem berkas ext4 (online resize)
sudo resize2fs /dev/ubuntu-vg/ubuntu-lv</code></pre>
<p>Jika sistem Anda menggunakan XFS, gunakan <code>sudo xfs_growfs /</code> sebagai ganti <code>resize2fs</code>.</p>

<h2>Verifikasi dan Best Practices</h2>
<p>Jalankan kembali <code>df -h</code> untuk memastikan ukuran partisi telah bertambah. Selalu pastikan Anda memiliki backup snapshot sebelum melakukan manipulasi partisi level rendah pada lingkungan server bisnis.</p>`
    },
    {
      title: "Analisis Log Server Menggunakan Fail2ban dan Siapkan Notifikasi Telegram",
      slug: "analisis-log-server-fail2ban-notifikasi-telegram",
      category: "cybersecurity",
      tags: "cybersecurity fail2ban linux security monitoring",
      summary: "Mengintegrasikan Fail2ban dengan bot Telegram untuk memantau serangan brute-force SSH dan automated scanning secara real-time.",
      reading_time: "5 menit",
      status: "published",
      author: "Aris Dwi Maulana",
      date: "2026-11-22 14:15:00.000Z",
      content: `<p>Mengetahui adanya aktivitas serangan ke server secara instan sangat membantu dalam mendeteksi ancaman lebih awal. Artikel ini membahas cara menghubungkan Fail2ban dengan bot Telegram agar administrator mendapatkan peringatan setiap kali ada IP yang diblokir.</p>

<h2>Anatomi Serangan Brute-Force SSH</h2>
<p>Melalui log <code>/var/log/auth.log</code> atau <code>journalctl -u ssh</code>, kita dapat mengamati ribuan percobaan login dari bot yang mencoba berbagai username seperti <i>root, admin, test, ubnt</i>. Tanpa mekanisme ban otomatis, log akan membengkak dan server rentan terhadap kebocoran kata sandi yang lemah.</p>

<h2>Membuat Bot dan Chat ID Telegram</h2>
<p>Hubungi <code>@BotFather</code> di Telegram untuk membuat bot baru dan catat API token yang diberikan. Selanjutnya kirim pesan ke bot Anda dan cari tahu ID chat Anda melalui endpoint:</p>
<pre><code>curl -s "https://api.telegram.org/bot<BOT_TOKEN>/getUpdates" | jq</code></pre>

<h2>Membuat Action Kustom di Fail2ban</h2>
<p>Buat file konfigurasi action baru pada <code>/etc/fail2ban/action.d/telegram.conf</code>:</p>
<pre><code>[Definition]
actionstart =
actionstop =
actioncheck =
actionban = curl -s -X POST "https://api.telegram.org/bot<BOT_TOKEN>/sendMessage" \\
            -d chat_id="<CHAT_ID>" \\
            -d parse_mode="HTML" \\
            -d text="🚨 <b>[SECURITY ALERT]</b>%0AServer: \`hostname\`%0AIP Terblokir: <code>&lt;ip&gt;</code>%0AJail: <i>&lt;name&gt;</i>%0AFrekuensi: &lt;failures&gt; percobaan."
actionunban =</code></pre>

<h2>Mengaktifkan Action pada Jail SSH</h2>
<p>Tambahkan action Telegram pada file <code>/etc/fail2ban/jail.local</code>:</p>
<pre><code>[sshd]
enabled = true
port = 22
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 86400
action = %(action_)s
         telegram</code></pre>
<p>Muat ulang konfigurasi: <code>sudo fail2ban-client reload</code>.</p>

<h2>Evaluasi dan Pemantauan Berkala</h2>
<p>Kini setiap kali ada IP mencurigakan yang mencoba menebak kredensial SSH sebanyak 3 kali, IP tersebut langsung diblokir selama 24 jam dan Anda akan menerima pesan notifikasi instan di Telegram lengkap dengan alamat IP penyerang.</p>`
    },
    {
      title: "Dasar-Dasar Network Forensics: Menganalisis File PCAP dengan Wireshark",
      slug: "dasar-network-forensics-analisis-pcap-wireshark",
      category: "cybersecurity",
      tags: "cybersecurity wireshark forensic networking packets",
      summary: "Studi kasus identifikasi indikasi kompromi (IoC) dan lalu lintas mencurigakan pada tangkapan paket data jaringan menggunakan display filter Wireshark.",
      reading_time: "8 menit",
      status: "published",
      author: "Aris Dwi Maulana",
      date: "2026-11-23 16:00:00.000Z",
      content: `<p>Analisis paket data (PCAP) merupakan salah satu pilar utama dalam investigasi insiden siber. Ketika firewall atau NIDS mencatat anomali, berkas tangkapan jaringan menjadi bukti primer untuk merekonstruksi apa yang sebenarnya terjadi.</p>

<h2>Pengantar Analisis Paket Jaringan</h2>
<p>Wireshark adalah perkakas de-facto untuk menginspeksi protokol komunikasi. Kunci efektivitas dalam analisis paket adalah memahami struktur protokol OSI Layer dan kemampuan memfilter jutaan baris paket agar fokus pada data relevan.</p>

<h2>Filter Display Esensial untuk Investigasi</h2>
<p>Gunakan ekspresi display filter berikut untuk menyaring aliran data dengan cepat:</p>
<pre><code># Filter IP sumber dan tujuan spesifik
ip.addr == 192.168.1.105 && ip.addr == 10.0.0.15

# Mencari query DNS yang mencurigakan (potensi tunneling/C2)
dns.flags.response == 0 && dns.qry.name contains "malicious"

# Menampilkan semua request HTTP POST
http.request.method == "POST"

# Mencari paket TCP SYN tanpa ACK (indikasi Port Scanning)
tcp.flags.syn == 1 && tcp.flags.ack == 0</code></pre>

<h2>Mendeteksi Indikasi Port Scanning dan DoS</h2>
<p>Dengan memeriksa statistik melalui menu <strong>Statistics -> Conversations</strong>, kita dapat dengan mudah menemukan host mana yang membuka ribuan koneksi dalam interval singkat. Jumlah paket tinggi dengan ukuran seragam seringkali mengindikasikan flood atau scan sweep.</p>

<h2>Mengekstrak Artefak Berbahaya dari Stream TCP</h2>
<p>Untuk membaca percakapan utuh antara klien dan server, klik kanan pada paket yang dicurigai lalu pilih <strong>Follow -> TCP Stream</strong>. Jika terdapat transfer file tak terenkripsi, gunakan fitur <strong>File -> Export Objects -> HTTP</strong> untuk mengekstrak payload biner malware guna dianalisis di sandbox.</p>

<h2>Rangkuman Langkah Investigasi</h2>
<p>Alur investigasi forensik jaringan yang ideal mencakup: penentuan rentang waktu insiden, identifikasi alamat IP anomali, penelusuran protokol yang digunakan, rekonstruksi sesi komunikasi, dan dokumentasi indikator kompromi (IoC) untuk pembaruan rule SIEM.</p>`
    },
    {
      title: "Membangun VPN Pribadi Menggunakan WireGuard di VPS Debian",
      slug: "membangun-vpn-pribadi-wireguard-vps-debian",
      category: "networking",
      tags: "networking wireguard vpn debian linux security",
      summary: "Tutorial langkah demi langkah setup tunnel WireGuard yang ringan, hemat sumber daya, dan aman untuk browsing saat terhubung ke Wi-Fi publik.",
      reading_time: "6 menit",
      status: "published",
      author: "Aris Dwi Maulana",
      date: "2026-11-24 10:45:00.000Z",
      content: `<p>Privasi saat menggunakan jaringan Wi-Fi publik di kedai kopi atau kampus sangat rentan terhadap sniffing dan serangan Man-in-the-Middle (MitM). Membangun VPN sendiri menggunakan WireGuard adalah solusi modern yang jauh lebih cepat dan sederhana dibanding OpenVPN atau IPsec.</p>

<h2>Kelebihan WireGuard Dibandingkan OpenVPN</h2>
<p>WireGuard berjalan langsung di kernel Linux, menggunakan kriptografi modern (ChaCha20, Curve25519, BLAKE2s), dan memiliki basis kode yang sangat ramping (sekitar 4.000 baris kode). Hal ini membuatnya sangat efisien terhadap daya baterai perangkat seluler serta mempermudah audit keamanan.</p>

<h2>Instalasi dan Konfigurasi IP Forwarding</h2>
<p>Jalankan instalasi WireGuard pada server Debian 12:</p>
<pre><code>sudo apt update && sudo apt install wireguard iptables -y</code></pre>
<p>Aktifkan packet forwarding pada kernel Linux dengan mengedit <code>/etc/sysctl.conf</code>:</p>
<pre><code>net.ipv4.ip_forward=1
net.ipv6.conf.all.forwarding=1</code></pre>
<p>Terapkan dengan: <code>sudo sysctl -p</code>.</p>

<h2>Pembuatan Key Pair Server dan Client</h2>
<p>Setiap perangkat dalam arsitektur WireGuard diidentifikasi melalui cryptographic keys:</p>
<pre><code># Generate kunci server
wg genkey | tee server_private.key | wg pubkey > server_public.key

# Generate kunci client laptop
wg genkey | tee client_private.key | wg pubkey > client_public.key</code></pre>

<h2>Konfigurasi Interface wg0</h2>
<p>Buat file <code>/etc/wireguard/wg0.conf</code> di server:</p>
<pre><code>[Interface]
Address = 10.0.0.1/24
ListenPort = 51820
PrivateKey = <SERVER_PRIVATE_KEY>
PostUp = iptables -A FORWARD -i wg0 -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
PostDown = iptables -D FORWARD -i wg0 -j ACCEPT; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE

[Peer]
# Laptop Client
PublicKey = <CLIENT_PUBLIC_KEY>
AllowedIPs = 10.0.0.2/32</code></pre>
<p>Aktifkan interface WireGuard: <code>sudo systemctl enable --now wg-quick@wg0</code>.</p>

<h2>Menghubungkan Client dan Pengujian Routing</h2>
<p>Muat konfigurasi pada aplikasi client WireGuard di laptop atau ponsel pintar. Setelah terhubung, buka situs pengecekan IP publik untuk memastikan alamat IP Anda telah berubah sesuai alamat IP server VPN.</p>`
    },
    {
      title: "Optimasi DNS Homelab Menggunakan Pi-hole dan DNSCrypt",
      slug: "optimasi-dns-homelab-pi-hole-dnscrypt",
      category: "networking",
      tags: "networking dns homelab privacy pihole linux",
      summary: "Meningkatkan kecepatan resolusi DNS dan memblokir iklan tingkat jaringan di seluruh perangkat rumah dengan enkripsi DoH/DNSCrypt.",
      reading_time: "5 menit",
      status: "published",
      author: "Aris Dwi Maulana",
      date: "2026-11-25 13:30:00.000Z",
      content: `<p>DNS (Domain Name System) konvensional mengirimkan query dalam bentuk plain text tanpa enkripsi, memungkinkan ISP atau pihak ketiga memantau riwayat browsing kita. Dalam artikel homelab kali ini, kita akan mengombinasikan Pi-hole sebagai ad-blocker dengan DNSCrypt-Proxy untuk mengamankan seluruh request DNS.</p>

<h2>Mengapa Membutuhkan Local DNS Resolver?</h2>
<p>Menjalankan resolver DNS lokal di jaringan rumah memberikan dua keuntungan masif: pertama, memangkas latency browsing berkat local caching; kedua, memblokir pelacak (telemetry trackers) dan iklan berbahaya sebelum request sempat dikirim ke internet.</p>

<h2>Arsitektur Jaringan: Pi-hole + DNSCrypt-Proxy</h2>
<p>Alur pengolahan query jaringan dirancang sebagai berikut:</p>
<ol>
  <li>Klien lokal (laptop/ponsel) mengirim query DNS ke Pi-hole (Port 53).</li>
  <li>Pi-hole mencocokkan domain dengan daftar blocklist (Gravity).</li>
  <li>Jika domain bersih, Pi-hole meneruskan query ke DNSCrypt-Proxy (Port 5353) secara lokal.</li>
  <li>DNSCrypt-Proxy mengenkripsi query menggunakan DNS-over-HTTPS (DoH) ke upstream resolver publik yang aman.</li>
</ol>

<h2>Konfigurasi Upstream DNS dan DNSSEC</h2>
<p>Di dashboard administrasi Pi-hole (Settings -> DNS):</p>
<ul>
  <li>Hapus centang pada semua upstream server bawaan (Google, Cloudflare, dll).</li>
  <li>Tambahkan Custom IPv4 Upstream: <code>127.0.0.1#5353</code>.</li>
  <li>Aktifkan <strong>Use DNSSEC</strong> untuk memverifikasi integritas respon DNS dan mencegah DNS poisoning.</li>
</ul>

<h2>Penerapan di Router dan Uji Coba Klien</h2>
<p>Atur IP Raspberry Pi atau server mini PC Anda sebagai primary DNS pada DHCP server router utama. Dengan demikian, semua perangkat yang tersambung ke Wi-Fi rumah otomatis terlindungi tanpa perlu instalasi aplikasi tambahan.</p>

<h2>Monitoring Efisiensi Cache dan Query</h2>
<p>Melalui antarmuka web Pi-hole, amati grafik persentase query yang diblokir (biasanya mencapai 15-25% dari total lalu lintas rumah) serta rasio respon yang dilayani langsung dari cache memori lokal.</p>`
    }
  ];

  for (const item of articlesData) {
    const record = new Record(collection, item);
    app.save(record);
  }
}, (app) => {
  const slugs = [
    "panduan-praktis-hardening-server-linux-ubuntu",
    "manajemen-penyimpanan-lvm-linux-resize-partisi-tanpa-downtime",
    "analisis-log-server-fail2ban-notifikasi-telegram",
    "dasar-network-forensics-analisis-pcap-wireshark",
    "membangun-vpn-pribadi-wireguard-vps-debian",
    "optimasi-dns-homelab-pi-hole-dnscrypt"
  ];

  for (const slug of slugs) {
    try {
      const record = app.findFirstRecordByFilter("articles", "slug = {:slug}", { slug: slug });
      if (record) {
        app.delete(record);
      }
    } catch (_) {}
  }
});
