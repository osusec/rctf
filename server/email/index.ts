import path from 'path'
import fs from 'fs'
import mustache from 'mustache'
import config from '../config/server.js'
import { ProviderConstructor } from './provider.js'

export type VerificationEmailKind = 'register' | 'recover' | 'update'

let sendVerification: (data: {
  token: string,
  kind: VerificationEmailKind,
  email: string
// eslint-disable-next-line
}) => Promise<void> = async () => {
  throw new Error('email verification requested when email provider is not configured')
}

const emailConfig = config.email
if (emailConfig) {
  const provider = (async () => {
    const { default: Provider } = await import(path.join('../providers', emailConfig.provider.name)) as { default: ProviderConstructor }
    return new Provider(emailConfig.provider.options ?? {})
  })()

  const verifyHtml = fs.readFileSync(path.join(__dirname, 'emails/verify.html')).toString()
  const verifyText = fs.readFileSync(path.join(__dirname, 'emails/verify.txt')).toString()

  // This function is already typed earlier in the file; no need to repeat the type definition
   
  sendVerification = async ({ token, kind, email }) => {
    const emailView = {
      ctf_name: config.ctfName,
      logo_url: config.logoUrl,
      origin: config.origin,
      token: encodeURIComponent(token),
      register: kind === 'register',
      recover: kind === 'recover',
      update: kind === 'update'
    }
    const subject = {
      register: `Email verification for ${config.ctfName}`,
      recover: `Account recovery for ${config.ctfName}`,
      update: `Update your ${config.ctfName} email`
    }[kind]

    await (await provider).send({
      from: `${config.ctfName} <${emailConfig.from}>`,
      to: email,
      subject,
      html: mustache.render(verifyHtml, emailView),
      text: mustache.render(verifyText, emailView)
    })
  }
}

export { sendVerification }
