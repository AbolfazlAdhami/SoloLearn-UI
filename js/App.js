import Swiper from "https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js";
function main() {
        // GLOBAL variables

        let storage = [];
        var courseContainer = document.querySelector(".conatiner .row");
        // Menu ACTIVE/deACTIVE function and Method
        let menuBars = document.querySelector(".bx-menu-alt-right");
        menuBars.addEventListener("click", () => {
                document.querySelector(".sidebar").classList.toggle("active");
        });
        document.addEventListener("scroll", () => {
                let con = document.querySelector(".sidebar").className == "sidebar";
                if (con) {
                        document.querySelector(".sidebar").classList.adda("active");
                }
        });
        // Menu ACTIVE/deACTIVE function and Method

        // Swiper
        var swiper = new Swiper(".mySwiper", {
                autoplay: {
                        delay: 5000,
                },
                loop: true,
                slidesPerView: "auto",
                slideToClickedSlide: true,
        });
        // Swiper

        // Banner UI
        function banner() {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", "./json/BannerSwiper.json", true);

                xhr.onload = function () {
                        if (this.status == 200) {
                                storage.push(JSON.parse(this.response).Banner);
                        }

                        bannerUI(storage[0]);
                };

                xhr.send();
        }
        banner();

        function bannerUI(items) {
                let sliderItems = [];

                items.map((item) => {
                        sliderItems.push(` <div class="swiper-slide banner-content">
                                                        <div class="banner_image">
                                                                <img src="${item.image_url}" alt="" />
                                                        </div>
                                                        <div class="banner-title">
                                                                <a>${item.name_course}</a>
                                                                <a>${item.trainer}</a>
                                                        </div>
                                                </div>`);
                });

                var doc = document.querySelector(".swiper-wrapper");
                document.querySelector(".swiper-wrapper").innerHTML = null;
                sliderItems.forEach((sliderItem) => {
                        doc.innerHTML += sliderItem;
                });
        }
        // Banner UI

        //  Course Data get form json file
        const courseData = () => {
                let data, course;
                async function nameCourse() {
                        data = await fetch("./json/Course.json");
                        course = await data.json();
                        data = course.Course;
                        course = data;
                        courseUI(course);
                        courseCategory(data, course);
                }
                nameCourse();
        };
        courseData();
        //  Course Data get form json file

        // Active Course Category
        function courseCategory(tags, course) {
                // get Name Category NameTag
                let nameTag = [];
                tags.forEach((tag) => {
                        nameTag.push(...tag.cat);
                        nameTag = [...new Set(nameTag)];
                });
                courseCategoryFilter(nameTag, course);
        }
        // FILTER PARAMETRS
        const courseCategoryFilter = (names, course) => {
                let container = document.querySelector(".category .row");

                let element = ``;
                names.map((name) => {
                        element = `<h3>${name}</h3>`;
                        container.innerHTML += element;
                });
                const tags = [...container.querySelectorAll("h3")];
                // If another tag clicked other deActived bt this  Method
                tags.forEach((tag) => {
                        tag.addEventListener("click", (e) => {
                                let element = e.target;
                                tags.forEach((tag) => tag.classList.remove("on"));
                                element.classList.add("on");
                                element = element.textContent;
                                courseFilter(course, element);
                        });
                });
        };
        // Order Course tagName
        function orderFilter(course) {
                let container = document.querySelector(".category .row");
                let onTag = container.querySelector("h3.on");
                let element = "<h3 id='x'><i class='bx bx-x'></i></h3>";

                if (onTag) {
                        container.insertBefore(onTag, container.firstChild);
                        let x = document.querySelector(".category .row h3 i.bx");
                        if (!x) {
                                container.insertAdjacentHTML("beforeend", element);
                        }
                }
                var xButton = document.querySelector(".category .row h3 .bx-x").parentElement;

                xButton.addEventListener("click", () => {
                        let tag = document.getElementById("x");

                        tag.remove();
                        courseUI(course);
                        onTag.classList.remove("on");
                });
                onTag.addEventListener("click", () => {
                        onTag.classList.remove("on");
                        courseUI(course);
                });
        }
        // Active Course Category

        // deActive Course Category

        function courseFilter(course, id) {
                let filter = course.filter((item) => item.cat[0] == id || item.cat[1] == id);
                courseUI(filter);

                orderFilter(course);
        }

        // courseUI Conatiner Dynamic Element
        function courseUI(items) {
                let conatiner = document.querySelector(".container");
                let element = ``;
                items.forEach((item) => {
                        let status = item.status == "تکمیل شده" ? "completed" : "update";
                        let icon = status == "completed" ? "check" : "cog";

                        element += `<div class="box">
                                                        <div class="image-box"><img src="${item.image_url}" alt="" /></div>
                                                        <div class="box-title">
                                                                <div class="col1">
                                                                <h3 class="name"><i class="bx bx-slideshow"></i>${item.name_course}</h3>
                                                                        <h3 class="trainer"><i class="bx bxs-user-pin"></i>${item.trainer}</h3>
                                                                </div>
                                                                <div class="col2">
                                                                        <h3 class="price">${item.price}<i class="bx bx-credit-card"></i></h3>
                                                                        <h3 class="status ${status}"> ${item.status}<i class="bx bx-${icon}"></i></h3>
                                                                </div>
                                                        </div>
                                                        <div class="box-ext">
                                                                <div class="col1">
                                                                        <span class="like">${item.like} <i class="bx bxs-heart"></i></span>
                                                                        <span class="comment">${item.comments}<i class="bx bxs-comment-detail"></i></span>
                                                                </div>
                                                                <div class="col2">
                                                                        <h3>اضافه کردن به سبدخرید<i class="bx bx-cart"></i></h3>
                                                                </div>
                                                                <div class="col3">
                                                                        <span class="show-more"><i class="bx bx-left-arrow-alt"></i></span>
                                                                </div>
                                                        </div>
                                                </div>`;

                        conatiner.innerHTML = element;
                });
        }
        // courseUI Conatiner Dynamic Element

        // Article Section
        async function articleData() {
                let data = await fetch("../json/Article.json");
                data = await data.json();
                data = data.Article;
                articleUI(data);
        }
        articleData();

        const articleUI = (articles) => {
                let element = ``;
                let Main_Box = document.querySelector(".mainBox");
                console.log(Main_Box);
                let items = [...articles];

                items.forEach((item) => {
                        element += ` <div class="artbox">
                                                        <div class="col1">
                                                                <div class="imageBox">
                                                                        <img src="${item.image_url}" alt="${item.name}" />
                                                                </div>
                                                                <div class="detailes">
                                                                        <h3 class="likes">
                                                                                <span><i class="bx bxs-like"></i></span>
                                                                                <span>${item.like}</span>
                                                                        </h3>
                                                                        <h3 class="comments">
                                                                                <span><i class="bx bxs-comment-detail"></i></span>
                                                                                <span>${item.comments}</span>
                                                                        </h3>
                                                                </div>
                                                        </div>
                                                        <div class="col2">
                                                                <div><h3 class="name">${item.name}</h3></div>
                                                                <div>
                                                                        <h3 calss="arthor">${item.author}</h3>
                                                                </div>
                                                                <div>
                                                                        <h3 class="time">
                                                                                ${item.time}
                                                                                <span><i class="bx bxs-timer"></i></span>
                                                                        </h3>
                                                                </div>
                                                        </div>
                                                </div>`;
                });
                Main_Box.innerHTML += element;
        };
}

document.addEventListener("DOMContentLoaded", main());

/*

<div class="box">
                                                        <div class="image-box"><img src="https://maktabkhooneh.org/media/courses/images/React-JS-advanced.jpg" alt="" /></div>
                                                        <div class="box-title">
                                                                <div class="col1">
                                                                        <h3 class="trainer"><i class="bx bxs-user-pin"></i></h3>
                                                                        <h3 class="name"><i class="bx bx-slideshow"></i></h3>
                                                                </div>
                                                                <div class="col2">
                                                                        <h3 class="price"><i class="bx bx-credit-card"></i></h3>
                                                                        <h3 class="status completed update"><i class="bx bx-check"></i><i class="bx bx-cog"></i></h3>
                                                                </div>
                                                        </div>
                                                        <div class="box-ext">
                                                                <div class="col1">
                                                                        <span class="like"> <i class="bx bxs-heart"></i></span>
                                                                        <span class="comment"><i class="bx bxs-comment-detail"></i></span>
                                                                </div>
                                                                <div class="col2">
                                                                        <h3>اضافه کردن به سبدخرید<i class="bx bx-cart"></i></h3>
                                                                </div>
                                                                <div class="col3">
                                                                        <span class="show-more"><i class="bx bx-left-arrow-alt"></i></span>
                                                                </div>
                                                        </div>
                                                </div>
*/
