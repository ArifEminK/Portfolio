const { Education, Skill } = require('./index');

// Education örneği
const educationExample = new Education(
    1,
    "Bilgisayar Mühendisliği",
    "İstanbul Teknik Üniversitesi",
    "2018-2022",
    "Bilgisayar mühendisliği lisans programı",
    "education"
);

// Certificate örneği
const certificateExample = new Education(
    2,
    "AWS Certified Solutions Architect",
    "Amazon Web Services",
    "2023",
    "AWS çözüm mimarisi sertifikası",
    "certificate"
);

// Skill örnekleri
const skillExample1 = new Skill(
    1,
    "JavaScript",
    "language",
    "advanced"
);

const skillExample2 = new Skill(
    2,
    "React",
    "program",
    "intermediate"
);

const skillExample3 = new Skill(
    3,
    "Git",
    "tool",
    "expert"
);

// Validation test
console.log('Education validation:', educationExample.validate());
console.log('Skill validation:', skillExample1.validate());

// JSON conversion test
console.log('Education JSON:', educationExample.toJSON());
console.log('Skill JSON:', skillExample1.toJSON());

module.exports = {
    educationExample,
    certificateExample,
    skillExample1,
    skillExample2,
    skillExample3
}; 