# ADR-005 Storage

## 状態
Accepted

## 背景
スマートフォンではブラウザが終了することが多い。

## 決定
自動保存を行う。
保存先は LocalStorage または IndexedDB。

## 影響
作業の復元が可能になる。
