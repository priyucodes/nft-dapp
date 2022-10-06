import Image from 'next/image';
import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react';
import { GetServerSideProps } from 'next';
import { sanityClient, urlFor } from '../../sanity';
import { Collection } from '../../typings';
import Link from 'next/link';

interface Props {
  collection: Collection;
}
const NFTDropPage = ({ collection }: Props) => {
  // Auth
  const connectWithMetamask = useMetamask(); // login with wallet
  const address = useAddress(); // gets wallet address if signed in else undefined
  const disconnect = useDisconnect(); // logout

  // Total 10 grid one take 4 and another take 6. if we did 3 cols and span first to 1 and 2nd to 2. it would be 33.3% and 66.6%
  return (
    <div className="flex h-screen flex-col lg:grid lg:grid-cols-10">
      {/* LEFT */}
      <div className="bg-gradient-to-br from-cyan-800 to-rose-500 lg:col-span-4">
        {/* Nice Cheeky trick to add gradient borders without using border-image:linear-gradeint,border-width and border-style in that we couldnt add border-radius.(but here we can :) */}

        <div className="flex flex-col items-center justify-center py-2 lg:min-h-screen">
          {/* TODO: Currently didnt do next image cuz uri is unpredictable will change to next component after changing the backend to sanity. */}
          <div className="bg-gradient-to-br from-yellow-400 to-purple-600 p-2 rounded-xl">
            <img
              src={urlFor(collection.previewImage).url()}
              alt="nft"
              className="w-44 rounded-xl object-cover lg:h-96 lg:w-72"
              // objectFit="cover"
              // height={'100%'}
              // width={'100%'}
            />
          </div>
          <div className="text-center p-5 space-y-2">
            <h1 className="text-4xl font-bold text-white">
              {collection.nftCollectionName}
            </h1>
            <h2 className="text-xl text-gray-300">{collection.description}</h2>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-1 flex-col p-12 lg:col-span-6">
        <header className="flex items-center justify-between">
          <Link href={'/'}>
            <h1 className="w-52 cursor-pointer text-xl font-extralight sm:w-80">
              The{' '}
              <span className="font-extrabold underline decoration-pink-600/50">
                PAPAFAM
              </span>{' '}
              NFT Market Place
            </h1>
          </Link>
          <button
            onClick={() => (address ? disconnect() : connectWithMetamask())}
            className={`rounded-full bg-rose-400 text-white px-4 py-2 text-xs font-bold lg:px-5 lg:py-2.5 lg:text-base `}
          >
            {/* ${!address && 'bg-gray-300'} */}
            {address ? 'Sign Out' : ' Sign In'}
          </button>
        </header>
        <hr className="my-2 border" />
        {address && (
          <p className="text-center text-sm text-rose-400">
            You're logged in with wallet {address.substring(0, 5)}...
            {address.substring(address.length - 5)}
          </p>
        )}

        <div className="mt-10 flex flex-1 flex-col items-center space-y-6 text-center lg:space-y-0 lg:justify-center">
          <img
            className="w-80 object-cover pb-10 lg:h-40"
            src={urlFor(collection.mainImage).url()}
            alt="coverImage"
          />
          <h1 className="text-3xl font-bold lg:text-5xl lg:font-extrabold">
            {collection.title}
          </h1>
          <p className="pt-2 text-xl text-green-500">13 / 21 NFT's claimed</p>
        </div>

        <button className="h-16 bg-red-600 w-full text-white rounded-full  mt-10 font-bold">
          Mint NFT (0.01 ETH)
        </button>
      </div>
    </div>
  );
};
export default NFTDropPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const query = `*[_type == "collection" && slug.current == $id][0]{
    _id,
    title,
    address,
    description,
    nftCollectionName,
    mainImage{
    asset
  },
    previewImage{
      asset
    },
  slug{
    current
  },
  creator -> {
    _id,
    name,
    address,
    slug{
    current
    }
  }
  }`;
  const collection = await sanityClient.fetch(query, {
    id: params?.id,
  });
  if (!collection) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      collection,
    },
  };
};
