#!/bin/bash
echo "Menyiapkan environment Tailwindcss..."

#Unduh Tailwind CLI jika belum ada
if [ ! -f ./tailwindcss ]; then
  echo "Unduh Tailwind Standalone CLI..."
  wget https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-linux-x64 -O ./tailwindcss
  chmod +x tailwindcss
fi

echo "Setup Tailwind selesai!"
