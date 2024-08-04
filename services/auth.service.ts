import { Account, Databases, ID, OAuthProvider } from 'appwrite'
import client from '../helpers/appwrite.config'
import { AuthType } from '../types'

class AuthService {
  private static instance: AuthService
  private account: Account = new Account(client)
  private databases: Databases = new Databases(client)

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }

    return AuthService.instance
  }

  public registerUser = async (data: AuthType) => {
    const { email, password, name, userId } = data
    return this.account.create(
      userId as string,
      email,
      password,
      name as string
    )
  }

  public loginUser = async (data: AuthType) => {
    const { email, password } = data
    return await this.account.createEmailPasswordSession(email, password)
  }

  public loginViaGoogle = () => {
    return this.account.createOAuth2Session(
      OAuthProvider.Google,
      'http://localhost:3000/',
      'http://localhost:3000/contact/'
    )
  }

  public logoutUser = async () => {
    return this.account.deleteSession('current')
  }

  public getUser = async () => {
    return await this.account.get()
  }
}

export default AuthService
