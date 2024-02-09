// hoc/withAuth.js
import { store } from '@/app/lib/store'
import { useRouter } from 'next/router'
import { useEffect, useLayoutEffect } from 'react'


export default function withAuth(Component: React.ComponentType<any>) {
    return function AuthGuard({...props}) {
        const router = useRouter()
        const user =  store.getState().app.authenticatedUser // Add your logic to check user authentication

        useLayoutEffect(() => {
            const authenticatedUser= localStorage.getItem("authenticatedUser")

            if (!authenticatedUser) {
                router.replace('/login') // Redirect to login page if user is not authenticated
            }
        }, [user, router])

        return <Component {...props} />
    }
}