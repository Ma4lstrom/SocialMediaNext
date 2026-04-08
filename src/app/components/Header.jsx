// src/app/components/Header.tsx
// import { checkUser } from '../lib/checkUser'; // Server-side logic
import HeaderClient from './HeaderClient'; // Client-side interactivity component

export default function Header() {
    // Fetch user data from the server
    // const user = await checkUser();

    // Render HeaderClient with user data
    return <HeaderClient/>;
}
