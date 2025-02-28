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
      changeTextHeader(language, data);
      changeTextMain(language, data);

      // Thay đổi thuộc tính lang của body
      document.body.lang = language;
    })
    .catch(error => {
      console.error('Error loading language file:', error);
    });
}

// Mặc định tải tiếng Việt
switchLanguage('vi');

function changeTextHeader(language, data) {
  document.getElementById('sitename-txt').innerText = data[language].head['sitename'];

  document.getElementById('home-txt').innerText = data[language].head['home'];
  document.getElementById('about-txt').innerText = data[language].head['about'];
  document.getElementById('resume-txt').innerText = data[language].head['resume'];
  document.getElementById('portfolio-txt').innerText = data[language].head['portfolio'];
  document.getElementById('services-txt').innerText = data[language].head['services'];
  document.getElementById('contact-txt').innerText = data[language].head['contact'];
}

function changeTextMain(language, data) {
  // Change Hero Text
  document.getElementById('name-txt').innerText = data[language].main['hero'].name;
  document.getElementById('intro-txt').innerHTML = data[language].main['hero'].intro;
  document.getElementById('typed-items')?.setAttribute('data-typed-items', data[language].main['hero'].typedItems);

  // Change About Text
  document.getElementById('section-title').innerText = data[language].main['about'].title['sectionTitle'];
  document.getElementById('section-txt').innerText = data[language].main['about'].title['sectionText'].join('');

  document.getElementById('about-title').innerText = data[language].main['about'].content['title'];
  document.getElementById('about-intro').innerText = data[language].main['about'].content['intro'].join('');
  document.getElementById('birthday-txt').innerText = data[language].main['about'].content['birthday-txt'];
  document.getElementById('birthday').innerText = data[language].main['about'].content['birthday'];
  document.getElementById('website-txt').innerText = data[language].main['about'].content['website-txt'];
  document.getElementById('website').innerText = data[language].main['about'].content['website'];
  document.getElementById('phone-txt').innerText = data[language].main['about'].content['phone-txt'];
  document.getElementById('phone').innerText = data[language].main['about'].content['phone'];
  document.getElementById('city-txt').innerText = data[language].main['about'].content['city-txt'];
  document.getElementById('city').innerText = data[language].main['about'].content['city'];
  document.getElementById('age-txt').innerText = data[language].main['about'].content['age-txt'];
  document.getElementById('age').innerText = data[language].main['about'].content['age'];
  document.getElementById('degree-txt').innerText = data[language].main['about'].content['degree-txt'];
  document.getElementById('degree').innerText = data[language].main['about'].content['degree'];
  document.getElementById('email-txt').innerText = data[language].main['about'].content['email-txt'];
  document.getElementById('email').innerText = data[language].main['about'].content['email'];
  document.getElementById('freelance-txt').innerText = data[language].main['about'].content['freelance-txt'];
  document.getElementById('freelance').innerText = data[language].main['about'].content['freelance'];
  document.getElementById('conclusion-txt').innerText = data[language].main['about'].content['conclusion'];

  // Change Stats Text
  document.getElementById('happy-clients-title').innerText = data[language].main['stats'].happyClients['title'];
  document.getElementById('happy-clients-subtitle').innerText = data[language].main['stats'].happyClients['subtitle'];
  document.getElementById('happy-clients').setAttribute('data-purecounter-end', data[language].main['stats'].happyClients['percentage']);

  document.getElementById('projects-title').innerText = data[language].main['stats'].projects['title'];
  document.getElementById('projects-subtitle').innerText = data[language].main['stats'].projects['subtitle'];
  document.getElementById('projects').setAttribute('data-purecounter-end', data[language].main['stats'].projects['percentage']);

  document.getElementById('hours-of-support-title').innerText = data[language].main['stats'].hoursOfSupport['title'];
  document.getElementById('hours-of-support-subtitle').innerText = data[language].main['stats'].hoursOfSupport['subtitle'];
  document.getElementById('projects').setAttribute('data-purecounter-end', data[language].main['stats'].projects['percentage']);

  document.getElementById('hard-workers-title').innerText = data[language].main['stats'].hardWorkers['title'];
  document.getElementById('hard-workers-subtitle').innerText = data[language].main['stats'].hardWorkers['subtitle'];
  document.getElementById('projects').setAttribute('data-purecounter-end', data[language].main['stats'].projects['percentage']);

  resetPureCounter();

  // Change Skill Text
  const skillsData = data[language].main['skills'];
  document.getElementById('skills-title').innerText = skillsData.title;
  document.getElementById('skills-intro').innerText = skillsData.intro.join('');

  const skillsList = document.getElementById('skills-list');
  skillsList.innerHTML = '';

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

  resetProgressBar();

  // Change Resume Text
  document.getElementById('resume-title').innerText = data[language].main['resume'].sectionTitle['title'];
  document.getElementById('resume-intro').innerText = data[language].main['resume'].sectionTitle['intro'];

  const sumary = data[language].main['resume'].sumary;
  const sumaryHTML = `
      <h3 class="resume-title">${sumary.title}</h3>
      <div class="resume-item pb-0">
        <h4>${sumary.name}</h4>
        <p><em>${sumary.description.join('')}</em></p>
        <ul>${sumary.details.map(item => `<li>${item}</li>`).join('')}</ul>
      </div>
    `;
  document.querySelector('#resume .col-lg-6:first-child').innerHTML = sumaryHTML;

  const education = data[language].main['resume'].education.map(item => `
        <div class="resume-item">
          <h4>${item.degree}</h4>
          <h5>${item.year}</h5>
          <p><em>${item.institution}</em></p>
          <p>${item.description}</p>
        </div>
      `).join('');
  document.querySelector('#resume .col-lg-6:first-child').innerHTML += `<h3 class="resume-title">Học vấn</h3>${education}`;

  const experienceData = data[language].main['resume'].experience;
  let experienceHTML = `<h3 class="resume-title">${experienceData.title}</h3>`;
  
  if (experienceData.items && experienceData.items.length > 0) {
    experienceHTML += experienceData.items.map(item => `
      <div class="resume-item">
        <h4>${item.position}</h4>
        <h5>${item.year}</h5>
        <p><em>${item.company}</em></p>
        <ul>${item.details.map(detail => `<li>${detail}</li>`).join('')}</ul>
      </div>
    `).join('');
  } else {
    experienceHTML += `<p>Chưa có kinh nghiệm làm việc</p>`;
  }
  
  document.querySelector('#resume .col-lg-6:last-child').innerHTML = experienceHTML;  

  // Change Portfolio Text
  document.getElementById('portfolio-title').innerText = data[language].main['portfolio']['portfolio-title'];
  document.getElementById('portfolio-content').innerText = data[language].main['portfolio']['portfolio-content'];

  // Change Service Text
}

function resetPureCounter() {
  const counters = document.querySelectorAll('.purecounter');
  counters.forEach(counter => {
    counter.classList.remove('purecounter-init');
  });

  new PureCounter();
}

function resetProgressBar() {
  const progressBars = document.querySelectorAll('.progress-bar');

  progressBars.forEach(progressBar => {
    const valueNow = progressBar.getAttribute('aria-valuenow');

    progressBar.style.width = `${valueNow}%`;
  });
}