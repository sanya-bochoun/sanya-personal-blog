import { testSupabaseConnection } from './supabase.mjs';

const testConnection = async () => {
  console.log('🔍 ทดสอบการเชื่อมต่อ Supabase...');
  
  // ตรวจสอบ environment variables
  const requiredVars = ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY'];
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('❌ Missing environment variables:', missingVars.join(', '));
    console.error('กรุณาตั้งค่า environment variables ในไฟล์ .env');
    return;
  }
  
  // ทดสอบการเชื่อมต่อ
  const isConnected = await testSupabaseConnection();
  
  if (isConnected) {
    console.log('✅ การเชื่อมต่อ Supabase สำเร็จ!');
    console.log('📊 URL:', process.env.SUPABASE_URL);
  } else {
    console.error('❌ การเชื่อมต่อ Supabase ล้มเหลว');
    console.error('กรุณาตรวจสอบ:');
    console.error('1. Supabase URL และ API keys');
    console.error('2. Network connectivity');
    console.error('3. Supabase project status');
  }
};

// รัน test ถ้าเรียกไฟล์นี้โดยตรง
if (import.meta.url === `file://${process.argv[1]}`) {
  testConnection();
}

export default testConnection; 