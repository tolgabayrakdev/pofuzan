import { Link } from "react-router"

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-heading tracking-tight">Gizlilik Sözleşmesi</h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
              Kişisel verilerin işlenmesi
            </p>
          </div>
          <Link
            to="/sign-up"
            className="text-[10px] uppercase tracking-wider text-muted-foreground hover:text-foreground"
          >
            ← Geri
          </Link>
        </div>

        <div className="prose prose-docs prose-sm max-w-none">
          <div className="p-4 border border-border">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-4">
              Last updated: 2026-04-17
            </p>

            <h2 className="text-sm font-medium uppercase tracking-wider mt-6 mb-2">
              1. Veri Sorumlusu
            </h2>
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              Bu sistem ("POFUZAN") veri sorumlusu sıfatıyla, kişisel verilerinizi 6698 sayılı
              Kişisel Verilerin Korunması Kanunu ("KVKK") ve ilgili mevzuat çerçevesinde
              işlemektedir.
            </p>

            <h2 className="text-sm font-medium uppercase tracking-wider mt-6 mb-2">
              2. İşlenen Kişisel Veriler
            </h2>
            <p className="text-[10px] text-muted-foreground leading-relaxed mb-2">
              Sistemde kayıt altına alınan kişi ve işlem verileri şunlardır:
            </p>
            <ul className="text-[10px] text-muted-foreground leading-relaxed list-disc list-inside space-y-1">
              <li>Ad, soyad</li>
              <li>TC kimlik numarası</li>
              <li>Adres bilgileri</li>
              <li>İletişim bilgileri (telefon, e-posta)</li>
              <li>Kayıt tarihi ve kayıt eden kullanıcı bilgisi</li>
              <li>İşlem geçmişi (ekleme, güncelleme, silme, görüntüleme)</li>
            </ul>

            <h2 className="text-sm font-medium uppercase tracking-wider mt-6 mb-2">
              3. Verilerin İşlenme Amacı
            </h2>
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              Kişisel verileriniz yalnızca aşağıdaki amaçlarla işlenir: sistem güvenliği,
              kullanıcı kimlik doğrulama, kayıt yönetimi, denetim ve yasal yükümlülüklerin
              yerine getirilmesi. Veriler üçüncü taraflarla paylaşılmaz.
            </p>

            <h2 className="text-sm font-medium uppercase tracking-wider mt-6 mb-2">
              4. Verilerin Saklanma Süresi
            </h2>
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              Tüm işlem kayıtları süresiz olarak saklanır. Kişisel veriler, ilgili mevzuatta öngörülen
              saklama süreleri boyunca muhafaza edilir. Silme talepleri KVKK madde 7 kapsamında
              değerlendirilir.
            </p>

            <h2 className="text-sm font-medium uppercase tracking-wider mt-6 mb-2">
              5. Güvenlik Önlemleri
            </h2>
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              Veriler, endüstri standardı şifreleme algoritmaları ile korunmaktadır. Yetkisiz
              erişim girişimleri sistem tarafından loglanır ve engellenir. Veritabanı
              bağlantıları şifrelenmiş kanal üzerinden gerçekleştirilir.
            </p>

            <h2 className="text-sm font-medium uppercase tracking-wider mt-6 mb-2">
              6. Haklarınız
            </h2>
            <p className="text-[10px] text-muted-foreground leading-relaxed mb-2">
              KVKK kapsamında aşağıdaki haklara sahipsiniz:
            </p>
            <ul className="text-[10px] text-muted-foreground leading-relaxed list-disc list-inside space-y-1">
              <li>Kişisel verilerin işlenip işlenmediğini öğrenme</li>
              <li>İşlenen verileri talep etme</li>
              <li>Verilerin eksik/yanlış işlenmesini düzeltilmesini isteme</li>
              <li>Silinmesini isteme</li>
              <li>İşlemenin yasal olmadığı hallerde itiraz etme</li>
            </ul>

            <h2 className="text-sm font-medium uppercase tracking-wider mt-6 mb-2">
              7. İletişim
            </h2>
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              Gizlilik politikamız hakkında sorularınız için sistem yöneticisi ile iletişime
              geçebilirsiniz. Başvurularınız 30 gün içinde değerlendirilir.
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <Link
            to="/sign-up"
            className="px-4 py-2 text-[10px] uppercase tracking-wider border border-border hover:bg-muted transition-colors"
          >
            Kayıt Formuna Dön
          </Link>
        </div>

        <div className="text-center text-[9px] text-muted-foreground/50 uppercase tracking-widest">
          [ PRIVACY-POLICY v1.0 ]
        </div>
      </div>
    </div>
  )
}