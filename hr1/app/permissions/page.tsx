'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Edit, Shield } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'

const roles = [
  {
    id: 1,
    name: '超级管理员',
    description: '拥有系统所有权限',
    userCount: 2,
    color: 'red',
  },
  {
    id: 2,
    name: 'HR经理',
    description: '人力资源部门管理权限',
    userCount: 3,
    color: 'blue',
  },
  {
    id: 3,
    name: '部门主管',
    description: '部门员工管理权限',
    userCount: 12,
    color: 'green',
  },
  {
    id: 4,
    name: '普通员工',
    description: '基础查看和操作权限',
    userCount: 120,
    color: 'gray',
  },
]

const permissions = [
  { module: '招聘管理', items: ['查看岗位', '创建岗位', '编辑岗位', '删除岗位'] },
  { module: '简历管理', items: ['查看简历', '上传简历', '导出简历', '删除简历'] },
  { module: '候选人管理', items: ['查看候选人', '编辑候选人', '安排面试', '发送Offer'] },
  { module: '员工管理', items: ['查看员工', '编辑员工', '员工入职', '员工离职'] },
  { module: '考勤管理', items: ['查看考勤', '修改考勤', '导出考勤', '考勤统计'] },
  { module: '绩效管理', items: ['查看绩效', '评估绩效', '设置目标', '绩效报告'] },
  { module: '系统设置', items: ['基本设置', '用户管理', '角色权限', '数据备份'] },
]

export default function PermissionsPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <PageHeader
        title="角色权限"
        description="管理系统角色和权限配置"
      />

      <div className="flex-1 space-y-6 p-6">
        <div className="flex justify-end">
          <Button onClick={() => setIsCreateOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            创建新角色
          </Button>
        </div>

        {/* Roles List */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {roles.map((role) => (
            <Card key={role.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-${role.color}-100`}>
                      <Shield className={`h-5 w-5 text-${role.color}-600`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{role.name}</CardTitle>
                      <CardDescription className="mt-1">{role.userCount} 位用户</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{role.description}</p>
                <Button variant="outline" size="sm" className="w-full">
                  <Edit className="mr-1.5 h-3.5 w-3.5" />
                  编辑权限
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Permission Matrix */}
        <Card>
          <CardHeader>
            <CardTitle>权限矩阵</CardTitle>
            <CardDescription>查看和管理各角色的权限配置</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium">功能模块</th>
                    {roles.map((role) => (
                      <th key={role.id} className="text-center p-4 font-medium">
                        {role.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {permissions.map((perm, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-4 font-medium">{perm.module}</td>
                      {roles.map((role) => (
                        <td key={role.id} className="text-center p-4">
                          <Checkbox
                            defaultChecked={role.id <= 2}
                            disabled={role.id === 1}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Role Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>创建新角色</DialogTitle>
            <DialogDescription>设置角色名称和描述</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="role-name">角色名称 *</Label>
              <Input id="role-name" placeholder="输入角色名称..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role-desc">角色描述</Label>
              <Input id="role-desc" placeholder="描述这个角色的职责..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
              取消
            </Button>
            <Button>创建角色</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
