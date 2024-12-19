// VARIABLE DECLARATION
const menuBtn = document.querySelector('.menu-btn');
const sidebar = document.querySelector('.sidebar');
const freezeScreen = document.querySelector('.freeze-screen');
const menus = document.querySelectorAll('.sidebar > .nav > a');
const btnSendMsg = document.getElementById('btnSendMsg');

// EVENTS

window.onload = function() {
    // initSlider();
};

const handleMouseLeave = () => {
    sidebar.classList.remove('visible');
};

menuBtn.addEventListener('mouseenter', () => {
    sidebar.classList.add('visible');
});

menuBtn.addEventListener('mouseleave', handleMouseLeave);

menuBtn.addEventListener('click', () => {
    sidebar.classList.add('visible');
    menuBtn.removeEventListener('mouseleave', handleMouseLeave);
    freezeScreen.style.display = 'block';
});

freezeScreen.addEventListener('click', () => {
    sidebar.classList.remove('visible');
    menuBtn.addEventListener('mouseleave', handleMouseLeave);
    freezeScreen.style.display = 'none';
});

menus.forEach(menu => {
    menu.addEventListener('click', () => {
        freezeScreen.style.display = 'none';
        sidebar.classList.remove('visible');
        menuBtn.addEventListener('mouseleave', handleMouseLeave);
    });
});

btnSendMsg.addEventListener('click', () => { debugger
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const mobileNo = document.getElementById('mobileNo').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if(firstName === ''){
        document.getElementById('firstNameError').innerHTML = 'Enter First Name.';
    }
    else{
        document.getElementById('firstNameError').innerHTML = '';
    }
    if(lastName === ''){
        document.getElementById('lastNameError').innerHTML = 'Enter Last Name.';
    }
    else{
        document.getElementById('lastNameError').innerHTML = '';
    }
    if(mobileNo === ''){
        document.getElementById('mobileNoError').innerHTML = 'Enter Mobile Number.';
    }
    else{
        document.getElementById('mobileNoError').innerHTML = '';
    }
    if(email === ''){
        document.getElementById('emailError').innerHTML = 'Enter Email.';
    }
    else{
        document.getElementById('emailError').innerHTML = '';
    }
    if(message === ''){
        document.getElementById('messageError').innerHTML = 'Enter Message.';
    }
    else{
        document.getElementById('messageError').innerHTML = '';
    }

    if(firstName != '' && lastName != '' && mobileNo != '' && email != '' && message != ''){
        sendTestEmail(firstName, lastName, mobileNo, email, message)   
    }
});

// Function
function initSlider() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slider > .slide');
    const slideIndexWrapper = document.querySelector('.slide-index-wrapper');
    const slideCount = slides.length;
    const slideWidth = slides[0].offsetWidth + parseFloat(getComputedStyle(slides[0]).marginRight);

    slides.forEach(slide => {
        const img = slide.querySelector('.img');
        const imgPath = img.getAttribute('value');
        img.style.background = `url(${imgPath})`;
    });

    if (slideCount > 3) {

        for (let i = 2; i < slideCount; i++) {
            const indexBtn = document.createElement('span');
            const value = i-2;
            if (value === 0) {
                indexBtn.classList.add('active');
            }
            indexBtn.addEventListener('click', () => {
                slider.style.transform = `translateX(-${slideWidth*value}px)`;
                const indexBtns = document.querySelectorAll('.slide-index-wrapper > span');
                indexBtns.forEach(btn => {
                    btn.classList.remove('active');
                });
                indexBtn.classList.add('active');
            });

            slideIndexWrapper.appendChild(indexBtn);
        }
    }
}

emailjs.init('J8tX3fGEMH_Y_gByO');
function sendTestEmail(firstName, lastName, mobileNo, email, msg) {
    const serviceID = 'service_f68l2rn';
    const templateID = 'template_9i6gp0c';
    const userEmail = 'swapnilkanire01@gmail.com';
    var message = `${msg} \n\nName: ${firstName} ${lastName} \nContact Number: ${mobileNo} \n ${email}`;
    
    const templateParams = {
    to_email: userEmail,
    subject: `Message from ${firstName} ${lastName}`,
    message: message,
    };

    emailjs.send(serviceID, templateID, templateParams)
    .then(function(response) {
        alert('Email sent successfully!');
    }, function(error) {
        alert('Error sending email. Please try again later.');
    });
}