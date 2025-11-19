import { NextRequest, NextResponse } from 'next/server'
import { aiService } from '@/lib/ai/glm-service'
import { supabaseAdmin } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { jobId, positionTitle, level, skills } = await request.json()

    if (!jobId || !positionTitle) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // 生成面试问题
    const questions = await aiService.generateInterviewQuestions(
      positionTitle,
      level || 'mid',
      skills || []
    )

    // 获取公司ID
    const { data: job, error: jobError } = await supabaseAdmin
      .from('jobs')
      .select('company_id')
      .eq('id', jobId)
      .single()

    if (jobError || !job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      )
    }

    // 保存问题到数据库
    const allQuestions = [
      ...questions.technical.map(q => ({
        company_id: job.company_id,
        job_id: jobId,
        category: 'technical',
        question_text: q,
        difficulty_level: level || 'medium',
        tags: skills
      })),
      ...questions.behavioral.map(q => ({
        company_id: job.company_id,
        job_id: jobId,
        category: 'behavioral',
        question_text: q,
        difficulty_level: level || 'medium',
        tags: ['behavioral']
      })),
      ...questions.situational.map(q => ({
        company_id: job.company_id,
        job_id: jobId,
        category: 'situational',
        question_text: q,
        difficulty_level: level || 'medium',
        tags: ['situational']
      }))
    ]

    const { data: savedQuestions, error: saveError } = await supabaseAdmin
      .from('ai_interview_questions')
      .insert(allQuestions)
      .select()

    if (saveError) {
      console.error('Failed to save questions:', saveError)
      // 即使保存失败，也返回生成的问题
    }

    return NextResponse.json({
      success: true,
      questions,
      savedQuestions: savedQuestions || []
    })

  } catch (error) {
    console.error('Interview questions generation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}