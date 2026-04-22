# Transaction Kullanımı

## Genel Bakış

Veritabanı işlemlerinde tutarlılık ve güvenlik için `withTransaction` helper'ı kullanılır. Tüm create, update, delete işlemlerinde kullanılmalıdır.

## Import

```javascript
import { withTransaction } from '../util/database.js';
```

## Kullanım

### Tek İşlem

Basit insert, update veya delete işlemleri için:

```javascript
async create(data) {
    return await withTransaction(async (client) => {
        const result = await client.query(
            "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
            [data.name, data.email]
        );
        return result.rows[0];
    });
}
```

### Çoklu İşlem

Birden fazla tabloya bağlı işlemler için (rollback otomatik):

```javascript
async createPersonWithBasicInfo(personData, basicInfo) {
    return await withTransaction(async (client) => {
        // 1. Kişi oluştur
        const person = await client.query(
            "INSERT INTO persons (first_name, last_name) VALUES ($1, $2) RETURNING *",
            [personData.firstName, personData.lastName]
        );
        const personId = person.rows[0].id;

        // 2. Temel bilgileri ekle
        const basic = await client.query(
            "INSERT INTO person_basic_info (person_id, birth_date, gender) VALUES ($1, $2, $3) RETURNING *",
            [personId, basicInfo.birthDate, basicInfo.gender]
        );

        // 3. İletişim bilgilerini ekle
        const contact = await client.query(
            "INSERT INTO person_contact (person_id, phone, email) VALUES ($1, $2, $3) RETURNING *",
            [personId, basicInfo.phone, basicInfo.email]
        );

        return { ...person.rows[0], basic: basic.rows[0], contact: contact.rows[0] };
    });
}
```

### Hata Yönetimi

`withTransaction` içinde fırlatılan herhangi bir hata, otomatik olarak `ROLLBACK` çalıştırır:

```javascript
async updateWithValidation(id, data) {
    return await withTransaction(async (client) => {
        // Mevcut kaydı kontrol et
        const existing = await client.query("SELECT * FROM users WHERE id = $1", [id]);
        if (!existing.rows[0]) {
            throw new HttpException(404, "Sorry, user not found");
        }

        // Güncelle
        const result = await client.query(
            "UPDATE users SET name = $1, updated_at = NOW() WHERE id = $2 RETURNING *",
            [data.name, id]
        );

        return result.rows[0];
    });
}
```

## Önemli Kurallar

1. **Client Kullanımı**: Transaction içinde `pool.query` yerine `client.query` kullanılır
2. **Return**: Her zaman callback içinden return edilen değer döner
3. **Hata Fırlatma**: `throw new HttpException(...)` ile hata fırlatılabilir, otomatik rollback olur
4. **Select İşlemleri**: Sadece okuma yapılacaksa transaction şart değildir

## Select İşlemleri (Transaction Gerekmez)

```javascript
async findById(id) {
    const result = await pool.query(
        "SELECT * FROM users WHERE id = $1",
        [id]
    );
    return result.rows[0];
}

async search(filters) {
    const result = await pool.query(
        "SELECT * FROM persons WHERE first_name ILIKE $1",
        [`%${filters.name}%`]
    );
    return result.rows;
}
```

## Özet

| İşlem Türü         | Transaction Gerekli |
| ------------------ | ------------------- |
| SELECT (okuma)     | Hayır               |
| INSERT             | Evet                |
| UPDATE             | Evet                |
| DELETE             | Evet                |
| Çoklu tablo işlemi | Evet                |
