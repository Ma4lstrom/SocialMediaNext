// src/app/components/FetchUserHeader.jsx
import RootLayout from '../layout'; // The RootLayout component (Client-side)

export default function FetchUserHeader({ children }) {
    // Fetch user data on the server
    // const user = await checkUser();
    // console.log('User in FetchUserHeader:', user);

    // Return the RootLayout component and pass the user data as props
    return (
        <RootLayout>
            {children}
        </RootLayout>
    );
}
