# Admin Setup Instructions

## Problem: Can't access admin panel or update books after logging in

The issue is that you logged in BEFORE the auto-promotion code was deployed. Your JWT token was created with the old code, so you're not marked as admin yet.

## ✅ SOLUTION (Choose One):

### **Option 1: Quick Fix (Recommended)**

1. **Open Browser Console** (F12 or Right-click → Inspect → Console)
2. **Run this code** in the console:
```javascript
// Clear old data
localStorage.clear();
// Reload page
window.location.reload();
```

3. **Log in again** with `olidehasan444@gmail.com`
4. **You should now see "Admin Panel" link** in the navbar

---

### **Option 2: Manual Browser Clear**

1. **Log Out** from the application
2. **Clear Browser Storage**:
   - Press F12 (or Right-click → Inspect)
   - Go to "Application" tab (Chrome) or "Storage" tab (Firefox)
   - Click "Local Storage" → Your site URL
   - Click "Clear All"
3. **Close** the Developer Tools
4. **Log In again** with `olidehasan444@gmail.com`

---

### **Option 3: If Using Localhost**

If you're running the frontend locally (`http://localhost:5173`), you need to update the API endpoint temporarily:

1. Open `src/config/api.js`
2. Change the API_BASE_URL temporarily:
```javascript
const API_BASE_URL = 'http://localhost:5000'; // For local backend
// OR keep using production:
const API_BASE_URL = 'https://library-management-server-taupe-nine.vercel.app';
```

3. If using local backend, run:
```bash
cd library-management-server
npm run dev
```

---

## 🔍 How to Check if You're Admin:

After logging in, open browser console and run:
```javascript
// Check your JWT token
const token = localStorage.getItem('access-token');
console.log('Token exists:', !!token);

// Check admin status
fetch('https://library-management-server-taupe-nine.vercel.app/api/users/admin/olidehasan444@gmail.com', {
    headers: { 'Authorization': `Bearer ${token}` }
})
.then(r => r.json())
.then(data => console.log('Admin status:', data));
```

You should see: `{ success: true, data: { admin: true } }`

---

## 🎯 What Should Happen After Fix:

1. ✅ "Admin Panel" link appears in navbar (orange text)
2. ✅ You can access `/admin-users` page
3. ✅ You can update books successfully
4. ✅ You can add books to the library

---

## 🚨 Still Not Working?

Run this in browser console to force re-authentication:
```javascript
// Force clear everything and re-authenticate
localStorage.clear();
sessionStorage.clear();
document.cookie.split(";").forEach((c) => {
    document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
});
alert('All data cleared! Please reload and login again.');
location.reload();
```

---

## 📱 Contact if Still Issues:

If none of these work, it means:
1. The backend deployment might not be live yet (wait 1-2 minutes)
2. There might be a database connection issue
3. The JWT secret might have changed

Check Vercel deployment status: https://vercel.com/your-dashboard

