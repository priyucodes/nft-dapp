import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';

function MyApp({ Component, pageProps }: AppProps) {
  // Rinkeby is known as Test network for Ethereum. Testing payments with fake Money.
  return (
    <ThirdwebProvider desiredChainId={ChainId.Rinkeby}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
