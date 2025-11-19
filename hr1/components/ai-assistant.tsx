'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AIAssistantProps {
  page: string
}

export function AIAssistant({ page }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false)

  const getActions = () => {
    switch (page) {
      case 'jobs':
        return [
          { label: 'AI 帮我写 JD', action: 'generate-jd' },
          { label: 'AI 分析岗位需求', action: 'analyze-job' },
          { label: 'AI 推荐候选人', action: 'recommend-candidates' },
        ]
      case 'resumes':
        return [
          { label: 'AI 简历分析', action: 'analyze-resume' },
          { label: 'AI 初筛候选人', action: 'screen-candidate' },
          { label: 'AI 匹配岗位', action: 'match-jobs' },
        ]
      case 'interviews':
        return [
          { label: 'AI 生成面试提纲', action: 'generate-outline' },
          { label: 'AI 面试评估', action: 'evaluate-interview' },
          { label: 'AI 生成面试报告', action: 'generate-report' },
        ]
      case 'performance':
        return [
          { label: 'AI 生成绩效评语', action: 'generate-review' },
          { label: 'AI 分析绩效趋势', action: 'analyze-trends' },
          { label: 'AI 推荐改进建议', action: 'recommend-improvements' },
        ]
      default:
        return [
          { label: 'AI 分析当前数据', action: 'analyze-data' },
          { label: 'AI 生成报告', action: 'generate-report' },
          { label: 'AI 智能建议', action: 'smart-suggestions' },
        ]
    }
  }

  const actions = getActions()

  return (
    <>
      {/* Floating Button */}
      <Button
        size="lg"
        className={cn(
          'fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg transition-all',
          isOpen && 'scale-0'
        )}
        onClick={() => setIsOpen(true)}
      >
        <Sparkles className="h-6 w-6" />
      </Button>

      {/* AI Assistant Panel */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-50 w-80 shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Sparkles className="h-5 w-5 text-primary" />
              AI 助手
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground mb-4">
              我可以帮您完成以下任务：
            </p>
            {actions.map((action) => (
              <Button
                key={action.action}
                variant="outline"
                className="w-full justify-start"
                onClick={() => {
                  alert(`${action.label} 功能即将启动...`)
                }}
              >
                <Sparkles className="mr-2 h-4 w-4" />
                {action.label}
              </Button>
            ))}
          </CardContent>
        </Card>
      )}
    </>
  )
}
