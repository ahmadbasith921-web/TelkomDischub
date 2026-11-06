document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       0. FITUR AUTO SLIDER & PREVIEW NEXT SLIDE
       ========================================= */
    const heroSlider = document.getElementById('heroSlider');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-indicators .dot');
    let currentSlide = 0;
    let slideInterval;

    function updateSidePreview() {
        const nextIndex = (currentSlide + 1) % slides.length;
        const nextSlide = slides[nextIndex];
        const slideImg = nextSlide.querySelector('.slide-img');

        // Ambil URL gambar dan teks dari slide berikutnya
        const bgStyle = slideImg.style.backgroundImage;
        const urlMatch = bgStyle.match(/url\(["']?(.*?)["']?\)/);
        const nextHashtag = nextSlide.querySelector('.hashtag').innerText;
        const nextTitle = nextSlide.querySelector('.title-white').innerText;

        const heroSide = document.querySelector('.hero-side');

        // 1. Tambah class animasi biar gambar mengecil & memudar
        heroSide.classList.add('animating');

        // 2. Tunggu 300ms (sesuai CSS) buat ganti isi saat sedang pudar
        setTimeout(() => {
            if (urlMatch && urlMatch[1]) {
                heroSide.style.backgroundImage = `linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.1)), url('${urlMatch[1]}')`;
            }
            document.querySelector('.hashtag-side').innerText = nextHashtag;
            document.querySelector('.hero-side h2').innerText = nextTitle;

            // 3. Hapus class animasi biar gambar muncul lagi dengan mulus
            heroSide.classList.remove('animating');
        }, 300);
    }

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');

        currentSlide = (currentSlide + 1) % slides.length;

        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        updateSidePreview();
    }

    function prevSlide() {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');

        currentSlide = (currentSlide - 1 + slides.length) % slides.length;

        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        updateSidePreview();
    }

    // Jalankan preview untuk pertama kali
    updateSidePreview();
    slideInterval = setInterval(nextSlide, 6000);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');

            currentSlide = index;

            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
            updateSidePreview();

            slideInterval = setInterval(nextSlide, 6000);
        });
    });

    // Fitur Swipe untuk Mobile
    let startX = 0;
    let endX = 0;

    heroSlider.addEventListener('touchstart', (e) => {
        startX = e.changedTouches[0].screenX;
    }, { passive: true });

    heroSlider.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const threshold = 50;

        if (startX - endX > threshold) {
            clearInterval(slideInterval);
            nextSlide();
            slideInterval = setInterval(nextSlide, 6000);
        } else if (endX - startX > threshold) {
            clearInterval(slideInterval);
            prevSlide();
            slideInterval = setInterval(nextSlide, 6000);
        }
    }


    /* =========================================
       1. FITUR HAMBURGER MENU (MOBILE)
       ========================================= */
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");
    const mobileDropdown = document.getElementById("mobile-dropdown");
    const dropBtn = document.querySelector(".dropbtn");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    dropBtn.addEventListener("click", (e) => {
        if (window.innerWidth <= 900) {
            e.preventDefault();
            mobileDropdown.classList.toggle("active");
        }
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 900 && !link.classList.contains("dropbtn")) {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
                mobileDropdown.classList.remove("active");
            }
        });
    });


    /* =========================================
       2. FITUR FAQ (ACCORDION / COLLAPSE)
       ========================================= */
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(question => {
        question.addEventListener("click", function () {
            const answer = this.nextElementSibling;
            answer.classList.toggle("show");
        });
    });


    /* =========================================
       3. VALIDASI FORM KONTAK
       ========================================= */
    const contactForm = document.getElementById("contactForm");

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const nama = document.getElementById("nama").value.trim();
        const kategori = document.getElementById("kategori").value;
        const pesan = document.getElementById("pesan").value.trim();

        if (nama === "" || kategori === "" || pesan === "") {
            alert("Gagal: Semua kolom formulir wajib diisi!");
            return;
        }

        alert("Pesan berhasil dikirim!");
        contactForm.reset();
    });


    /* =========================================
       4. FITUR TO-DO LIST (LOCALSTORAGE)
       ========================================= */
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    let tasks = JSON.parse(localStorage.getItem("discHubTasks")) || [];

    function renderTasks() {
        taskList.innerHTML = "";

        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            if (task.completed) li.classList.add("completed");

            li.innerHTML = `
                <div class="task-content">
                    <input type="checkbox" ${task.completed ? "checked" : ""} onclick="toggleTask(${index})">
                    <span>${task.text}</span>
                </div>
                <button onclick="deleteTask(${index})">Hapus</button>
            `;
            taskList.appendChild(li);
        });
    }

    function addTask() {
        const text = taskInput.value.trim();
        if (text !== "") {
            tasks.push({ text: text, completed: false });
            updateLocalStorage();
            renderTasks();
            taskInput.value = "";
        }
    }

    function updateLocalStorage() {
        localStorage.setItem("discHubTasks", JSON.stringify(tasks));
    }

    addTaskBtn.addEventListener("click", addTask);

    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") addTask();
    });

    window.toggleTask = function (index) {
        tasks[index].completed = !tasks[index].completed;
        updateLocalStorage();
        renderTasks();
    };

    window.deleteTask = function (index) {
        tasks.splice(index, 1);
        updateLocalStorage();
        renderTasks();
    };

    renderTasks();
});