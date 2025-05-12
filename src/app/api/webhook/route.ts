import { NextRequest } from 'next/server'
import { Webhooks } from '@octokit/webhooks'
import { exec } from 'child_process'

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

    // 执行部署命令
    await new Promise((resolve, reject) => {
      exec(
        'cd /var/www/djdg626.com && git pull origin custom-server && docker build -t next . && docker stop next || true && docker rm next || true && docker run -d --restart=always -p 3002:3002 --name next next',
        (error, stdout) => {
          console.log('部署输出:', stdout)
          if (error) reject(error)
          else resolve(stdout)
        }
      )
    })

    return new Response('部署成功', { status: 200 })
  } catch (error: any) {
    console.error('处理 webhook 时出错:', error)
    return new Response('处理失败: ' + error.message, { status: 500 })
  }
}
