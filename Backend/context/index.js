// App.js or similar
import React, { useState } from 'react';
import UserContext from './UserContext';
import SplashScreen from '../screens/SplashScreen';
// Other imports.. .

function App() {
    const [uid, setUid] = useState(null);

    return (
        <UserContext.Provider value={{ uid, setUid }}>
            <SplashScreen />
        </UserContext.Provider>
    );
}

export default App;
