'use client'

import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Save } from 'lucide-react'

export default function ExitInterviewPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PageHeader
        title="离职面谈"
        description="离职员工反馈和面谈记录"
      />

      <div className="flex-1 space-y-6 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Employee Info */}
          <Card>
            <CardHeader>
              <CardTitle>离职员工信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">姓名:</span>
                  <span className="ml-2 font-medium">王五</span>
                </div>
                <div>
                  <span className="text-muted-foreground">部门:</span>
                  <span className="ml-2 font-medium">设计部</span>
                </div>
                <div>
                  <span className="text-muted-foreground">岗位:</span>
                  <span className="ml-2 font-medium">UI设计师</span>
                </div>
                <div>
                  <span className="text-muted-foreground">入职日期:</span>
                  <span className="ml-2 font-medium">2023-03-01</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Exit Interview Form */}
          <Card>
            <CardHeader>
              <CardTitle>离职面谈问卷</CardTitle>
              <CardDescription>请如实填写以下问题，您的反馈对我们非常重要</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>1. 您对公司的整体满意度如何？</Label>
                <RadioGroup defaultValue="satisfied">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="very-satisfied" id="q1-1" />
                    <Label htmlFor="q1-1" className="font-normal">非常满意</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="satisfied" id="q1-2" />
                    <Label htmlFor="q1-2" className="font-normal">满意</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="neutral" id="q1-3" />
                    <Label htmlFor="q1-3" className="font-normal">一般</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dissatisfied" id="q1-4" />
                    <Label htmlFor="q1-4" className="font-normal">不满意</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>2. 您离职的主要原因是什么？</Label>
                <RadioGroup defaultValue="development">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="development" id="q2-1" />
                    <Label htmlFor="q2-1" className="font-normal">个人职业发展</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="salary" id="q2-2" />
                    <Label htmlFor="q2-2" className="font-normal">薪酬待遇</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="family" id="q2-3" />
                    <Label htmlFor="q2-3" className="font-normal">家庭原因</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="culture" id="q2-4" />
                    <Label htmlFor="q2-4" className="font-normal">公司文化</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="q2-5" />
                    <Label htmlFor="q2-5" className="font-normal">其他原因</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>3. 您对直属上级的管理方式满意吗？</Label>
                <RadioGroup defaultValue="satisfied">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="very-satisfied" id="q3-1" />
                    <Label htmlFor="q3-1" className="font-normal">非常满意</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="satisfied" id="q3-2" />
                    <Label htmlFor="q3-2" className="font-normal">满意</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="neutral" id="q3-3" />
                    <Label htmlFor="q3-3" className="font-normal">一般</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dissatisfied" id="q3-4" />
                    <Label htmlFor="q3-4" className="font-normal">不满意</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label htmlFor="suggestions">4. 您对公司有什么建议或意见？</Label>
                <Textarea
                  id="suggestions"
                  placeholder="请分享您的想法和建议..."
                  rows={4}
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="future">5. 您未来是否考虑回到公司工作？</Label>
                <RadioGroup defaultValue="maybe">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="q5-1" />
                    <Label htmlFor="q5-1" className="font-normal">愿意考虑</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="maybe" id="q5-2" />
                    <Label htmlFor="q5-2" className="font-normal">看情况</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="q5-3" />
                    <Label htmlFor="q5-3" className="font-normal">不考虑</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label htmlFor="comments">6. 其他补充说明</Label>
                <Textarea
                  id="comments"
                  placeholder="您还有什么想说的吗..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button size="lg">
              <Save className="mr-2 h-4 w-4" />
              保存面谈记录
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
