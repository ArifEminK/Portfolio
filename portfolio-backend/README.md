# Portfolio Website Backend

Portfolio websitesi için Node.js ve Express.js kullanarak geliştirilmiş backend API.

## Özellikler

- **Express.js** - Web framework
- **MongoDB** - NoSQL veritabanı
- **Mongoose** - MongoDB ODM
- **CORS** - Cross-origin resource sharing
- **Helmet** - Güvenlik middleware'i
- **Morgan** - HTTP request logger
- **Dotenv** - Environment variables

## Kurulum

### Gereksinimler

- Node.js (v14 veya üzeri)
- MongoDB (v4.4 veya üzeri)
- npm veya yarn

### Adımlar

1. **Repository'yi klonlayın**
   ```bash
   git clone <repository-url>
   cd portfolio-backend
   ```

2. **Bağımlılıkları yükleyin**
   ```bash
   npm install
   ```

3. **MongoDB'yi kurun ve başlatın**
   - [MongoDB Community Server](https://www.mongodb.com/try/download/community) indirin
   - Kurulumu tamamlayın
   - MongoDB servisinin çalıştığından emin olun

4. **Environment değişkenlerini ayarlayın**
   ```bash
   # env.example dosyasını .env olarak kopyalayın
   cp env.example .env
   
   # .env dosyasını düzenleyin
   MONGODB_URI=mongodb://localhost:27017/portfolio_db
   ```

5. **Uygulamayı başlatın**
   ```bash
   # Development modunda
   npm run dev
   
   # Production modunda
   npm start
   ```

## Veritabanı Yapısı

### Collections

- **Education** - Eğitim ve sertifika bilgileri
- **Skills** - Teknik beceriler
- **Projects** - Proje portföyü

Detaylı veritabanı şeması için `MONGODB_SETUP.md` dosyasına bakın.

## API Endpoints

- `GET /` - Ana sayfa
- `GET /api/education` - Eğitim bilgileri
- `GET /api/skills` - Beceriler
- `GET /api/projects` - Projeler
- `POST /api/contact` - İletişim formu

## 🚀 Scripts

- `npm start` - Production server'ı başlat
- `npm run dev` - Development server'ı başlat (nodemon ile)
- `npm run test:db` - MongoDB bağlantısını test et
- `npm run seed` - Veritabanına örnek veriler ekle (Skills, Education)

## MongoDB Kurulumu

Detaylı MongoDB kurulum rehberi için `MONGODB_SETUP.md` dosyasına bakın.

## Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add some amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## Lisans

Bu proje ISC lisansı altında lisanslanmıştır. 