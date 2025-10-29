// Complete Game Data for IT Career Exploration Game
const gameData = {
  // Game metadata
  meta: {
    title: "Karirmu, Pilihanmu: Eksplorasi Karir IT",
    subtitle: "Game Naratif Interaktif untuk Mahasiswa Pendidikan Teknik Informatika",
    version: "6.0",
    author: "Enhanced Career Game"
  },

  // Career paths configuration
  careerPaths: {
    guru: {
      id: "guru",
      label: "Guru ASN",
      icon: "👨‍🏫",
      colorPrimary: "#22c55e",
      colorAccent: "#86efac",
      description: "Jalur pendidik dengan status ASN",
      characterName: "Pak Budi - Guru Senior"
    },
    wira: {
      id: "wira",
      label: "Wirausaha IT",
      icon: "🚀",
      colorPrimary: "#f97316",
      colorAccent: "#fdba74",
      description: "Membangun startup teknologi sendiri",
      characterName: "Sarah - Tech Entrepreneur"
    },
    s2: {
      id: "s2",
      label: "S2/Academia",
      icon: "🎓",
      colorPrimary: "#3b82f6",
      colorAccent: "#93c5fd",
      description: "Melanjutkan studi dan riset",
      characterName: "Dr. Andi - Researcher"
    },
    ind: {
      id: "ind",
      label: "Industri",
      icon: "💼",
      colorPrimary: "#a855f7",
      colorAccent: "#d8b4fe",
      description: "Bekerja di perusahaan teknologi",
      characterName: "Maya - Software Engineer"
    }
  },

  // Score dimensions
  scoreDimensions: {
    minat: { label: "Minat", icon: "🎯", description: "Passion dan motivasi internal" },
    keseimbangan: { label: "Keseimbangan", icon: "⚖️", description: "Work-life balance" },
    penghasilan: { label: "Penghasilan", icon: "💰", description: "Stabilitas finansial" },
    nilai: { label: "Nilai Diri", icon: "💎", description: "Kepercayaan diri dan aktualisasi" },
    kepuasan: { label: "Kepuasan", icon: "😊", description: "Fulfillment dan kebahagiaan" }
  },

  // Random events data
  randomEvents: [
    {
      id: "teknologi_baru",
      text: "🚀 Teknologi AI baru muncul dan mengubah landscape industri!",
      probability: 0.15,
      effects: { minat: 5, nilai: 3 },
      applicablePaths: ["all"]
    },
    {
      id: "ekonomi_krisis",
      text: "📉 Krisis ekonomi mempengaruhi stabilitas pekerjaan di berbagai sektor.",
      probability: 0.1,
      effects: { penghasilan: -8, keseimbangan: -5 },
      applicablePaths: ["all"]
    },
    {
      id: "pelatihan_gratis",
      text: "🎓 Ada kesempatan pelatihan gratis dari Google untuk meningkatkan skill!",
      probability: 0.2,
      effects: { minat: 8, nilai: 5 },
      applicablePaths: ["all"]
    },
    {
      id: "startup_boom",
      text: "💡 Booming startup Indonesia membuka banyak peluang baru!",
      probability: 0.12,
      effects: { minat: 10, penghasilan: 7 },
      applicablePaths: ["wira", "ind"]
    },
    {
      id: "pendidikan_digital",
      text: "📚 Revolusi pendidikan digital meningkatkan kebutuhan guru tech-savvy!",
      probability: 0.18,
      effects: { minat: 12, kepuasan: 8 },
      applicablePaths: ["guru"]
    },
    {
      id: "riset_grant",
      text: "🔬 Pemerintah meluncurkan program grant penelitian IT senilai miliaran!",
      probability: 0.08,
      effects: { minat: 15, penghasilan: 10, kepuasan: 12 },
      applicablePaths: ["s2"]
    },
    {
      id: "tim_pecah",
      text: "Tim founder startup bertengkar hebat! Startup diambang perpecahan.",
      probability: 0.07,
      effects: { nilai: -25, kepuasan: -20, penghasilan: -25 },
      applicablePaths: ["wira"]
    },
    {
      id: "burnout_guru",
      text: "Beban kerja guru tak terkendali. Kamu mengalami burnout.",
      probability: 0.08,
      effects: { keseimbangan: -30, kepuasan: -22 },
      applicablePaths: ["guru"]
    },
    {
      id: "gagal_penelitian",
      text: "Risetmu ditolak tiga jurnal sekaligus. Frustrasi berat!",
      probability: 0.05,
      effects: { nilai: -20, kepuasan: -15, minat: -15 },
      applicablePaths: ["s2"]
    }
  ],

  // Career paths scenes
  scenes: {
    // Starting scene
    start: {
      title: "Memulai Perjalanan",
      text: "Kamu adalah mahasiswa semester akhir Pendidikan Teknik Informatika. Saatnya memutuskan jalan karirmu setelah lulus nanti. Ada beberapa jalur yang bisa kamu pilih.",
      choices: [
        {
          text: "👨‍🏫 Guru ASN - Jalur pendidik dengan status ASN",
          subtext: "Stabilitas tinggi, dampak sosial besar",
          nextScene: "guru_1",
          effects: {}
        },
        {
          text: "🚀 Wirausaha IT - Membangun startup teknologi sendiri",
          subtext: "Risiko tinggi, potensi keuntungan besar",
          nextScene: "wira_1",
          effects: {}
        },
        {
          text: "🎓 S2/Academia - Melanjutkan studi dan riset",
          subtext: "Pengembangan intelektual mendalam",
          nextScene: "s2_1",
          effects: {}
        },
        {
          text: "💼 Industri - Bekerja di perusahaan teknologi",
          subtext: "Karir terstruktur, teknologi cutting-edge",
          nextScene: "ind_1",
          effects: {}
        }
      ]
    },

    // === GURU ASN PATH ===
    guru_1: {
      title: "Memulai Karir Sebagai Guru",
      text: "Kamu memutuskan untuk menjadi guru. Setelah lulus, kamu mengikuti program PPG dan mendapat kesempatan magang di sekolah negeri. Bagaimana pendekatan mengajarmu?",
      choices: [
        {
          text: "💻 Fokus pada teknologi modern dan coding",
          subtext: "Meningkatkan minat siswa dengan tech terbaru",
          nextScene: "guru_2",
          effects: { minat: 15, nilai: 10, keseimbangan: -5 }
        },
        {
          text: "📚 Menerapkan metode pembelajaran tradisional yang proven",
          subtext: "Mengutamakan fundamental yang kuat",
          nextScene: "guru_2",
          effects: { keseimbangan: 10, kepuasan: 8, minat: -3 }
        },
        {
          text: "🎯 Kombinasi inovatif: teknologi dengan metode klasik",
          subtext: "Best of both worlds approach",
          nextScene: "guru_2",
          effects: { minat: 8, kepuasan: 12, nilai: 8, keseimbangan: 5 }
        }
      ]
    },

    guru_2: {
      title: "Menghadapi Tantangan Administratif",
      text: "Sebagai guru ASN, kamu harus menghadapi banyak tugas administratif yang memakan waktu. RPP, laporan, dan berbagai dokumen harus diselesaikan tepat waktu. Bagaimana sikapmu?",
      choices: [
        {
          text: "📝 Menyelesaikan semua tugas admin dengan teliti dan tepat waktu",
          subtext: "Profesional dan disiplin tinggi",
          nextScene: "guru_3",
          effects: { nilai: 15, penghasilan: 10, keseimbangan: -10, kepuasan: -5 }
        },
        {
          text: "⚡ Mencari cara efisien dengan teknologi untuk mempercepat admin",
          subtext: "Inovasi untuk efisiensi kerja",
          nextScene: "guru_3",
          effects: { minat: 12, nilai: 8, keseimbangan: 8, kepuasan: 5 }
        },
        {
          text: "🤝 Berkolaborasi dengan rekan guru untuk saling membantu",
          subtext: "Teamwork dan networking",
          nextScene: "guru_3",
          effects: { kepuasan: 12, keseimbangan: 10, nilai: 5 }
        }
      ]
    },

    guru_3: {
      title: "Peluang Pengembangan Diri",
      text: "Setelah beberapa tahun mengajar, kamu melihat berbagai peluang untuk mengembangkan karir. Kepala sekolah menawarkan posisi koordinator IT, ada juga tawaran sertifikasi internasional.",
      choices: [
        {
          text: "📈 Ambil posisi koordinator IT sekolah",
          subtext: "Tanggung jawab lebih besar, gaji naik",
          nextScene: "guru_4",
          effects: { penghasilan: 15, nilai: 12, keseimbangan: -8, kepuasan: 8 }
        },
        {
          text: "🎓 Fokus mengumpulkan sertifikasi internasional",
          subtext: "Investasi jangka panjang untuk karir",
          nextScene: "guru_4",
          effects: { minat: 18, nilai: 15, penghasilan: -5, keseimbangan: -5 }
        },
        {
          text: "👥 Tetap fokus mengajar dan membimbing siswa",
          subtext: "Passion utama di pendidikan",
          nextScene: "guru_4",
          effects: { kepuasan: 20, minat: 10, penghasilan: 5 }
        }
      ]
    },

    guru_4: {
      title: "Kontribusi untuk Pendidikan",
      text: "Kamu sudah memiliki pengalaman mengajar yang solid. Kini ada kesempatan untuk berkontribusi lebih luas: menulis buku ajar, membuat platform e-learning, atau menjadi trainer guru lain.",
      choices: [
        {
          text: "📖 Menulis buku ajar teknologi informatika",
          subtext: "Legacy knowledge untuk generasi mendatang",
          nextScene: "guru_5",
          effects: { nilai: 20, kepuasan: 15, minat: 10, penghasilan: 8 }
        },
        {
          text: "💻 Mengembangkan platform e-learning inovatif",
          subtext: "Teknologi untuk revolusi pendidikan",
          nextScene: "guru_5",
          effects: { minat: 25, nilai: 18, keseimbangan: -10, kepuasan: 12 }
        },
        {
          text: "🎯 Menjadi trainer nasional untuk guru IT",
          subtext: "Multiplier effect ke seluruh Indonesia",
          nextScene: "guru_5",
          effects: { kepuasan: 25, nilai: 20, penghasilan: 12, keseimbangan: -5 }
        }
      ]
    },

    guru_5: {
      title: "Puncak Karir Guru",
      text: "Reputasimu sebagai guru IT sudah dikenal luas. Ada tawaran menarik: menjadi konsultan kurikulum nasional, kepala sekolah unggulan, atau memulai lembaga pendidikan sendiri.",
      choices: [
        {
          text: "🏛️ Konsultan kurikulum IT nasional untuk Kemendikbud",
          subtext: "Impact level nasional, prestige tinggi",
          nextScene: "guru_6",
          effects: { nilai: 30, kepuasan: 20, penghasilan: 18, minat: 15 }
        },
        {
          text: "🏫 Kepala sekolah unggulan dengan program IT terdepan",
          subtext: "Leadership dan manajemen pendidikan",
          nextScene: "guru_6",
          effects: { penghasilan: 25, nilai: 25, keseimbangan: -15, kepuasan: 15 }
        },
        {
          text: "🚀 Mendirikan lembaga pendidikan teknologi inovatif",
          subtext: "Entrepreneurship di bidang pendidikan",
          nextScene: "guru_6",
          effects: { minat: 30, kepuasan: 25, nilai: 20, keseimbangan: -20, penghasilan: 10 }
        }
      ]
    },

    guru_6: {
      title: "Legacy Seorang Pendidik",
      text: "Setelah puluhan tahun berkarir, kamu telah menjadi tokoh berpengaruh di dunia pendidikan IT Indonesia. Ribuan siswa telah kamu didik, banyak guru yang kamu latih, dan sistem pendidikan IT nasional turut kamu bentuk. Apa yang paling membanggakan dari perjalanan ini?",
      choices: [
        {
          text: "👨‍🎓 Melihat murid-muridku sukses di industri tech",
          subtext: "Kebanggaan melihat hasil didikan",
          nextScene: "END",
          effects: { kepuasan: 35, nilai: 25 }
        },
        {
          text: "🌟 Menciptakan standar baru pendidikan IT Indonesia",
          subtext: "Kontribusi sistemik yang berkelanjutan",
          nextScene: "END",
          effects: { nilai: 40, kepuasan: 30, minat: 20 }
        },
        {
          text: "💝 Menginspirasi generasi guru IT yang lebih baik",
          subtext: "Multiplier effect untuk masa depan",
          nextScene: "END",
          effects: { kepuasan: 40, nilai: 30, minat: 15 }
        }
      ]
    },
    guru_7: {
      title: "Beban Kerja Administrasi Berlebih",
      text: "Kamu dihadapkan pada tugas administrasi yang menumpuk, jam tambahan, dan tekanan dari atasan.",
      choices: [
        {
          text: "❌ Terima semua tambahan tugas tanpa bicara ke atas",
          subtext: "Risiko: Burnout berat & kehilangan motivasi mengajar.",
          nextScene: "FAIL_GURU",
          effects: { keseimbangan: -35, kepuasan: -20, nilai: -10 }
        },
        {
          text: "📋 Diskusikan prioritas dan delegasi tugas dengan atasan",
          subtext: "Manajemen beban kerja yang sehat",
          nextScene: "guru_6",
          effects: { keseimbangan: 15, kepuasan: 10, nilai: 5 }
        },
        {
          text: "🤝 Bentuk tim support guru untuk berbagi beban administrasi",
          subtext: "Kolaborasi untuk efisiensi",
          nextScene: "guru_6",
          effects: { kepuasan: 12, keseimbangan: 12, nilai: 8 }
        }
      ]
    },


    // === WIRAUSAHA IT PATH ===
    wira_1: {
      title: "Memulai Startup Pertama",
      text: "Kamu memutuskan untuk terjun ke dunia startup. Setelah lulus, kamu punya ide aplikasi mobile yang menarik. Modalmu terbatas, tapi semangat tinggi. Apa langkah pertamamu?",
      choices: [
        {
          text: "💻 Langsung coding MVP (Minimum Viable Product)",
          subtext: "Bootstrap dengan skill sendiri",
          nextScene: "wira_2",
          effects: { minat: 20, keseimbangan: -10, penghasilan: -5, kepuasan: 10 }
        },
        {
          text: "🎯 Riset pasar mendalam dan validasi ide dulu",
          subtext: "Approach yang metodis dan hati-hati",
          nextScene: "wira_2",
          effects: { nilai: 15, minat: 10, keseimbangan: 5, penghasilan: 3 }
        },
        {
          text: "🤝 Cari co-founder dan tim untuk kolaborasi",
          subtext: "Strength in numbers approach",
          nextScene: "wira_2",
          effects: { kepuasan: 12, nilai: 8, keseimbangan: 8, minat: 5 }
        }
      ]
    },

    wira_2: {
      title: "Mencari Funding Pertama",
      text: "Prototype sudah jadi dan ada beberapa user awal yang tertarik. Sekarang kamu butuh dana untuk scaling. Ada beberapa opsi: investor angel, kompetisi startup, atau bootstrapping terus.",
      choices: [
        {
          text: "👼 Pitch ke angel investor untuk seed funding",
          subtext: "High risk, high reward approach",
          nextScene: "wira_3",
          effects: { penghasilan: 15, nilai: 12, minat: 8, keseimbangan: -15 }
        },
        {
          text: "🏆 Ikut kompetisi startup untuk menang hadiah",
          subtext: "Kompetisi sebagai validasi dan funding",
          nextScene: "wira_3",
          effects: { nilai: 18, minat: 15, kepuasan: 10, keseimbangan: -8 }
        },
        {
          text: "💪 Tetap bootstrap sambil cari revenue",
          subtext: "Maintain control dan grow organically",
          nextScene: "wira_3",
          effects: { keseimbangan: 10, kepuasan: 8, penghasilan: 5, nilai: 5 }
        }
      ]
    },

    wira_3: {
      title: "Scaling Challenge",
      text: "Startup mu mulai traction! User base tumbuh pesat, tapi dengan itu datang masalah scaling: server crash, customer support kewalahan, dan tim mulai burnout. Bagaimana responsmu?",
      choices: [
        {
          text: "⚡ Hiring spree untuk semua posisi yang dibutuhkan",
          subtext: "Aggressive scaling dengan tim besar",
          nextScene: "wira_4",
          effects: { penghasilan: -10, minat: 15, keseimbangan: 10, kepuasan: 8 }
        },
        {
          text: "🤖 Investasi besar-besaran di automasi dan tech",
          subtext: "Technology-first solution",
          nextScene: "wira_4",
          effects: { minat: 25, nilai: 15, keseimbangan: -5, penghasilan: -5 }
        },
        {
          text: "🎯 Selective growth, fokus quality over quantity",
          subtext: "Sustainable growth approach",
          nextScene: "wira_4",
          effects: { kepuasan: 15, keseimbangan: 15, nilai: 10, minat: 5 }
        }
      ]
    },

    wira_4: {
      title: "Pivot or Persevere",
      text: "Setelah 2 tahun, kamu menghadapi dilema klasik startup: growth mulai plateau, kompetitor bermunculan, dan investor mulai bertanya kapan break-even. Ada pressure untuk pivot atau double-down.",
      choices: [
        {
          text: "🔄 Pivot ke vertical market yang lebih profitable",
          subtext: "Adaptasi strategi berdasarkan learnings",
          nextScene: "wira_5",
          effects: { minat: 12, nilai: 8, kepuasan: -5, penghasilan: 12 }
        },
        {
          text: "🚀 All-in double down dengan Series A funding",
          subtext: "Go big or go home mentality",
          nextScene: "wira_5",
          effects: { minat: 20, penghasilan: 20, keseimbangan: -20, nilai: 15 }
        },
        {
          text: "🛡️ Fokus profitability dan sustainable growth",
          subtext: "Marathon bukan sprint approach",
          nextScene: "wira_5",
          effects: { keseimbangan: 20, kepuasan: 15, penghasilan: 15, minat: 5 }
        }
      ]
    },

    wira_5: {
      title: "Exit Strategy",
      text: "Startup mu sudah berkembang menjadi scale-up yang solid. Kini ada beberapa opsi menarik: akuisisi dari unicorn Indonesia, IPO preparation, atau terus grow sebagai private company.",
      choices: [
        {
          text: "💰 Jual ke unicorn dengan valuasi menggiurkan",
          subtext: "Financial exit dan join sebagai VP",
          nextScene: "wira_6",
          effects: { penghasilan: 40, kepuasan: 20, nilai: 25, keseimbangan: 15 }
        },
        {
          text: "📈 Preparation untuk IPO di bursa IDX",
          subtext: "Become public company pioneer",
          nextScene: "wira_6",
          effects: { nilai: 35, minat: 25, penghasilan: 30, keseimbangan: -10 }
        },
        {
          text: "🌱 Stay private dan build sustainable empire",
          subtext: "Long-term vision untuk impact maksimal",
          nextScene: "wira_6",
          effects: { kepuasan: 30, minat: 20, nilai: 20, keseimbangan: 10 }
        }
      ]
    },

    wira_6: {
      title: "Legacy Entrepreneur",
      text: "Perjalanan entrepreneurship mu telah menginspirasi banyak founder muda Indonesia. Kamu jadi angel investor aktif, mentor di berbagai accelerator, dan speaker di konferensi internasional. Apa next chapter hidupmu?",
      choices: [
        {
          text: "🎓 Mendirikan entrepreneurship academy",
          subtext: "Educate next generation entrepreneurs",
          nextScene: "END",
          effects: { kepuasan: 35, nilai: 30, minat: 25 }
        },
        {
          text: "🌍 Ekspansi global dan build tech empire",
          subtext: "Put Indonesia on global tech map",
          nextScene: "END",
          effects: { nilai: 40, minat: 35, penghasilan: 35 }
        },
        {
          text: "💡 Serial entrepreneur dengan multiple ventures",
          subtext: "Keep building and innovating",
          nextScene: "END",
          effects: { minat: 40, kepuasan: 30, nilai: 25 }
        }
      ]
    },
    wira_7: {
      title: "Krisis Keuangan Startup",
      text: "Cashflow startup negatif, pengeluaran membengkak, investor mulai ragu.",
      choices: [
        {
          text: "❌ Tutup mata & tambah hutang pribadi untuk bertahan",
          subtext: "Risiko: Bangkrut, beban hutang menumpuk",
          nextScene: "FAIL_WIRA",
          effects: { penghasilan: -35, nilai: -15, keseimbangan: -15 }
        },
        {
          text: "📊 Lakukan restrukturisasi dan cost-cutting",
          subtext: "Pendekatan bisnis yang realistis",
          nextScene: "wira_6",
          effects: { nilai: 10, penghasilan: 8, keseimbangan: 5 }
        },
        {
          text: "🤝 Cari strategic partner untuk merger/akuisisi",
          subtext: "Exit strategy yang terhormat",
          nextScene: "wira_6",
          effects: { penghasilan: 12, nilai: 8, kepuasan: 5 }
        }
      ]
    },


    // === S2/ACADEMIA PATH ===
    s2_1: {
      title: "Memilih Program S2",
      text: "Kamu memutuskan melanjutkan ke S2. Ada beberapa pilihan menarik: S2 Computer Science di luar negeri dengan beasiswa, program research di universitas top Indonesia, atau joint degree program.",
      choices: [
        {
          text: "✈️ S2 di luar negeri dengan full scholarship",
          subtext: "Global exposure dan networking internasional",
          nextScene: "s2_2",
          effects: { minat: 20, nilai: 18, keseimbangan: -8, penghasilan: -5 }
        },
        {
          text: "🏛️ Research program di universitas top Indonesia",
          subtext: "Contribute ke ekosistem riset nasional",
          nextScene: "s2_2",
          effects: { kepuasan: 15, minat: 15, keseimbangan: 10, nilai: 8 }
        },
        {
          text: "🤝 Joint degree program Indonesia-luar negeri",
          subtext: "Best of both worlds experience",
          nextScene: "s2_2",
          effects: { nilai: 12, minat: 12, kepuasan: 10, keseimbangan: 5 }
        }
      ]
    },

    s2_2: {
      title: "Choosing Research Focus",
      text: "Kamu harus memilih fokus riset untuk thesis. Dosenmu memberikan beberapa opsi: AI/Machine Learning yang hot, Cybersecurity yang krusial, atau Human-Computer Interaction yang emerging.",
      choices: [
        {
          text: "🤖 Deep dive ke AI/Machine Learning",
          subtext: "Cutting-edge tech dengan impact besar",
          nextScene: "s2_3",
          effects: { minat: 25, nilai: 15, penghasilan: 10, keseimbangan: -10 }
        },
        {
          text: "🛡️ Spesialisasi di Cybersecurity",
          subtext: "High demand skill untuk masa depan",
          nextScene: "s2_3",
          effects: { penghasilan: 20, nilai: 12, minat: 15, kepuasan: 8 }
        },
        {
          text: "👥 Explore Human-Computer Interaction",
          subtext: "Interdisciplinary research yang menarik",
          nextScene: "s2_3",
          effects: { kepuasan: 18, minat: 12, keseimbangan: 12, nilai: 10 }
        }
      ]
    },

    s2_3: {
      title: "Publication Journey",
      text: "Research mu menghasilkan findings menarik! Saatnya publish. Ada pilihan: submit ke top-tier international conference, jurnal nasional terakreditasi, atau kombinasi keduanya.",
      choices: [
        {
          text: "🌍 Target top-tier international conference",
          subtext: "High impact, global recognition",
          nextScene: "s2_4",
          effects: { nilai: 25, minat: 20, keseimbangan: -15, kepuasan: 15 }
        },
        {
          text: "📚 Fokus ke jurnal nasional quality tinggi",
          subtext: "Contribute ke knowledge base Indonesia",
          nextScene: "s2_4",
          effects: { kepuasan: 20, keseimbangan: 10, nilai: 12, minat: 8 }
        },
        {
          text: "📈 Strategic publishing di multiple venues",
          subtext: "Maximize impact dan visibility",
          nextScene: "s2_4",
          effects: { nilai: 18, minat: 15, kepuasan: 12, keseimbangan: -5 }
        }
      ]
    },

    s2_4: {
      title: "Doctoral Decision",
      text: "S2 mu berhasil dengan cum laude! Sekarang ada dilema: lanjut S3 untuk jadi researcher sejati, join industry dengan gelar Master, atau jadi lecturer sambil persiapan S3.",
      choices: [
        {
          text: "🎓 Langsung lanjut S3 di universitas prestisius",
          subtext: "Full commitment to academic career",
          nextScene: "s2_5",
          effects: { minat: 30, nilai: 20, penghasilan: -10, keseimbangan: -10 }
        },
        {
          text: "💼 Join industry sebagai Senior Researcher/Scientist",
          subtext: "Applied research dengan gaji menarik",
          nextScene: "s2_5",
          effects: { penghasilan: 25, keseimbangan: 15, kepuasan: 12, minat: 10 }
        },
        {
          text: "👨‍🏫 Jadi lecturer sambil part-time S3",
          subtext: "Balance between teaching dan research",
          nextScene: "s2_5",
          effects: { kepuasan: 20, keseimbangan: 12, nilai: 15, minat: 15 }
        }
      ]
    },

    s2_5: {
      title: "Research Impact",
      text: "Research kamu mulai dikenal dan dikutip oleh researcher lain. Ada opportunity untuk: lead research grant besar, collaborate dengan industry giants, atau start research lab sendiri.",
      choices: [
        {
          text: "💰 Lead multi-billion research grant nasional",
          subtext: "Big budget, big responsibility, big impact",
          nextScene: "s2_6",
          effects: { nilai: 30, penghasilan: 20, minat: 25, keseimbangan: -20 }
        },
        {
          text: "🏢 Research collaboration dengan Google/Microsoft",
          subtext: "Industry partnership untuk real-world impact",
          nextScene: "s2_6",
          effects: { penghasilan: 30, nilai: 25, minat: 20, kepuasan: 15 }
        },
        {
          text: "🚀 Establish independent research lab",
          subtext: "Create your own research ecosystem",
          nextScene: "s2_6",
          effects: { minat: 35, kepuasan: 30, nilai: 20, keseimbangan: -15 }
        }
      ]
    },

    s2_6: {
      title: "Academic Legacy",
      text: "Kamu telah menjadi salah satu peneliti IT terkemuka Indonesia. Research mu di-cite ribuan kali, mahasiswa S2/S3 mu tersebar di universitas top dunia, dan kamu jadi advisor untuk kebijakan teknologi nasional. Apa crowning achievement mu?",
      choices: [
        {
          text: "🏆 Raih international research award bergengsi",
          subtext: "Global recognition untuk kontribusi science",
          nextScene: "END",
          effects: { nilai: 40, kepuasan: 35, minat: 30 }
        },
        {
          text: "🌱 Mentor generasi peneliti Indonesia yang mendunia",
          subtext: "Legacy through people development",
          nextScene: "END",
          effects: { kepuasan: 40, nilai: 30, minat: 25 }
        },
        {
          text: "🎯 Research mu implementasi jadi solusi nasional",
          subtext: "From lab to real-world impact",
          nextScene: "END",
          effects: { kepuasan: 35, nilai: 35, minat: 25 }
        }
      ]
    },
    s2_7: {
      title: "Tekanan Akademik & Target Publikasi",
      text: "Tugas, penelitian, dan target publikasi bertumpuk. Kamu mulai merasa tertekan.",
      choices: [
        {
          text: "❌ Abaikan saran dosen, kerjakan sendiri tanpa konsultasi",
          subtext: "Risiko: Riset tidak selesai, motivasi menurun",
          nextScene: "FAIL_S2",
          effects: { minat: -20, nilai: -30, kepuasan: -20 }
        },
        {
          text: "🎯 Komunikasi proaktif dengan dosen pembimbing",
          subtext: "Mencari solusi dan guidance",
          nextScene: "s2_6",
          effects: { nilai: 12, minat: 8, kepuasan: 10 }
        },
        {
          text: "📚 Bentuk study group dengan sesama mahasiswa S2",
          subtext: "Support system untuk motivasi",
          nextScene: "s2_6",
          effects: { kepuasan: 15, keseimbangan: 10, minat: 5 }
        }
      ]
    },


    // === INDUSTRI PATH ===
    ind_1: {
      title: "First Job di Tech Industry",
      text: "Kamu diterima sebagai Junior Software Engineer di startup fintech yang sedang berkembang. Tim kecil, culture yang dinamis, tapi workload cukup intense. Bagaimana strategimu?",
      choices: [
        {
          text: "💪 Go all-out, kerja extra hard untuk prove yourself",
          subtext: "Impress management dengan dedikasi tinggi",
          nextScene: "ind_2",
          effects: { nilai: 15, penghasilan: 8, keseimbangan: -15, minat: 10 }
        },
        {
          text: "📚 Focus on learning dan skill development",
          subtext: "Invest in long-term growth",
          nextScene: "ind_2",
          effects: { minat: 20, nilai: 12, kepuasan: 10, keseimbangan: 5 }
        },
        {
          text: "🤝 Build relationships dan understand business",
          subtext: "Network dan business acumen approach",
          nextScene: "ind_2",
          effects: { kepuasan: 15, nilai: 10, keseimbangan: 10, minat: 5 }
        }
      ]
    },

    ind_2: {
      title: "Career Growth Opportunity",
      text: "Setelah 2 tahun, performance mu excellent! Ada beberapa peluang: promosi ke Senior Engineer, pindah ke tech giant dengan gaji 2x lipat, atau join startup lain sebagai Lead Engineer.",
      choices: [
        {
          text: "📈 Terima promosi Senior Engineer di perusahaan ini",
          subtext: "Loyalty dan growth trajectory yang jelas",
          nextScene: "ind_3",
          effects: { kepuasan: 15, penghasilan: 12, keseimbangan: 8, nilai: 10 }
        },
        {
          text: "🏢 Move ke tech giant untuk exponential salary",
          subtext: "Financial security dan prestige",
          nextScene: "ind_3",
          effects: { penghasilan: 25, nilai: 15, keseimbangan: 5, minat: -5 }
        },
        {
          text: "🚀 Join startup lain sebagai Lead Engineer",
          subtext: "Bigger responsibility dan equity potential",
          nextScene: "ind_3",
          effects: { minat: 20, nilai: 18, penghasilan: 8, keseimbangan: -8 }
        }
      ]
    },

    ind_3: {
      title: "Technical Leadership",
      text: "Kamu sekarang lead sebuah tim engineering. Ada pressure untuk deliver product besar dalam timeline ketat. Tim mu mixed: ada senior yang skeptis, junior yang eager, dan satu toxic person.",
      choices: [
        {
          text: "⚡ Focus purely on technical execution dan delivery",
          subtext: "Results-driven leadership style",
          nextScene: "ind_4",
          effects: { minat: 15, penghasilan: 15, keseimbangan: -10, kepuasan: 5 }
        },
        {
          text: "👥 Invest heavily di team building dan culture",
          subtext: "People-first leadership approach",
          nextScene: "ind_4",
          effects: { kepuasan: 20, keseimbangan: 15, nilai: 12, minat: 5 }
        },
        {
          text: "🎯 Balance antara delivery dan people management",
          subtext: "Holistic leadership dengan strategic thinking",
          nextScene: "ind_4",
          effects: { nilai: 18, kepuasan: 15, minat: 10, keseimbangan: 8 }
        }
      ]
    },

    ind_4: {
      title: "Career Crossroads",
      text: "Kamu sudah establish sebagai strong technical leader. Sekarang ada fork di jalan: management track (Engineering Manager), technical track (Principal Engineer), atau entrepreneurial (CTO startup).",
      choices: [
        {
          text: "👔 Management track: Engineering Manager",
          subtext: "Lead people, strategy, dan business impact",
          nextScene: "ind_5",
          effects: { penghasilan: 20, nilai: 20, kepuasan: 10, minat: -5, keseimbangan: -10 }
        },
        {
          text: "🔬 Technical track: Principal Engineer",
          subtext: "Deep technical expertise dan architecture",
          nextScene: "ind_5",
          effects: { minat: 25, kepuasan: 18, nilai: 15, keseimbangan: 10 }
        },
        {
          text: "🚀 Entrepreneurial: CTO di startup promising",
          subtext: "High risk, high reward dengan equity",
          nextScene: "ind_5",
          effects: { minat: 30, nilai: 15, penghasilan: -10, keseimbangan: -15, kepuasan: 20 }
        }
      ]
    },

    ind_5: {
      title: "Industry Impact",
      text: "Expertise kamu sudah dikenal di industri. Kamu sering jadi speaker di konferensi, consultant untuk product strategy, dan mentor untuk junior engineers. Apa next level contribution mu?",
      choices: [
        {
          text: "📖 Write technical book dan create online courses",
          subtext: "Share knowledge dengan broader audience",
          nextScene: "ind_6",
          effects: { kepuasan: 25, nilai: 20, minat: 15, penghasilan: 10 }
        },
        {
          text: "🏢 Join board of directors di multiple tech companies",
          subtext: "Strategic advisory role dengan high influence",
          nextScene: "ind_6",
          effects: { nilai: 30, penghasilan: 25, kepuasan: 15, keseimbangan: -5 }
        },
        {
          text: "💡 Start tech consultancy firm for enterprises",
          subtext: "Entrepreneurial venture based on expertise",
          nextScene: "ind_6",
          effects: { minat: 25, kepuasan: 20, nilai: 18, penghasilan: 15, keseimbangan: -10 }
        }
      ]
    },

    ind_6: {
      title: "Tech Industry Veteran",
      text: "Kamu telah menjadi salah satu tech leader paling respected di Indonesia. Portfolio mu mencakup: successful products yang dipakai jutaan user, teams yang kamu build sekarang jadi leader di companies lain, dan technical decisions yang shape industry standards. What's your ultimate legacy?",
      choices: [
        {
          text: "🌟 Mentor next generation tech leaders Indonesia",
          subtext: "Pay it forward untuk ekosistem tech nasional",
          nextScene: "END",
          effects: { kepuasan: 40, nilai: 30, minat: 20 }
        },
        {
          text: "🏗️ Build technology yang solve major societal problems",
          subtext: "Tech for good dengan massive impact",
          nextScene: "END",
          effects: { kepuasan: 35, nilai: 35, minat: 30 }
        },
        {
          text: "🎯 Establish Indonesia as global tech innovation hub",
          subtext: "Put Indonesian tech on world map",
          nextScene: "END",
          effects: { nilai: 40, minat: 35, kepuasan: 30 }
        }
      ]
    },
    ind_7: {
      title: "Konflik Tim di Divisi Baru",
      text: "Kamu ditempatkan di divisi yang penuh tekanan dan terjadi konflik internal",
      choices: [
        {
          text: "❌ Menghindari konflik, mengerjakan semuanya sendiri tanpa komunikasi",
          subtext: "Risiko: Kinerja jatuh, depresi, kemungkinan di-PHK",
          nextScene: "FAIL_IND",
          effects: { keseimbangan: -20, kepuasan: -20, penghasilan: -30 }
        },
        {
          text: "🤝 Inisiasi diskusi dengan tim dan leader untuk resolve masalah",
          subtext: "Proaktif mencari solusi bersama",
          nextScene: "ind_6",
          effects: { nilai: 15, kepuasan: 10, keseimbangan: 5 }
        },
        {
          text: "📢 Eskalasi ke HR untuk mediasi profesional",
          subtext: "Menggunakan proper channel untuk conflict resolution",
          nextScene: "ind_6",
          effects: { nilai: 10, keseimbangan: 8, kepuasan: 5 }
        }
      ]
    },

    // === FAIL SCENES ===
    FAIL_GURU: {
      title: "Perjalanan Terhenti - Guru ASN",
      text: "Sayangnya, beberapa aspek penting dalam perjalanan karirmu sebagai Guru ASN mengalami penurunan yang signifikan. Ini menunjukkan bahwa mungkin ada ketidaksesuaian antara jalur ini dengan prioritas atau kemampuanmu saat ini. Pertimbangkan untuk merefleksikan keputusanmu atau mencoba jalur karir lain yang lebih sesuai.",
      choices: [
        {
          text: "🔄 Mulai Ulang Perjalanan",
          nextScene: "start",
          effects: {}
        }
      ]
    },

    FAIL_WIRA: {
      title: "Perjalanan Terhenti - Wirausaha IT",
      text: "Perjalananmu sebagai Wirausaha IT menghadapi tantangan yang cukup berat, yang menyebabkan penurunan signifikan dalam beberapa aspek penting. Ini mungkin menandakan perlunya evaluasi ulang terhadap kesiapan dan strategi dalam menjalani jalur wirausaha. Pertimbangkan untuk mencoba pendekatan berbeda atau jalur karir alternatif.",
      choices: [
        {
          text: "🔄 Mulai Ulang Perjalanan",
          nextScene: "start",
          effects: {}
        }
      ]
    },

    FAIL_S2: {
      title: "Perjalanan Terhenti - S2/Academia",
      text: "Jalur akademis yang kamu tempuh mengalami kendala serius yang mempengaruhi berbagai aspek vital dalam perjalanan karirmu. Ini mungkin mengindikasikan bahwa pendekatan atau timing untuk mengejar karir akademis perlu ditinjau ulang. Pertimbangkan untuk mengambil langkah berbeda atau mencoba jalur karir lain.",
      choices: [
        {
          text: "🔄 Mulai Ulang Perjalanan",
          nextScene: "start",
          effects: {}
        }
      ]
    },

    FAIL_IND: {
      title: "Perjalanan Terhenti - Industri",
      text: "Dalam perjalananmu di industri teknologi, beberapa aspek penting mengalami penurunan yang mengkhawatirkan. Ini bisa menjadi tanda bahwa mungkin ada ketidaksesuaian antara ekspektasi dengan realita di jalur ini. Pertimbangkan untuk mengevaluasi ulang pendekatan atau mencoba jalur karir alternatif.",
      choices: [
        {
          text: "🔄 Mulai Ulang Perjalanan",
          nextScene: "start",
          effects: {}
        }
      ]
    },

    // === END SCENE ===
    END: {
      title: "Perjalanan Selesai",
      text: "Terima kasih telah menyelesaikan perjalanan eksplorasi karir ini! Semoga memberikan insight berharga tentang berbagai jalur karir yang tersedia di bidang IT.",
      choices: []
    }
  },

  // Initial score values
  initialScores: {
    minat: 50,
    keseimbangan: 50,
    penghasilan: 50,
    nilai: 50,
    kepuasan: 50
  },

  // Career fit calculation weights
  careerFitWeights: {
    guru: { minat: 0.25, keseimbangan: 0.25, penghasilan: 0.15, nilai: 0.2, kepuasan: 0.15 },
    wira: { minat: 0.3, keseimbangan: 0.1, penghasilan: 0.25, nilai: 0.25, kepuasan: 0.1 },
    s2: { minat: 0.35, keseimbangan: 0.2, penghasilan: 0.1, nilai: 0.25, kepuasan: 0.1 },
    ind: { minat: 0.2, keseimbangan: 0.2, penghasilan: 0.25, nilai: 0.2, kepuasan: 0.15 }
  },

  // Fit level descriptions
  fitLevels: [
    { min: 80, max: 100, label: "Sangat Cocok", emoji: "😍", color: "#22c55e", description: "Pilihan-pilihanmu menunjukkan kecocokan yang sangat tinggi dengan jalur karir ini. Kamu memiliki passion, mindset, dan prioritas yang align dengan karakteristik jalur ini." },
    { min: 65, max: 79, label: "Cocok", emoji: "😊", color: "#3b82f6", description: "Ada kecocokan yang baik antara pilihanmu dengan jalur karir ini. Beberapa aspek sangat sesuai, meskipun ada area yang perlu dipertimbangkan lebih lanjut." },
    { min: 50, max: 64, label: "Perlu Eksplorasi", emoji: "🤔", color: "#f59e0b", description: "Kecocokanmu dengan jalur ini cukup baik, namun masih ada ruang untuk eksplorasi lebih mendalam. Pertimbangkan untuk lebih memahami karakteristik jalur ini." },
    { min: 0, max: 49, label: "Kurang Cocok", emoji: "😟", color: "#ef4444", description: "Berdasarkan pilihan-pilihanmu, sepertinya jalur ini kurang sesuai dengan preferensi dan prioritasmu. Mungkin ada jalur lain yang lebih cocok." }
  ]
};

// Export for use in main app
if (typeof module !== 'undefined' && module.exports) {
  module.exports = gameData;
}
