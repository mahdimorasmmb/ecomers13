namespace NodeJS {
  interface ProcessEnv {
    DB_URL: string;
    API_URL: string;
    NEXTAUTH_SECRET: string;
    CLOUDINARY_API_KEY: string;
    CLOUD_NAME: string;
    CLOUDINARY_API_SECRET: string;
    STRIPE_PRIVATE_KEY:string
    STRIPE_PUBLIC_KEY:string
    STRIPE_WEBHOOK_SECRET:string
  }
}
