import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL')
}

if (!supabaseServiceRoleKey) {
  throw new Error('Missing env.SUPABASE_SERVICE_ROLE_KEY')
}

// 服务端客户端 - 拥有管理员权限，绕过 RLS
export const supabaseAdmin = createClient<Database>(
  supabaseUrl,
  supabaseServiceRoleKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

// 服务端辅助函数
export const serverHelpers = {
  // 获取用户的公司信息
  getUserCompany: async (userId: string) => {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('company_id, companies(*)')
      .eq('id', userId)
      .single()
    
    if (error) throw error
    return data
  },

  // 检查用户权限
  checkUserPermission: async (userId: string, permission: string) => {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select(`
        roles (
          role_permissions (
            permissions (
              name
            )
          )
        )
      `)
      .eq('id', userId)
      .single()
    
    if (error) throw error
    
    const userPermissions = data.roles?.role_permissions?.map(
      rp => rp.permissions?.name
    ) || []
    
    return userPermissions.includes(permission)
  },

  // 创建系统日志
  createSystemLog: async (
    companyId: string,
    userId: string | null,
    action: string,
    resourceType: string | null,
    resourceId: string | null,
    details: any = {},
    ipAddress?: string,
    userAgent?: string
  ) => {
    const { data, error } = await supabaseAdmin
      .from('system_logs')
      .insert({
        company_id: companyId,
        user_id: userId,
        action,
        resource_type: resourceType,
        resource_id: resourceId,
        details,
        ip_address: ipAddress,
        user_agent: userAgent
      })
    
    if (error) throw error
    return data
  },

  // 发送通知
  createNotification: async (
    companyId: string,
    userId: string,
    title: string,
    message: string,
    type: string = 'in_app',
    category: string = 'system',
    actionUrl?: string,
    metadata: any = {}
  ) => {
    const { data, error } = await supabaseAdmin
      .from('notifications')
      .insert({
        company_id: companyId,
        user_id: userId,
        title,
        message,
        type,
        category,
        action_url: actionUrl,
        metadata
      })
    
    if (error) throw error
    return data
  }
}