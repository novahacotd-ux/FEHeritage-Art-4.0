import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { ArtProvider } from './context/ArtContext';
import { UserProvider } from './context/UserContext';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <UserProvider>
      <ArtProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </ArtProvider>
    </UserProvider>
  )
}

export default App;