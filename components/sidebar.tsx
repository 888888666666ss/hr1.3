'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { LayoutDashboard, Briefcase, Users, FileText, Calendar, CheckCircle, FolderOpen, TrendingUp, BarChart3, Settings, Building2, ClipboardCheck, Clock, DollarSign, Megaphone, Heart, UserX, Shield, FileSignature, UserCheck, LogOut } from 'lucide-react'
import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { useAuth } from '@/lib/auth/auth-context'

const navigationGroups = [
  {
    title: '招聘模块',
    items: [
      { name: '岗位需求', href: '/job-reqs', icon: CheckCircle },
      { name: '岗位管理', href: '/positions', icon: Briefcase },
      { name: '简历人才库', href: '/resumes', icon: FileText },
      { name: '候选人流程', href: '/candidates', icon: Users },
      { name: '面试管理', href: '/interviews', icon: Calendar },
      { name: 'Offer管理', href: '/offers', icon: FileSignature },
      { name: '招聘渠道', href: '/settings/channels', icon: Building2 },
    ]
  },
  {
    title: '入职与员工',
    items: [
      { name: '入职管理', href: '/onboarding', icon: UserCheck },
      { name: '入职信息表', href: '/onboarding/forms', icon: ClipboardCheck },
      { name: '组织架构', href: '/organization', icon: Building2 },
      { name: '员工档案', href: '/employees', icon: FolderOpen },
      { name: '试用期转正', href: '/probation', icon: UserCheck },
      { name: '合同管理', href: '/contracts', icon: FileSignature },
    ]
  },
  {
    title: '考勤与绩效',
    items: [
      { name: '考勤打卡', href: '/attendance', icon: Clock },
      { name: '请假加班', href: '/leave', icon: Calendar },
      { name: '薪酬管理', href: '/salary', icon: DollarSign },
      { name: '绩效管理', href: '/performance', icon: TrendingUp },
    ]
  },
  {
    title: '文化与沟通',
    items: [
      { name: '公告通知', href: '/announcements', icon: Megaphone },
      { name: '企业文化', href: '/culture', icon: Heart },
    ]
  },
  {
    title: '离职管理',
    items: [
      { name: '离职申请', href: '/offboarding', icon: UserX },
      { name: '交接清单', href: '/handover', icon: ClipboardCheck },
      { name: '离职面谈', href: '/exit-interview', icon: FileText },
    ]
  },
  {
    title: '系统管理',
    items: [
      { name: '数据后台', href: '/analytics', icon: BarChart3 },
      { name: '系统设置', href: '/settings', icon: Settings },
      { name: '角色权限', href: '/permissions', icon: Shield },
    ]
  }
]

export function Sidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [expandedGroups, setExpandedGroups] = useState<string[]>([
    '招聘模块', '入职与员工', '考勤与绩效', '文化与沟通', '离职管理', '系统管理'
  ])

  const toggleGroup = (title: string) => {
    setExpandedGroups(prev => 
      prev.includes(title) 
        ? prev.filter(t => t !== title)
        : [...prev, title]
    )
  }

  return (
    <div className="flex h-screen w-64 flex-col border-r border-border bg-card">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-border px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Users className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">AI HR Pro</span>
            <span className="text-xs text-muted-foreground">智能人力系统</span>
          </div>
        </div>
      </div>

      {/* Dashboard Link */}
      <div className="px-3 py-3 border-b border-border">
        <Link
          href="/"
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
            pathname === '/'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          )}
        >
          <LayoutDashboard className="h-5 w-5" />
          系统首页
        </Link>
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 overflow-y-auto px-3 py-2">
        {navigationGroups.map((group) => {
          const isExpanded = expandedGroups.includes(group.title)
          return (
            <div key={group.title} className="mb-2">
              <button
                onClick={() => toggleGroup(group.title)}
                className="flex w-full items-center justify-between px-2 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>{group.title}</span>
                {isExpanded ? (
                  <ChevronDown className="h-3.5 w-3.5" />
                ) : (
                  <ChevronRight className="h-3.5 w-3.5" />
                )}
              </button>
              {isExpanded && (
                <div className="space-y-0.5 mt-1">
                  {group.items.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                          isActive
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.name}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* User Info */}
      <div className="border-t border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary">
              <span className="text-sm font-medium text-secondary-foreground">
                {user?.name?.substring(0, 2).toUpperCase() || 'HR'}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">
                {user?.name || '管理员'}
              </span>
              <span className="text-xs text-muted-foreground">
                {user?.email || 'admin@company.com'}
              </span>
            </div>
          </div>
          <button
            onClick={logout}
            className="text-muted-foreground hover:text-foreground transition-colors"
            title="退出登录"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
