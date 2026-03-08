# Claude 開発ガイド

このファイルは Claude が作業開始時に読むガイドである。

このプロジェクトは **スマートフォン向け競プロ Rust エディタ**であり、
テンプレート挿入によってコード作成を高速化する。

---

## 開発方針

- スマートフォン優先設計
- ドラッグ操作に依存しない
- タップ操作中心
- テンプレート駆動

---

## 実装原則

テンプレートは必ず **データとして定義する**。
テンプレートはコードにハードコードしない。

---

## 参照ドキュメント

プロジェクト概要
→ README.md

プロジェクトスコープ
→ docs/adr/001-project-scope.md

テンプレート設計
→ docs/adr/002-template-system.md

テンプレート挿入ルール
→ docs/adr/003-template-insertion.md

プレースホルダ編集
→ docs/adr/004-placeholder-editing.md

保存設計
→ docs/adr/005-storage.md
