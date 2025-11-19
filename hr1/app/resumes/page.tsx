import { Sidebar } from '@/components/sidebar'
import { PageHeader } from '@/components/page-header'
import { AIAssistant } from '@/components/ai-assistant'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Upload, Search, Filter, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function ResumesPage() {
  const resumes = [
    {
      id: 1,
      name: '张三',
      position: '高级前端工程师',
      experience: '5年',
      education: '本科',
      score: 92,
      status: 'pending',
      uploadedAt: '2024-01-20 14:30',
    },
    {
      id: 2,
      name: '李四',
      position: '产品经理',
      experience: '3年',
      education: '硕士',
      score: 88,
      status: 'analyzed',
      uploadedAt: '2024-01-20 11:20',
    },
    {
      id: 3,
      name: '王五',
      position: 'UI 设计师',
      experience: '4年',
      education: '本科',
      score: 85,
      status: 'interviewed',
      uploadedAt: '2024-01-19 16:45',
    },
    {
      id: 4,
      name: '赵六',
      position: '后端工程师',
      experience: '6年',
      education: '本科',
      score: 90,
      status: 'analyzed',
      uploadedAt: '2024-01-19 10:15',
    },
  ]

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <PageHeader title="简历人才库" description="管理和分析候选人简历">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            筛选
          </Button>
          <Button asChild>
            <Link href="/resumes/upload">
              <Upload className="mr-2 h-4 w-4" />
              上传简历
            </Link>
          </Button>
        </PageHeader>

        <main className="flex-1 overflow-y-auto p-6">
          {/* Search */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="搜索候选人姓名、岗位、技能..."
                  className="w-full rounded-lg border border-input bg-background py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </CardContent>
          </Card>

          {/* Resumes Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {resumes.map((resume) => (
              <Card
                key={resume.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {resume.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {resume.position}
                      </p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <span className="text-lg font-bold text-primary">
                        {resume.score}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">工作经验</span>
                      <span className="text-foreground">{resume.experience}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">学历</span>
                      <span className="text-foreground">{resume.education}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <Badge
                      variant={
                        resume.status === 'analyzed'
                          ? 'default'
                          : resume.status === 'interviewed'
                          ? 'secondary'
                          : 'outline'
                      }
                    >
                      {resume.status === 'pending'
                        ? '待分析'
                        : resume.status === 'analyzed'
                        ? '已分析'
                        : '已面试'}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {resume.uploadedAt}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      asChild
                    >
                      <Link href={`/resumes/${resume.id}`}>查看详情</Link>
                    </Button>
                    <Button size="sm" className="flex-1" asChild>
                      <Link href={`/resumes/${resume.id}/analysis`}>
                        <Sparkles className="mr-1 h-3 w-3" />
                        AI分析
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>

      <AIAssistant page="resumes" />
    </div>
  )
}
