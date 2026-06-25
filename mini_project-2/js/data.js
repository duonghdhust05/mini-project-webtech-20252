const defaultData = {
    topMenus: [
        { id: "homepage", name: "Homepage", isHome: true, icon: "fas fa-home" },
        { id: "info", name: "Course information" },
        { id: "web-tech", name: "Web Technologies" },
        { id: "student-info", name: "Student Information" },
    ],
    leftMenus: {
        "info": [
            { id: "info-1", name: "About the course" },
            { id: "info-2", name: "Reference books" }
        ],
        "student-info": [
            { id: "stu-cv", name: "CV" },
            { id: "stu-projects", name: "Projects" },
            { id: "stu-community", name: "Community activities" }
        ]
    },
    contentLayouts: {
        "stu-cv": [
            { id: "cv-content-1", name: "Personal Information", colSpan: 12, rowSpan: 1 }
        ]
    },
    contents: {
        "cv-content-1": "<div class='student-info'>...HTML student content...</div>"
    }
};

//hàm khởi tạo dữ liệu
function initData() {
    if (!localStorage.getItem('topMenus')) {
        localStorage.setItem('topMenus', JSON.stringify(defaultData.topMenus));
        localStorage.setItem('leftMenus', JSON.stringify(defaultData.leftMenus));
        localStorage.setItem('contentLayouts', JSON.stringify(defaultData.contentLayouts));
        localStorage.setItem('contents', JSON.stringify(defaultData.contents));
    }
}