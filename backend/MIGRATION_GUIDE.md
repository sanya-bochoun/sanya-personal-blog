# คู่มือการย้ายฐานข้อมูลจาก PostgreSQL ไปยัง Supabase

## ภาพรวม

คู่มือนี้จะช่วยคุณย้ายฐานข้อมูลจาก PostgreSQL ไปยัง Supabase โดยมีขั้นตอนที่ชัดเจนและปลอดภัย

## ขั้นตอนการย้ายฐานข้อมูล

### 1. เตรียม Supabase Project

1. สร้าง Supabase project ใหม่ที่ [supabase.com](https://supabase.com)
2. ไปที่ Settings > API เพื่อดู:
   - Project URL
   - Anon public key
   - Service role key (สำหรับ backend)

### 2. ตั้งค่า Environment Variables

เพิ่มตัวแปรต่อไปนี้ในไฟล์ `.env`:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 3. สร้าง Schema ใน Supabase

1. ไปที่ Supabase Dashboard > SQL Editor
2. รันไฟล์ `migrations/supabase_schema.sql` เพื่อสร้างตารางและ RLS policies

### 4. ย้ายข้อมูล

#### วิธีที่ 1: ใช้ Migration Script (แนะนำ)

```bash
# รัน migration script
node utils/migrateToSupabase.mjs
```

#### วิธีที่ 2: ใช้ Supabase Dashboard

1. ไปที่ Supabase Dashboard > Table Editor
2. Import ข้อมูลจาก CSV หรือใช้ SQL Editor

### 5. เปลี่ยน Database Connection

#### ตัวเลือก A: ใช้ Supabase Adapter (แนะนำ)

เปลี่ยน import ในไฟล์ที่ใช้ database:

```javascript
// เปลี่ยนจาก
import { query } from './utils/db.mjs';

// เป็น
import { query } from './utils/supabaseDb.mjs';
```

#### ตัวเลือก B: ใช้ Supabase Client โดยตรง

```javascript
import { supabase } from './utils/supabase.mjs';

// แทนที่ query ด้วย Supabase operations
const { data, error } = await supabase
  .from('users')
  .select('*')
  .eq('id', userId);
```

## การทดสอบ

### 1. ทดสอบการเชื่อมต่อ

```bash
node utils/testSupabaseConnection.mjs
```

### 2. ตรวจสอบข้อมูล

```bash
node utils/verifyMigration.mjs
```

### 3. ทดสอบ API Endpoints

ตรวจสอบว่า API endpoints ทำงานได้ปกติหลังจากเปลี่ยนฐานข้อมูล

## การจัดการ RLS (Row Level Security)

Supabase ใช้ RLS เพื่อความปลอดภัย ตรวจสอบ policies ในไฟล์ `supabase_schema.sql`:

- **Public Access**: ตารางที่อ่านได้โดยไม่ต้อง login
- **Authenticated Access**: ตารางที่ต้อง login ก่อน
- **Owner Access**: ตารางที่เจ้าของข้อมูลเท่านั้นที่เข้าถึงได้

## การแก้ไขปัญหา

### ปัญหาที่พบบ่อย

1. **Connection Error**
   - ตรวจสอบ environment variables
   - ตรวจสอบ Supabase project URL

2. **RLS Policy Error**
   - ตรวจสอบ RLS policies ใน Supabase Dashboard
   - ปรับ policies ตามความต้องการ

3. **Data Migration Error**
   - ตรวจสอบ foreign key constraints
   - ตรวจสอบ data types

### การ Rollback

หากต้องการกลับไปใช้ PostgreSQL:

1. เปลี่ยน import กลับไปใช้ `./utils/db.mjs`
2. ตรวจสอบ environment variables
3. รีสตาร์ท server

## ไฟล์ที่เกี่ยวข้อง

- `utils/supabase.mjs` - Supabase client configuration
- `utils/supabaseDb.mjs` - Database adapter สำหรับ Supabase
- `utils/migrateToSupabase.mjs` - Migration script
- `migrations/supabase_schema.sql` - Database schema สำหรับ Supabase

## ข้อควรระวัง

1. **Backup ข้อมูล**: สำรองข้อมูล PostgreSQL ก่อนย้าย
2. **Test Environment**: ทดสอบใน development environment ก่อน
3. **RLS Policies**: ตรวจสอบ security policies อย่างละเอียด
4. **Performance**: ตรวจสอบ performance หลังย้ายข้อมูล

## การบำรุงรักษา

1. **Regular Backups**: ใช้ Supabase backup features
2. **Monitor Usage**: ตรวจสอบ usage limits
3. **Update Policies**: ปรับ RLS policies ตามความต้องการ
4. **Performance Optimization**: ใช้ indexes และ query optimization

## สนับสนุน

หากมีปัญหาในการย้ายข้อมูล:

1. ตรวจสอบ Supabase documentation
2. ดู error logs ใน Supabase Dashboard
3. ตรวจสอบ network connectivity
4. ติดต่อ Supabase support หากจำเป็น 