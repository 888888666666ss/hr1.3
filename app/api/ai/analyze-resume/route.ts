import { NextRequest, NextResponse } from 'next/server'
import { aiService } from '@/lib/ai/glm-service'
import { supabaseAdmin } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { candidateId, jobId, resumeText } = await request.json()

    if (!candidateId || !jobId || !resumeText) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // 获取职位描述
    const { data: job, error: jobError } = await supabaseAdmin
      .from('jobs')
      .select('title, description, requirements')
      .eq('id', jobId)
      .single()

    if (jobError || !job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      )
    }

    // 构建职位描述
    const jobDescription = `
职位标题：${job.title}
职位描述：${job.description || ''}
职位要求：${job.requirements || ''}
    `.trim()

    // 调用AI分析简历
    const analysis = await aiService.analyzeResume(resumeText, jobDescription)

    // 保存分析结果到数据库
    const { data: analysisRecord, error: saveError } = await supabaseAdmin
      .from('ai_resume_analyses')
      .insert({
        candidate_id: candidateId,
        job_id: jobId,
        resume_text: resumeText,
        analysis_results: analysis,
        match_score: analysis.matchScore,
        extracted_skills: analysis.skills,
        strengths: analysis.strengths,
        concerns: analysis.concerns,
        recommendations: analysis.recommendations,
        ai_model_version: 'glm-4-plus'
      })
      .select()
      .single()

    if (saveError) {
      console.error('Failed to save analysis:', saveError)
      // 即使保存失败，也返回分析结果
    }

    return NextResponse.json({
      success: true,
      analysis,
      analysisId: analysisRecord?.id
    })

  } catch (error) {
    console.error('Resume analysis error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}