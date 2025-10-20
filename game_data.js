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
    "s2": {
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
