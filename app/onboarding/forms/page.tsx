'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Upload, Save } from 'lucide-react'

export default function OnboardingFormsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <PageHeader
        title="入职信息表"
        description="新员工填写完整的入职信息和上传相关证明文件"
      />

      <div className="flex-1 space-y-6 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>个人基本信息</CardTitle>
              <CardDescription>请填写完整的个人信息</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">姓名 *</Label>
                  <Input id="name" placeholder="请输入姓名" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">性别 *</Label>
                  <Select>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="选择性别" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">男</SelectItem>
                      <SelectItem value="female">女</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="birthday">出生日期 *</Label>
                  <Input id="birthday" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="id-card">身份证号 *</Label>
                  <Input id="id-card" placeholder="请输入身份证号" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">手机号码 *</Label>
                  <Input id="phone" type="tel" placeholder="请输入手机号码" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">电子邮箱 *</Label>
                  <Input id="email" type="email" placeholder="请输入电子邮箱" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">现居住地址 *</Label>
                <Input id="address" placeholder="请输入详细地址" />
              </div>
            </CardContent>
          </Card>

          {/* Education & Work Experience */}
          <Card>
            <CardHeader>
              <CardTitle>教育与工作经历</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="education">最高学历 *</Label>
                  <Select>
                    <SelectTrigger id="education">
                      <SelectValue placeholder="选择学历" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bachelor">本科</SelectItem>
                      <SelectItem value="master">硕士</SelectItem>
                      <SelectItem value="doctor">博士</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="school">毕业院校</Label>
                  <Input id="school" placeholder="请输入毕业院校" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="work-experience">工作经历</Label>
                <Textarea
                  id="work-experience"
                  placeholder="请简要描述过往工作经历..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Bank & Emergency Contact */}
          <Card>
            <CardHeader>
              <CardTitle>银行与紧急联系人</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bank">开户银行 *</Label>
                  <Input id="bank" placeholder="例如：中国工商银行" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bank-account">银行账号 *</Label>
                  <Input id="bank-account" placeholder="请输入银行账号" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergency-contact">紧急联系人 *</Label>
                  <Input id="emergency-contact" placeholder="请输入紧急联系人姓名" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergency-phone">联系人电话 *</Label>
                  <Input id="emergency-phone" type="tel" placeholder="请输入联系人电话" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="relationship">与本人关系 *</Label>
                <Select>
                  <SelectTrigger id="relationship">
                    <SelectValue placeholder="选择关系" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="parent">父母</SelectItem>
                    <SelectItem value="spouse">配偶</SelectItem>
                    <SelectItem value="sibling">兄弟姐妹</SelectItem>
                    <SelectItem value="friend">朋友</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Document Upload */}
          <Card>
            <CardHeader>
              <CardTitle>证明文件上传</CardTitle>
              <CardDescription>请上传以下证明文件的扫描件或照片</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="id-upload">身份证 (正反面) *</Label>
                <div className="flex items-center gap-4">
                  <Input id="id-upload" type="file" accept="image/*,.pdf" multiple />
                  <Button variant="outline" size="sm">
                    <Upload className="mr-1.5 h-4 w-4" />
                    上传
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="diploma-upload">学历证书 *</Label>
                <div className="flex items-center gap-4">
                  <Input id="diploma-upload" type="file" accept="image/*,.pdf" />
                  <Button variant="outline" size="sm">
                    <Upload className="mr-1.5 h-4 w-4" />
                    上传
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="photo-upload">一寸照片 *</Label>
                <div className="flex items-center gap-4">
                  <Input id="photo-upload" type="file" accept="image/*" />
                  <Button variant="outline" size="sm">
                    <Upload className="mr-1.5 h-4 w-4" />
                    上传
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="other-upload">其他证明文件</Label>
                <div className="flex items-center gap-4">
                  <Input id="other-upload" type="file" accept="image/*,.pdf" multiple />
                  <Button variant="outline" size="sm">
                    <Upload className="mr-1.5 h-4 w-4" />
                    上传
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button variant="outline">保存草稿</Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? '提交中...' : '提交入职信息'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
