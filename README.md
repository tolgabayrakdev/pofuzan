# Pofuzan

İstihbarat ve kişi yönetim sistemi.

## Access Level Sistemi

Sistem 3 seviyeli erişim kontrolü içerir:

| Level | Açıklama | Yetkiler |
|-------|----------|----------|
| lvl1 | Sadece Okuma | Persons listesi ve detayları görüntüleme |
| lvl2 | Orta Seviye | Person oluşturma, güncelleme, silme (lvl3 gerekli) |
| lvl3 | Tam Yetki | Tüm işlemler + erişim yetkisi verme |

### Erişim Mantığı

- `view_level`: Her person için hangi level görebilir bilgisi saklanır
- Kullanıcı sadece `access_lvl >= view_level` olan kişileri görebilir
- view_level sadece lvl3 tarafından değiştirilebilir

## API Endpoints

### Auth
| Method | Endpoint | Level | Açıklama |
|--------|----------|-------|----------|
| POST | /api/auth/register | - | Kayıt ol |
| POST | /api/auth/login | - | Giriş (session kaydı) |
| POST | /api/auth/logout | lvl1+ | Çıkış (session sonlandırma) |
| POST | /api/auth/refresh | - | Token yenile |
| GET | /api/auth/profile | lvl1+ | Profil getir |
| GET | /api/auth/sessions | lvl3 | Aktif tüm oturumlar |
| GET | /api/auth/sessions/stats | lvl3 | Oturum istatistikleri |
| GET | /api/auth/my-sessions | lvl1+ | Kendi oturum geçmişim |

### Persons
| Method | Endpoint | Level | Açıklama |
|--------|----------|-------|----------|
| GET | /api/persons | lvl1+ | Tüm kişileri listele |
| GET | /api/persons/:id | lvl1+ | Kişi detayı |
| POST | /api/persons | lvl2+ | Yeni kişi oluştur |
| PUT | /api/persons/:id | lvl2+ | Kişi güncelle (isim) |
| PUT | /api/persons/:id/access | lvl3 | Erişim level değiştir |
| DELETE | /api/persons/:id | lvl3 | Kişi sil |

## Database

- `users.access_lvl`: Kullanıcı erişim seviyesi (1, 2, 3)
- `persons.view_level`: Kişiyi kim görebilir

## Güvenlik Notları

- view_level sadece PUT `/persons/:id/access` ile lvl3 tarafından değiştirilebilir
- Person create/update esnasında view_level manipüle edilemez
- Silme işlemi sadece lvl3 tarafından yapılabilir
- Tüm işlemler loglanır