# Agent 作業ガイド

このファイルは AI エージェントが開発を行う際のガイドである。

---

## 作業手順

1. README を読む
2. ADR を読む
3. 小さな機能単位で実装する

---

## 実装優先順位

1. テンプレート挿入
2. 挿入ルール
3. プレースホルダ編集
4. 自動保存
5. 提出コピー

---

## 実装してはいけない機能（MVP）

- Rust コンパイル
- LSP
- AtCoder API 連携

---

## ドキュメント参照

概要
→ README.md

プロジェクトスコープ
→ docs/adr/001-project-scope.md

テンプレート設計
→ docs/adr/002-template-system.md

挿入ルール
→ docs/adr/003-template-insertion.md

プレースホルダ編集
→ docs/adr/004-placeholder-editing.md

保存設計
→ docs/adr/005-storage.md
