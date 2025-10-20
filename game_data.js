window.GAME_DATA = {
  "start": "start",
  "characters": {
    "guru": {
      "label": "Guru Indonesia",
      "portrait": "assets/characters/guru.svg"
    },
    "wira": {
      "label": "Wirausaha IT",
      "portrait": "assets/characters/wirausaha.svg"
    },
    "s2": {window.GAME_DATA = {
  "start": "start",
  "scenes": {
    "start": {
      "text": "Kamu adalah mahasiswa semester 8 Pendidikan Teknik Informatika. Wisuda sebentar lagi. Apa langkah karirmu setelah lulus?",
      "choices": [
        {
          "label": "A. Melamar Guru ASN",
          "to": "guru_1",
          "effects": {
            "minat": 0
          }
        },
        {
          "label": "B. Menjadi Wirausaha (Startup IT)",
          "to": "wira_1",
          "effects": {
            "minat": 0
          }
        },
        {
          "label": "C. Melanjutkan S2",
          "to": "s2_1",
          "effects": {
            "minat": 0
          }
        },
        {
          "label": "D. Masuk Industri (non-pendidikan)",
          "to": "ind_1",
          "effects": {
            "minat": 0
          }
        }
      ],
      "random_events": []
    },
    "guru_1": {
      "text": "Setelah lulus, ada pengumuman penerimaan CPNS untuk guru TIK. Prosesnya panjang dan mungkin menempatkanmu di daerah terpencil.",
      "choices": [
        {
          "label": "A. Mendaftar CPNS",
          "effects": {
            "minat": 10
          },
          "to": "guru_2"
        },
        {
          "label": "B. Mencari kerja di sekolah swasta",
          "effects": {
            "keseimbangan": 5
          },
          "to": "guru_2"
        },
        {
          "label": "C. Mengajar privat sambil mengevaluasi opsi lain",
          "effects": {
            "nilai": 5
          },
          "to": "guru_2"
        }
      ],
      "random_events": [
        {
          "text": "Kamu bertemu mantan dosen yang menawarkan bimbingan CPNS (+5 Minat)",
          "p": 0.35,
          "effects": {
            "minat": 5
          }
        }
      ]
    },
    "guru_2": {
      "text": "Ujian SKD tinggal 2 minggu lagi. Kamu juga diminta membantu keluarga di rumah. Bagaimana kamu mengatur waktu?",
      "choices": [
        {
          "label": "A. Belajar intensif",
          "effects": {
            "minat": 10,
            "keseimbangan": -5
          },
          "to": "guru_3"
        },
        {
          "label": "B. Belajar seadanya sambil membantu",
          "effects": {
            "keseimbangan": 10,
            "minat": -5
          },
          "to": "guru_3"
        },
        {
          "label": "C. Ikut kursus CPNS berbayar",
          "effects": {
            "penghasilan": 5,
            "minat": 5
          },
          "to": "guru_3"
        }
      ],
      "random_events": [
        {
          "text": "Kamu sakit flu menjelang ujian (-5 Keseimbangan)",
          "p": 0.25,
          "effects": {
            "keseimbangan": -5
          }
        }
      ]
    },
    "guru_3": {
      "text": "Kamu lulus CPNS, tetapi ditempatkan di kabupaten terpencil dengan akses terbatas.",
      "choices": [
        {
          "label": "A. Menerima penempatan",
          "effects": {
            "nilai": 15,
            "keseimbangan": -5
          },
          "to": "guru_4"
        },
        {
          "label": "B. Menolak dan mundur",
          "effects": {
            "minat": -10
          },
          "to": "guru_4"
        },
        {
          "label": "C. Minta penempatan ulang",
          "effects": {
            "penghasilan": 5
          },
          "to": "guru_4"
        }
      ],
      "random_events": [
        {
          "text": "Sekolah mendapat dana teknologi baru (+5 Kepuasan)",
          "p": 0.3,
          "effects": {
            "kepuasan": 5
          }
        },
        {
          "text": "Penempatanmu ditunda oleh dinas (-5 Keseimbangan)",
          "p": 0.25,
          "effects": {
            "keseimbangan": -5
          }
        }
      ]
    },
    "guru_4": {
      "text": "Tahun pertama mengajar: kamu menyesuaikan metode pengajaran dengan siswa.",
      "choices": [
        {
          "label": "A. Gunakan metode inovatif",
          "effects": {
            "kepuasan": 10
          },
          "to": "guru_5"
        },
        {
          "label": "B. Gunakan metode tradisional",
          "effects": {
            "keseimbangan": 5
          },
          "to": "guru_5"
        },
        {
          "label": "C. Terlibat dalam ekstrakurikuler",
          "effects": {
            "nilai": 10
          },
          "to": "guru_5"
        }
      ],
      "random_events": [
        {
          "text": "Orang tua siswa mengeluh tentang metode pengajaranmu (-5 Nilai Diri)",
          "p": 0.25,
          "effects": {
            "nilai": -5
          }
        }
      ]
    },
    "guru_5": {
      "text": "Pengembangan karir: kesempatan terbuka, kamu memilih?",
      "choices": [
        {
          "label": "A. Kejar promosi sebagai kepala sekolah",
          "effects": {
            "penghasilan": 15
          },
          "to": "guru_6"
        },
        {
          "label": "B. Ikut pelatihan guru nasional",
          "effects": {
            "minat": 10
          },
          "to": "guru_6"
        },
        {
          "label": "C. Pindah ke sekolah di kota besar",
          "effects": {
            "keseimbangan": 10
          },
          "to": "guru_6"
        }
      ],
      "random_events": [
        {
          "text": "Kamu diundang sebagai pembicara di seminar pendidikan (+10 Kepuasan)",
          "p": 0.3,
          "effects": {
            "kepuasan": 10
          }
        }
      ]
    },
    "guru_6": {
      "text": "Setelah 10 tahun, kamu merefleksikan karirmu sebagai guru.",
      "choices": [
        {
          "label": "A. Tetap mengajar dan menjadi mentor",
          "effects": {
            "nilai": 15
          },
          "to": "END"
        },
        {
          "label": "B. Beralih ke administrasi pendidikan",
          "effects": {
            "penghasilan": 15
          },
          "to": "END"
        },
        {
          "label": "C. Mulai proyek pendidikan sendiri",
          "effects": {
            "minat": 10
          },
          "to": "END"
        }
      ],
      "random_events": [
        {
          "text": "Pasanganmu mendapat tawaran kerja di kota lain (-5 Keseimbangan)",
          "p": 0.4,
          "effects": {
            "keseimbangan": -5
          }
        }
      ]
    },
    "wira_1": {
      "text": "Kamu ingin memulai startup IT. Temanmu menawarkan ide berbeda. Mana yang kamu pilih?",
      "choices": [
        {
          "label": "A. Aplikasi edukasi interaktif",
          "effects": {
            "minat": 15
          },
          "to": "wira_2"
        },
        {
          "label": "B. Marketplace untuk UMKM",
          "effects": {
            "penghasilan": 10
          },
          "to": "wira_2"
        },
        {
          "label": "C. Alat edutech untuk guru",
          "effects": {
            "nilai": 10
          },
          "to": "wira_2"
        }
      ],
      "random_events": [
        {
          "text": "Kamu bertemu investor di acara kampus (+5 Nilai Diri)",
          "p": 0.3,
          "effects": {
            "nilai": 5
          }
        }
      ]
    },
    "wira_2": {
      "text": "Startupmu butuh dana. Bagaimana kamu mendapatkannya?",
      "choices": [
        {
          "label": "A. Pinjam ke bank",
          "effects": {
            "penghasilan": 10,
            "keseimbangan": -10
          },
          "to": "wira_3"
        },
        {
          "label": "B. Cari investor",
          "effects": {
            "nilai": 15
          },
          "to": "wira_3"
        },
        {
          "label": "C. Bootstrap dengan tabungan",
          "effects": {
            "nilai": 15,
            "penghasilan": -5
          },
          "to": "wira_3"
        }
      ],
      "random_events": [
        {
          "text": "Pasar teknologi crash (-10 Penghasilan)",
          "p": 0.25,
          "effects": {
            "penghasilan": -10
          }
        }
      ]
    },
    "wira_3": {
      "text": "Pengembangan produk pertama. Strategimu?",
      "choices": [
        {
          "label": "A. Rekrut tim kecil",
          "effects": {
            "kepuasan": 10
          },
          "to": "wira_4"
        },
        {
          "label": "B. Kembangkan MVP sendiri",
          "effects": {
            "minat": 10
          },
          "to": "wira_4"
        },
        {
          "label": "C. Uji pasar terlebih dahulu",
          "effects": {
            "penghasilan": 5
          },
          "to": "wira_4"
        }
      ],
      "random_events": [
        {
          "text": "Produkmu mendapat ulasan positif dari influencer (+10 Minat)",
          "p": 0.3,
          "effects": {
            "minat": 10
          }
        }
      ]
    },
    "wira_4": {
      "text": "Peluncuran produk: persaingan ketat.",
      "choices": [
        {
          "label": "A. Pemasaran agresif",
          "effects": {
            "penghasilan": 15,
            "keseimbangan": -10
          },
          "to": "wira_5"
        },
        {
          "label": "B. Pemasaran konservatif",
          "effects": {
            "keseimbangan": 5
          },
          "to": "wira_5"
        },
        {
          "label": "C. Kolaborasi dengan startup lain",
          "effects": {
            "nilai": 10
          },
          "to": "wira_5"
        }
      ],
      "random_events": [
        {
          "text": "Klien besar membatalkan kontrak (-10 Penghasilan)",
          "p": 0.25,
          "effects": {
            "penghasilan": -10
          }
        }
      ]
    },
    "wira_5": {
      "text": "Startupmu mulai berkembang. Langkah selanjutnya?",
      "choices": [
        {
          "label": "A. Skala bisnis",
          "effects": {
            "penghasilan": 15
          },
          "to": "wira_6"
        },
        {
          "label": "B. Jual perusahaan",
          "effects": {
            "penghasilan": 20,
            "minat": -10
          },
          "to": "wira_6"
        },
        {
          "label": "C. Go public (IPO)",
          "effects": {
            "kepuasan": 15
          },
          "to": "wira_6"
        }
      ],
      "random_events": [
        {
          "text": "Startupmu masuk daftar startup terbaik (+10 Kepuasan)",
          "p": 0.3,
          "effects": {
            "kepuasan": 10
          }
        }
      ]
    },
    "wira_6": {
      "text": "Setelah 10 tahun, refleksi perjalanan wirausaha.",
      "choices": [
        {
          "label": "A. Lanjutkan sebagai CEO",
          "effects": {
            "minat": 15
          },
          "to": "END"
        },
        {
          "label": "B. Mulai startup baru",
          "effects": {
            "nilai": 10
          },
          "to": "END"
        },
        {
          "label": "C. Jadi investor untuk startup lain",
          "effects": {
            "penghasilan": 15
          },
          "to": "END"
        }
      ],
      "random_events": [
        {
          "text": "Keluargamu meminta bantuan finansial (-10 Penghasilan)",
          "p": 0.4,
          "effects": {
            "penghasilan": -10
          }
        }
      ]
    },
    "s2_1": {
      "text": "Kamu ingin melanjutkan S2. Pilih universitas impianmu.",
      "choices": [
        {
          "label": "A. Universitas dalam negeri",
          "effects": {
            "keseimbangan": 10
          },
          "to": "s2_2"
        },
        {
          "label": "B. Universitas luar negeri",
          "effects": {
            "minat": 15,
            "keseimbangan": -5
          },
          "to": "s2_2"
        },
        {
          "label": "C. Program online",
          "effects": {
            "penghasilan": 5
          },
          "to": "s2_2"
        }
      ],
      "random_events": [
        {
          "text": "Kamu mendapat rekomendasi dari dosen (+5 Minat)",
          "p": 0.3,
          "effects": {
            "minat": 5
          }
        }
      ]
    },
    "s2_2": {
      "text": "Pendanaan studi S2, pilih skema:",
      "choices": [
        {
          "label": "A. Ajukan beasiswa",
          "effects": {
            "penghasilan": 10
          },
          "to": "s2_3"
        },
        {
          "label": "B. Ambil pinjaman",
          "effects": {
            "penghasilan": 5,
            "keseimbangan": -5
          },
          "to": "s2_3"
        },
        {
          "label": "C. Kerja paruh waktu",
          "effects": {
            "keseimbangan": 10
          },
          "to": "s2_3"
        }
      ],
      "random_events": [
        {
          "text": "Kamu gagal mendapat beasiswa (-5 Penghasilan)",
          "p": 0.25,
          "effects": {
            "penghasilan": -5
          }
        }
      ]
    },
    "s2_3": {
      "text": "Kehidupan akademik dimulai. Fokus tahun pertama?",
      "choices": [
        {
          "label": "A. Fokus pada riset",
          "effects": {
            "minat": 10
          },
          "to": "s2_4"
        },
        {
          "label": "B. Ikut kegiatan kampus",
          "effects": {
            "nilai": 10
          },
          "to": "s2_4"
        },
        {
          "label": "C. Bangun jaringan profesional",
          "effects": {
            "penghasilan": 5
          },
          "to": "s2_4"
        }
      ],
      "random_events": [
        {
          "text": "Risetmu diterbitkan di jurnal ternama (+10 Minat)",
          "p": 0.3,
          "effects": {
            "minat": 10
          }
        }
      ]
    },
    "s2_4": {
      "text": "Tesis dan kelulusan: tentukan fokus.",
      "choices": [
        {
          "label": "A. Topik inovatif",
          "effects": {
            "kepuasan": 15
          },
          "to": "s2_5"
        },
        {
          "label": "B. Topik praktis",
          "effects": {
            "penghasilan": 10
          },
          "to": "s2_5"
        },
        {
          "label": "C. Kolaborasi dengan dosen",
          "effects": {
            "nilai": 10
          },
          "to": "s2_5"
        }
      ],
      "random_events": [
        {
          "text": "Pembimbingmu sulit dihubungi (-5 Keseimbangan)",
          "p": 0.3,
          "effects": {
            "keseimbangan": -5
          }
        }
      ]
    },
    "s2_5": {
      "text": "Pasca kelulusan S2, langkah berikut?",
      "choices": [
        {
          "label": "A. Kejar karir akademia",
          "effects": {
            "nilai": 15
          },
          "to": "s2_6"
        },
        {
          "label": "B. Masuk industri",
          "effects": {
            "penghasilan": 15
          },
          "to": "s2_6"
        },
        {
          "label": "C. Mulai wirausaha",
          "effects": {
            "minat": 10
          },
          "to": "s2_6"
        }
      ],
      "random_events": [
        {
          "text": "Kamu diundang sebagai dosen tamu (+10 Kepuasan)",
          "p": 0.3,
          "effects": {
            "kepuasan": 10
          }
        }
      ]
    },
    "s2_6": {
      "text": "Setelah 10 tahun, refleksi perjalanan akademikmu.",
      "choices": [
        {
          "label": "A. Jadi profesor",
          "effects": {
            "minat": 15
          },
          "to": "END"
        },
        {
          "label": "B. Pindah ke industri",
          "effects": {
            "penghasilan": 15
          },
          "to": "END"
        },
        {
          "label": "C. Tulis buku akademik",
          "effects": {
            "nilai": 10
          },
          "to": "END"
        }
      ],
      "random_events": [
        {
          "text": "Tekanan keluarga terkait rencana hidup (-5 Keseimbangan)",
          "p": 0.35,
          "effects": {
            "keseimbangan": -5
          }
        }
      ]
    },
    "ind_1": {
      "text": "Kamu ingin masuk industri. Pilih jenis perusahaan.",
      "choices": [
        {
          "label": "A. Startup teknologi",
          "effects": {
            "minat": 10,
            "keseimbangan": -5
          },
          "to": "ind_2"
        },
        {
          "label": "B. Perusahaan besar",
          "effects": {
            "penghasilan": 15
          },
          "to": "ind_2"
        },
        {
          "label": "C. Freelance",
          "effects": {
            "nilai": 10
          },
          "to": "ind_2"
        }
      ],
      "random_events": [
        {
          "text": "Kamu bertemu koneksi di acara networking (+5 Penghasilan)",
          "p": 0.3,
          "effects": {
            "penghasilan": 5
          }
        }
      ]
    },
    "ind_2": {
      "text": "Proses wawancara: strategi persiapanmu?",
      "choices": [
        {
          "label": "A. Persiapan menyeluruh",
          "effects": {
            "kepuasan": 10
          },
          "to": "ind_3"
        },
        {
          "label": "B. Manfaatkan koneksi",
          "effects": {
            "nilai": 10
          },
          "to": "ind_3"
        },
        {
          "label": "C. Terima tawaran pertama",
          "effects": {
            "penghasilan": 5
          },
          "to": "ind_3"
        }
      ],
      "random_events": [
        {
          "text": "Wawancaramu berjalan buruk (-5 Minat)",
          "p": 0.25,
          "effects": {
            "minat": -5
          }
        }
      ]
    },
    "ind_3": {
      "text": "Karir awal dimulai. Fokus adaptasi?",
      "choices": [
        {
          "label": "A. Seimbangkan kerja dan hidup",
          "effects": {
            "keseimbangan": 10
          },
          "to": "ind_4"
        },
        {
          "label": "B. Kembangkan keterampilan",
          "effects": {
            "minat": 10
          },
          "to": "ind_4"
        },
        {
          "label": "C. Navigasi politik kantor",
          "effects": {
            "penghasilan": 5
          },
          "to": "ind_4"
        }
      ],
      "random_events": [
        {
          "text": "Perusahaan diakuisisi (+15 Penghasilan)",
          "p": 0.25,
          "effects": {
            "penghasilan": 15
          }
        }
      ]
    },
    "ind_4": {
      "text": "Karir menengah: pilih langkah strategis.",
      "choices": [
        {
          "label": "A. Spesialisasi di bidangmu",
          "effects": {
            "penghasilan": 15
          },
          "to": "ind_5"
        },
        {
          "label": "B. Ganti pekerjaan",
          "effects": {
            "minat": 10
          },
          "to": "ind_5"
        },
        {
          "label": "C. Pindah lokasi",
          "effects": {
            "keseimbangan": 10
          },
          "to": "ind_5"
        }
      ],
      "random_events": [
        {
          "text": "Kamu terlibat konflik dengan atasan (-5 Keseimbangan)",
          "p": 0.25,
          "effects": {
            "keseimbangan": -5
          }
        }
      ]
    },
    "ind_5": {
      "text": "Karir senior: apa fokusmu?",
      "choices": [
        {
          "label": "A. Jadi mentor",
          "effects": {
            "nilai": 15
          },
          "to": "ind_6"
        },
        {
          "label": "B. Kejar peran eksekutif",
          "effects": {
            "penghasilan": 15
          },
          "to": "ind_6"
        },
        {
          "label": "C. Rencanakan pensiun dini",
          "effects": {
            "keseimbangan": 10
          },
          "to": "ind_6"
        }
      ],
      "random_events": [
        {
          "text": "Kamu memenangkan penghargaan industri (+10 Kepuasan)",
          "p": 0.3,
          "effects": {
            "kepuasan": 10
          }
        }
      ]
    },
    "ind_6": {
      "text": "Setelah 10 tahun, refleksi karirmu di industri.",
      "choices": [
        {
          "label": "A. Tetap di industri",
          "effects": {
            "penghasilan": 15
          },
          "to": "END"
        },
        {
          "label": "B. Mulai bisnis sendiri",
          "effects": {
            "minat": 10
          },
          "to": "END"
        },
        {
          "label": "C. Jadi konsultan",
          "effects": {
            "nilai": 10
          },
          "to": "END"
        }
      ],
      "random_events": [
        {
          "text": "Kamu menghadapi krisis kesehatan (-5 Keseimbangan)",
          "p": 0.35,
          "effects": {
            "keseimbangan": -5
          }
        }
      ]
    }
  }
};

      "label": "Mahasiswa S2",
      "portrait": "assets/characters/s2.svg"
    },
    "ind": {
      "label": "Profesional Industri",
      "portrait": "assets/characters/industri.svg"
    }
  },
  "scenes": {
    "start": {
      "text": "Pilih jalur awal kariermu:",
      "choices": [
        {
          "label": "Guru ASN",
          "to": "guru_1"
        },
        {
          "label": "Wirausaha IT",
          "to": "wira_1"
        },
        {
          "label": "Studi S2",
          "to": "s2_1"
        },
        {
          "label": "Industri",
          "to": "ind_1"
        }
      ],
      "random_events": [],
      "char": "guru"
    },
    "guru_1": {
      "text": "Contoh jalur guru.",
      "choices": [
        {
          "label": "Lanjut",
          "to": "END"
        }
      ],
      "random_events": [],
      "char": "guru"
    },
    "wira_1": {
      "text": "Contoh jalur wirausaha.",
      "choices": [
        {
          "label": "Lanjut",
          "to": "END"
        }
      ],
      "random_events": [],
      "char": "wira"
    },
    "s2_1": {
      "text": "Contoh jalur S2.",
      "choices": [
        {
          "label": "Lanjut",
          "to": "END"
        }
      ],
      "random_events": [],
      "char": "s2"
    },
    "ind_1": {
      "text": "Contoh jalur industri.",
      "choices": [
        {
          "label": "Lanjut",
          "to": "END"
        }
      ],
      "random_events": [],
      "char": "ind"
    }
  }
};
