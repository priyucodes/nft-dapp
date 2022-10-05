import Image from 'next/image';

const NFTDropPage = () => {
  return (
    <div className="flex h-screen flex-col">
      {/* LEFT */}
      <div className="bg-gradient-to-br from-cyan-800 to-rose-500">
        <div>
          {/* TODO: Currently didnt do next image cuz uri is unpredictable will change to next component after changing the backend to sanity. */}
          <img
            src="https://links.papareact.com/8sg"
            alt="image"
            className="w-44 rounded-xl object-cover lg:h-96 lg:w-72"
            // objectFit="cover"
            // height={'100%'}
            // width={'100%'}
          />
        </div>
      </div>

      {/* Right */}
      <div></div>
    </div>
  );
};
export default NFTDropPage;
