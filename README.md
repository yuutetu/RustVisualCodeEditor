# Rust 競技プログラミング SP エディタ

スマートフォンで競技プログラミング（主に AtCoder ABC A〜D）用の Rust コードを書くためのエディタ。

このプロジェクトは **文字入力を最小化すること**を目的としており、テンプレート挿入とタップ編集によってコード作成を高速化する。

---

## 目的

スマートフォンで競技プログラミングのコードを書く際の入力負担を減らす。

具体的には次の機能を提供する。

- テンプレート挿入
- タップによる変数編集
- 自動保存
- 提出用コピー

---

## 非目的（MVP）

次の機能は MVP では実装しない。

- Rust コンパイル / 実行
- LSP / コード補完
- AtCoder API 連携
- 問題取得
- 複数ファイル管理

---

## 想定ユーザー

- Rust で AtCoder ABC を解くユーザー
- スマートフォンでのコード入力が辛いユーザー

---

## アーキテクチャ概要

```
src/
ui/
engine/
templates/

docs/
adr/
```

---

## ドキュメント構成

設計判断は ADR に記録する。

- docs/adr/001-project-scope.md
- docs/adr/002-template-system.md
- docs/adr/003-template-insertion.md
- docs/adr/004-placeholder-editing.md
- docs/adr/005-storage.md
