/// <reference path="../pb_data/types.d.ts" />

// ─────────────────────────────────────────────────────────────────────────────
// Migration: create 'articles' collection + seed 6 dummy articles
// ─────────────────────────────────────────────────────────────────────────────
migrate(
  (app) => {
    // 1. Create the collection
    const collection = new Collection({
      type: "base",
      name: "articles",
      listRule: "",
      viewRule: "",
      createRule: null,
      updateRule: null,
      deleteRule: null,
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "slug",
          type: "text",
          required: true,
        },
        {
          name: "category",
          type: "select",
          required: false,
          maxSelect: 1,
          values: ["linux", "cybersecurity", "networking"],
        },
        {
          name: "tags",
          type: "text",
          required: false,
        },
        {
          name: "summary",
          type: "text",
          required: false,
        },
        {
          name: "content",
          type: "editor",
          required: false,
        },
        {
          name: "reading_time",
          type: "text",
          required: false,
        },
        {
          name: "status",
          type: "select",
          required: false,
          maxSelect: 1,
          values: ["draft", "published"],
        },
        {
          name: "author",
          type: "text",
          required: false,
        },
      ],
    });

    app.save(collection);

    // 2. Seed dummy articles
    const col = app.findCollectionByNameOrId("articles");

    const seedArticles = [
      {
        title: "Automating Linux Server Hardening with Ansible and CIS Benchmarks",
        slug: "automating-linux-server-hardening-with-ansible-and-cis-benchmarks",
        category: "linux",
        tags: "ansible, cis, hardening, linux",
        summary:
          "Panduan lengkap mengotomatisasi hardening server Linux menggunakan Ansible dan standar keamanan CIS Benchmarks untuk memastikan konfigurasi aman secara konsisten.",
        content: `<h2>Pendahuluan</h2>
<p>Hardening server Linux adalah langkah krusial dalam memperkuat keamanan infrastruktur. Melakukan proses ini secara manual memakan waktu dan rentan kesalahan. Ansible memungkinkan kita mengotomatisasi seluruh proses menggunakan playbook yang bisa dijalankan berulang kali.</p>
<h2>Apa itu CIS Benchmarks?</h2>
<p>CIS (Center for Internet Security) Benchmarks adalah panduan konfigurasi keamanan yang diakui secara internasional. Panduan ini mencakup ratusan aturan untuk sistem operasi, aplikasi, dan layanan cloud.</p>
<h2>Persiapan Ansible</h2>
<pre><code># Install Ansible
sudo apt install ansible -y

# Verifikasi instalasi
ansible --version</code></pre>
<h2>Membuat Playbook Hardening</h2>
<pre><code>---
- name: CIS Linux Hardening
  hosts: all
  become: yes
  tasks:
    - name: Disable unused filesystems
      kernel_module:
        name: "{{ item }}"
        state: absent
      loop:
        - cramfs
        - freevxfs
        - jffs2
        - hfs</code></pre>
<h2>Kesimpulan</h2>
<p>Dengan Ansible dan CIS Benchmarks, proses hardening server Linux menjadi otomatis, konsisten, dan dapat diaudit dengan mudah.</p>`,
        reading_time: "8 mnt baca",
        status: "published",
        author: "Adrian Pratama",
      },
      {
        title: "Privilege Escalation Techniques on Linux",
        slug: "privilege-escalation-techniques-on-linux",
        category: "linux",
        tags: "privilege escalation, linux, security",
        summary:
          "Eksplorasi mendalam teknik-teknik privilege escalation yang umum pada sistem Linux, mulai dari SUID/GUID abuse hingga sudo misconfiguration.",
        content: `<h2>Apa itu Privilege Escalation?</h2>
<p>Privilege escalation adalah teknik yang digunakan attacker untuk mendapatkan hak akses lebih tinggi dari yang dimiliki saat ini, misalnya dari user biasa menjadi root.</p>
<h2>Jenis-jenis Privilege Escalation</h2>
<h2>1. SUID/SGID Abuse</h2>
<pre><code># Cari file dengan bit SUID aktif
find / -perm -u=s -type f 2>/dev/null

# Contoh eksploitasi dengan binary 'find' yang ber-SUID
find . -exec /bin/bash -p \; -quit</code></pre>
<h2>2. Sudo Misconfiguration</h2>
<pre><code># Lihat sudo privileges
sudo -l

# Jika ada (ALL) tanpa password
sudo /bin/bash</code></pre>
<h2>3. Cron Job Exploitation</h2>
<pre><code># Lihat cron jobs
cat /etc/crontab
ls /etc/cron.*</code></pre>
<h2>Mitigasi</h2>
<p>Selalu audit SUID binaries, konfigurasi sudo secara ketat, dan pantau cron jobs di sistem Anda.</p>`,
        reading_time: "7 mnt baca",
        status: "published",
        author: "Adrian Pratama",
      },
      {
        title: "Proxmox Homelab Setup Guide",
        slug: "proxmox-homelab-setup-guide",
        category: "networking",
        tags: "proxmox, homelab, virtualization",
        summary:
          "Panduan langkah demi langkah untuk menyiapkan homelab menggunakan Proxmox VE, dari instalasi hingga konfigurasi jaringan dan pembuatan VM pertama.",
        content: `<h2>Mengapa Proxmox?</h2>
<p>Proxmox VE adalah platform virtualisasi open-source yang powerful, mendukung KVM (Virtual Machines) dan LXC (Containers) dalam satu antarmuka web yang mudah digunakan.</p>
<h2>Kebutuhan Hardware</h2>
<p>Untuk homelab entry-level, Anda membutuhkan setidaknya: CPU dengan dukungan virtualisasi (Intel VT-x / AMD-V), RAM minimal 8GB, dan storage SSD untuk performa optimal.</p>
<h2>Instalasi Proxmox VE</h2>
<pre><code># Download ISO dari situs resmi
# https://www.proxmox.com/en/downloads

# Flash ke USB menggunakan dd (Linux)
dd if=proxmox-ve_8.0.iso of=/dev/sdb bs=4M status=progress</code></pre>
<h2>Konfigurasi Jaringan</h2>
<pre><code># Edit network config
nano /etc/network/interfaces

# Contoh konfigurasi bridge
auto vmbr0
iface vmbr0 inet static
    address 192.168.1.100/24
    gateway 192.168.1.1
    bridge-ports eno1
    bridge-stp off
    bridge-fd 0</code></pre>
<h2>Membuat VM Pertama</h2>
<p>Melalui web UI Proxmox di https://IP:8006, klik "Create VM", pilih ISO template, dan konfigurasikan resource sesuai kebutuhan.</p>`,
        reading_time: "10 mnt baca",
        status: "published",
        author: "Adrian Pratama",
      },
      {
        title: "Network Pentesting with Nmap and Wireshark",
        slug: "network-pentesting-with-nmap-and-wireshark",
        category: "cybersecurity",
        tags: "nmap, wireshark, pentesting, network",
        summary:
          "Cara efektif menggunakan Nmap dan Wireshark secara bersamaan untuk melakukan penetration testing jaringan, mulai dari discovery hingga analisis paket.",
        content: `<h2>Pendahuluan Network Pentesting</h2>
<p>Penetration testing jaringan adalah simulasi serangan terotorisasi untuk mengidentifikasi kelemahan keamanan sebelum attacker nyata menemukannya.</p>
<h2>Nmap: Network Discovery & Port Scanning</h2>
<pre><code># Scan dasar host discovery
nmap -sn 192.168.1.0/24

# Port scan lengkap dengan service detection
nmap -sV -sC -O -p- 192.168.1.1

# Output ke file
nmap -sV 192.168.1.1 -oN hasil_scan.txt</code></pre>
<h2>Wireshark: Packet Analysis</h2>
<p>Wireshark memungkinkan kita menangkap dan menganalisis paket jaringan secara real-time.</p>
<pre><code># Capture via terminal menggunakan tshark
tshark -i eth0 -w capture.pcap

# Filter HTTP traffic
tshark -i eth0 -f "port 80"</code></pre>
<h2>Kombinasi Workflow</h2>
<p>Gunakan Nmap untuk discovery target, lalu gunakan Wireshark untuk menganalisis traffic yang dihasilkan saat Nmap melakukan scanning untuk memahami pola jaringan.</p>`,
        reading_time: "6 mnt baca",
        status: "published",
        author: "Adrian Pratama",
      },
      {
        title: "Linux Kernel Module Development Basics",
        slug: "linux-kernel-module-development-basics",
        category: "linux",
        tags: "kernel, module, development, linux",
        summary:
          "Pengantar komprehensif pengembangan modul kernel Linux, mencakup struktur dasar modul, kompilasi, loading/unloading, dan debugging teknik.",
        content: `<h2>Apa itu Kernel Module?</h2>
<p>Kernel module adalah potongan kode yang dapat dimuat dan dilepas dari kernel Linux secara dinamis tanpa perlu me-reboot sistem. Ini digunakan untuk driver perangkat, filesystem, dan fitur kernel lainnya.</p>
<h2>Struktur Modul Dasar</h2>
<pre><code>#include &lt;linux/module.h&gt;
#include &lt;linux/kernel.h&gt;
#include &lt;linux/init.h&gt;

MODULE_LICENSE("GPL");
MODULE_AUTHOR("Adrian Pratama");
MODULE_DESCRIPTION("Hello World Kernel Module");

static int __init hello_init(void) {
    printk(KERN_INFO "Hello, Kernel!\\n");
    return 0;
}

static void __exit hello_exit(void) {
    printk(KERN_INFO "Goodbye, Kernel!\\n");
}

module_init(hello_init);
module_exit(hello_exit);</code></pre>
<h2>Kompilasi dengan Makefile</h2>
<pre><code>obj-m += hello.o

all:
    make -C /lib/modules/$(shell uname -r)/build M=$(PWD) modules

clean:
    make -C /lib/modules/$(shell uname -r)/build M=$(PWD) clean</code></pre>
<h2>Loading dan Testing Modul</h2>
<pre><code># Load modul
sudo insmod hello.ko

# Lihat log kernel
dmesg | tail -5

# Unload modul
sudo rmmod hello</code></pre>`,
        reading_time: "9 mnt baca",
        status: "published",
        author: "Adrian Pratama",
      },
      {
        title: "Docker Compose for Multi-Container Applications",
        slug: "docker-compose-for-multi-container-applications",
        category: "linux",
        tags: "docker, compose, container, devops",
        summary:
          "Panduan praktis penggunaan Docker Compose untuk mendefinisikan, menjalankan, dan mengelola aplikasi multi-container dengan konfigurasi yang bersih dan reproducible.",
        content: `<h2>Mengapa Docker Compose?</h2>
<p>Docker Compose memungkinkan Anda mendefinisikan seluruh stack aplikasi (web, database, cache, dll) dalam satu file YAML dan menjalankannya dengan satu perintah.</p>
<h2>Struktur File docker-compose.yml</h2>
<pre><code>version: '3.8'

services:
  web:
    build: .
    ports:
      - "8080:80"
    depends_on:
      - db
    environment:
      DATABASE_URL: postgresql://user:pass@db:5432/mydb

  db:
    image: postgres:15
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mydb

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:</code></pre>
<h2>Perintah Utama</h2>
<pre><code># Jalankan semua service
docker compose up -d

# Lihat log
docker compose logs -f web

# Stop semua service
docker compose down

# Rebuild dan restart
docker compose up -d --build</code></pre>
<h2>Best Practices</h2>
<p>Gunakan variabel environment melalui file .env, manfaatkan health checks, dan selalu definisikan volumes untuk data persistence.</p>`,
        reading_time: "5 mnt baca",
        status: "published",
        author: "Adrian Pratama",
      },
    ];

    for (const data of seedArticles) {
      const record = new Record(col);
      record.set("title", data.title);
      record.set("slug", data.slug);
      record.set("category", data.category);
      record.set("tags", data.tags);
      record.set("summary", data.summary);
      record.set("content", data.content);
      record.set("reading_time", data.reading_time);
      record.set("status", data.status);
      record.set("author", data.author);
      app.save(record);
    }
  },

  // Down migration: delete the collection
  (app) => {
    try {
      const col = app.findCollectionByNameOrId("articles");
      app.delete(col);
    } catch (_) {
      // Already deleted, ignore
    }
  }
);
