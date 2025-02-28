document.getElementById('language-toggle').addEventListener('change', function () {
  if (this.checked) {
    console.log('Switched to English');
    switchLanguage('en');
  } else {
    console.log('Chuyển sang Vietnamese');
    switchLanguage('vi');
  }
});

function switchLanguage(language) {
  // Tải tệp JSON chứa bản dịch
  fetch(`lang-${language}.json`)
    .then(response => response.json())
    .then(data => {
      // Cập nhật tên trang web
      document.getElementById('sitename-txt').innerText = data[language]['sitename'];

      document.getElementById('hero-text').innerText = data[language].hero;
      document.getElementById('about-text').innerText = data[language].about;
      document.getElementById('resume-text').innerText = data[language]['resume-text'];
      document.getElementById('portfolio-text').innerText = data[language].portfolio;
      document.getElementById('services-text').innerText = data[language].services;
      document.getElementById('contact-text').innerText = data[language].contact;

      document.getElementById('intro-text').innerHTML = data[language].heroIntro;
      document.getElementById('typed-items')?.setAttribute('data-typed-items', data[language].heroTypedItems);

      document.getElementById('section-title').innerText = data[language].sectionTitle;
      document.getElementById('section-text').innerText = data[language].sectionText;

      document.getElementById('about-title').innerText = data[language].aboutTitle;
      document.getElementById('about-intro').innerText = data[language].aboutIntro;
      document.getElementById('birthday').innerText = data[language].birthday;
      document.getElementById('website').innerText = data[language].website;
      document.getElementById('phone').innerText = data[language].phone;
      document.getElementById('city').innerText = data[language].city;
      document.getElementById('age').innerText = data[language].age;
      document.getElementById('degree').innerText = data[language].degree;
      document.getElementById('email').innerText = data[language].email;
      document.getElementById('freelance').innerText = data[language].freelance;
      document.getElementById('about-conclusion').innerText = data[language].aboutConclusion;

      document.getElementById('happy-clients-title').innerText = data[language].stats['happy-clients'].title;
      document.getElementById('happy-clients-subtitle').innerText = data[language].stats['happy-clients'].subtitle;

      document.getElementById('projects-title').innerText = data[language].stats['projects'].title;
      document.getElementById('projects-subtitle').innerText = data[language].stats['projects'].subtitle;

      document.getElementById('hours-of-support-title').innerText = data[language].stats['hours-of-support'].title;
      document.getElementById('hours-of-support-subtitle').innerText = data[language].stats['hours-of-support'].subtitle;

      document.getElementById('hard-workers-title').innerText = data[language].stats['hard-workers'].title;
      document.getElementById('hard-workers-subtitle').innerText = data[language].stats['hard-workers'].subtitle;

      const skillsData = data[language]['skills-section'];

      // Cập nhật tiêu đề và giới thiệu
      document.getElementById('skills-title').innerText = skillsData.title;
      document.getElementById('skills-intro').innerText = skillsData.intro;

      // Lấy phần tử danh sách kỹ năng
      const skillsList = document.getElementById('skills-list');
      skillsList.innerHTML = ''; // Xóa nội dung cũ

      // Tạo HTML cho từng kỹ năng
      const half = Math.ceil(skillsData.skills.length / 2);
      const col1 = document.createElement('div');
      const col2 = document.createElement('div');
      col1.className = 'col-lg-6';
      col2.className = 'col-lg-6';

      skillsData.skills.forEach((skill, index) => {
        const progressHTML = `
        <div class="progress">
          <span class="skill"><span>${skill.name}</span> <i class="val">${skill.percentage}%</i></span>
          <div class="progress-bar-wrap">
            <div class="progress-bar" role="progressbar" aria-valuenow="${skill.percentage}" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
      `;
        if (index < half) {
          col1.innerHTML += progressHTML;
        } else {
          col2.innerHTML += progressHTML;
        }
      });

      skillsList.appendChild(col1);
      skillsList.appendChild(col2);

      // Reusme
      document.getElementById('resume-title').innerText = data[language]['resume']['section-title']['title'];
      document.getElementById('resume-intro').innerText = data[language]['resume']['section-title']['intro'];

      // Cập nhật Sumary
      const sumary = data[language]['resume']['sumary'];
      const sumaryHTML = `
      <h3 class="resume-title">${sumary.title}</h3>
      <div class="resume-item pb-0">
        <h4>${sumary.name}</h4>
        <p><em>${sumary.description}</em></p>
        <ul>${sumary.details.map(item => `<li>${item}</li>`).join('')}</ul>
      </div>
    `;
      document.querySelector('#resume .col-lg-6:first-child').innerHTML = sumaryHTML;

      // Cập nhật Education
      const education = data[language]['resume']['education'].map(item => `
      <div class="resume-item">
        <h4>${item.degree}</h4>
        <h5>${item.year}</h5>
        <p><em>${item.institution}</em></p>
        <p>${item.description}</p>
      </div>
    `).join('');
      document.querySelector('#resume .col-lg-6:first-child').innerHTML += `<h3 class="resume-title">Học vấn</h3>${education}`;

      // Cập nhật Experience
      const experience = data[language]['resume']['experience'].map(item => `
      <div class="resume-item">
        <h4>${item.position}</h4>
        <h5>${item.year}</h5>
        <p><em>${item.company}</em></p>
        <ul>${item.details.map(detail => `<li>${detail}</li>`).join('')}</ul>
      </div>
    `).join('');
      document.querySelector('#resume .col-lg-6:last-child').innerHTML = `<h3 class="resume-title">Kinh nghiệm làm việc</h3>${experience}`;

      // Thay đổi thuộc tính lang của body
      document.body.lang = language;
    })
    .catch(error => {
      console.error('Error loading language file:', error);
    });
}

// Mặc định tải tiếng Việt
switchLanguage('vi');