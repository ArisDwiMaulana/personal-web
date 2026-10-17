#!/bin/bash
echo "Menyiapkan environment daisyUI..."

#Unduh daisyui.css jika belum ada
if [ ! -f ./daisyui.css ]; then
  echo "Unduh daisyui.css..."
  wget https://cdn.jsdelivr.net/npm/daisyui@5/daisyui.css -O ./daisyui.css
fi

echo "Setup daisyUI selesai!"
