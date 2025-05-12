import { NextRequest } from 'next/server'
import { exec } from 'child_process'
import crypto from 'crypto'

// 使用环境变量或配置文件存储密钥
const secret = process.env.WEBHOOK_SECRET as string

function verifySignature(payload: string, signature: string) {
  const hmac = crypto.createHmac('sha256', secret)
  const digest = 'sha256=' + hmac.update(payload).digest('hex')
  return crypto.timingSafeEqual(Uint8Array.from(Buffer.from(signature)), Uint8Array.from(Buffer.from(digest)))
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('x-hub-signature-256')

  if (!signature || !verifySignature(body, signature)) {
    return new Response('签名验证失败', { status: 401 })
  }

  const event = req.headers.get('x-github-event')
  if (event !== 'push') {
    return new Response('非 push 事件，已忽略', { status: 200 })
  }

  const payload = JSON.parse(body)
  if (payload.ref !== 'refs/heads/custom-server') {
    return new Response('非目标分支，已忽略', { status: 200 })
  }

  try {
    await new Promise((resolve, reject) => {
      // 修改为实际的服务器路径
      exec(
        'cd /var/www/djdg626.com && git pull origin custom-server && docker build -t next . && docker stop next || true && docker rm next || true && docker run -d --restart=always -p 3002:3002 --name next next',
        (error, stdout) => {
          console.log('部署输出:', stdout) // 添加日志输出
          if (error) reject(error)
          else resolve(stdout)
        }
      )
    })

    return new Response('部署成功', { status: 200 })
  } catch (error: any) {
    return new Response('部署失败: ' + error.message, { status: 500 })
  }
}
