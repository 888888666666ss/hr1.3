import { Sidebar } from '@/components/sidebar'
import { PageHeader } from '@/components/page-header'
import { AIAssistant } from '@/components/ai-assistant'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Sparkles, LinkIcon } from 'lucide-react'

export default function NewJobPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <PageHeader title="新建岗位" description="创建新的招聘岗位" />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-4xl space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle>基本信息</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="title">岗位名称</Label>
                    <input
                      id="title"
                      type="text"
                      placeholder="例如：高级前端工程师"
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">所属部门</Label>
                    <select
                      id="department"
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option>技术部</option>
                      <option>产品部</option>
                      <option>设计部</option>
                      <option>市场部</option>
                      <option>运营部</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="location">工作地点</Label>
                    <select
                      id="location"
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option>北京</option>
                      <option>上海</option>
                      <option>深圳</option>
                      <option>杭州</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">岗位类型</Label>
                    <select
                      id="type"
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option>全职</option>
                      <option>兼职</option>
                      <option>实习</option>
                      <option>外包</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salary">薪资范围</Label>
                    <input
                      id="salary"
                      type="text"
                      placeholder="例如：20k-35k"
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>岗位描述 (JD)</CardTitle>
                <Button variant="outline" size="sm">
                  <Sparkles className="mr-2 h-4 w-4" />
                  AI 生成 JD
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description">职位描述</Label>
                  <textarea
                    id="description"
                    rows={6}
                    placeholder="请描述岗位职责、工作内容等..."
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="requirements">任职要求</Label>
                  <textarea
                    id="requirements"
                    rows={6}
                    placeholder="请描述技能要求、学历要求等..."
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Integration */}
            <Card>
              <CardHeader>
                <CardTitle>招聘渠道对接</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                      <LinkIcon className="h-5 w-5 text-secondary-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">BOSS 直聘</p>
                      <p className="text-sm text-muted-foreground">
                        同步发布到 BOSS 直聘平台
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">配置账号</Button>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                      <LinkIcon className="h-5 w-5 text-secondary-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">智联招聘</p>
                      <p className="text-sm text-muted-foreground">
                        同步发布到智联招聘平台
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">配置账号</Button>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <Button variant="outline">保存草稿</Button>
              <Button>发布岗位</Button>
            </div>
          </div>
        </main>
      </div>

      <AIAssistant page="jobs" />
    </div>
  )
}
