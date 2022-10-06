import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';

function MyApp({ Component, pageProps }: AppProps) {
  // Rinkeby is known as Test network for Ethereum. Testing payments with fake Money.
  // Rinkeby wasnt working well with thirdweb swiitched to goerli(another eth testnet).
  return (
    <ThirdwebProvider desiredChainId={ChainId.Goerli}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
