//export const baseUrl: string = 'http://localhost:5000/api/v1'
export const baseUrl: string = 'https://qzbe-mdaadilshafigmailcoms-projects.vercel.app/api/v1'
export const token: any = localStorage.getItem('token')
export const authTokenHeader: any = { Authorization: `Bearer ${token}` }