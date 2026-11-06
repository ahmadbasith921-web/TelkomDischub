document.addEventListener("DOMContentLoaded", () => {

    const heroSlider = document.getElementById('heroSlider');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-indicators .dot');
    let currentSlide = 0;
    let slideInterval;

    function updateSidePreview() {
        const nextIndex = (currentSlide + 1) % slides.length;
        const nextSlide = slides[nextIndex];
        const slideImg = nextSlide.querySelector('.slide-img');

        const bgStyle = slideImg.style.backgroundImage;
        const urlMatch = bgStyle.match(/url\(["']?(.*?)["']?\)/);
        const nextHashtag = nextSlide.querySelector('.hashtag').innerText;
        const nextTitle = nextSlide.querySelector('.title-white').innerText;

        const heroSide = document.querySelector('.hero-side');
        heroSide.classList.add('animating');

        setTimeout(() => {
            if (urlMatch && urlMatch[1]) {
                heroSide.style.backgroundImage = `linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.1)), url('${urlMatch[1]}')`;
            }
            document.querySelector('.hashtag-side').innerText = nextHashtag;
            document.querySelector('.hero-side h2').innerText = nextTitle;

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

    const orgData = {
        sea: {
            title: "SEA Laboratory",
            subtitle: "(Software Engineering and Application)",
            desc: "SEA Laboratory (Software Engineering and Application) Merupakan salah satu laboratorium di Telkom University yang didirikan pada tahun 2014 di bawah naungan Fakultas Teknik Elektro, program studi Teknik Komputer sebagai wadah riset dan praktikum di bidang rekayasa perangkat lunak, yang saat ini berada di bawah bimbingan Bapak Ir. Burhanuddin Dirgantoro, M.T. Memasuki kepengurusan Generasi ke-11, laboratorium ini memegang peran akademik yang penting dengan mengelola praktikum wajib mahasiswa, seperti Algoritma Pemrograman, dan Struktur Data. Kini, laboratorium yang bertempat di Telkom University Landmark Tower(TULT) Lantai 11 dan 14 ini tidak hanya menangani kegiatan akademis, tapi juga eksplorasi nyata.",
            logo: "https://sealab-telu.id/assets/sea-logo.png"
        },
        hmtk: {
            title: "HMTK",
            subtitle: "(Himpunan Mahasiswa Teknik Komputer)",
            desc: "Wadah aspirasi dan pengembangan diri seluruh mahasiswa program studi Teknik Komputer di Telkom University.<br><br>HMTK bertujuan menciptakan lingkungan yang dinamis, kolaboratif, dan inovatif bagi seluruh anggotanya. Melalui berbagai program kerja dan kepanitiaan, HMTK tidak hanya berfokus pada kemampuan akademis, tetapi juga mengasah soft skill mahasiswa seperti kepemimpinan, public speaking, dan manajemen organisasi.<br><br>Berbagai kegiatan yang diselenggarakan antara lain adalah seminar teknologi, kompetisi e-sports internal, malam keakraban (makrab), bakti sosial, serta program kaderisasi mahasiswa baru yang dirancang untuk menumbuhkan solidaritas antar angkatan.",
            logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCkNHNA6wszOk4GpNFbpABR49EGdBl22IIg01PbvDo6U_p6stnVUgHGQQ&s=10"
        },
        rde: {
            title: "PANITIA PKKMB TELKOM UNIVERSITY 2026",
            subtitle: "(Pengenalan Kehidupan Kampus Mahasiswa Baru)",
            desc: "Kepanitiaan PKKMB Telkom University didukung oleh berbagai divisi dengan tugas spesifik yang saling bersinergi untuk memastikan kelancaran seluruh rangkaian orientasi mahasiswa baru. <br><br><b>Divisi Liaison Officer (LO)</b><br> bertugas sebagai pendamping utama bagi kelompok mahasiswa baru yang bertanggung jawab memantau kehadiran, mengelola alur perizinan peserta, serta menjadi pusat informasi operasional kelompok. <br><br><b>Divisi Monitoring dan Tata Tertib (DMT)</b><br> berperan dalam menegakkan kedisiplinan peserta dengan mengelola perizinan insidental, menindaklanjuti pelanggaran tata tertib, serta memberikan sanksi penugasan. <br><br><b>Divisi Acara</b><br> berfokus merancang konsep utama, menyusun rundown, dan mengeksekusi rangkaian orientasi dari tahap Pra-PKKMB hingga Sidang Senat Terbuka agar berjalan terstruktur. <br><br><b>Divisi Logistik dan Operasional</b><br> memfasilitasi pengadaan perlengkapan, manajemen infrastruktur fisik, serta persiapan mobilitas venue seperti area Telkom University Convention Hall. <br><br><b>Divisi Media dan Publikasi</b><br> mengelola arus informasi massa, mendokumentasikan kegiatan, serta memproduksi seluruh aset desain visual publikasi. Terakhir, <br><br><b>Divisi Medis</b><br> bersiaga penuh untuk mengantisipasi kondisi darurat, memberikan pertolongan pertama, serta memastikan penanganan kesehatan bagi seluruh peserta dan panitia selama acara berlangsung.",
            logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIzcfHt9EszQx91ec_pdwR9-pb_s10bf295_dDfbHCEArUiON9eL3NBP4&s=10"
        }
    };

    const modal = document.getElementById("orgModal");
    const closeBtn = document.querySelector(".close-btn");
    const modalTitle = document.getElementById("modal-title");
    const modalSubtitle = document.getElementById("modal-subtitle");
    const modalDesc = document.getElementById("modal-desc");
    const modalLogo = document.getElementById("modal-logo");
    const orgCards = document.querySelectorAll(".clickable-card");

    orgCards.forEach(card => {
        card.addEventListener("click", () => {
            const orgKey = card.getAttribute("data-org");
            const data = orgData[orgKey];

            if (data) {
                modalTitle.innerHTML = data.title;
                modalSubtitle.innerHTML = data.subtitle;
                modalDesc.innerHTML = data.desc;
                modalLogo.src = data.logo;

                modal.classList.add("show");
            }
        });
    });

    closeBtn.addEventListener("click", () => {
        modal.classList.remove("show");
    });

    window.addEventListener("click", (event) => {
        if (event.target == modal) {
            modal.classList.remove("show");
        }
    });

    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(question => {
        question.addEventListener("click", function () {
            const answer = this.nextElementSibling;
            answer.classList.toggle("show");
        });
    });

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