const mongoose = require('mongoose');
require('dotenv').config();

// Models'ları import et
const { MainPage } = require('./models');

// MongoDB bağlantısı
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio_db');
    console.log('✅ MongoDB bağlantısı başarılı');
  } catch (error) {
    console.error('❌ MongoDB bağlantı hatası:', error);
    process.exit(1);
  }
};

// Çok dilli ana sayfa verileri
const seedMainPages = [
  {
    locale: 'tr',
    greeting: {
      tr: 'Merhaba, ben Arif Emin Köklü!',
      en: 'Hello, I am Arif Emin Köklü!',
      de: 'Hallo, ich bin Arif Emin Köklü!'
    },
    description: {
      tr: 'Merhaba! Ben Arif Emin Köklü, Samsun Üniversitesi Yazılım Mühendisliği bölümünden mezunum. Mobil uygulama ve modern web uygulamaları geliştirme alanında tutkulu bir yazılımcıyım. Çeşitli projeler ve stajlarla yazılım deneyimimi güçlendirdim ve özellikle React, C#, Python, JavaScript ve TypeScript gibi teknolojilerde uzmanlaştım. Kendimi sürekli geliştirmeye ve yenilikçi çözümler üretmeye adıyorum.',
      en: 'Hello! I am Arif Emin Köklü, a graduate of Software Engineering from Samsun University. I am a passionate developer in mobile application and modern web application development. I have strengthened my software experience through various projects and internships, and I have specialized in technologies such as React, C#, Python, JavaScript and TypeScript. I am committed to continuously improving myself and producing innovative solutions.',
      de: 'Hallo! Ich bin Arif Emin Köklü, ein Absolvent der Softwaretechnik von der Universität Samsun. Ich bin ein leidenschaftlicher Entwickler für mobile Anwendungen und moderne Webanwendungen. Ich habe meine Softwareerfahrung durch verschiedene Projekte und Praktika gestärkt und mich auf Technologien wie React, C#, Python, JavaScript und TypeScript spezialisiert. Ich bin bestrebt, mich kontinuierlich zu verbessern und innovative Lösungen zu entwickeln.'
    },
    profilePhotoUrl: 'https://media.licdn.com/dms/image/v2/D4D03AQGl8yrul8VKgg/profile-displayphoto-scale_400_400/B4DZiq.Sn8GgAg-/0/1755215113555?e=1758153600&v=beta&t=hdVDYBLzr363s_hpCk8oHZ48nWmt3NJ8nzMES3nm8GI',
    animatedTexts: [
      {
        text: {
          tr: 'Merhaba, ben Arif Emin Köklü!',
          en: 'Hello, I am Arif Emin Köklü!',
          de: 'Hallo, ich bin Arif Emin Köklü!'
        },
        order: 1,
        isActive: true
      },
      {
        text: {
          tr: 'Ben bir Yazılım Mühendisiyim.',
          en: 'I am a Software Engineer.',
          de: 'Ich bin ein Softwareingenieur.'
        },
        order: 2,
        isActive: true
      },
      {
        text: {
          tr: 'Frontend ve Backend teknolojileri ile ilgiliyim.',
          en: 'I am interested in Frontend and Backend technologies.',
          de: 'Ich interessiere mich für Frontend- und Backend-Technologien.'
        },
        order: 3,
        isActive: true
      },
      {
        text: {
          tr: 'Modern web ve mobil uygulamalar geliştiriyorum.',
          en: 'I develop modern web and mobile applications.',
          de: 'Ich entwickle moderne Web- und mobile Anwendungen.'
        },
        order: 4,
        isActive: true
      }
    ],
    isActive: true
  },
  {
    locale: 'en',
    greeting: {
      tr: 'Merhaba, ben Arif Emin Köklü!',
      en: 'Hello, I am Arif Emin Köklü!',
      de: 'Hallo, ich bin Arif Emin Köklü!'
    },
    description: {
      tr: 'Merhaba! Ben Arif Emin Köklü, Samsun Üniversitesi Yazılım Mühendisliği bölümünden mezunum. Mobil uygulama ve modern web uygulamaları geliştirme alanında tutkulu bir yazılımcıyım. Çeşitli projeler ve stajlarla yazılım deneyimimi güçlendirdim ve özellikle React, C#, Python, JavaScript ve TypeScript gibi teknolojilerde uzmanlaştım. Kendimi sürekli geliştirmeye ve yenilikçi çözümler üretmeye adıyorum.',
      en: 'Hello! I am Arif Emin Köklü, a graduate of Software Engineering from Samsun University. I am a passionate developer in mobile application and modern web application development. I have strengthened my software experience through various projects and internships, and I have specialized in technologies such as React, C#, Python, JavaScript and TypeScript. I am committed to continuously improving myself and producing innovative solutions.',
      de: 'Hallo! Ich bin Arif Emin Köklü, ein Absolvent der Softwaretechnik von der Universität Samsun. Ich bin ein leidenschaftlicher Entwickler für mobile Anwendungen und moderne Webanwendungen. Ich habe meine Softwareerfahrung durch verschiedene Projekte und Praktika gestärkt und mich auf Technologien wie React, C#, Python, JavaScript und TypeScript spezialisiert. Ich bin bestrebt, mich kontinuierlich zu verbessern und innovative Lösungen zu entwickeln.'
    },
    profilePhotoUrl: 'https://media.licdn.com/dms/image/v2/D4D03AQGl8yrul8VKgg/profile-displayphoto-scale_400_400/B4DZiq.Sn8GgAg-/0/1755215113555?e=1758153600&v=beta&t=hdVDYBLzr363s_hpCk8oHZ48nWmt3NJ8nzMES3nm8GI',
    animatedTexts: [
      {
        text: {
          tr: 'Merhaba, ben Arif Emin Köklü!',
          en: 'Hello, I am Arif Emin Köklü!',
          de: 'Hallo, ich bin Arif Emin Köklü!'
        },
        order: 1,
        isActive: true
      },
      {
        text: {
          tr: 'Ben bir Yazılım Mühendisiyim.',
          en: 'I am a Software Engineer.',
          de: 'Ich bin ein Softwareingenieur.'
        },
        order: 2,
        isActive: true
      },
      {
        text: {
          tr: 'Frontend ve Backend teknolojileri ile ilgiliyim.',
          en: 'I am interested in Frontend and Backend technologies.',
          de: 'Ich interessiere mich für Frontend- und Backend-Technologien.'
        },
        order: 3,
        isActive: true
      },
      {
        text: {
          tr: 'Modern web ve mobil uygulamalar geliştiriyorum.',
          en: 'I develop modern web and mobile applications.',
          de: 'Ich entwickle moderne Web- und mobile Anwendungen.'
        },
        order: 4,
        isActive: true
      }
    ],
    isActive: true
  },
  {
    locale: 'de',
    greeting: {
      tr: 'Merhaba, ben Arif Emin Köklü!',
      en: 'Hello, I am Arif Emin Köklü!',
      de: 'Hallo, ich bin Arif Emin Köklü!'
    },
    description: {
      tr: 'Merhaba! Ben Arif Emin Köklü, Samsun Üniversitesi Yazılım Mühendisliği bölümünden mezunum. Mobil uygulama ve modern web uygulamaları geliştirme alanında tutkulu bir yazılımcıyım. Çeşitli projeler ve stajlarla yazılım deneyimimi güçlendirdim ve özellikle React, C#, Python, JavaScript ve TypeScript gibi teknolojilerde uzmanlaştım. Kendimi sürekli geliştirmeye ve yenilikçi çözümler üretmeye adıyorum.',
      en: 'Hello! I am Arif Emin Köklü, a graduate of Software Engineering from Samsun University. I am a passionate developer in mobile application and modern web application development. I have strengthened my software experience through various projects and internships, and I have specialized in technologies such as React, C#, Python, JavaScript and TypeScript. I am committed to continuously improving myself and producing innovative solutions.',
      de: 'Hallo! Ich bin Arif Emin Köklü, ein Absolvent der Softwaretechnik von der Universität Samsun. Ich bin ein leidenschaftlicher Entwickler für mobile Anwendungen und moderne Webanwendungen. Ich habe meine Softwareerfahrung durch verschiedene Projekte und Praktika gestärkt und mich auf Technologien wie React, C#, Python, JavaScript und TypeScript spezialisiert. Ich bin bestrebt, mich kontinuierlich zu verbessern und innovative Lösungen zu entwickeln.'
    },
    profilePhotoUrl: 'https://media.licdn.com/dms/image/v2/D4D03AQGl8yrul8VKgg/profile-displayphoto-scale_400_400/B4DZiq.Sn8GgAg-/0/1755215113555?e=1758153600&v=beta&t=hdVDYBLzr363s_hpCk8oHZ48nWmt3NJ8nzMES3nm8GI',
    animatedTexts: [
      {
        text: {
          tr: 'Merhaba, ben Arif Emin Köklü!',
          en: 'Hello, I am Arif Emin Köklü!',
          de: 'Hallo, ich bin Arif Emin Köklü!'
        },
        order: 1,
        isActive: true
      },
      {
        text: {
          tr: 'Ben bir Yazılım Mühendisiyim.',
          en: 'I am a Software Engineer.',
          de: 'Ich bin ein Softwareingenieur.'
        },
        order: 2,
        isActive: true
      },
      {
        text: {
          tr: 'Frontend ve Backend teknolojileri ile ilgiliyim.',
          en: 'I am interested in Frontend and Backend technologies.',
          de: 'Ich interessiere mich für Frontend- und Backend-Technologien.'
        },
        order: 3,
        isActive: true
      },
      {
        text: {
          tr: 'Modern web ve mobil uygulamalar geliştiriyorum.',
          en: 'I develop modern web and mobile applications.',
          de: 'Ich entwickle moderne Web- und mobile Anwendungen.'
        },
        order: 4,
        isActive: true
      }
    ],
    isActive: true
  }
];

// Veritabanını temizle
const clearDatabase = async () => {
  try {
    await MainPage.deleteMany({});
    console.log('🗑️ Veritabanı temizlendi');
  } catch (error) {
    console.error('❌ Veritabanı temizleme hatası:', error);
  }
};

// Tohum verileri ekle
const seedDatabase = async () => {
  try {
    // MainPage ekle (çok dilli)
    const createdMainPages = await MainPage.insertMany(seedMainPages);
    console.log(`✅ ${createdMainPages.length} dilde ana sayfa içeriği eklendi`);

    console.log('\n🎉 Tohum veri ekleme tamamlandı!');
    
    console.log('\n🏠 Ana Sayfa İçeriği (Çok Dilli):');
    createdMainPages.forEach(page => {
      console.log(`  - ${page.locale.toUpperCase()}:`);
      console.log(`    Karşılama: ${page.greeting[page.locale]}`);
      console.log(`    Açıklama: ${page.description[page.locale].substring(0, 50)}...`);
      console.log(`    Animasyonlu Metinler: ${page.animatedTexts.length} adet`);
    });

  } catch (error) {
    console.error('❌ Tohum veri ekleme hatası:', error);
  }
};

// Ana fonksiyon
const main = async () => {
  try {
    await connectDB();
    await clearDatabase();
    await seedDatabase();
    
    console.log('\n✨ Seed işlemi başarıyla tamamlandı!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed işlemi başarısız:', error);
    process.exit(1);
  }
};

// Script çalıştır
if (require.main === module) {
  main();
}

module.exports = { seedDatabase, clearDatabase };
