# Canvas Chat Uygulaması - ChatGPT Benzeri Arayüz ve Kod Gösterim Platformu

Bu proje, ChatGPT benzeri bir arayüze sahip, kullanıcıların AI ile etkileşime girerek kod üretebileceği, görüntüleyebileceği ve düzenleyebileceği canvas tabanlı bir chat uygulamasıdır.

## 🌟 Özellikler

- **ChatGPT Benzeri Sohbet Arayüzü**:

  - Gerçek zamanlı mesajlaşma deneyimi
  - Markdown desteği ile zengin içerik formatı
  - Kod bloklarını otomatik tanıma ve syntax highlighting
  - Mesaj geçmişi ve arşivleme özellikleri
  - Çoklu sohbet oturumu yönetimi

- **Canvas Kod Görselleştirme**:

  - AI tarafından üretilen kodun interaktif canvas üzerinde gösterimi
  - Kod bileşenleri arasında ilişkileri gösteren bağlantılar
  - Sürükle-bırak yöntemi ile kod blokları düzenleme
  - Yakınlaştırma/uzaklaştırma ve pan özellikleri
  - Kod blokları için renk kodlaması ve etiketleme

- **AI Destekli Kod Üretimi**:

  - Doğal dil ile kod oluşturma (OpenAI API entegrasyonu)
  - Otomatik kod tamamlama ve öneriler
  - Programlama dillerine göre özelleştirilmiş yanıtlar
  - Hata ayıklama ve kod açıklama özellikleri
  - Çoklu programlama dili desteği

- **Kullanıcı Deneyimi**:
  - Sezgisel ve modern arayüz
  - Karanlık/aydınlık tema seçenekleri
  - Duyarlı (responsive) tasarım
  - Klavye kısayolları
  - Oturum hatırlama ve otomatik giriş

## 🛠️ Kullanılan Teknolojiler ve Kütüphaneler

### Temel Teknolojiler

- **Next.js 14+**: SSR, API rotaları ve tam sayfa yönlendirmeleri
- **React 18**: Modern UI bileşen mimarisi
- **TypeScript**: Tip güvenliği ve kod kalitesi
- **Node.js**: Sunucu tarafı operasyonlar için

### UI/UX Kütüphaneleri

- **Tailwind CSS**: Hızlı ve esnek stil geliştirme
- **shadcn/ui**: Radix UI üzerine inşa edilmiş, erişilebilir ve özelleştirilebilir bileşenler
- **Lucide Icons**: Minimalist SVG ikonlar
- **Framer Motion**: Animasyonlar ve geçişler için

### Canvas ve Kod Görselleştirme

- **react-flow**: Diyagram ve akış şemaları için interaktif canvas
- **d3.js**: Gelişmiş veri görselleştirme
- **Prismjs**: Kod syntax highlighting
- **Monaco Editor**: VS Code benzeri gömülü kod editörü

### Veri ve State Yönetimi

- **Zustand**: Basit ve esnek durum yönetimi
- **React Query**: Sunucu durumu yönetimi ve veri önbelleğe alma
- **Zod**: Şema doğrulama
- **Server Actions**: Next.js server actions ile veri getirme işlemleri

### AI ve API Entegrasyonları

- **OpenAI API**: AI tabanlı kod üretimi ve sohbet
- **Langchain**: Geniş dil modelleri (LLM) entegrasyonu için framework
- **Axios**: HTTP istekleri ve veri fetching işlemleri için

### Depolama ve Veritabanı

- **MongoDB**: NoSQL veritabanı çözümü
- **Mongoose**: MongoDB için ODM (Object Data Modeling) kütüphanesi
- **localStorage/Cookies**: İstemci tarafı veri saklama

### Geliştirici Araçları

- **ESLint**: Kod kalite kontrolü
- **Prettier**: Kod formatı
- **Husky**: Git hooks
- **Jest/React Testing Library**: Test yaklaşımı
- **Storybook**: UI bileşen geliştirme ve dokümantasyon

## 🚀 Kurulum

### Ön Gereksinimler

- Node.js 18.0.0 veya üstü
- yarn
- OpenAI API Key

### Adımlar

1. Depoyu klonlayın:

```bash
git clone https://github.com/kullanici/canvas-chat-app.git
cd canvas-chat-app
```

2. Bağımlılıkları yükleyin:

```bash
yarn install
```

3. Ortam değişkenlerini ayarlayın:
   - Projenin kök dizininde `.env.local` dosyası oluşturun:

```
OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
DATABASE_URL=your_database_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
```

4. (Opsiyonel) Veritabanı yapılandırması:

```bash
npx prisma migrate dev --name init
```

## 🏃‍♂️ Uygulama Çalıştırma

Geliştirme sunucusunu başlatın:

```bash
npm run dev
# veya
yarn dev
# veya
pnpm dev
```

Web tarayıcınızda [http://localhost:3000](http://localhost:3000) adresine giderek uygulamayı görüntüleyebilirsiniz.

## 📂 Proje Yapısı

```
canvas-chat-app/
├─ app/                  # Next.js App Router yapısı
│  ├─ (auth)/            # Kimlik doğrulama sayfaları
│  ├─ api/               # API endpoint'leri
│  ├─ chat/              # Chat sayfaları
│  └─ layout.tsx         # Ana sayfa düzeni
├─ components/           # React bileşenleri
│  ├─ ui/                # Temel UI bileşenleri
│  ├─ chat/              # Sohbet arayüzü bileşenleri
│  ├─ canvas/            # Canvas ve kod görselleştirme bileşenleri
│  └─ shared/            # Paylaşılan bileşenler
├─ lib/                  # Yardımcı fonksiyonlar
│  ├─ api/               # API istemcileri ve entegrasyonlar
│  ├─ utils/             # Genel yardımcı fonksiyonlar
│  └─ hooks/             # Özel React hook'ları
├─ prisma/               # Veritabanı şemaları ve yapılandırması
├─ public/               # Statik dosyalar
├─ styles/               # Global stiller ve Tailwind yapılandırması
├─ types/                # TypeScript tip tanımlamaları
└─ middleware.ts         # Next.js middleware yapılandırması
```

## 🌐 Özellik Kullanım Örnekleri

### Sohbet Başlatma

1. Ana sayfada "Yeni Sohbet" butonuna tıklayın
2. İlk mesajınızı yazın (örn. "React için bir TODO uygulaması oluştur")
3. AI yanıtını bekleyin ve sohbete devam edin

### Canvas Modu

1. Herhangi bir kod içeren yanıttan sonra "Canvas'ta Görüntüle" butonuna tıklayın
2. Canvas üzerinde kod blokları arasındaki ilişkileri görün
3. Blokları sürükleyerek düzenleyin, yakınlaştırıp uzaklaştırın

### Kod Düzenleme

1. Canvas veya sohbet modunda kod bloğuna tıklayın
2. "Düzenle" ikonuna tıklayın
3. Monaco editörde kodunuzu düzenleyin ve "Kaydet" ile onaylayın

### Proje Dışa Aktarma

1. Sohbet oturumunda "Dışa Aktar" butonuna tıklayın
2. Tercih ettiğiniz formatı seçin (zip, GitHub reposu, CodeSandbox)
3. Dışa aktarma işlemini onaylayın ve indirin

## 🚧 Geliştirme Yol Haritası

- [ ] Gerçek zamanlı işbirliği özellikleri
- [ ] Gelişmiş veritabanı entegrasyonu
- [ ] Daha fazla AI modeli desteği
- [ ] Mobil uygulama
- [ ] VS Code/JetBrains eklentileri
- [ ] Özelleştirilebilir tema sistemi

## 🤝 Katkıda Bulunma

Katkılarınızı memnuniyetle karşılıyoruz! Katkıda bulunmak için lütfen:

1. Bu depoyu fork'layın
2. Kendi branch'inizi oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit'leyin (`git commit -m 'Add amazing feature'`)
4. Branch'e push'layın (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı ile lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasına bakın.

## 📧 İletişim

Sorularınız veya geri bildirimleriniz için [ornek@email.com](mailto:ornek@email.com) adresine e-posta gönderebilirsiniz.

---

Bu proje açık kaynak topluluğunun desteğiyle geliştirilmektedir. ❤️
