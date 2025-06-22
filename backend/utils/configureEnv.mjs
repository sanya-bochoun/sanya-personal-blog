import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configureEnv = () => {
  console.log('🔧 ตั้งค่า Environment Variables');
  console.log('================================');
  
  const envPath = path.join(__dirname, '..', '.env');
  const envExamplePath = path.join(__dirname, '..', 'env.example');
  
  console.log('📁 ตรวจสอบไฟล์...');
  console.log('Env path:', envPath);
  console.log('Example path:', envExamplePath);
  
  // อ่านไฟล์ env.example
  let envContent = '';
  try {
    envContent = fs.readFileSync(envExamplePath, 'utf8');
    console.log('✅ อ่านไฟล์ env.example สำเร็จ');
  } catch (error) {
    console.error('❌ ไม่พบไฟล์ env.example:', error.message);
    return;
  }
  
  console.log('\n📋 ขั้นตอนการตั้งค่า:');
  console.log('1. สร้าง Supabase project ที่ https://supabase.com');
  console.log('2. ไปที่ Settings > API');
  console.log('3. คัดลอก Project URL และ API keys');
  console.log('4. ตั้งค่าฐานข้อมูล PostgreSQL ของคุณ');
  
  console.log('\n⚠️  หมายเหตุ:');
  console.log('- ไฟล์ .env จะถูกสร้างขึ้นใหม่');
  console.log('- กรุณาแก้ไขค่าในไฟล์ .env ตามการตั้งค่าของคุณ');
  console.log('- อย่าลืมเพิ่ม .env ใน .gitignore');
  
  // สร้างไฟล์ .env
  try {
    fs.writeFileSync(envPath, envContent);
    console.log('\n✅ สร้างไฟล์ .env สำเร็จ!');
    console.log('📝 กรุณาแก้ไขไฟล์ .env และตั้งค่าตามนี้:');
    console.log('\n🔑 Supabase Configuration:');
    console.log('SUPABASE_URL=https://your-project-id.supabase.co');
    console.log('SUPABASE_ANON_KEY=your_supabase_anon_key');
    console.log('SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key');
    console.log('\n🗄️  PostgreSQL Configuration:');
    console.log('DB_USER=your_postgres_user');
    console.log('DB_HOST=localhost');
    console.log('DB_NAME=your_database_name');
    console.log('DB_PASSWORD=your_postgres_password');
    console.log('DB_PORT=5432');
    
    console.log('\n📝 หลังจากตั้งค่าแล้ว รัน:');
    console.log('npm run setup:migration');
    
  } catch (error) {
    console.error('❌ ไม่สามารถสร้างไฟล์ .env ได้:', error.message);
  }
};

// รัน configure ทันที
configureEnv();

export default configureEnv; 