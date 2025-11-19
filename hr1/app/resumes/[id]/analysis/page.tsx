import { Sidebar } from '@/components/sidebar'
import { PageHeader } from '@/components/page-header'
import { AIAssistant } from '@/components/ai-assistant'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sparkles, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function ResumeAnalysisPage() {
  const skills = [
    { name: 'React', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: 'Next.js', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'CSS', level: 88 },
  ]

  const matchedJobs = [
    { id: 1, title: '高级前端工程师', match: 92 },
    { id: 2, title: '前端技术专家', match: 88 },
    { id: 3, title: 'React 开发工程师', match: 85 },
  ]

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <PageHeader
          title="AI 简历分析"
          description="候选人：张三 - 高级前端工程师"
        >
          <Button variant="outline" asChild>
            <Link href="/interviews/new">开始 AI 初筛</Link>
          </Button>
          <Button asChild>
            <Link href="/candidates">加入候选人池</Link>
          </Button>
        </PageHeader>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-6xl space-y-6">
            {/* AI Score */}
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="h-5 w-5" />
                      <span className="text-sm font-medium">AI 综合评分</span>
                    </div>
                    <div className="text-4xl font-bold">92 分</div>
                    <p className="mt-2 text-sm opacity-90">
                      该候选人综合能力优秀，强烈推荐进入下一轮面试
                    </p>
                  </div>
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary-foreground/20">
                    <TrendingUp className="h-12 w-12" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Strengths */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    优势分析
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-700 text-xs font-medium dark:bg-green-900/30 dark:text-green-400">
                      1
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        技术能力扎实
                      </p>
                      <p className="text-xs text-muted-foreground">
                        精通 React 生态系统，有大型项目实战经验
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-700 text-xs font-medium dark:bg-green-900/30 dark:text-green-400">
                      2
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        工作经验丰富
                      </p>
                      <p className="text-xs text-muted-foreground">
                        5年前端开发经验，曾在知名互联网公司任职
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-700 text-xs font-medium dark:bg-green-900/30 dark:text-green-400">
                      3
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        持续学习能力强
                      </p>
                      <p className="text-xs text-muted-foreground">
                        关注前端新技术，有开源项目贡献经历
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Areas for Improvement */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                    待提升点
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium dark:bg-yellow-900/30 dark:text-yellow-400">
                      1
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        后端技能较弱
                      </p>
                      <p className="text-xs text-muted-foreground">
                        建议补充 Node.js 服务端开发经验
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium dark:bg-yellow-900/30 dark:text-yellow-400">
                      2
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        团队管理经验不足
                      </p>
                      <p className="text-xs text-muted-foreground">
                        暂无带团队经验，建议关注其领导力潜质
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>技能分析</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">
                          {skill.name}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-secondary">
                        <div
                          className="h-2 rounded-full bg-primary"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Matched Jobs */}
            <Card>
              <CardHeader>
                <CardTitle>推荐岗位匹配</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {matchedJobs.map((job) => (
                    <div
                      key={job.id}
                      className="flex items-center justify-between rounded-lg border border-border p-4"
                    >
                      <div>
                        <h4 className="font-medium text-foreground">
                          {job.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          匹配度：{job.match}%
                        </p>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/jobs/${job.id}`}>查看详情</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      <AIAssistant page="resumes" />
    </div>
  )
}
