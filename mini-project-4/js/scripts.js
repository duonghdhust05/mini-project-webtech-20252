// Get the Sidebar
var mySidebar = document.getElementById("mySidebar");

// Get the DIV with overlay effect
var overlayBg = document.getElementById("myOverlay");

// Toggle between showing and hiding the sidebar, and add overlay effect
function w3_open() {
  if (mySidebar.style.display === 'block') {
    mySidebar.style.display = 'none';
    overlayBg.style.display = "none";
  } else {
    mySidebar.style.display = 'block';
    overlayBg.style.display = "block";
  }
}

// Close the sidebar with the close button
function w3_close() {
  mySidebar.style.display = "none";
  overlayBg.style.display = "none";
}
// Function to show content and update button style
function showContent(sectionId) {
  // Hide all sections
  const sections = document.querySelectorAll('#content-container > .w3-container');
  sections.forEach(section => section.classList.add('hidden'));

  // Remove active class from all buttons
  const buttons = document.querySelectorAll('.w3-bar-item');
  buttons.forEach(button => button.classList.remove('active'));

  const sidebar = document.getElementById("mySidebar");
  sidebar.innerHTML = '';

  // Check if it's a hardcoded section or a dynamic one
  const hardcodedSection = document.getElementById(sectionId);
  const staticSections = ['homepage', 'info', 'web-tech', 'student-info'];

  if (hardcodedSection && staticSections.includes(sectionId)) {
    hardcodedSection.classList.remove('hidden');

    if (sectionId === 'homepage') {
      sidebar.innerHTML = `
      <h4 class="w3-bar-item"><b>Menu</b></h4>
      <a class="w3-bar-item w3-button w3-hover-black" href="#classInfo">Class information</a>
      <a class="w3-bar-item w3-button w3-hover-black" href="#seminar">Seminar information</a>
      <a class="w3-bar-item w3-button w3-hover-black" href="#company">Company information</a>
      <a class="w3-bar-item w3-button w3-hover-black" href="#layout-config">Layout configuration</a>
      `;
    } else if (sectionId === 'info') {
      sidebar.innerHTML = `
      <h4 class="w3-bar-item"><b>Course information</b></h4>
      <a class="w3-bar-item w3-button w3-hover-black" href="#summaryVN">Summary of the course (Vietnamese) (*)</a>
      <a class="w3-bar-item w3-button w3-hover-black" href="#summaryEN">Summary of the course (English) (*)</a>
      <a class="w3-bar-item w3-button w3-hover-black" href="#contentVN">Course content (Vietnamese) (*)</a>
      <a class="w3-bar-item w3-button w3-hover-black" href="#contentEN">Course content (English) (*)</a>
      <a class="w3-bar-item w3-button w3-hover-black" href="#reference">Reference books</a>
    `;
    } else if (sectionId === 'web-tech') {
      sidebar.innerHTML = `
      <h4 class="w3-bar-item"><b>Web technologies</b></h4>
      <a class="w3-bar-item w3-button w3-hover-black" href="#frontend">1. Frontend</a>
      <a class="w3-bar-item w3-button w3-hover-black" href="#backend">2. Backend</a>
      <a class="w3-bar-item w3-button w3-hover-black" href="#database">3. Database</a>
      <a class="w3-bar-item w3-button w3-hover-black" href="#api">4. API and Service Integration</a>
      <a class="w3-bar-item w3-button w3-hover-black" href="#devops">5. DevOps and Deployment</a>
      <a class="w3-bar-item w3-button w3-hover-black" href="#security">6. Security</a>
      <a class="w3-bar-item w3-button w3-hover-black" href="#testing">7. Testing and Debugging</a>
      <a class="w3-bar-item w3-button w3-hover-black" href="#optimization">8. Performance Optimization</a>
      <a class="w3-bar-item w3-button w3-hover-black" href="#authentication">9. User Authentication & Authorization</a>
    `;
    } else if (sectionId === 'student-info') {
      sidebar.innerHTML = `
      <h4 class="w3-bar-item"><b>Student information</b></h4>
      <a class="w3-bar-item w3-button w3-hover-black" href="#academic-info">Academic information</a>
      <a class="w3-bar-item w3-button w3-hover-black" href="#skills-info">Skills</a>
      <a class="w3-bar-item w3-button w3-hover-black" href="#projects-info">Projects</a>
      <a class="w3-bar-item w3-button w3-hover-black" href="#hobbies-info">Hobbies</a>
    `;
    }
  } else {
    document.getElementById('dynamic-page').classList.remove('hidden');

    const leftMenus = JSON.parse(localStorage.getItem('leftMenus')) || {};
    const items = leftMenus[sectionId] || [];

    sidebar.innerHTML = `<h4 class="w3-bar-item"><b>Menu</b></h4>`;
    items.forEach((item) => {
      sidebar.innerHTML += `<a class="w3-bar-item w3-button w3-hover-black" href="javascript:void(0)" onclick="renderDynamicLeftMenuContent('${item.id}')">${item.name}</a>`;
    });

    if (items.length > 0) {
      renderDynamicLeftMenuContent(items[0].id);
    } else {
      document.getElementById('dynamic-content-area').innerHTML = '<h3 class="w3-center w3-text-grey" style="margin-top: 50px;">No left menu has been created yet. Please go to Admin Page to add.</h3>';
    }

    if (event && event.target) {
      event.target.classList.add('active');
    }
  }
}

function renderDynamicLeftMenuContent(leftMenuId) {
  const layouts = JSON.parse(localStorage.getItem('contentLayouts')) || {};
  const items = layouts[leftMenuId] || [];
  const contents = JSON.parse(localStorage.getItem('contents')) || {};

  let html = '<div class="grid-container">';

  if (items.length === 0) {
    html += '<h3 class="w3-center w3-text-grey" style="margin-top: 50px; grid-column: span 12;">No layout content has been created yet.</h3>';
  }

  items.forEach(item => {
    let contentHTML = contents[item.id] || '<p class="w3-text-grey w3-small">(No content yet)</p>';
    html += `<div style="grid-column: span ${item.colSpan}; background: white; padding: 15px; margin-bottom: 10px; border-radius: 4px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                ${contentHTML}
             </div>`;
  });

  html += '</div>';

  document.getElementById('dynamic-content-area').innerHTML = html;

  //highlight search term if any
  if (typeof initWikiSearch === 'function') {
    initWikiSearch();
  }
}

window.onload = function () {
  initData();
  renderTopMenu();
  showContent('homepage');
};

function renderTopMenu() {
  const topMenus = JSON.parse(localStorage.getItem('topMenus')) || [];
  const topMenuContainer = document.querySelector('.w3-top .w3-bar');

  //Keep the toggle sidebar button
  let html = `<a class="w3-bar-item w3-button w3-right w3-hide-large w3-hover-white w3-large w3-theme-l1" href = "javascript:void(0)" onclick = "w3_open()" > <i class="fa fa-bars"></i></a> `;

  topMenus.forEach(menu => {
    if (menu.isHome) {
      html += `<a href = "#" onclick = "showContent('${menu.id}')" class="w3-bar-item w3-button" > <i class="${menu.icon}"></i></a> `;
    } else {
      html += `<a href = "javascript:void(0)" onclick = "showContent('${menu.id}')" class="w3-bar-item w3-button" > ${menu.name}</a> `;
    }
  });

  html += `<a href = "javascript:void(0)" onclick = "showAdminPage()" id = "admin-page-btn" class="w3-bar-item w3-button" > <b>Admin page</b></a> `;

  topMenuContainer.innerHTML = html;
}

function showAdminPage() {
  document.querySelectorAll('#content-container > .w3-container').forEach(e1 => e1.classList.add('hidden'));
  document.getElementById('admin-page').classList.remove('hidden');

  document.querySelectorAll('.w3-bar-item').forEach(b => b.classList.remove('active'));
  document.getElementById('admin-page-btn').classList.add('active');

  const topMenus = JSON.parse(localStorage.getItem('topMenus')) || [];
  const tbody = document.getElementById('admin-top-menu-tbody');
  let html = '';

  topMenus.forEach((menu, index) => {
    html += `<tr>
      <td>${menu.id}</td>
      <td>${menu.name || (menu.isHome ? 'Trang chủ (Logo)' : '')}</td>
      <td>
          <button class="w3-button w3-blue w3-small" onclick="viewAdminLeftMenu('${menu.id}')">Xem</button>
          ${!menu.isHome ? `<button class="w3-button w3-orange w3-small" onclick="editTopMenu(${index})">Sửa</button>
                            <button class="w3-button w3-red w3-small" onclick="deleteTopMenu(${index})">Xóa</button>` : ''}
        </td>
      </tr>`;
  });
  tbody.innerHTML = html;
}

function addTopMenu() {
  let id = prompt("Enter the ID for the new menu:");
  let name = prompt("Enter the name for the new menu:");
  if (id && name) {
    let menus = JSON.parse(localStorage.getItem('topMenus'));
    menus.push({ id: id, name: name });
    localStorage.setItem('topMenus', JSON.stringify(menus));
    renderTopMenu();
    showAdminPage();
  }
}

function editTopMenu(index) {
  let menus = JSON.parse(localStorage.getItem('topMenus'));
  let newName = prompt("Edit menu name:", menus[index].name);
  if (newName) {
    menus[index].name = newName;
    localStorage.setItem('topMenus', JSON.stringify(menus));
    renderTopMenu();
    showAdminPage();
  }
}

function deleteTopMenu(index) {
  if (confirm("Are you sure you want to delete?")) {
    let menus = JSON.parse(localStorage.getItem('topMenus'));
    menus.splice(index, 1);
    localStorage.setItem('topMenus', JSON.stringify(menus));
    renderTopMenu();
    showAdminPage();
  }
}

// Logic cho Admin Menu Left
let currentTopMenuId = '';

function viewAdminLeftMenu(topMenuId) {
  currentTopMenuId = topMenuId;

  document.querySelectorAll('#content-container > .w3-container').forEach(e1 => e1.classList.add('hidden'));
  document.getElementById('admin-menu-left').classList.remove('hidden');

  const btnReset = document.getElementById('btn-reset-student');
  if (topMenuId === 'student-info') {
    btnReset.classList.remove('hidden');
  } else {
    btnReset.classList.add('hidden')
  }
  renderAdminLeftMenu();
}

function renderAdminLeftMenu() {
  const leftMenus = JSON.parse(localStorage.getItem('leftMenus')) || {};
  const items = leftMenus[currentTopMenuId] || [];

  const tbody = document.getElementById('admin-left-menu-tbody');
  let html = '';
  items.forEach((item, index) => {
    html += `<tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>
                <button class="w3-button w3-blue w3-small" onclick="viewAdminLayout('${item.id}')">Xem (Layout)</button>
                <button class="w3-button w3-orange w3-small" onclick="editLeftMenu(${index})">Sửa</button>
                <button class="w3-button w3-red w3-small" onclick="deleteLeftMenu(${index})">Xóa</button>
            </td>
        </tr>`;
  });
  tbody.innerHTML = html;
}

function addLeftMenu() {
  let id = prompt("Enter the ID for the new left menu:");
  let name = prompt("Enter the name for the new left menu:");
  if (id && name) {
    let leftMenus = JSON.parse(localStorage.getItem('leftMenus')) || {};
    if (!leftMenus[currentTopMenuId]) leftMenus[currentTopMenuId] = [];
    leftMenus[currentTopMenuId].push({ id: id, name: name });
    localStorage.setItem('leftMenus', JSON.stringify(leftMenus));
    renderAdminLeftMenu();
  }
}

function editLeftMenu(index) {
  let leftMenus = JSON.parse(localStorage.getItem('leftMenus'));
  let newName = prompt('Edit the name of the left menu:', leftMenus[currentTopMenuId][index].name);
  if (newName) {
    leftMenus[currentTopMenuId][index].name = newName;
    localStorage.setItem('leftMenus', JSON.stringify(leftMenus));
    renderAdminLeftMenu();
  }
}

function deleteLeftMenu(index) {
  if (confirm("Are you sure you want to delete?")) {
    let leftMenus = JSON.parse(localStorage.getItem('leftMenus'));
    leftMenus[currentTopMenuId].splice(index, 1);
    localStorage.setItem('leftMenus', JSON.stringify(leftMenus));
    renderAdminLeftMenu();
  }
}

// Chức năng Reset
function resetStudentInfo() {
  if (confirm("Are you sure you want to restore student information to default (CV, Projects, Community Activities)?")) {
    let leftMenus = JSON.parse(localStorage.getItem('leftMenus'));
    leftMenus['student-info'] = [
      { id: "stu-cv", name: "CV" },
      { id: "stu-projects", name: "Projects" },
      { id: "stu-community", name: "Community Activities" }
    ];

    let contentLayouts = JSON.parse(localStorage.getItem('contentLayouts')) || {};
    contentLayouts['stu-cv'] = [{ id: 'content-cv', name: 'CV Content', colSpan: 12 }];
    contentLayouts['stu-projects'] = [{ id: 'content-projects', name: 'Projects List', colSpan: 12 }];
    contentLayouts['stu-community'] = [{ id: 'content-community', name: 'Community Activities', colSpan: 12 }];

    let contents = JSON.parse(localStorage.getItem('contents')) || {};
    contents['content-cv'] = `
        <h3 style="color: blue;">Curriculum Vitae(CV)</h3>
          <img src="./assets/ava.jpg" alt="Student Photo" style="max-width: 150px; border-radius: 8px;">
            <p><b>Full name:</b> Ha Duc Duong</p>
            <p><b>Student ID:</b> 20235923</p>
            `;
    contents['content-projects'] = `
            <h3 style="color: blue;">Projects List</h3>
            <ul>
              <li><b>Project 1:</b> Doctor Appointment System - Using React, MongoDB</li>
              <li><b>Project 2:</b> AIMS Digital E-commerce System - Using JavaFX, Supabase</li>
            </ul>
            `;
    contents['content-community'] = `
            <h3 style="color: blue;">Community Activities</h3>
            <ul>
              <li><b>Activity 1:</b> Volunteer at exam support season</li>
              <li><b>Activity 2:</b> Join the first-year student orientation week</li>
            </ul>
            `;
    localStorage.setItem('leftMenus', JSON.stringify(leftMenus));
    localStorage.setItem('contentLayouts', JSON.stringify(contentLayouts));
    localStorage.setItem('contents', JSON.stringify(contents));
    renderAdminLeftMenu();
    alert("Restore student information successfully!");
  }
}

//Logic cho Admin Contents Layout
let currentLeftMenuId = '';

function viewAdminLayout(leftMenuId) {
  currentLeftMenuId = leftMenuId;
  document.querySelectorAll('#content-container > .w3-container').forEach(e1 => e1.classList.add('hidden'));
  document.getElementById('admin-contents-layout').classList.remove('hidden');
  renderAdminLayout();
}

function renderAdminLayout() {
  const layouts = JSON.parse(localStorage.getItem('contentLayouts')) || {};
  const items = layouts[currentLeftMenuId] || [];

  const tbody = document.getElementById('admin-layout-tbody');
  let tableHtml = '';
  let previewHtml = '<div class="grid-container">';

  items.forEach((item, index) => {
    tableHtml += `<tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>Chiếm ${item.colSpan}/12 cột</td>
            <td>
                <button class="w3-button w3-blue w3-small" onclick="viewAdminContent('${item.id}')">View/Write Content</button>
                <button class="w3-button w3-orange w3-small" onclick="editLayoutContent(${index})">Edit Layout</button>
                <button class="w3-button w3-red w3-small" onclick="deleteLayoutContent(${index})">Delete</button>
            </td>
        </tr>`;

    previewHtml += `<div class="grid-preview-box" style="grid-column: span ${item.colSpan};">
                <b>${item.name}</b> (span ${item.colSpan})
              </div>`;
  });
  previewHtml += '</div>';

  tbody.innerHTML = tableHtml;
  document.getElementById('layout-preview-area').innerHTML = previewHtml;
}

function addLayoutContent() {
  let id = prompt("Enter the ID for the new content section:");
  let name = prompt("Enter the name for the new content section:");
  let colSpan = prompt("Enter the number of columns to display on the grid (from 1 to 12, e.g., 12 is full width, 6 is 50%):", "12");

  if (id && name && colSpan) {
    let layouts = JSON.parse(localStorage.getItem('contentLayouts')) || {};
    if (!layouts[currentLeftMenuId]) layouts[currentLeftMenuId] = [];

    layouts[currentLeftMenuId].push({ id: id, name: name, colSpan: parseInt(colSpan) || 12 });
    localStorage.setItem('contentLayouts', JSON.stringify(layouts));
    renderAdminLayout();
  }
}

function editLayoutContent(index) {
  let layouts = JSON.parse(localStorage.getItem('contentLayouts'));
  let item = layouts[currentLeftMenuId][index];

  let newName = prompt("Edit the name of the content section:", item.name);
  let newColSpan = prompt("Edit the number of columns to display on the grid (1-12):", item.colSpan);

  if (newName && newColSpan) {
    item.name = newName;
    item.colSpan = parseInt(newColSpan) || 12;
    localStorage.setItem('contentLayouts', JSON.stringify(layouts));
    renderAdminLayout();
  }
}

function deleteLayoutContent(index) {
  if (confirm("Are you sure you want to delete this layout?")) {
    let layouts = JSON.parse(localStorage.getItem('contentLayouts'));
    layouts[currentLeftMenuId].splice(index, 1);
    localStorage.setItem('contentLayouts', JSON.stringify(layouts));
    renderAdminLayout();
  }
}

//Logic cho Admin Contents (Trình soạn thảo QuillJS)
let currentContentId = '';
let quill;

function viewAdminContent(contentId) {
  currentContentId = contentId;
  document.querySelectorAll('#content-container > .w3-container').forEach(e1 => e1.classList.add('hidden'));
  document.getElementById('admin-contents').classList.remove('hidden');

  if (!quill) {
    quill = new Quill('#editor-container', {
      theme: 'snow'
    });
  }

  const contents = JSON.parse(localStorage.getItem('contents')) || {};
  let contentHTML = contents[contentId] || '';

  if (contentHTML.includes('wiki-search-container')) {
    document.getElementById('contentTypeSelect').value = 'wiki-search';
    quill.setText('');
  } else {
    document.getElementById('contentTypeSelect').value = 'html';
    quill.clipboard.dangerouslyPasteHTML(contentHTML);
  }
  changeContentType();
  renderContentPreview();
}

function saveContent() {
  const type = document.getElementById('contentTypeSelect').value;

  let htmlContent = '';

  if (type === 'html') {
    htmlContent = quill.root.innerHTML;
  } else {
    htmlContent = `
      <div class="wiki-search-container">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="./assets/wikipedia-logo.png" alt="wikipedia" width="100">
          <h2>Wikipedia Search</h2>
          <input type="text" class="wikiSearchTerm w3-input w3-border w3-round" placeholder="Enter search keyword..." autocomplete="off">
        </div>
        <main class="wikiSearchResult"></main>
      </div>
    `;
  }

  let contents = JSON.parse(localStorage.getItem('contents')) || {};
  contents[currentContentId] = htmlContent;
  localStorage.setItem('contents', JSON.stringify(contents));
  alert('Content saved successfully!');
  renderContentPreview();
}

function renderContentPreview() {
  const layouts = JSON.parse(localStorage.getItem('contentLayouts')) || {}
  const items = layouts[currentLeftMenuId] || [];
  const contents = JSON.parse(localStorage.getItem('contents')) || {};

  let html = '';
  items.forEach(item => {
    let contentHTML = contents[item.id] || '<p class="w3-text-grey w3-small">(No content available)</p>';

    html += `<div style="grid-column: span ${item.colSpan}; background: white; padding: 15px; margin-bottom: 10px; border-radius: 4px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
              ${contentHTML}
            </div>`;
  });

  document.getElementById('content-preview').innerHTML = html;

  if (typeof initWikiSearch === 'function') {
    initWikiSearch();
  }
}

function changeContentType() {
  const type = document.getElementById('contentTypeSelect').value;
  const toolbar = document.querySelector('.ql-toolbar');

  if (type === 'html') {
    document.getElementById('editor-container').style.display = 'block';
    if (toolbar) toolbar.style.display = 'block';
    document.getElementById('wiki-search-preview').classList.add('hidden');
  } else {
    document.getElementById('editor-container').style.display = 'none';
    if (toolbar) toolbar.style.display = 'none';
    document.getElementById('wiki-search-preview').classList.remove('hidden');
  }
}
