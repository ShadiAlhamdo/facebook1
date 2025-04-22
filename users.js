// users.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://ysietareuenlpqepiwdy.supabase.co'; // ← نفس عنوان مشروعك
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzaWV0YXJldWVubHBxZXBpd2R5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzMTUwMjUsImV4cCI6MjA2MDg5MTAyNX0.c7M5sEaw93n__MHEedAuVcVTyOZMTy8L2ivPXfEQjL0'; // ← نفس المفتاح من Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

async function loadUsers() {
  const { data, error } = await supabase
    .from('logins')
    .select('email, created_at')
    .order('created_at', { ascending: false });

  const tbody = document.querySelector('#usersTable tbody');

  if (error) {
    console.error('خطأ في جلب البيانات:', error);
    tbody.innerHTML = '<tr><td colspan="2">حدث خطأ أثناء جلب البيانات</td></tr>';
    return;
  }

  if (data.length === 0) {
    tbody.innerHTML = '<tr><td colspan="2">لا يوجد مستخدمون بعد</td></tr>';
    return;
  }

  tbody.innerHTML = data.map(user => `
    <tr>
      <td>${user.email}</td>
      <td>${new Date(user.created_at).toLocaleString()}</td>
    </tr>
  `).join('');
}

loadUsers();