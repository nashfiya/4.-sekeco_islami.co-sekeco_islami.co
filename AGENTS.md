# Agent Instructions & Guidelines

Selamat datang di repositori **Islami.co**. File ini berisi panduan kerja bagi AI Agent dan developer.

## Ringkasan Proyek
- Aplikasi web Islami modern bernuansa *Luxury Islamic Dark & Gold*.
- Stack: HTML5 Semantik, Tailwind CSS (CDN), Vanilla JavaScript, Lucide Icons.
- Panduan teknis lengkap dapat dilihat di [SKILLS.md](file:///d:/4.%20sekeco_islami.co/SKILLS.md).

---

## Agent skills

Repositori ini telah dikonfigurasi mengikuti standar keahlian agent:

- **Issue Tracker**: [docs/agents/issue-tracker.md](file:///d:/4.%20sekeco_islami.co/docs/agents/issue-tracker.md) (Local Markdown di `.scratch/`)
- **Domain Layout**: [docs/agents/domain.md](file:///d:/4.%20sekeco_islami.co/docs/agents/domain.md) (Glosarium di `GLOSSARY.md`, ADR di `docs/adr/`)
- **Triage Labels**: [docs/agents/triage-labels.md](file:///d:/4.%20sekeco_islami.co/docs/agents/triage-labels.md) (Pemetaan label tiket lokal)

### Daftar Skill Matt Pocock yang Terpasang (`.agents/skills/`):
1. **`/to-spec`**: [SKILL.md](file:///d:/4.%20sekeco_islami.co/.agents/skills/to-spec/SKILL.md) — Mengubah ide jadi spesifikasi teknis (`.scratch/<feature>/spec.md`).
2. **`/to-tickets`**: [SKILL.md](file:///d:/4.%20sekeco_islami.co/.agents/skills/to-tickets/SKILL.md) — Memecah spesifikasi jadi tiket kerja atomik (`.scratch/<feature>/<ID>.md`).
3. **`/triage`**: [SKILL.md](file:///d:/4.%20sekeco_islami.co/.agents/skills/triage/SKILL.md) — Evaluasi kelayakan tiket dan pasang label.
4. **`/wayfinder`**: [SKILL.md](file:///d:/4.%20sekeco_islami.co/.agents/skills/wayfinder/SKILL.md) — Peta progres & navigasi urutan eksekusi tugas (`map.md`).
5. **`/domain-modeling`**: [SKILL.md](file:///d:/4.%20sekeco_islami.co/.agents/skills/domain-modeling/SKILL.md) — Pembaruan `GLOSSARY.md` dan pembuatan ADR di `docs/adr/`.
6. **`/ask-matt`**: [SKILL.md](file:///d:/4.%20sekeco_islami.co/.agents/skills/ask-matt/SKILL.md) — Panduan penentu alur & pemilihan skill selanjutnya.
7. **`/setup-matt-pocock-skills`**: [SKILL.md](file:///d:/4.%20sekeco_islami.co/.agents/skills/setup-matt-pocock-skills/SKILL.md) — Setup inisialisasi awal.
8. **`/grill-me`**: [SKILL.md](file:///d:/4.%20sekeco_islami.co/.agents/skills/grill-me/SKILL.md) — Wawancara kritis (grilling) untuk menggali edge cases sebelum coding.
9. **`/with-docs`**: [SKILL.md](file:///d:/4.%20sekeco_islami.co/.agents/skills/with-docs/SKILL.md) — Riset dokumentasi resmi API/library agar tidak halusinasi kode.
10. **`/review`**: [SKILL.md](file:///d:/4.%20sekeco_islami.co/.agents/skills/review/SKILL.md) — Code review mendalam untuk kebersihan, desain, dan bug.
11. **`/tdd`**: [SKILL.md](file:///d:/4.%20sekeco_islami.co/.agents/skills/tdd/SKILL.md) — Siklus Test-Driven Development (Red-Green-Refactor).
12. **`/debug`**: [SKILL.md](file:///d:/4.%20sekeco_islami.co/.agents/skills/debug/SKILL.md) — Investigasi terstruktur untuk menemukan akar masalah (Root Cause Analysis).

