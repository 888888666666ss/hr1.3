// 测试 Supabase 连接
// 这个文件用于快速验证数据库连接是否正常

import { supabase } from './client'

export async function testSupabaseConnection() {
  try {
    // 测试基本连接
    const { data, error } = await supabase.from('companies').select('count')
    
    if (error) {
      console.error('Supabase connection test failed:', error.message)
      return { success: false, error: error.message }
    }
    
    console.log('✅ Supabase connection successful!')
    return { success: true, data }
    
  } catch (err) {
    console.error('❌ Supabase connection error:', err)
    return { success: false, error: err }
  }
}

export async function createTestCompany() {
  try {
    const testCompany = {
      name: '测试公司',
      domain: 'test-company-' + Date.now(),
      industry: 'technology',
      size_category: 'startup'
    }
    
    const { data, error } = await supabase
      .from('companies')
      .insert(testCompany)
      .select()
      .single()
    
    if (error) throw error
    
    console.log('✅ Test company created:', data)
    return data
    
  } catch (err) {
    console.error('❌ Failed to create test company:', err)
    throw err
  }
}