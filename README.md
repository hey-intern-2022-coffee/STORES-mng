# STORES マネージャー

在庫管理とレジ機能のためのアプリケーション。STORES 上で展開される店舗の業務フローを一括管理できます。

- STORES 店舗の在庫情報の登録/編集機能
- オフライン店舗の在庫情報の登録/編集機能
<!-- - STORES店舗の自社発送手続き -->
- STORES 店舗の店舗受け取り機能
- オフライン店舗の簡易 POS レジ機能

## aspida client コードの自動生成方法

- swagger.yaml を https://github.com/hey-intern-2022-coffee/hey-intern-serverside/blob/main/swagger.yml からコピーしてきて、scripts/bin/swagger.yaml に貼り付ける
- `yarn gen-api`を実行

## QR コードリーダーについて

localhost ではブラウザのセキュリティ機能がデバイスカメラの情報をブロックしているため動きません。

<!-- deploy環境では動作します。 -->

localhost で QR コード読み取りのフローを確かめたい場合は以下のデモを試してください。

DEMO：https://jabtestqr.playcode.io/
