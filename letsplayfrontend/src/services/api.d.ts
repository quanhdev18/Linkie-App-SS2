// declare module "../../services/api" {
//   export function sendOtp(payload: { email: string }): Promise<any>;
//   export function login(payload: { email: string; otp: string }): Promise<any>;
//   export function verifyEmail(payload: { email: string }): Promise<any>;
// }
declare module "@/services/api" {
  export function sendOtp<T = unknown>(payload: { email: string }): Promise<T>;
  export function login<T = unknown>(payload: { email: string; otp: string }): Promise<T>;
  export function verifyEmail<T = unknown>(payload: { email: string }): Promise<T>;
}
