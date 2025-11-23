# Konuşarak Öğren – AI Günlük Analiz Uygulaması

Bu proje kullanıcının yazdığı bir cümlenin duygu durumunu (pozitif / negatif / nötr) analiz eden, kısa bir özet + öneri sunan ve tüm analiz geçmişini saklayan bir React Native uygulamasıdır.

---

##  Uygulama Önizlemesi

https://youtube.com/shorts/tKKLKgh-xko

---

##  Özellikler

- **Türkçe Duygu Analizi**  
  Kullanıcının yazdığı metin Hugging Face Türkçe modeli ile analiz edilir.

- **Özet + Öneri Üretimi**  
  Analiz sonucuna göre kullanıcıya kısa bir açıklama ve motivasyon önerisi sunulur.

- **Geçmiş Kayıt Sistemi**  
  Yapılan analizler geçmiş ekranında listelenir.

- **Kalıcı Depolama (AsyncStorage)**  
  Uygulama yeniden açıldığında geçmiş silinmez.

- **Tab Navigation**  
  Home ↔ History arasında alt menü ile geçiş.

---

## 🧠 Kullanılan Teknolojiler

### ⚛️ React Native  
Uygulamanın mobil arayüzü için kullanıldı.

### 🧵 Redux Toolkit  
Uygulama durum yönetimi için kullanıldı.  
**Neden?**  
- API isteğinin loading / success / error aşamalarını yönetmek çok kolay.  
- State’i hem Home hem History ekranında paylaşmak gerekiyor.  
- Redux Toolkit’i tercih etmemizin nedeni, uygulamaya yeni özellikler eklendiğinde durum yönetimini daha düzenli, ölçeklenebilir ve sürdürülebilir hale getirmesidir.

### 📡 Axios  
Hugging Face API’sine istek göndermek için kullanıldı.

### 🤖 Hugging Face Router API  
Türkçe duygu analizi modeli:  
`savasy/bert-base-turkish-sentiment-cased`  
**Neden?**  
- Bu model tamamen Türkçe için eğitildi.  
- İngilizce modeller Türkçe cümlelerde yanlış sonuç veriyordu.

### 💾 AsyncStorage  
Geçmişin kalıcı olması için kullanıldı.  
**Neden?**  
- Redux RAM’de çalıştığı için uygulama kapanınca veri kayboluyor.  
- AsyncStorage ile analiz geçmişi sürekli saklanıyor.

### 🗺 React Navigation Bottom Tabs  
Home ve History sayfaları arasında geçiş için kullanıldı.

---

## 🔮 Geliştirilebilir Özellikler

Bu proje temel duygu analizi ve öneri sistemi üzerine kurulmuştur. İleride eklenebilecek bazı geliştirmeler:

### ⭐ 1. AI Tabanlı Kişisel Motivasyon Mesajları  
Kullanıcının yazdığı metne göre daha kapsamlı ve kişisel motivasyon cümleleri üretilebilir.  
Mevcut sürümde yalnızca “pozitif / negatif / nötr” durumuna göre sabit öneriler dönülmektedir.  
**Neden eklemedik?**  
- Hugging Face Router API üzerinden metin üretimi yapan modeller yüksek token maliyetine sahip.Ücretsiz olan modellerden tam verim alınamadı.  
- Bu case çalışma için hızlı ve optimize bir çözüm hedeflendi.

---

### ⭐ 2. Günlük Yazma Limiti  
Kullanıcının günde belirli bir sayıda analiz yapmasına izin veren bir sistem eklenebilir.  
Örneğin:  
- Ücretsiz kullanıcı → günde 5 analiz  
- Premium kullanıcı → limitsiz  

Bu özellik kullanıcı alışkanlığı ve kullanım yoğunluğu ölçmek için değerlidir.

---

### ⭐ 3. Tek Entry Silme
Geçmiş ekranında her bir sonucu sola kaydırarak silme eklenebilir.

---
### 🚀 Kurulum ve Çalıştırma Rehberi

Bu projeyi lokal ortamda çalıştırmak için aşağıdaki adımları takip edin.

1️⃣ Depoyu Klonlayın
git clone https://github.com/kullaniciadi/proje-adi.git
cd proje-adi

2️⃣ Gerekli Paketleri Yükleyin
npm install


veya

yarn install

3️⃣ Hugging Face API Anahtarını Oluşturun

Hugging Face hesabınıza giriş yapın

Sağ üst → Settings → Access Tokens

New Token oluşturun

Name: “diary-app”

Token Type: Fine Grained

Token’ı kopyalayın

⚠️ Önemli: Token’ı GitHub’a kesinlikle göndermeyin. Public repo’ya yüklenirse HuggingFace otomatik olarak invalid durumuna düşürür.

4️⃣ .env Dosyası Oluşturun

Proje kök dizinine .env oluşturun:

HF_TOKEN=hf_xxx_buraya_sizin_tokeniniz


⚠️ .env dosyası güvenlik nedeniyle repoya dahil değildir.

5️⃣ Uygulamayı Başlatın
npx expo start


Telefon ile QR kodu okutarak çalıştırabilirsiniz �

🧪 Test Amaçlı Model

Projede şu model kullanılmaktadır:

savasy/bert-base-turkish-sentiment-cased


Her istek için .env içindeki token zorunludur.
Token girilmezse analiz çalışmaz.
---

## 📦 Proje Yapısı

src/
├─ components/
│ └─ ResultCard.js
├─ navigation/
│ └─ Tabs.js
├─ redux/
│ ├─ diarySlice.js
│ └─ store.js
└─ screens/
├─ HomeScreen.js
└─ HistoryScreen.js
