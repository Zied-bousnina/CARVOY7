const Social = () => {
  return (
    <div className="flex justify-center gap-4 mt-4">
      {/* LinkedIn Button */}
      <a
        href={`${process.env.NEXT_PUBLIC_API_URL}/api/users/linkedin`}
        className="flex items-center justify-center w-12 h-12 rounded-full shadow-md hover:shadow-lg hover:bg-[#084a8a] transition-transform transform hover:-translate-y-1"
        title="Connect with LinkedIn"
      >
        <img
          src="/assets/images/icon/in.svg"
          alt="LinkedIn"
          className="w-8 h-8"
        />
      </a>

      {/* Google Button */}
      <a
        href={`${process.env.NEXT_PUBLIC_API_URL}/api/users/google`}
        className="flex items-center justify-center w-12 h-12  rounded-full shadow-md hover:shadow-lg hover:bg-[#b43429] transition-transform transform hover:-translate-y-1"
        title="Connect with Google"
      >
        <img
          src="/assets/images/icon/gp.svg"
          alt="Google"
          className="w-8 h-8"
        />
      </a>
    </div>
  );
};

export default Social;
