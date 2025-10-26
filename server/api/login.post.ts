// /server/api/login.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event) as { username: string; password: string }

  // valid credentials
  const VALID_USER = {
    username: 'usertest',
    password: 'passwordtest',
    token: 'JWT_TOKEN_EXAMPLE'
  }

  if (body.username === VALID_USER.username && body.password === VALID_USER.password) {
    return { token: VALID_USER.token }
  } else {
    return { error: 'Invalid credentials' }
  }
})