# 1. Local Markdown Issue Tracking

- **Status**: Accepted
- **Date**: 2026-11-12

## Context
Project `sekeco_islami.co` dikembangkan tanpa dependensi wajib ke remote git / service pihak ketiga (seperti GitHub Issues atau GitLab).

## Decision
Menggunakan pelacakan issue/tiket berbasis file Markdown lokal di direktori `.scratch/`.

## Consequences
- **Positif**: Cepat, ringan, bisa bekerja sepenuhnya secara offline tanpa setup akun atau API token.
- **Tradeoff**: Tidak ada fitur kolaborasi multi-user berbasis web seperti komentar GitHub, namun sepenuhnya memadai untuk agent dan pengembang lokal.

