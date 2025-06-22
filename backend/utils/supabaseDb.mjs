import { supabase } from './supabase.mjs';

// Database adapter สำหรับ Supabase
export class SupabaseDB {
  // ฟังก์ชันสำหรับ query ข้อมูล
  static async query(text, params = []) {
    try {
      // แปลง SQL query เป็น Supabase query
      const result = await this.executeQuery(text, params);
      return {
        rows: result.data || [],
        rowCount: result.data?.length || 0,
        error: result.error
      };
    } catch (error) {
      console.error('Database query error:', error);
      return {
        rows: [],
        rowCount: 0,
        error: error
      };
    }
  }

  // ฟังก์ชันสำหรับแปลง SQL query เป็น Supabase query
  static async executeQuery(text, params = []) {
    // แปลง SQL query เป็น Supabase operations
    const query = text.toLowerCase().trim();
    
    // SELECT queries
    if (query.startsWith('select')) {
      return await this.handleSelect(text, params);
    }
    
    // INSERT queries
    if (query.startsWith('insert')) {
      return await this.handleInsert(text, params);
    }
    
    // UPDATE queries
    if (query.startsWith('update')) {
      return await this.handleUpdate(text, params);
    }
    
    // DELETE queries
    if (query.startsWith('delete')) {
      return await this.handleDelete(text, params);
    }
    
    // Raw SQL execution (สำหรับ queries ที่ซับซ้อน)
    return await this.executeRawSQL(text, params);
  }

  // จัดการ SELECT queries
  static async handleSelect(text, params) {
    try {
      // แยก table name และ conditions จาก SQL
      const tableMatch = text.match(/from\s+(\w+)/i);
      if (!tableMatch) {
        throw new Error('Invalid SELECT query: no table specified');
      }
      
      const tableName = tableMatch[1];
      let supabaseQuery = supabase.from(tableName).select('*');
      
      // จัดการ WHERE conditions
      const whereMatch = text.match(/where\s+(.+?)(?:\s+order\s+by|\s+limit|\s*$)/i);
      if (whereMatch) {
        const whereClause = whereMatch[1];
        // แปลง WHERE clause เป็น Supabase filters
        const filters = this.parseWhereClause(whereClause, params);
        Object.keys(filters).forEach(key => {
          supabaseQuery = supabaseQuery.eq(key, filters[key]);
        });
      }
      
      // จัดการ ORDER BY
      const orderMatch = text.match(/order\s+by\s+(\w+)\s+(asc|desc)?/i);
      if (orderMatch) {
        const column = orderMatch[1];
        const direction = orderMatch[2] || 'asc';
        supabaseQuery = supabaseQuery.order(column, { ascending: direction === 'asc' });
      }
      
      // จัดการ LIMIT
      const limitMatch = text.match(/limit\s+(\d+)/i);
      if (limitMatch) {
        const limit = parseInt(limitMatch[1]);
        supabaseQuery = supabaseQuery.limit(limit);
      }
      
      return await supabaseQuery;
    } catch (error) {
      console.error('Error handling SELECT query:', error);
      return { data: null, error };
    }
  }

  // จัดการ INSERT queries
  static async handleInsert(text, params) {
    try {
      const tableMatch = text.match(/into\s+(\w+)/i);
      if (!tableMatch) {
        throw new Error('Invalid INSERT query: no table specified');
      }
      
      const tableName = tableMatch[1];
      const valuesMatch = text.match(/values\s*\(([^)]+)\)/i);
      
      if (valuesMatch) {
        const valuesStr = valuesMatch[1];
        const values = this.parseValues(valuesStr, params);
        return await supabase.from(tableName).insert(values);
      }
      
      return { data: null, error: 'Invalid INSERT query format' };
    } catch (error) {
      console.error('Error handling INSERT query:', error);
      return { data: null, error };
    }
  }

  // จัดการ UPDATE queries
  static async handleUpdate(text, params) {
    try {
      const tableMatch = text.match(/update\s+(\w+)/i);
      if (!tableMatch) {
        throw new Error('Invalid UPDATE query: no table specified');
      }
      
      const tableName = tableMatch[1];
      const setMatch = text.match(/set\s+(.+?)(?:\s+where|\s*$)/i);
      const whereMatch = text.match(/where\s+(.+?)(?:\s*$)/i);
      
      if (!setMatch) {
        throw new Error('Invalid UPDATE query: no SET clause');
      }
      
      const setClause = setMatch[1];
      const updates = this.parseSetClause(setClause, params);
      
      let supabaseQuery = supabase.from(tableName).update(updates);
      
      if (whereMatch) {
        const whereClause = whereMatch[1];
        const filters = this.parseWhereClause(whereClause, params);
        Object.keys(filters).forEach(key => {
          supabaseQuery = supabaseQuery.eq(key, filters[key]);
        });
      }
      
      return await supabaseQuery;
    } catch (error) {
      console.error('Error handling UPDATE query:', error);
      return { data: null, error };
    }
  }

  // จัดการ DELETE queries
  static async handleDelete(text, params) {
    try {
      const tableMatch = text.match(/from\s+(\w+)/i);
      if (!tableMatch) {
        throw new Error('Invalid DELETE query: no table specified');
      }
      
      const tableName = tableMatch[1];
      const whereMatch = text.match(/where\s+(.+?)(?:\s*$)/i);
      
      let supabaseQuery = supabase.from(tableName).delete();
      
      if (whereMatch) {
        const whereClause = whereMatch[1];
        const filters = this.parseWhereClause(whereClause, params);
        Object.keys(filters).forEach(key => {
          supabaseQuery = supabaseQuery.eq(key, filters[key]);
        });
      }
      
      return await supabaseQuery;
    } catch (error) {
      console.error('Error handling DELETE query:', error);
      return { data: null, error };
    }
  }

  // แปลง WHERE clause เป็น filters
  static parseWhereClause(whereClause, params) {
    const filters = {};
    const conditions = whereClause.split(/\s+and\s+/i);
    
    conditions.forEach(condition => {
      const match = condition.match(/(\w+)\s*=\s*\?/);
      if (match) {
        const column = match[1];
        const paramIndex = parseInt(condition.match(/\?/g)?.length || 0) - 1;
        if (params[paramIndex] !== undefined) {
          filters[column] = params[paramIndex];
        }
      }
    });
    
    return filters;
  }

  // แปลง VALUES clause เป็น object
  static parseValues(valuesStr, params) {
    const values = {};
    const columns = valuesStr.match(/\(([^)]+)\)/);
    if (columns) {
      const columnNames = columns[1].split(',').map(col => col.trim());
      columnNames.forEach((col, index) => {
        if (params[index] !== undefined) {
          values[col] = params[index];
        }
      });
    }
    return values;
  }

  // แปลง SET clause เป็น object
  static parseSetClause(setClause, params) {
    const updates = {};
    const assignments = setClause.split(',');
    
    assignments.forEach(assignment => {
      const match = assignment.match(/(\w+)\s*=\s*\?/);
      if (match) {
        const column = match[1];
        const paramIndex = parseInt(assignment.match(/\?/g)?.length || 0) - 1;
        if (params[paramIndex] !== undefined) {
          updates[column] = params[paramIndex];
        }
      }
    });
    
    return updates;
  }

  // รัน raw SQL (สำหรับ queries ที่ซับซ้อน)
  static async executeRawSQL(text, params) {
    try {
      // ใช้ Supabase RPC สำหรับ raw SQL
      const { data, error } = await supabase.rpc('exec_sql', {
        sql_query: text,
        sql_params: params
      });
      
      return { data, error };
    } catch (error) {
      console.error('Error executing raw SQL:', error);
      return { data: null, error };
    }
  }

  // ฟังก์ชันสำหรับทดสอบการเชื่อมต่อ
  static async testConnection() {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('count')
        .limit(1);
      
      if (error) {
        console.error('❌ Error connecting to Supabase:', error.message);
        return false;
      }
      
      console.log('✅ Successfully connected to Supabase!');
      return true;
    } catch (error) {
      console.error('❌ Error connecting to Supabase:', error.message);
      return false;
    }
  }
}

// Export functions ที่เข้ากันได้กับ PostgreSQL interface
export const query = (text, params) => SupabaseDB.query(text, params);
export const testConnection = () => SupabaseDB.testConnection();

// Export default instance
export default SupabaseDB; 