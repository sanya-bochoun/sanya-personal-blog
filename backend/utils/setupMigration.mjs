import { testSupabaseConnection } from './supabase.mjs';
import { testConnection as testPostgresConnection } from './db.mjs';

const setupMigration = async () => {
  console.log('🔧 ตั้งค่าการย้ายฐานข้อมูล...');
  
  // ตรวจสอบ environment variables
  console.log('\n📋 ตรวจสอบ Environment Variables:');
  const requiredVars = {
    'SUPABASE_URL': process.env.SUPABASE_URL,
    'SUPABASE_SERVICE_ROLE_KEY': process.env.SUPABASE_SERVICE_ROLE_KEY,
    'DB_HOST': process.env.DB_HOST,
    'DB_NAME': process.env.DB_NAME,
    'DB_USER': process.env.DB_USER,
    'DB_PASSWORD': process.env.DB_PASSWORD
  };
  
  let allVarsSet = true;
  Object.entries(requiredVars).forEach(([key, value]) => {
    if (value) {
      console.log(`✅ ${key}: ${key.includes('PASSWORD') ? '***' : value.substring(0, 20)}...`);
    } else {
      console.log(`❌ ${key}: ไม่ได้ตั้งค่า`);
      allVarsSet = false;
    }
  });
  
  if (!allVarsSet) {
    console.error('\n❌ กรุณาตั้งค่า environment variables ในไฟล์ .env');
    console.error('📝 ดูตัวอย่างในไฟล์ env.example');
    return false;
  }
  
  // ทดสอบการเชื่อมต่อ PostgreSQL
  console.log('\n🔍 ทดสอบการเชื่อมต่อ PostgreSQL...');
  const postgresConnected = await testPostgresConnection();
  if (!postgresConnected) {
    console.error('❌ ไม่สามารถเชื่อมต่อ PostgreSQL ได้');
    console.error('กรุณาตรวจสอบการตั้งค่าฐานข้อมูล PostgreSQL');
    return false;
  }
  
  // ทดสอบการเชื่อมต่อ Supabase
  console.log('\n🔍 ทดสอบการเชื่อมต่อ Supabase...');
  const supabaseConnected = await testSupabaseConnection();
  if (!supabaseConnected) {
    console.error('❌ ไม่สามารถเชื่อมต่อ Supabase ได้');
    console.error('กรุณาตรวจสอบ:');
    console.error('1. Supabase URL และ API keys');
    console.error('2. Network connectivity');
    console.error('3. Supabase project status');
    return false;
  }
  
  console.log('\n✅ การตั้งค่าเสร็จสิ้น! พร้อมสำหรับการย้ายข้อมูล');
  console.log('\n📝 ขั้นตอนต่อไป:');
  console.log('1. รัน: npm run migrate:supabase');
  console.log('2. ตรวจสอบ: npm run verify:migration');
  
  return true;
};

// รัน setup ถ้าเรียกไฟล์นี้โดยตรง
if (import.meta.url === `file://${process.argv[1]}`) {
  setupMigration();
}

export default setupMigration; 