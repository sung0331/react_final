    document.addEventListener("DOMContentLoaded", function () {
    // Spinner
        const spinner = () => {
            setTimeout(() => {
                const spinnerElement = document.getElementById("spinner");
                if (spinnerElement) {
                    spinnerElement.classList.remove("show");
                }
            }, 1);
        };
        spinner();

    // Back to top button
    document.addEventListener("DOMContentLoaded", () => {
        const backToTopButton = document.querySelector(".back-to-top");

        if (backToTopButton) {
            window.addEventListener("scroll", () => {
                if (window.scrollY > 300) {
                    backToTopButton.classList.add("visible");
                } else {
                    backToTopButton.classList.remove("visible");
                }
            });

            backToTopButton.addEventListener("click", (e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
            });
        }
        });
    // Sidebar Toggler
    const sidebarToggler = document.querySelector(".sidebar-toggler");
    sidebarToggler.addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector(".sidebar").classList.toggle("open");
        document.querySelector(".content").classList.toggle("open");
    });

    // Progress Bar
    const progressBars = document.querySelectorAll(".pg-bar");
    const progressHandler = () => {
        progressBars.forEach((bar) => {
            const progressBar = bar.querySelector(".progress .progress-bar");
            if (progressBar) {
                progressBar.style.width = `${progressBar.getAttribute("aria-valuenow")}%`;
            }
        });
    };

    const waypointTrigger = () => {
        const offset = window.innerHeight * 0.8; // Offset is 80%
        progressBars.forEach((bar) => {
            const rect = bar.getBoundingClientRect();
            if (rect.top <= offset) {
                progressHandler();
            }
        });
    };

    window.addEventListener("scroll", waypointTrigger);

    // Calendar (using flatpickr or similar library)
    const calendarElement = document.getElementById("calender");
    if (calendarElement) {
        flatpickr(calendarElement, {
            inline: true,
            dateFormat: "m/d/Y",
        });
    }

    // Testimonials carousel (using Swiper.js or similar library)
    const testimonialCarousel = document.querySelector(".testimonial-carousel");
    if (testimonialCarousel) {
        new Swiper(testimonialCarousel, {
            autoplay: true,
            speed: 1000,
            loop: true,
            slidesPerView: 1,
            pagination: { el: ".swiper-pagination", clickable: true },
        });
    }

    // Chart.js examples
    const renderChart = (ctx, type, data, options) => {
        if (ctx) {
            new Chart(ctx, {
                type,
                data,
                options: { responsive: true, ...options },
            });
        }
    };

    // Worldwide Sales Chart
    const worldwideSalesCtx = document.getElementById("worldwide-sales")?.getContext("2d");
    renderChart(worldwideSalesCtx, "bar", {
        labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022"],
        datasets: [
            { label: "USA", data: [15, 30, 55, 65, 60, 80, 95], backgroundColor: "rgba(0, 156, 255, .7)" },
            { label: "UK", data: [8, 35, 40, 60, 70, 55, 75], backgroundColor: "rgba(0, 156, 255, .5)" },
            { label: "AU", data: [12, 25, 45, 55, 65, 70, 60], backgroundColor: "rgba(0, 156, 255, .3)" },
        ],
    });

    // Sales & Revenue Chart
    const salesRevenueCtx = document.getElementById("salse-revenue")?.getContext("2d");
    renderChart(salesRevenueCtx, "line", {
        labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022"],
        datasets: [
            { label: "Sales", data: [15, 30, 55, 45, 70, 65, 85], backgroundColor: "rgba(0, 156, 255, .5)", fill: true },
            { label: "Revenue", data: [99, 135, 170, 130, 190, 180, 270], backgroundColor: "rgba(0, 156, 255, .3)", fill: true },
        ],
    });

    // Single Line Chart
    const lineChartCtx = document.getElementById("line-chart")?.getContext("2d");
    renderChart(lineChartCtx, "line", {
        labels: [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150],
        datasets: [
            { label: "Sales", data: [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15], backgroundColor: "rgba(0, 156, 255, .3)", fill: false },
        ],
    });

    // Single Bar Chart
    const barChartCtx = document.getElementById("bar-chart")?.getContext("2d");
    renderChart(barChartCtx, "bar", {
        labels: ["Italy", "France", "Spain", "USA", "Argentina"],
        datasets: [
            {
                backgroundColor: [
                    "rgba(0, 156, 255, .7)",
                    "rgba(0, 156, 255, .6)",
                    "rgba(0, 156, 255, .5)",
                    "rgba(0, 156, 255, .4)",
                    "rgba(0, 156, 255, .3)",
                ],
                data: [55, 49, 44, 24, 15],
            },
        ],
    });

    // Pie Chart
    const pieChartCtx = document.getElementById("pie-chart")?.getContext("2d");
    renderChart(pieChartCtx, "pie", {
        labels: ["Italy", "France", "Spain", "USA", "Argentina"],
        datasets: [
            {
                backgroundColor: [
                    "rgba(0, 156, 255, .7)",
                    "rgba(0, 156, 255, .6)",
                    "rgba(0, 156, 255, .5)",
                    "rgba(0, 156, 255, .4)",
                    "rgba(0, 156, 255, .3)",
                ],
                data: [55, 49, 44, 24, 15],
            },
        ],
    });

    // Doughnut Chart
    const doughnutChartCtx = document.getElementById("doughnut-chart")?.getContext("2d");
    renderChart(doughnutChartCtx, "doughnut", {
        labels: ["Italy", "France", "Spain", "USA", "Argentina"],
        datasets: [
            {
                backgroundColor: [
                    "rgba(0, 156, 255, .7)",
                    "rgba(0, 156, 255, .6)",
                    "rgba(0, 156, 255, .5)",
                    "rgba(0, 156, 255, .4)",
                    "rgba(0, 156, 255, .3)",
                ],
                data: [55, 49, 44, 24, 15],
            },
        ],
    });
    });
