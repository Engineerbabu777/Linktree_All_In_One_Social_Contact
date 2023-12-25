import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import { Page } from '@/models/Page'
import mongoose from 'mongoose'
import { User } from '@/models/User'
export async function POST (req) {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  const session = await getServerSession(authOptions)

  const body = await req.json()

  const { name, value } = body

  if (name === 'bgImage') {
    await Page.findOneAndUpdate(
      { owner: session?.user?.email },
      { [name]: value, bgType: 'image' }
    )
  }

  if (name === 'avatar') {
    await User.findOneAndUpdate(
      { email: session?.user?.email },
      { image: value }
    )
  }

  return Response.json({ success: true })
}
