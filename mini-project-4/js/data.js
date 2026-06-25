const defaultData = {
    topMenus: [
        { id: "home", name: "Home", isHome: true, icon: "fas fa-home" },
        { id: "info", name: "Course information" },
        { id: "web-tech", name: "Web Technologies" },
        { id: "student-info", name: "Student information" },
    ],
    leftMenus: {
        "courseInfo": [
            { id: "classInfo", name: "Class information" },
            { id: "seminar", name: "Seminar information" },
            { id: "company", name: "Company information" },
        ],
        "info": [
            { id: "summaryVN", name: "Summary of the course (Vietnamese) (*)" },
            { id: "summaryEN", name: "Summary of the course (English) (*)" },
            { id: "contentVN", name: "Course content (Vietnamese) (*)" },
            { id: "contentEN", name: "Course content (English) (*)" },
            { id: "reference", name: "Reference books" },
        ],
        "web-tech": [
            { id: "frontend", name: "1. Frontend" },
            { id: "backend", name: "2. Backend" },
            { id: "database", name: "3. Database" },
            { id: "api", name: "4. API and Service Integration" },
            { id: "devops", name: "5. DevOps and Deployment" },
            { id: "security", name: "6. Security" },
            { id: "testing", name: "7. Testing and Debugging" },
            { id: "optimization", name: "8. Performance Optimization" },
            { id: "authentication", name: "9. User Authentication & Authorization" },
        ],
        "student-info": [
            { id: "academic-info", name: "Academic information" },
            { id: "skills-info", name: "Skills" },
            { id: "projects-info", name: "Projects" },
            { id: "hobbies-info", name: "Hobbies" }
        ]
    },
    contentLayouts: {},
    contents: {}
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