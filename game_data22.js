// ============================================================================
// GAME DATA - ENHANCED VERSION
// Eksplorasi Karir IT untuk Mahasiswa Pendidikan Teknik Informatika
// 
// PERUBAHAN UTAMA:
// - 10 scenes per jalur (dari 6 → 10)
// - Bahasa Indonesia sederhana & konteks lokal Indonesia
// - Balanced scoring: lebih banyak negative consequences & trade-offs
// - Realistic career scenarios untuk mahasiswa IT Indonesia
// 
// Version: 7.0 Enhanced
// ============================================================================

const gameData = {
  // Game metadata
  meta: {
    title: "Karirmu, Pilihanmu: Eksplorasi Karir IT",
    subtitle: "Game Naratif Interaktif untuk Mahasiswa Pendidikan Teknik Informatika",
    version: "7.0",
    author: "Enhanced Career Game - Indonesia Context"
  },

  // Career paths configuration
  careerPaths: {
    guru: {
      id: "guru",
      label: "Guru ASN",
      icon: "👨‍🏫",
      colorPrimary: "#22c55e",
      colorAccent: "#86efac",
      description: "Jalur pendidik dengan status ASN (Pegawai Negeri Sipil)",
      characterName: "Pak Budi - Guru Senior"
    },
    wira: {
      id: "wira",
      label: "Wirausaha IT",
      icon: "🚀",
      colorPrimary: "#f97316",
      colorAccent: "#fdba74",
      description: "Membangun startup teknologi sendiri",
      characterName: "Sarah - Pengusaha Teknologi"
    },
    s2: {
      id: "s2",
      label: "S2/Akademisi",
      icon: "🎓",
      colorPrimary: "#3b82f6",
      colorAccent: "#93c5fd",
      description: "Melanjutkan studi magister dan menjadi peneliti",
      characterName: "Dr. Andi - Peneliti"
    },
    ind: {
      id: "ind",
      label: "Industri",
      icon: "💼",
      colorPrimary: "#8b5cf6",
      colorAccent: "#c4b5fd",
      description: "Bekerja di perusahaan teknologi",
      characterName: "Ibu Nina - Senior Developer"
    }
  },

  // Scoring dimensions
  scores: {
    minat: {
      label: "Minat",
      description: "Motivasi dan ketertarikan terhadap jalur karir",
      icon: "❤️"
    },
    keseimbangan: {
      label: "Keseimbangan",
      description: "Keseimbangan antara kehidupan kerja dan pribadi",
      icon: "⚖️"
    },
    penghasilan: {
      label: "Penghasilan",
      description: "Stabilitas dan potensi pendapatan finansial",
      icon: "💰"
    },
    nilai: {
      label: "Nilai Diri",
      description: "Kepercayaan diri dan kesempatan berkembang",
      icon: "🌟"
    },
    kepuasan: {
      label: "Kepuasan",
      description: "Kebahagiaan dan rasa puas dengan pilihan karir",
      icon: "😊"
    }
  },

  // Career fit levels (interpretasi hasil akhir)
  fitLevels: {
    excellent: {
      threshold: 80,
      label: "Sangat Cocok",
      color: "#22c55e",
      message: "Jalur karir ini sangat sesuai dengan profil dan aspirasimu!"
    },
    good: {
      threshold: 65,
      label: "Cocok",
      color: "#3b82f6",
      message: "Jalur karir ini cocok untukmu dengan beberapa pertimbangan."
    },
    moderate: {
      threshold: 50,
      label: "Perlu Eksplorasi Lebih",
      color: "#f59e0b",
      message: "Kamu perlu eksplorasi lebih dalam tentang jalur karir ini."
    },
    low: {
      threshold: 0,
      label: "Kurang Cocok",
      color: "#ef4444",
      message: "Jalur karir ini mungkin kurang sesuai dengan profilmu saat ini."
    }
  },

  // Initial scores for each dimension
  initialScores: {
    minat: 50,
    keseimbangan: 50,
    penghasilan: 50,
    nilai: 50,
    kepuasan: 50
  },

  // ============================================================================
  // SCENES - Career Path Scenarios
  // ============================================================================
  scenes: {
    
    // START SCENE
    start: {
      title: "Pilih Jalur Karirmu",
      text: "Kamu baru saja lulus dari Pendidikan Teknik Informatika. Saatnya memilih jalur karir yang akan kamu jalani. Setiap pilihan memiliki tantangan dan peluang yang berbeda. Pilih dengan bijak!",
      choices: [
        {
          text: "👨‍🏫 Guru ASN - Menjadi pendidik dengan status pegawai negeri",
          subtext: "Stabilitas tinggi, gaji tetap, tapi perlu bersabar",
          nextScene: "guru_1",
          effects: {}
        },
        {
          text: "🚀 Wirausaha IT - Membangun startup teknologi sendiri",
          subtext: "Bebas berkreasi, tapi penuh risiko dan tantangan",
          nextScene: "wira_1",
          effects: {}
        },
        {
          text: "🎓 S2/Akademisi - Melanjutkan studi dan menjadi peneliti",
          subtext: "Mendalami ilmu, tapi butuh komitmen waktu panjang",
          nextScene: "s2_1",
          effects: {}
        },
        {
          text: "💼 Industri - Bekerja di perusahaan teknologi",
          subtext: "Pengalaman praktis, gaji kompetitif, tapi tekanan tinggi",
          nextScene: "ind_1",
          effects: {}
        }
      ]
    },

    // ========================================
    // JALUR GURU ASN (10 SCENES)
    // ========================================

    // Scene 1: Awal Karir
    guru_1: {
      title: "Hari Pertama Mengajar",
      text: "Kamu mulai bekerja sebagai guru honorer di SMK Negeri dengan gaji Rp 2,5 juta per bulan. Hari pertama, kamu melihat siswa yang kurang aktif dalam pelajaran IT. Bagaimana pendekatan awal kamu?",
      choices: [
        {
          text: "💪 Gunakan metode interaktif dengan game edukatif",
          subtext: "Siswa antusias tapi perlu persiapan ekstra",
          nextScene: "guru_2",
          effects: { minat: 10, nilai: 8, keseimbangan: -5, kepuasan: 7 }
        },
        {
          text: "📚 Ikuti metode ceramah seperti guru senior lainnya",
          subtext: "Aman dan mudah, tapi siswa kurang engaged",
          nextScene: "guru_2",
          effects: { minat: -3, keseimbangan: 5, kepuasan: -2 }
        },
        {
          text: "🤝 Minta saran dari Pak Budi (guru senior) dulu",
          subtext: "Belajar dari pengalaman, membangun relasi baik",
          nextScene: "guru_2",
          effects: { nilai: 10, minat: 5, keseimbangan: 3 }
        }
      ]
    },

    // Scene 2: Realitas Gaji (BARU)
    guru_2: {
      title: "Gaji Pertama: Harapan vs Realita",
      text: "Bulan pertama, kamu menerima gaji Rp 2,5 juta. Teman kuliah yang kerja di startup dapat Rp 6 juta. Biaya kos, makan, dan transport hampir habiskan gaji. Orang tua mulai tanya kapan bisa bantu adik kuliah. Apa yang kamu lakukan?",
      choices: [
        {
          text: "💼 Cari kerja sampingan (les privat online/freelance)",
          subtext: "Penghasilan naik tapi waktu istirahat berkurang drastis",
          nextScene: "guru_3",
          effects: { penghasilan: 10, keseimbangan: -12, kepuasan: -5, minat: -4 }
        },
        {
          text: "🎯 Fokus ikut program PPG untuk jadi guru P3K",
          subtext: "Investasi masa depan, peluang gaji 2x lipat + tunjangan",
          nextScene: "guru_3",
          effects: { nilai: 8, minat: 5, penghasilan: -3, kepuasan: 4 }
        },
        {
          text: "😔 Mengeluh di media sosial dan kehilangan motivasi",
          subtext: "RISIKO: Reputasi turun, atasan bisa tahu",
          nextScene: "guru_3",
          effects: { minat: -15, kepuasan: -12, nilai: -10, keseimbangan: -8 }
        }
      ]
    },

    // Scene 3: Tekanan Keluarga (BARU)
    guru_3: {
      title: "Tekanan dari Orang Tua",
      text: "Orang tua terus mendesak agar kamu ikut seleksi CPNS untuk status ASN permanen. Namun, kamu lebih tertarik mengajar di sekolah swasta yang lebih inovatif dan modern. Konflik internal ini membuatmu stres.",
      choices: [
        {
          text: "💬 Diskusi terbuka dengan orang tua tentang pilihanmu",
          subtext: "Jujur pada diri sendiri, tapi bisa memicu konflik keluarga",
          nextScene: "guru_4",
          effects: { nilai: 12, minat: 8, keseimbangan: -6, kepuasan: 5 }
        },
        {
          text: "👨‍👩‍👦 Ikuti saran orang tua demi keharmonisan keluarga",
          subtext: "Keluarga senang tapi passion menurun drastis",
          nextScene: "guru_4",
          effects: { penghasilan: 12, minat: -10, kepuasan: -8, nilai: -5 }
        },
        {
          text: "⚖️ Jalani keduanya (mengajar + persiapan CPNS)",
          subtext: "Kompromis tapi kelelahan dan hasil tidak maksimal",
          nextScene: "guru_4",
          effects: { keseimbangan: -15, nilai: 5, minat: -6, kepuasan: -4 }
        }
      ]
    },

    // Scene 4: Kasus Siswa Viral (BARU)
    guru_4: {
      title: "Insiden Viral Media Sosial",
      text: "Salah satu siswa kamu tertangkap kamera sedang tidur di kelas, videonya viral di TikTok dengan 500 ribu views. Orang tua murid marah dan menuntut sekolah bertanggung jawab. Kepala sekolah memintamu menyelesaikan masalah ini.",
      choices: [
        {
          text: "🤝 Mediasi dengan pendekatan humanis dan edukatif",
          subtext: "Butuh waktu dan tenaga ekstra tapi membangun respek",
          nextScene: "guru_5",
          effects: { nilai: 15, kepuasan: 10, minat: 8, keseimbangan: -7 }
        },
        {
          text: "😠 Marahi siswa keras di depan kelas sebagai contoh",
          subtext: "RISIKO BESAR: Bisa tambah viral, reputasi hancur",
          nextScene: "guru_5",
          effects: { nilai: -18, kepuasan: -15, minat: -12, keseimbangan: -10 }
        },
        {
          text: "👥 Ajak wali murid, BK, dan kepala sekolah diskusi bersama",
          subtext: "Pendekatan kolaboratif, waktu lebih lama tapi solid",
          nextScene: "guru_5",
          effects: { nilai: 10, kepuasan: 8, keseimbangan: -5, minat: 5 }
        }
      ]
    },

    // Scene 5: Beban Kerja Meningkat (BARU)
    guru_5: {
      title: "Overload: Guru + Wali Kelas + Pembina Ekskul",
      text: "Semester baru, kamu ditunjuk sebagai wali kelas sekaligus pembina ekstrakurikuler robotika. Ditambah mengajar 24 jam per minggu dan tugas administrasi. Kamu sering pulang jam 9 malam dan mulai sering sakit.",
      choices: [
        {
          text: "💪 Terima semua tugas, buktikan kemampuanmu",
          subtext: "RISIKO BURNOUT: Kesehatan menurun, performa drop",
          nextScene: "guru_6",
          effects: { keseimbangan: -20, kepuasan: -15, nilai: -8, minat: -10 }
        },
        {
          text: "📋 Prioritaskan tugas utama, komunikasikan ke atasan",
          subtext: "Fokus kualitas, relasi kerja tetap profesional",
          nextScene: "guru_6",
          effects: { keseimbangan: 12, nilai: 8, kepuasan: 7, minat: 5 }
        },
        {
          text: "👥 Ajak kolaborasi dengan guru lain untuk bagi tugas",
          subtext: "Kerja tim, efisien, hubungan sosial membaik",
          nextScene: "guru_6",
          effects: { keseimbangan: 10, kepuasan: 9, nilai: 6, minat: 4 }
        }
      ]
    },

    // Scene 6: Siswa Berbakat Membangkang
    guru_6: {
      title: "Siswa Pintar tapi Nakal",
      text: "Ada siswa bernama Andi yang sangat cerdas dalam coding tapi sering membolos dan mengganggu kelas. Kepala sekolah berharap kamu bisa mengubahnya karena potensinya sangat besar untuk olimpiade IT.",
      choices: [
        {
          text: "🎯 Pendekatan personal, jadi mentor dan teman curhat",
          subtext: "Butuh kesabaran ekstra, tapi bisa mengubah hidupnya",
          nextScene: "guru_7",
          effects: { nilai: 12, kepuasan: 10, minat: 8, keseimbangan: -6 }
        },
        {
          text: "📚 Fokus ke siswa yang rajin saja, biarkan BK handle",
          subtext: "Waktu efisien tapi kehilangan peluang impact besar",
          nextScene: "guru_7",
          effects: { keseimbangan: 5, nilai: -8, kepuasan: -6, minat: -5 }
        },
        {
          text: "🤝 Kolaborasi dengan BK untuk program khusus",
          subtext: "Pendekatan sistematis, hasil lebih terukur",
          nextScene: "guru_7",
          effects: { nilai: 8, kepuasan: 6, keseimbangan: 3, minat: 5 }
        }
      ]
    },

    // Scene 7: Peluang Sertifikasi
    guru_7: {
      title: "Lulus PPG & Peluang Jadi P3K",
      text: "Setelah 3 tahun, kamu berhasil lulus Program PPG dan diangkat menjadi guru P3K (Pegawai Pemerintah dengan Perjanjian Kerja). Gaji naik menjadi Rp 4,5 juta + tunjangan. Ada peluang ambil sertifikasi untuk tambahan Rp 1,5 juta per bulan.",
      choices: [
        {
          text: "🚀 Ambil sertifikasi + upgrade skill digital teaching",
          subtext: "Investasi karir jangka panjang, gaji meningkat signifikan",
          nextScene: "guru_8",
          effects: { nilai: 10, minat: 8, penghasilan: 12, keseimbangan: -5 }
        },
        {
          text: "⚖️ Fokus balance: mengajar baik + quality time keluarga",
          subtext: "Hidup lebih seimbang, tapi potensi gaji terbatas",
          nextScene: "guru_8",
          effects: { keseimbangan: 12, kepuasan: 10, penghasilan: 5 }
        },
        {
          text: "💼 Cari side income (konsultan/trainer/content creator)",
          subtext: "Penghasilan maksimal tapi waktu pribadi habis",
          nextScene: "guru_8",
          effects: { penghasilan: 15, keseimbangan: -12, kepuasan: -5 }
        }
      ]
    },

    // Scene 8: Konflik dengan Atasan (BARU)
    guru_8: {
      title: "Perbedaan Pendapat dengan Kepala Sekolah",
      text: "Kamu mengusulkan pembelajaran berbasis proyek dan coding untuk semua kelas. Kepala sekolah menolak karena dianggap terlalu risky dan mahal. Kamu merasa frustrasi karena ide inovatifmu tidak didukung.",
      choices: [
        {
          text: "💬 Buat proposal detail dengan data dan presentasi profesional",
          subtext: "Perlu effort ekstra, tapi menunjukkan profesionalisme",
          nextScene: "guru_9",
          effects: { nilai: 12, minat: 8, kepuasan: 6, keseimbangan: -6 }
        },
        {
          text: "😔 Ikuti kebijakan lama saja, jangan buat masalah",
          subtext: "Aman tapi passion dan inovasi terhambat",
          nextScene: "guru_9",
          effects: { minat: -10, kepuasan: -8, nilai: -5, keseimbangan: 5 }
        },
        {
          text: "🎯 Mulai pilot project kecil dulu untuk proof of concept",
          subtext: "Strategi smart, hasil berbicara lebih keras dari proposal",
          nextScene: "guru_9",
          effects: { nilai: 10, minat: 9, kepuasan: 7, keseimbangan: -3 }
        }
      ]
    },

    // Scene 9: Work-Life Balance Crisis (BARU)
    guru_9: {
      title: "Keluarga vs Karir: Dilema Guru",
      text: "Pasangan/orang tua komplain karena kamu jarang di rumah. Akhir pekan masih koreksi tugas dan siapkan materi. Anak/keponakan bilang 'Kakak lebih sayang murid daripada kami'. Tekanan mental meningkat.",
      choices: [
        {
          text: "👨‍👩‍👦 Kurangi jam kerja, prioritaskan keluarga",
          subtext: "Kebahagiaan pribadi meningkat, tapi karir stagnan",
          nextScene: "guru_10",
          effects: { keseimbangan: 15, kepuasan: 12, penghasilan: -5, nilai: -3 }
        },
        {
          text: "📈 Tetap fokus karir, kejar posisi kepala sekolah",
          subtext: "Karir cemerlang tapi hubungan keluarga renggang",
          nextScene: "guru_10",
          effects: { nilai: 10, penghasilan: 12, kepuasan: -12, keseimbangan: -15, minat: -8 }
        },
        {
          text: "⚖️ Cari solusi tengah: atur jadwal lebih efisien",
          subtext: "Balance imperfect tapi semua aspek terkelola",
          nextScene: "guru_10",
          effects: { keseimbangan: 8, kepuasan: 7, nilai: 5, minat: 3 }
        }
      ]
    },

    // Scene 10: Refleksi Akhir Karir Guru
    guru_10: {
      title: "5 Tahun Mengajar: Worth It?",
      text: "Lima tahun sudah berlalu. Kamu pernah capek, frustrasi, bahkan sempat mau resign. Tapi ada puluhan siswa yang berterima kasih karena kamu mengubah hidup mereka. Alumni ada yang jadi developer di Google, ada yang bangun startup sendiri. Apa kesimpulanmu?",
      choices: [
        {
          text: "❤️ Tetap jadi guru, ini panggilanku",
          subtext: "Impact sosial tinggi, kepuasan batin maksimal",
          nextScene: "end",
          effects: { minat: 15, kepuasan: 15, nilai: 12 }
        },
        {
          text: "🔄 Pertimbangkan pindah ke industri/konsultan pendidikan",
          subtext: "Gaji lebih besar, tapi meninggalkan impact langsung ke siswa",
          nextScene: "end",
          effects: { penghasilan: 10, minat: -8, kepuasan: -5 }
        },
        {
          text: "🎓 Lanjut S2 sambil tetap mengajar part-time",
          subtext: "Upgrade kredensial, peluang jadi dosen lebih besar",
          nextScene: "end",
          effects: { nilai: 12, minat: 8, keseimbangan: -8, penghasilan: -5 }
        }
      ]
    },

    // Fail Scene Guru
    guru_fail: {
      title: "Burnout Berat: Resign dari Mengajar",
      text: "Kombinasi gaji rendah, beban kerja berlebihan, dan kurangnya apresiasi membuatmu mengalami burnout parah. Kamu memutuskan resign dan mencari jalur karir lain. Ini bukan kegagalan, tapi pembelajaran berharga tentang mengenal diri sendiri.",
      choices: [
        {
          text: "🔄 Mulai eksplorasi karir baru",
          subtext: "Kembali ke start dan coba jalur lain",
          nextScene: "start",
          effects: {}
        }
      ]
    },
    // ========================================
    // JALUR WIRAUSAHA IT (10 SCENES)
    // ========================================

    // Scene 1: Awal Startup
    wira_1: {
      title: "Ide Startup Pertama",
      text: "Kamu punya ide membuat aplikasi edukatif untuk anak sekolah. Modal awal dari tabungan Rp 15 juta. Teman kuliah ada yang tertarik jadi co-founder, tapi ada juga yang skeptis. Langkah pertamamu?",
      choices: [
        {
          text: "🚀 Langsung eksekusi, buat MVP (produk minimum) sendiri",
          subtext: "Cepat, fokus, tapi beban kerja sangat berat",
          nextScene: "wira_2",
          effects: { minat: 12, nilai: 8, keseimbangan: -10, kepuasan: 7 }
        },
        {
          text: "👥 Ajak 2-3 teman jadi co-founder dengan pembagian saham",
          subtext: "Beban terbagi, tapi harus sepakat di semua keputusan",
          nextScene: "wira_2",
          effects: { keseimbangan: 5, nilai: 6, minat: 8, penghasilan: -3 }
        },
        {
          text: "📚 Ikut inkubator startup dulu untuk belajar dan networking",
          subtext: "Dapat bimbingan tapi proses lebih lambat",
          nextScene: "wira_2",
          effects: { nilai: 10, minat: 6, keseimbangan: 3, penghasilan: -5 }
        }
      ]
    },

    // Scene 2: Masalah Pendanaan Awal (BARU)
    wira_2: {
      title: "Modal Menipis, Produk Belum Jadi",
      text: "Bulan ke-3, modal tinggal Rp 3 juta. Produk baru 60% jadi. Developer freelance minta bayaran Rp 5 juta untuk selesaikan. Orang tua tanya kapan dapat penghasilan. Tekanan finansial sangat berat.",
      choices: [
        {
          text: "💼 Ambil kerja freelance sambil lanjut startup",
          subtext: "Dapat income tapi waktu develop startup terbatas",
          nextScene: "wira_3",
          effects: { penghasilan: 10, keseimbangan: -12, minat: -5, kepuasan: -4 }
        },
        {
          text: "🎯 Full fokus startup, pinjam uang dari keluarga/teman",
          subtext: "RISIKO TINGGI: Hutang bertambah, tekanan mental naik",
          nextScene: "wira_3",
          effects: { minat: 8, penghasilan: -15, kepuasan: -8, nilai: 5 }
        },
        {
          text: "📊 Pivot: ubah ide jadi lebih sederhana dan murah",
          subtext: "Realistis, tapi visi awal berkurang",
          nextScene: "wira_3",
          effects: { nilai: 7, keseimbangan: 5, minat: -6, kepuasan: 3 }
        }
      ]
    },

    // Scene 3: Produk Launch tapi Sepi User (BARU)
    wira_3: {
      title: "Launching: Ekspektasi vs Realita",
      text: "Produk akhirnya launch! Kamu harap dapat 1000 user bulan pertama. Realitanya? Hanya 47 download, 12 yang aktif pakai. Uang marketing habis tapi hasil minim. Mulai ragu dengan kemampuan sendiri.",
      choices: [
        {
          text: "📢 Gaspol marketing: Instagram ads, TikTok, influencer",
          subtext: "Butuh dana besar (Rp 10 juta+), hasil tidak pasti",
          nextScene: "wira_4",
          effects: { penghasilan: -12, nilai: -8, minat: 5, kepuasan: -6 }
        },
        {
          text: "🎯 Fokus improve produk berdasarkan feedback 12 user",
          subtext: "Strategi organik, lambat tapi sustainable",
          nextScene: "wira_4",
          effects: { nilai: 10, minat: 8, keseimbangan: 5, kepuasan: 6 }
        },
        {
          text: "🤝 Cari partner strategis (sekolah/institusi pendidikan)",
          subtext: "B2B approach, lebih stabil tapi kurang fleksibel",
          nextScene: "wira_4",
          effects: { penghasilan: 8, nilai: 7, minat: 6, keseimbangan: -4 }
        }
      ]
    },

    // Scene 4: Konflik dengan Co-Founder (BARU)
    wira_4: {
      title: "Co-Founder Mau Keluar",
      text: "Co-founder kamu bilang mau keluar karena 6 bulan belum dapat income. Dia dapat tawaran kerja di startup lain dengan gaji Rp 8 juta. Kalau dia keluar, kamu harus handle semua sendiri atau cari developer baru.",
      choices: [
        {
          text: "💰 Tawarkan revenue sharing yang lebih besar untuk retain dia",
          subtext: "Share ownership berkurang, tapi tetap ada partner",
          nextScene: "wira_5",
          effects: { penghasilan: -8, keseimbangan: 5, nilai: -5, minat: 3 }
        },
        {
          text: "💪 Lepas dia, handle sendiri atau cari freelancer",
          subtext: "Full control tapi workload ekstrem",
          nextScene: "wira_5",
          effects: { nilai: 8, keseimbangan: -15, minat: 5, kepuasan: -8 }
        },
        {
          text: "🤝 Negosiasi part-time: dia kerja + bantu startup 20%",
          subtext: "Win-win tapi progress lebih lambat",
          nextScene: "wira_5",
          effects: { keseimbangan: 7, nilai: 5, minat: 4, penghasilan: -3 }
        }
      ]
    },

    // Scene 5: First Paying Customer (BARU)
    wira_5: {
      title: "Pelanggan Pertama Bayar!",
      text: "Sebuah sekolah swasta setuju bayar Rp 5 juta per tahun untuk pakai aplikasi kamu! Ini pemasukan pertama setelah 8 bulan struggle. Tapi mereka minta custom feature dalam 2 minggu, atau deal batal.",
      choices: [
        {
          text: "🔥 Terima deal, begadang 2 minggu non-stop develop",
          subtext: "RISIKO BURNOUT tapi dapat validation dan income",
          nextScene: "wira_6",
          effects: { penghasilan: 15, kepuasan: 10, keseimbangan: -18, nilai: -8 }
        },
        {
          text: "⚖️ Negosiasi timeline 1 bulan, kerjakan dengan proper",
          subtext: "Profesional, sehat, tapi risiko deal batal",
          nextScene: "wira_6",
          effects: { nilai: 10, keseimbangan: 5, penghasilan: 8, minat: 6 }
        },
        {
          text: "👥 Hire freelancer untuk bantu, tapi profit berkurang",
          subtext: "Quality terjaga, tapi margin tipis",
          nextScene: "wira_6",
          effects: { keseimbangan: 8, nilai: 6, penghasilan: 5, kepuasan: 7 }
        }
      ]
    },

    // Scene 6: Scaling Challenge
    wira_6: {
      title: "10 Sekolah Tertarik, Tapi Server Down",
      text: "Berita kesuksesan kamu menyebar. 10 sekolah lain mau trial. Tapi server kamu tidak kuat, sering down. User komplain di review Google. Kamu harus upgrade infrastruktur (Rp 15 juta) atau kehilangan momentum.",
      choices: [
        {
          text: "💸 Upgrade server sekarang, pakai sisa tabungan pribadi",
          subtext: "RISIKO ALL-IN: kalau gagal, bangkrut total",
          nextScene: "wira_7",
          effects: { penghasilan: -15, nilai: 8, minat: 10, kepuasan: -10 }
        },
        {
          text: "🎯 Cari investor angel/VC untuk pendanaan seed",
          subtext: "Dapat dana besar tapi equity berkurang signifikan",
          nextScene: "wira_7",
          effects: { penghasilan: 12, nilai: -8, keseimbangan: -6, kepuasan: 5 }
        },
        {
          text: "📊 Batasi user, fokus ke 3 sekolah premium dulu",
          subtext: "Sustainable tapi growth lambat, kompetitor bisa salip",
          nextScene: "wira_7",
          effects: { keseimbangan: 8, nilai: 5, penghasilan: 7, minat: -5 }
        }
      ]
    },

    // Scene 7: Kompetitor Muncul (BARU)
    wira_7: {
      title: "Startup Besar Masuk ke Market Kamu",
      text: "Ruangguru dan Zenius mulai buat fitur serupa dengan aplikasi kamu, dengan budget marketing ratusan juta. Sekolah yang udah jadi klien kamu mulai ditawarin gratis trial oleh mereka. Ancaman serius!",
      choices: [
        {
          text: "🎯 Fokus ke niche: aplikasi khusus SMK teknik saja",
          subtext: "Pasar lebih kecil tapi lebih spesifik dan loyal",
          nextScene: "wira_8",
          effects: { nilai: 10, minat: 8, penghasilan: -5, kepuasan: 7 }
        },
        {
          text: "🤝 Tawarkan akuisisi/partnership ke salah satu big player",
          subtext: "Exit strategy: dapat uang tapi kehilangan ownership",
          nextScene: "wira_8",
          effects: { penghasilan: 15, minat: -12, kepuasan: -8, nilai: -10 }
        },
        {
          text: "💪 Compete head-to-head dengan inovasi fitur AI",
          subtext: "BERANI tapi butuh modal dan tim yang kuat",
          nextScene: "wira_8",
          effects: { nilai: 12, minat: 15, keseimbangan: -15, penghasilan: -10 }
        }
      ]
    },

    // Scene 8: Tim Mulai Tumbuh (BARU)
    wira_8: {
      title: "Hire Karyawan Pertama: Tanggung Jawab Baru",
      text: "Kamu akhirnya mampu hire 2 karyawan full-time: 1 developer dan 1 marketing. Gaji mereka Rp 6 juta/bulan. Sekarang kamu bukan cuma coding, tapi juga jadi manager. Ada pressure baru: tanggung jawab hidup orang lain.",
      choices: [
        {
          text: "👨‍💼 Fokus jadi CEO: strategy, funding, networking",
          subtext: "Delegasi teknis, tapi jauh dari coding yang kamu suka",
          nextScene: "wira_9",
          effects: { nilai: 10, penghasilan: 8, minat: -8, kepuasan: -5 }
        },
        {
          text: "💻 Tetap hands-on coding sambil manage tim",
          subtext: "Passion terjaga tapi workload double, burnout tinggi",
          nextScene: "wira_9",
          effects: { minat: 12, keseimbangan: -18, kepuasan: 5, nilai: -6 }
        },
        {
          text: "⚖️ Bagi peran jelas: kamu product, mereka eksekusi",
          subtext: "Balance, tapi growth lebih lambat",
          nextScene: "wira_9",
          effects: { keseimbangan: 8, nilai: 7, penghasilan: 5, minat: 6 }
        }
      ]
    },

    // Scene 9: Funding vs Bootstrapping (BARU)
    wira_9: {
      title: "Tawaran Investor: Rp 2 Miliar untuk 30% Saham",
      text: "Investor VC tertarik invest Rp 2 miliar dengan syarat: 30% equity, mereka masuk jadi komisaris, dan target growth 10x dalam 2 tahun. Alternatif: tetap bootstrap (modal sendiri) tapi growth lambat.",
      choices: [
        {
          text: "💰 Terima investor, gas scaling secepat mungkin",
          subtext: "Dana besar, pressure tinggi, kontrol berkurang",
          nextScene: "wira_10",
          effects: { penghasilan: 20, nilai: -10, keseimbangan: -12, kepuasan: -8 }
        },
        {
          text: "🎯 Tolak, tetap bootstrap dan grow organik",
          subtext: "Full ownership, tapi growth terbatas, risiko kalah saing",
          nextScene: "wira_10",
          effects: { nilai: 12, minat: 10, penghasilan: -8, kepuasan: 8 }
        },
        {
          text: "🤝 Negosiasi: terima funding tapi equity maksimal 20%",
          subtext: "Win-win tapi butuh negotiation skill tinggi",
          nextScene: "wira_10",
          effects: { nilai: 8, penghasilan: 15, keseimbangan: -6, kepuasan: 6 }
        }
      ]
    },

    // Scene 10: Refleksi Akhir Entrepreneur
    wira_10: {
      title: "3 Tahun Berwirausaha: Layak Diperjuangkan?",
      text: "Tiga tahun penuh drama: hampir bangkrut, kehilangan teman, berantem sama co-founder, tapi juga ada momen dapat klien pertama, team meeting pertama, impact ke ratusan siswa. Income masih fluktuatif. Apa kesimpulanmu?",
      choices: [
        {
          text: "🚀 All-in terus, ini passion sejatiku",
          subtext: "Entrepreneur mindset, siap dengan segala risiko",
          nextScene: "end",
          effects: { minat: 18, kepuasan: 15, nilai: 12 }
        },
        {
          text: "💼 Pivot: jual startup dan join perusahaan stabil",
          subtext: "Exit strategy, dapat pengalaman berharga + modal",
          nextScene: "end",
          effects: { penghasilan: 15, minat: -10, kepuasan: -8 }
        },
        {
          text: "⚖️ Maintain status quo: keep startup sambil ada side job",
          subtext: "Balance, tapi tidak bisa full fokus scale",
          nextScene: "end",
          effects: { keseimbangan: 10, kepuasan: 8, penghasilan: 7 }
        }
      ]
    },

    // Fail Scene Wirausaha
    wira_fail: {
      title: "Startup Tutup: Pelajaran Berharga",
      text: "Setelah 2 tahun berjuang, startup kamu akhirnya harus tutup. Uang habis, user tidak bertambah, tim resign. Tapi kamu dapat pembelajaran luar biasa tentang resilience, product development, dan business. Ini bukan akhir, tapi awal yang baru.",
      choices: [
        {
          text: "🔄 Coba jalur karir lain dengan pengalaman ini",
          subtext: "Kembali eksplorasi dengan skill dan mental lebih kuat",
          nextScene: "start",
          effects: {}
        }
      ]
    },
    // ========================================
    // JALUR S2/AKADEMISI (10 SCENES)
    // ========================================

    // Scene 1: Memulai S2
    s2_1: {
      title: "Diterima Program S2",
      text: "Kamu diterima program S2 Teknik Informatika dengan beasiswa LPDP senilai Rp 300 juta untuk 2 tahun. Tapi teman-teman sudah kerja dan punya penghasilan. Orang tua bangga tapi khawatir kamu terlambat menikah. Apa fokusmu?",
      choices: [
        {
          text: "🎯 Full fokus riset, target publikasi jurnal internasional",
          subtext: "Karir akademis cemerlang tapi kehidupan sosial berkurang",
          nextScene: "s2_2",
          effects: { minat: 12, nilai: 10, keseimbangan: -8, kepuasan: 7 }
        },
        {
          text: "⚖️ Balance: riset + part-time ngajar/asisten dosen",
          subtext: "Income tambahan tapi penelitian lebih lambat",
          nextScene: "s2_2",
          effects: { penghasilan: 8, keseimbangan: 5, minat: 6, nilai: 5 }
        },
        {
          text: "🤝 Aktif di komunitas riset dan networking intensif",
          subtext: "Koneksi luas tapi publikasi bisa tertunda",
          nextScene: "s2_2",
          effects: { nilai: 9, kepuasan: 7, minat: 5, keseimbangan: 3 }
        }
      ]
    },

    // Scene 2: Riset Pertama Mentok (BARU)
    s2_2: {
      title: "Riset Stuck: Data Tidak Sesuai Hipotesis",
      text: "Semester pertama, eksperimen kamu gagal 5 kali berturut-turut. Data tidak mendukung hipotesis. Pembimbing mulai mempertanyakan arah riset. Deadline proposal tinggal 2 bulan. Stress level maksimal.",
      choices: [
        {
          text: "🔄 Pivot total: ganti topik riset yang lebih feasible",
          subtext: "Mulai dari nol lagi, tapi peluang sukses lebih besar",
          nextScene: "s2_3",
          effects: { nilai: 8, minat: -10, kepuasan: -8, keseimbangan: -6 }
        },
        {
          text: "💪 Tetap defend hipotesis, cari metode alternatif",
          subtext: "RISIKO TINGGI: bisa gagal total atau breakthrough",
          nextScene: "s2_3",
          effects: { minat: 12, nilai: -8, kepuasan: -10, keseimbangan: -12 }
        },
        {
          text: "🤝 Konsultasi intensif dengan pembimbing dan mentor",
          subtext: "Dapat guidance, tapi ego terluka karena terkesan lemah",
          nextScene: "s2_3",
          effects: { nilai: 10, kepuasan: 5, minat: 6, keseimbangan: -4 }
        }
      ]
    },

    // Scene 3: Beasiswa vs Biaya Hidup (BARU)
    s2_3: {
      title: "Beasiswa Telat Cair 3 Bulan",
      text: "Beasiswa LPDP terlambat cair karena masalah administrasi. Uang habis, kos belum bayar 2 bulan, makan seadanya. Teman S2 lain ada yang dropout karena masalah serupa. Kamu mulai pertimbangkan hal yang sama.",
      choices: [
        {
          text: "💪 Bertahan: pinjam uang keluarga sementara",
          subtext: "Hutang bertambah, tapi tetap bisa lanjut kuliah",
          nextScene: "s2_4",
          effects: { penghasilan: -12, nilai: 8, kepuasan: -8, minat: 5 }
        },
        {
          text: "💼 Ambil kerja part-time online (freelance/content writer)",
          subtext: "Ada income tapi fokus riset terganggu",
          nextScene: "s2_4",
          effects: { penghasilan: 10, keseimbangan: -10, minat: -6, kepuasan: -4 }
        },
        {
          text: "📢 Advokasi ke kampus dan LPDP dengan surat resmi",
          subtext: "Waktu terbuang tapi fighting for your rights",
          nextScene: "s2_4",
          effects: { nilai: 10, keseimbangan: -8, kepuasan: -6, minat: 3 }
        }
      ]
    },

    // Scene 4: Publikasi Pertama Ditolak (BARU)
    s2_4: {
      title: "Paper Ditolak oleh Jurnal Internasional",
      text: "Setelah 6 bulan kerja keras, paper kamu di-reject oleh jurnal dengan alasan 'metodologi kurang rigorous'. Reviewer kasih feedback pedas. Teman seangkatan sudah ada yang publish 2 paper. Kepercayaan diri drop.",
      choices: [
        {
          text: "🔥 Revisi total sesuai feedback, submit ke jurnal sama lagi",
          subtext: "Belajar dari kesalahan, tapi butuh waktu 3 bulan lagi",
          nextScene: "s2_5",
          effects: { nilai: 12, minat: 8, keseimbangan: -10, kepuasan: -6 }
        },
        {
          text: "🎯 Submit ke jurnal nasional dulu untuk boost confidence",
          subtext: "Lebih mudah diterima tapi impact factor rendah",
          nextScene: "s2_5",
          effects: { kepuasan: 7, nilai: -5, minat: 5, keseimbangan: 3 }
        },
        {
          text: "😔 Ambil jeda sebulan untuk mental health",
          subtext: "Kesehatan mental penting tapi riset tertunda",
          nextScene: "s2_5",
          effects: { keseimbangan: 12, kepuasan: 8, nilai: -8, minat: -6 }
        }
      ]
    },

    // Scene 5: Konferensi Internasional (BARU)
    s2_5: {
      title: "Kesempatan Presentasi di Konferensi Luar Negeri",
      text: "Paper kamu diterima di konferensi internasional di Singapura! Tapi biaya perjalanan Rp 15 juta tidak dicover penuh oleh kampus. Beasiswa hanya cover Rp 8 juta. Ini peluang networking emas tapi harus keluar uang pribadi.",
      choices: [
        {
          text: "✈️ Tetap pergi, pinjam uang untuk biaya tambahan",
          subtext: "Networking berharga, CV bagus, tapi hutang bertambah",
          nextScene: "s2_6",
          effects: { nilai: 15, penghasilan: -10, minat: 10, kepuasan: 8 }
        },
        {
          text: "💻 Presentasi virtual saja (online)",
          subtext: "Hemat biaya tapi networking impact sangat terbatas",
          nextScene: "s2_6",
          effects: { penghasilan: 5, nilai: -6, keseimbangan: 8, kepuasan: -4 }
        },
        {
          text: "🤝 Cari sponsor/grant tambahan dari kampus atau industri",
          subtext: "Butuh effort networking tapi bisa dapat dana penuh",
          nextScene: "s2_6",
          effects: { nilai: 10, minat: 7, keseimbangan: -5, kepuasan: 6 }
        }
      ]
    },

    // Scene 6: Tawaran Kerja vs Lanjut S3
    s2_6: {
      title: "Dilema: Kerja atau Lanjut S3",
      text: "Semester akhir S2, kamu dapat 2 tawaran: (1) Jadi dosen tetap di kampus swasta gaji Rp 8 juta, atau (2) Beasiswa S3 full di luar negeri tapi 4 tahun lagi tanpa income. Umur sudah 26 tahun, tekanan keluarga menikah meningkat.",
      choices: [
        {
          text: "👨‍🏫 Terima jadi dosen, karir akademis dimulai sekarang",
          subtext: "Income stabil, tapi kesempatan S3 mungkin hilang",
          nextScene: "s2_7",
          effects: { penghasilan: 15, keseimbangan: 10, minat: -8, kepuasan: 7 }
        },
        {
          text: "🎓 Ambil S3, kejar gelar doktor dan profesor",
          subtext: "Karir akademis cemerlang tapi sacrifice personal life",
          nextScene: "s2_7",
          effects: { nilai: 15, minat: 12, penghasilan: -15, keseimbangan: -12 }
        },
        {
          text: "💼 Cari opsi ketiga: kerja di industri dengan gaji tinggi",
          subtext: "Gaji besar tapi meninggalkan jalur akademis",
          nextScene: "s2_7",
          effects: { penghasilan: 18, minat: -12, kepuasan: -8, nilai: -10 }
        }
      ]
    },

    // Scene 7: Politik Kampus (BARU)
    s2_7: {
      title: "Konflik dengan Pembimbing: Politik Akademis",
      text: "Pembimbing kamu tiba-tiba minta namanya jadi first author di paper yang kamu tulis sendiri. Alasannya: 'Ini prosedur standar untuk junior researcher'. Teman bilang ini exploitation, tapi menolak bisa berarti tidak lulus.",
      choices: [
        {
          text: "✊ Tolak dan bawa ke pimpinan fakultas",
          subtext: "RISIKO BESAR: bisa blacklist tapi prinsip terjaga",
          nextScene: "s2_8",
          effects: { nilai: 15, minat: -10, kepuasan: -12, keseimbangan: -15 }
        },
        {
          text: "😔 Terima saja demi lulus, simpan dendam di hati",
          subtext: "Lulus lancar tapi mental health terganggu",
          nextScene: "s2_8",
          effects: { kepuasan: -15, nilai: -12, minat: -10, keseimbangan: 5 }
        },
        {
          text: "🤝 Negosiasi: co-first author atau second author",
          subtext: "Kompromi, masih dapat kredit tapi tidak penuh",
          nextScene: "s2_8",
          effects: { nilai: 5, kepuasan: -6, minat: 3, keseimbangan: -4 }
        }
      ]
    },

    // Scene 8: Breakthrough Riset (BARU)
    s2_8: {
      title: "Riset Kamu Viral: Media Nasional Liput",
      text: "Riset tentang AI untuk deteksi penyakit kamu berhasil! Akurasi 95%, media nasional liput, kampus bangga, ada investor yang tertarik komersialkan. Tapi ada tawaran posisi di perusahaan besar dengan gaji Rp 25 juta/bulan.",
      choices: [
        {
          text: "🏢 Terima tawaran industri, apply riset di dunia nyata",
          subtext: "Gaji fantastis tapi meninggalkan jalur akademis murni",
          nextScene: "s2_9",
          effects: { penghasilan: 25, minat: -12, kepuasan: 8, nilai: -8 }
        },
        {
          text: "🎓 Tetap di akademis, develop riset jadi startup sendiri",
          subtext: "Ownership penuh, impact besar, tapi risiko tinggi",
          nextScene: "s2_9",
          effects: { nilai: 15, minat: 15, penghasilan: -10, keseimbangan: -12 }
        },
        {
          text: "⚖️ Dual role: jadi dosen + konsultan part-time",
          subtext: "Balance income dan akademis, tapi workload dobel",
          nextScene: "s2_9",
          effects: { penghasilan: 12, keseimbangan: -10, nilai: 8, kepuasan: 6 }
        }
      ]
    },

    // Scene 9: Publish or Perish Culture (BARU)
    s2_9: {
      title: "Tekanan Publikasi: 3 Paper per Tahun",
      text: "Kampus menerapkan aturan baru: dosen wajib publish minimal 3 paper Scopus per tahun atau tidak naik jabatan. Kamu sudah 2 paper, tinggal 2 bulan lagi. Quality riset menurun karena dikejar kuantitas. Etika vs Karir.",
      choices: [
        {
          text: "🔥 Kejar target 3 paper dengan riset incremental",
          subtext: "Target tercapai tapi riset tidak meaningful",
          nextScene: "s2_10",
          effects: { nilai: -10, penghasilan: 10, kepuasan: -12, minat: -8 }
        },
        {
          text: "✊ Fokus 1 paper berkualitas tinggi, tolak sistem busuk",
          subtext: "Integritas terjaga tapi karir stagnan",
          nextScene: "s2_10",
          effects: { nilai: 15, minat: 12, penghasilan: -8, kepuasan: 8 }
        },
        {
          text: "🤝 Kolaborasi dengan peneliti lain untuk co-authorship",
          subtext: "Win-win, target tercapai, networking meningkat",
          nextScene: "s2_10",
          effects: { nilai: 8, penghasilan: 7, kepuasan: 6, minat: 5 }
        }
      ]
    },

    // Scene 10: Refleksi Akhir Akademisi
    s2_10: {
      title: "5 Tahun di Dunia Akademis: Passion atau Pekerjaan?",
      text: "Lima tahun sudah berlalu sejak mulai S2. Kamu sudah punya 15 publikasi, 3 proyek riset, membimbing puluhan mahasiswa. Gaji dosen Rp 12 juta, jauh lebih kecil dari teman di industri yang Rp 30 juta. Tapi ada kepuasan tersendiri. Apa kesimpulanmu?",
      choices: [
        {
          text: "❤️ Tetap di akademis, ini panggilan hidupku",
          subtext: "Impact jangka panjang, legacy di pendidikan",
          nextScene: "end",
          effects: { minat: 18, kepuasan: 15, nilai: 15 }
        },
        {
          text: "💼 Pindah ke industri R&D dengan gaji 3x lipat",
          subtext: "Financial security, tapi meninggalkan mengajar",
          nextScene: "end",
          effects: { penghasilan: 20, minat: -12, kepuasan: -10 }
        },
        {
          text: "🎯 Hybrid: jadi profesor sambil konsultan/advisory board",
          subtext: "Best of both worlds, tapi workload sangat tinggi",
          nextScene: "end",
          effects: { penghasilan: 15, nilai: 12, keseimbangan: -15 }
        }
      ]
    },

    // Fail Scene S2
    s2_fail: {
      title: "Dropout S2: Bukan Berarti Gagal",
      text: "Setelah pertimbangan matang, kamu memutuskan keluar dari program S2. Mungkin karena masalah finansial, kesehatan mental, atau menyadari jalur akademis bukan untukmu. Ini bukan akhir, tapi redirect ke path yang lebih sesuai.",
      choices: [
        {
          text: "🔄 Eksplorasi jalur karir lain dengan pengalaman riset ini",
          subtext: "Skill tetap berguna di banyak industri",
          nextScene: "start",
          effects: {}
        }
      ]
    },
    // ========================================
    // JALUR INDUSTRI (10 SCENES)
    // ========================================

    // Scene 1: Hari Pertama Kerja
    ind_1: {
      title: "Hari Pertama di Startup Teknologi",
      text: "Kamu diterima sebagai Junior Developer di startup fintech dengan gaji Rp 7 juta. Hari pertama, kamu lihat kultur kerja yang intens: meeting jam 8 pagi, coding sampai jam 8 malam, tapi suasana fun dan tim solid. Bagaimana pendekatan awalmu?",
      choices: [
        {
          text: "🔥 All-in: ikuti ritme kerja keras untuk prove yourself",
          subtext: "Impresi bagus tapi risiko burnout tinggi",
          nextScene: "ind_2",
          effects: { nilai: 12, penghasilan: 10, keseimbangan: -12, kepuasan: 5 }
        },
        {
          text: "⚖️ Set boundaries: kerja 9-5, jaga work-life balance",
          subtext: "Sehat tapi bisa dianggap tidak committed",
          nextScene: "ind_2",
          effects: { keseimbangan: 10, nilai: -6, kepuasan: 7, minat: -3 }
        },
        {
          text: "🤝 Adaptif: ikuti kultur sambil belajar dari senior",
          subtext: "Diplomatis, networking baik, progres steady",
          nextScene: "ind_2",
          effects: { nilai: 8, minat: 7, keseimbangan: 3, kepuasan: 6 }
        }
      ]
    },

    // Scene 2: Imposter Syndrome (BARU)
    ind_2: {
      title: "Senior Developer Terlalu Pintar",
      text: "Di standup meeting, senior developer membahas arsitektur microservices dan Kubernetes yang kamu tidak paham sama sekali. Mereka bicara dengan jargon tinggi. Kamu merasa bodoh dan tidak layak ada di tim ini. Imposter syndrome menyerang.",
      choices: [
        {
          text: "📚 Belajar intensif malam hari, kejar ketertinggalan",
          subtext: "Growth mindset tapi kehilangan waktu istirahat",
          nextScene: "ind_3",
          effects: { nilai: 12, minat: 8, keseimbangan: -10, kepuasan: -5 }
        },
        {
          text: "🙋 Tanya langsung ke senior, akui gap knowledge",
          subtext: "Vulnerable tapi dapat mentoring langsung",
          nextScene: "ind_3",
          effects: { nilai: 8, kepuasan: 7, minat: 6, keseimbangan: 3 }
        },
        {
          text: "😔 Diam saja, takut dianggap tidak kompeten",
          subtext: "RISIKO: gap makin lebar, performa menurun",
          nextScene: "ind_3",
          effects: { nilai: -12, kepuasan: -10, minat: -8, keseimbangan: -6 }
        }
      ]
    },

    // Scene 3: Deadline Impossible (BARU)
    ind_3: {
      title: "Deadline 2 Minggu untuk Fitur 1 Bulan",
      text: "Product Manager minta fitur payment gateway selesai dalam 2 minggu, padahal estimasi realistis 1 bulan. Alasannya: klien besar sudah janji dan kontrak senilai Rp 500 juta tergantung ini. Tim kamu harus lembur extreme.",
      choices: [
        {
          text: "💪 Lembur habis-habisan, tidur 4 jam sehari",
          subtext: "RISIKO BURNOUT PARAH tapi tim achieve target",
          nextScene: "ind_4",
          effects: { nilai: 15, penghasilan: 12, keseimbangan: -20, kepuasan: -15 }
        },
        {
          text: "⚖️ Negosiasi timeline realistis dengan data teknis",
          subtext: "Profesional tapi bisa konflik dengan PM/manajemen",
          nextScene: "ind_4",
          effects: { nilai: 10, keseimbangan: 8, minat: 5, kepuasan: 6 }
        },
        {
          text: "🤝 Ajukan MVP approach: deliver core feature dulu",
          subtext: "Pragmatis, mengelola ekspektasi dengan baik",
          nextScene: "ind_4",
          effects: { nilai: 12, minat: 8, kepuasan: 7, keseimbangan: -5 }
        }
      ]
    },

    // Scene 4: Bug Kritis di Production (BARU)
    ind_4: {
      title: "Bug Kritismu Bikin Production Down 3 Jam",
      text: "Code kamu yang baru deploy bikin sistem crash. Kerugian perusahaan Rp 50 juta. Semua engineer di-ping tengah malam untuk hotfix. CTO marah besar di Slack channel. Kamu merasa sangat bersalah dan malu.",
      choices: [
        {
          text: "💪 Take full responsibility, langsung fix dan belajar",
          subtext: "Accountable, tim respect meski tetap ada dampak negatif",
          nextScene: "ind_5",
          effects: { nilai: 12, kepuasan: -10, minat: 5, keseimbangan: -8 }
        },
        {
          text: "🛡️ Kambing hitamkan code review process yang lemah",
          subtext: "Self-defense tapi reputasi jangka panjang rusak",
          nextScene: "ind_5",
          effects: { nilai: -15, kepuasan: -12, minat: -10, keseimbangan: 3 }
        },
        {
          text: "📚 Fix sambil buat post-mortem document untuk learning",
          subtext: "Turn crisis into opportunity, culture improvement",
          nextScene: "ind_5",
          effects: { nilai: 15, minat: 10, kepuasan: -5, keseimbangan: -6 }
        }
      ]
    },

    // Scene 5: Promosi atau Pindah? (BARU)
    ind_5: {
      title: "Tawaran Promosi vs Headhunter Saingan",
      text: "Setahun bekerja, kamu ditawarkan promosi jadi Mid-Level Developer dengan kenaikan gaji Rp 2 juta. Tapi headhunter dari perusahaan kompetitor menawarkan posisi Senior dengan gaji Rp 15 juta (2x lipat). Loyalty vs Money.",
      choices: [
        {
          text: "🏢 Terima promosi, loyal ke perusahaan pertama",
          subtext: "Culture fit tapi sacrifice earning potential",
          nextScene: "ind_6",
          effects: { kepuasan: 10, penghasilan: 5, nilai: 8, minat: 5 }
        },
        {
          text: "💰 Pindah ke kompetitor dengan gaji 2x lipat",
          subtext: "Financial boost besar tapi mulai dari nol lagi",
          nextScene: "ind_6",
          effects: { penghasilan: 20, nilai: -8, kepuasan: -5, minat: -6 }
        },
        {
          text: "🎯 Nego counter offer: minta naik jadi Rp 12 juta",
          subtext: "Smart move, perusahaan bisa match atau tidak",
          nextScene: "ind_6",
          effects: { penghasilan: 10, nilai: 10, minat: 7, kepuasan: 8 }
        }
      ]
    },

    // Scene 6: Toxic Manager
    ind_6: {
      title: "Manager Baru: Micromanagement Parah",
      text: "Manager baru sangat toxic: minta laporan harian, kritik di depan umum, meeting tidak produktif 3 jam sehari. Banyak engineer resign. Kamu mulai kehilangan passion coding. Mental health menurun drastis.",
      choices: [
        {
          text: "✊ Laporkan ke HR dan minta dipindah team",
          subtext: "Fight for your rights tapi bisa blacklist",
          nextScene: "ind_7",
          effects: { nilai: 12, kepuasan: -10, keseimbangan: -12, minat: -8 }
        },
        {
          text: "🚪 Resign dan cari perusahaan dengan culture lebih baik",
          subtext: "Mental health first, tapi income berhenti sementara",
          nextScene: "ind_7",
          effects: { keseimbangan: 15, penghasilan: -15, kepuasan: 10, nilai: -8 }
        },
        {
          text: "😔 Bertahan sambil cari kerja lain secara diam-diam",
          subtext: "Pragmatis tapi suffering jangka pendek",
          nextScene: "ind_7",
          effects: { penghasilan: 8, kepuasan: -8, keseimbangan: -10, minat: -6 }
        }
      ]
    },

    // Scene 7: Tech Lead Opportunity (BARU)
    ind_7: {
      title: "Ditawarkan Jadi Tech Lead Tim",
      text: "CTO menawarkanmu posisi Tech Lead untuk tim 5 engineer dengan gaji naik Rp 5 juta. Tapi artinya kamu akan lebih banyak meeting, code review, mentoring, dan less coding. Kamu suka coding, tidak yakin suka manage orang.",
      choices: [
        {
          text: "👨‍💼 Terima jadi Tech Lead, naik career ladder",
          subtext: "Leadership path, gaji tinggi, tapi jauh dari coding",
          nextScene: "ind_8",
          effects: { penghasilan: 15, nilai: 10, minat: -10, kepuasan: -6 }
        },
        {
          text: "💻 Tolak, tetap jadi IC (Individual Contributor) expert",
          subtext: "Passion terjaga tapi career growth terbatas",
          nextScene: "ind_8",
          effects: { minat: 12, kepuasan: 10, penghasilan: -5, nilai: -6 }
        },
        {
          text: "⚖️ Coba dulu 6 bulan dengan trial period",
          subtext: "Smart, bisa balik ke IC kalau tidak cocok",
          nextScene: "ind_8",
          effects: { nilai: 8, penghasilan: 10, minat: 5, kepuasan: 6 }
        }
      ]
    },

    // Scene 8: Startup vs Corporate (BARU)
    ind_8: {
      title: "Dilemma: Startup Unicorn vs Corporate BUMN",
      text: "Kamu dapat 2 tawaran: (1) Gojek/Tokopedia gaji Rp 25 juta tapi kultur kerja keras dan pressure tinggi, atau (2) BUMN IT gaji Rp 15 juta tapi santai, benefit lengkap, pensiun terjamin. Risk vs Stability.",
      choices: [
        {
          text: "🚀 Join unicorn startup, kejar growth dan learning",
          subtext: "Career acceleration tapi work-life balance jelek",
          nextScene: "ind_9",
          effects: { penghasilan: 20, nilai: 15, keseimbangan: -15, kepuasan: 5 }
        },
        {
          text: "🏛️ Join BUMN, prioritaskan stability dan keluarga",
          subtext: "Comfort zone tapi skill bisa stagnan",
          nextScene: "ind_9",
          effects: { keseimbangan: 15, penghasilan: 10, minat: -8, kepuasan: 10 }
        },
        {
          text: "💼 Stay di perusahaan sekarang, nego raise besar",
          subtext: "Leverage offers untuk bargaining power",
          nextScene: "ind_9",
          effects: { penghasilan: 15, nilai: 10, minat: 6, kepuasan: 8 }
        }
      ]
    },

    // Scene 9: Work-Life Balance Crisis (BARU)
    ind_9: {
      title: "Burnout: 70 Jam Kerja per Minggu",
      text: "Kamu kerja 70 jam per minggu selama 6 bulan. Kesehatan menurun: migrain kronis, gangguan tidur, anxiety. Pasangan komplain jarang ketemu. Dokter bilang harus istirahat atau risiko stroke. Karir vs Kesehatan.",
      choices: [
        {
          text: "🏥 Ambil cuti 3 bulan untuk recovery total",
          subtext: "Prioritas kesehatan, tapi income berkurang drastis",
          nextScene: "ind_10",
          effects: { keseimbangan: 20, kepuasan: 15, penghasilan: -15, nilai: -10 }
        },
        {
          text: "💪 Kurangi jam kerja tapi tetap produktif (smart work)",
          subtext: "Balance approach, perlu discipline tinggi",
          nextScene: "ind_10",
          effects: { keseimbangan: 12, kepuasan: 10, nilai: 8, minat: 5 }
        },
        {
          text: "🔄 Pindah ke remote work/freelance full",
          subtext: "Fleksibilitas maksimal tapi income tidak stabil",
          nextScene: "ind_10",
          effects: { keseimbangan: 15, penghasilan: -10, kepuasan: 12, minat: 8 }
        }
      ]
    },

    // Scene 10: Refleksi Akhir Industri
    ind_10: {
      title: "5 Tahun di Industri Tech: Sudah Cukup?",
      text: "Lima tahun berlalu, kamu sudah kerja di 3 perusahaan berbeda, gaji naik dari Rp 7 juta jadi Rp 30 juta. Skill teknis sangat mumpuni. Tapi kamu merasa hampa: coding jadi rutinitas, tidak ada purpose. Stuck di golden cage. Apa langkah selanjutnya?",
      choices: [
        {
          text: "💼 Tetap di industri, kejar posisi VP Engineering",
          subtext: "Puncak karir corporate, gaji fantastis",
          nextScene: "end",
          effects: { penghasilan: 25, nilai: 15, kepuasan: -10 }
        },
        {
          text: "🚀 Quit dan bangun startup sendiri untuk impact",
          subtext: "Purpose-driven tapi financial risk ekstrem",
          nextScene: "end",
          effects: { minat: 18, kepuasan: 15, penghasilan: -20 }
        },
        {
          text: "⚖️ Semi-retire: freelance remote sambil travel",
          subtext: "Freedom maksimal, passive income dari skill",
          nextScene: "end",
          effects: { keseimbangan: 20, kepuasan: 18, penghasilan: 5 }
        }
      ]
    },

    // Fail Scene Industri
    ind_fail: {
      title: "Resign: Industri Tech Bukan Untukmu",
      text: "Setelah 2 tahun di industri, kamu menyadari bahwa kultur kerja tech yang serba cepat dan pressure tinggi tidak cocok dengan kepribadianmu. Kamu resign untuk menjaga kesehatan mental. Ini keputusan bijak, bukan kegagalan.",
      choices: [
        {
          text: "🔄 Eksplorasi jalur karir lain yang lebih sesuai",
          subtext: "Pengalaman industri tetap valuable di jalur lain",
          nextScene: "start",
          effects: {}
        }
      ]
    },
    // ========================================
    // END SCENE
    // ========================================
    end: {
      title: "Perjalanan Karirmu Selesai",
      text: "Selamat! Kamu telah menyelesaikan perjalanan eksplorasi karir. Berdasarkan pilihan-pilihan yang kamu buat, sistem akan memberikan rekomendasi jalur karir yang paling sesuai dengan profil dan aspirasimu.",
      choices: [
        {
          text: "📊 Lihat Hasil Analisis Karir",
          subtext: "Lihat skor dan rekomendasi karir",
          nextScene: null,
          effects: {}
        }
      ]
    }
  },

  // ============================================================================
  // RANDOM EVENTS - Kejadian Acak yang Bisa Muncul di Perjalanan
  // ============================================================================
  randomEvents: [
    // Event Positif
    {
      id: "event_mentor",
      title: "Bertemu Mentor Inspiratif",
      text: "Kamu bertemu dengan senior yang berpengalaman dan bersedia menjadi mentormu. Dia memberikan banyak insight berharga tentang karirmu.",
      type: "positive",
      probability: 0.15,
      effects: { nilai: 10, minat: 8, kepuasan: 7 },
      applicablePaths: ["guru", "wira", "s2", "ind"]
    },
    {
      id: "event_award",
      title: "Dapat Penghargaan",
      text: "Kerja kerasmu diakui! Kamu menerima penghargaan dari institusi/komunitas. Kepercayaan diri meningkat drastis.",
      type: "positive",
      probability: 0.10,
      effects: { nilai: 15, kepuasan: 12, minat: 8 },
      applicablePaths: ["guru", "wira", "s2", "ind"]
    },
    {
      id: "event_bonus",
      title: "Bonus Tak Terduga",
      text: "Kamu mendapat bonus atau proyek sampingan yang menghasilkan uang tambahan Rp 5-10 juta. Kondisi finansial membaik.",
      type: "positive",
      probability: 0.12,
      effects: { penghasilan: 10, kepuasan: 8, keseimbangan: 5 },
      applicablePaths: ["guru", "wira", "s2", "ind"]
    },
    {
      id: "event_networking",
      title: "Networking Event Berharga",
      text: "Di sebuah acara, kamu bertemu dengan orang-orang yang membuka peluang kolaborasi dan kesempatan baru.",
      type: "positive",
      probability: 0.15,
      effects: { nilai: 8, minat: 6, kepuasan: 7 },
      applicablePaths: ["guru", "wira", "s2", "ind"]
    },

    // Event Negatif
    {
      id: "event_sakit",
      title: "Sakit dan Harus Istirahat",
      text: "Kamu jatuh sakit karena kelelahan dan harus istirahat 2 minggu. Pekerjaan tertunda dan kesehatan menurun.",
      type: "negative",
      probability: 0.12,
      effects: { keseimbangan: -12, kepuasan: -10, nilai: -5 },
      applicablePaths: ["guru", "wira", "s2", "ind"]
    },
    {
      id: "event_keluarga",
      title: "Masalah Keluarga Mendesak",
      text: "Ada anggota keluarga yang sakit dan butuh perhatianmu. Kamu harus bagi waktu antara karir dan keluarga.",
      type: "negative",
      probability: 0.10,
      effects: { keseimbangan: -15, kepuasan: -8, penghasilan: -5 },
      applicablePaths: ["guru", "wira", "s2", "ind"]
    },
    {
      id: "event_financial",
      title: "Masalah Keuangan Tak Terduga",
      text: "Ada pengeluaran mendadak (laptop rusak/keluarga butuh bantuan). Keuangan tertekan sementara waktu.",
      type: "negative",
      probability: 0.12,
      effects: { penghasilan: -10, kepuasan: -8, keseimbangan: -6 },
      applicablePaths: ["guru", "wira", "s2", "ind"]
    },
    {
      id: "event_conflict",
      title: "Konflik dengan Rekan Kerja",
      text: "Terjadi kesalahpahaman dengan rekan kerja/tim yang membuat suasana kerja tidak nyaman selama beberapa waktu.",
      type: "negative",
      probability: 0.10,
      effects: { kepuasan: -10, keseimbangan: -8, nilai: -5 },
      applicablePaths: ["guru", "wira", "s2", "ind"]
    },
    {
      id: "event_burnout",
      title: "Tanda-Tanda Burnout",
      text: "Kamu mulai merasakan kelelahan mental dan fisik. Motivasi menurun dan perlu extra effort untuk tetap produktif.",
      type: "negative",
      probability: 0.10,
      effects: { kepuasan: -12, keseimbangan: -15, minat: -8 },
      applicablePaths: ["guru", "wira", "s2", "ind"]
    },

    // Event Netral
    {
      id: "event_workshop",
      title: "Kesempatan Workshop Gratis",
      text: "Kamu dapat kesempatan ikut workshop atau training gratis yang relevan dengan karirmu. Skill bertambah.",
      type: "neutral",
      probability: 0.15,
      effects: { nilai: 8, minat: 5 },
      applicablePaths: ["guru", "wira", "s2", "ind"]
    },
    {
      id: "event_social",
      title: "Gathering dengan Alumni",
      text: "Ada reuni alumni kampus. Kamu bertemu teman lama dan sharing pengalaman karir masing-masing.",
      type: "neutral",
      probability: 0.12,
      effects: { kepuasan: 5, keseimbangan: 3 },
      applicablePaths: ["guru", "wira", "s2", "ind"]
    }
  ],

  // ============================================================================
  // UTILITY FUNCTIONS & GAME LOGIC
  // ============================================================================
  
  // Fungsi untuk menghitung rata-rata skor
  calculateAverageScore: function(scores) {
    const values = Object.values(scores);
    const sum = values.reduce((acc, val) => acc + val, 0);
    return Math.round(sum / values.length);
  },

  // Get random event for a specific career path
  getRandomEvent: function(pathId) {
    if (!this.randomEvents || this.randomEvents.length === 0) return null;
    const filtered = this.randomEvents.filter(e => e.applicablePaths.includes(pathId));
    if (filtered.length === 0) return null;
    return filtered[Math.floor(Math.random() * filtered.length)];
  },

  // Get career fit level based on score
  getFitLevel: function(score) {
    if (score >= this.fitLevels.excellent.threshold) return this.fitLevels.excellent;
    if (score >= this.fitLevels.good.threshold) return this.fitLevels.good;
    if (score >= this.fitLevels.moderate.threshold) return this.fitLevels.moderate;
    return this.fitLevels.low;
  },

  // Generate career recommendation
  generateRecommendation: function(scores, pathId) {
    const avgScore = this.calculateAverageScore(scores);
    const path = this.careerPaths[pathId];
    const fitLevel = this.getFitLevel(avgScore);
    
    // Calculate strengths (scores >= 70)
    const strengths = Object.entries(scores)
      .filter(([_, score]) => score >= 70)
      .map(([dim, score]) => ({
        dimension: this.scores[dim].label,
        score: Math.round(score)
      }));
    
    // Calculate improvements (scores < 50)
    const improvements = Object.entries(scores)
      .filter(([_, score]) => score < 50)
      .map(([dim, score]) => ({
        dimension: this.scores[dim].label,
        score: Math.round(score)
      }));
    
    return {
      careerPath: path ? path.label : pathId,
      averageScore: avgScore,
      fitLevel: fitLevel.label,
      advice: `Berdasarkan perjalananmu, ${fitLevel.label.toLowerCase()} dengan jalur ${path ? path.label : pathId}. Skor kesesuaian: ${avgScore}%. ${fitLevel.message}`,
      strengths: strengths,
      improvements: improvements,
      message: `Kamu ${fitLevel.label} dengan jalur ${path ? path.label : pathId}. Skor kesesuaian: ${avgScore}%`
    };
  },

  // Get label for career path
  getPathLabel: function(pathId) {
    return this.careerPaths[pathId]?.label || pathId;
  },

  // Get icon for career path
  getPathIcon: function(pathId) {
    return this.careerPaths[pathId]?.icon || '🎯';
  }
};

// ============================================================================
// EXPORT
// ============================================================================
// Jika menggunakan module system
if (typeof module !== 'undefined' && module.exports) {
  module.exports = gameData;
}

// ============================================================================
// END OF FILE
// Versi 7.0 - Enhanced dengan 10 scenes per jalur
// Bahasa Indonesia sederhana, konteks lokal, balanced scoring
// Total scenes: 1 start + 40 main scenes + 4 fail scenes + 1 end = 46 scenes
// ============================================================================
