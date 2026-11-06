document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       0. FITUR AUTO SLIDER (HERO SECTION)
       ========================================= */
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-indicators .dot');
    let currentSlide = 0;
    let slideInterval;

    // Fungsi untuk pindah ke slide berikutnya
    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');

        currentSlide = (currentSlide + 1) % slides.length;

        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // Mulai animasi otomatis setiap 6 detik
    slideInterval = setInterval(nextSlide, 6000);

    // (Opsional) Mengizinkan dot diklik untuk pindah manual
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval); // Hentikan auto-slide sebentar saat diklik manual

            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');

            currentSlide = index;

            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');

            slideInterval = setInterval(nextSlide, 6000); // Mulai lagi
        });
    });


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