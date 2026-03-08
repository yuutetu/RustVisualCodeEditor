# ADR-003 Template Insertion

## 状態
Accepted

## 背景
テンプレート挿入位置が曖昧だと UX が悪化する。

## 決定
挿入方法は次の2種類とする。

- cursor（カーソル位置）
- anchor（固定位置）

アンカーは次の2つ。

- helpers
- input

## 影響
テンプレート挿入位置が明確になる。
