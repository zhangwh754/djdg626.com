import { writeFile } from 'fs/promises'
import { Webhooks } from '@octokit/webhooks'
import { NextRequest } from 'next/server'

// 创建 Webhooks 实例
const webhooks = new Webhooks({
  secret: process.env.WEBHOOK_SECRET!,
})

export async function POST(req: NextRequest) {
  try {
    // 获取请求体和签名
    const body = await req.text()
    const signature = req.headers.get('x-hub-signature-256') || ''

    // 验证签名
    const isValid = await webhooks.verify(body, signature)
    if (!isValid) {
      console.log('签名验证失败')
      return new Response('签名验证失败', { status: 401 })
    }

    // 解析请求体
    const payload = JSON.parse(body)
    const event = req.headers.get('x-github-event')

    // 只处理 push 事件
    if (event !== 'push') {
      return new Response('非 push 事件，已忽略', { status: 200 })
    }

    // 只处理指定分支
    if (payload.ref !== 'refs/heads/custom-server') {
      return new Response('非目标分支，已忽略', { status: 200 })
    }

    // 创建触发文件，让宿主机的监控脚本检测到并执行部署
    try {
      // 写入触发文件到挂载的卷中
      await writeFile('/app/shared/deploy-trigger.txt', new Date().toISOString())
      console.log('已创建部署触发文件')

      return new Response('部署触发成功，请耐心等待宿主机执行部署', { status: 200 })
    } catch (fileError: any) {
      console.error('创建触发文件失败:', fileError)
      return new Response('创建触发文件失败: ' + fileError.message, { status: 500 })
    }
  } catch (error: any) {
    console.error('处理 webhook 时出错:', error)
    return new Response('处理失败: ' + error.message, { status: 500 })
  }
}
