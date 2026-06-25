// UI Elements
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const userInfoDiv = document.getElementById('user-info');
const userNameSpan = document.getElementById('user-name');
const userAvatarImg = document.getElementById('user-avatar');
const dashboardDiv = document.getElementById('dashboard');

// Init
document.addEventListener('DOMContentLoaded', checkLoginStatus);

// 1. Process Login Google
loginBtn.addEventListener('click', () => {
    window.location.href = '/auth/google';
});

logoutBtn.addEventListener('click', async () => {
    await fetch('/auth/logout', { method: 'POST' });
    window.location.reload();
});

async function checkLoginStatus() {
    try {
        const res = await fetch('/api/user');
        if (res.ok) {
            const user = await res.json();
            loginBtn.classList.add('hidden');
            userInfoDiv.classList.remove('hidden');
            dashboardDiv.classList.remove('hidden');

            userNameSpan.textContent = user.name;
            userAvatarImg.src = user.picture;
        }
    } catch (e) {
        console.log('Not logged in');
    }
}

// 2. Process Switch Gmail Tab
window.switchTab = function (tabName) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));

    document.getElementById(`tab-${tabName}`).classList.remove('hidden');
    event.target.classList.add('active');
}

// 3. Get Email
document.getElementById('check-mail-btn').addEventListener('click', async () => {
    const list = document.getElementById('email-list');
    list.innerHTML = '<li>Loading...</li>';
    try {
        const res = await fetch('/api/emails');
        const emails = await res.json();
        list.innerHTML = '';
        if (emails.length === 0) list.innerHTML = '<li>No email.</li>';
        emails.forEach(email => {
            let formattedDate = '';
            if (email.date) {
                const dateObj = new Date(email.date);
                formattedDate = dateObj.toLocaleString('vi-VN');
            }

            list.innerHTML += `
                <li>
                    <strong>${email.subject || '(No subject)'}</strong>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px;">
                        <span>From: ${email.from}</span>
                        <small style="color: var(--text-muted); font-size: 0.75rem;">${formattedDate}</small>
                    </div>
                </li>
            `;
        });
    } catch (e) {
        list.innerHTML = '<li>Error when loading emails !</li>';
    }
});

// 4. Send Email
document.getElementById('email-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const status = document.getElementById('email-status');
    btn.disabled = true;
    status.textContent = 'Đang gửi...';

    const payload = {
        to: document.getElementById('email-to').value,
        subject: document.getElementById('email-subject').value,
        body: document.getElementById('email-body').value
    };

    try {
        const res = await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (res.ok) {
            status.textContent = 'Send Successfully!';
            status.style.color = 'green';
            e.target.reset();
        } else {
            status.textContent = 'Send Failed!: ' + (data.error || '');
            status.style.color = 'red';
        }
    } catch (err) {
        status.textContent = 'Email Send Failed!';
    }
    btn.disabled = false;
});

// 5. Chatbot Gemini
document.getElementById('chat-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = document.getElementById('chat-input');
    const box = document.getElementById('chat-box');
    const msg = input.value;

    if (!msg) return;

    // Thêm tin nhắn user
    box.innerHTML += `<div class="message user">${msg}</div>`;
    input.value = '';
    box.scrollTop = box.scrollHeight;

    // Hiện đang nhập
    const loadingId = 'loading-' + Date.now();
    box.innerHTML += `<div class="message ai" id="${loadingId}">...</div>`;
    box.scrollTop = box.scrollHeight;

    try {
        const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: msg })
        });
        const data = await res.json();
        document.getElementById(loadingId).remove();

        if (res.ok) {
            box.innerHTML += `<div class="message ai">${data.reply.replace(/\n/g, '<br>')}</div>`;
        } else {
            box.innerHTML += `<div class="message ai" style="color:red">Lỗi: ${data.error}</div>`;
        }
    } catch (err) {
        document.getElementById(loadingId).remove();
        box.innerHTML += `<div class="message ai" style="color:red">Không thể kết nối.</div>`;
    }
    box.scrollTop = box.scrollHeight;
});

// 6. Payment VietQR
document.getElementById('payment-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const qrResultDiv = document.getElementById('qr-result');
    const qrImage = document.getElementById('qr-image');

    btn.disabled = true;
    btn.textContent = 'Processing QR...';
    qrResultDiv.classList.add('hidden');

    const payload = {
        amount: document.getElementById('amount').value,
        order_info: document.getElementById('order-info').value
    };

    try {
        const res = await fetch('/api/payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await res.json();

        if (data.success && data.qrDataURL) {
            qrImage.src = data.qrDataURL;
            qrResultDiv.classList.remove('hidden');
        }
        else {
            alert('Error: ' + (data.error || 'QR creation failed'));
        }
    } catch (err) {
        alert('Error connecting to payment API');
    }

    //Always reset button
    btn.disabled = false;
    btn.textContent = 'Create QR Payment';
});
