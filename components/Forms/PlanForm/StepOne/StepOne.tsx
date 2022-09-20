
interface StepOneProps {
  handlePlanSelection: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const StepOne: React.FC<StepOneProps> = ({
  handlePlanSelection,
}) => {
  return (
    <div className=" text-white flex flex-col justify-center items-center">
      
        <h1 className="md:w-full text-3xl py-8 text-center w-[300px]">
          Save Over 40% When You Prepay for a Year
        </h1>

        <p className="md:w-[500px] w-[300px] text-center text-sm">
          Sign up for one of our yearly plans by October 30 and save big on your
          first year. (It&apos;s actually 41.6% compared to 12 months on the
          monthly plans.)
        </p>
      
      <div className="lg:flex lg:flex-row flex flex-col justify-center items-center gap-6 py-8 ">
        <div className="w-[430px] h-[370px] flex flex-col items-center justify-between bg-gradient-to-r from-purple-900/20 to-purple-900/70">
          <div className="flex flex-col items-center justify-center pt-4">
            <h1 className="text-4xl font-bold">With Ads</h1>
            <p className="text-center w-[250px] py-3">
              Watch everything with limited ads for a lower price
            </p>
          </div>
          <div className="w-[80%] flex flex-col item-center justify-center pb-8 gap-3">
            <button
              id="With Ads"
              data-price="$9.99/mo"
              onClick={(e) => handlePlanSelection(e)}
              className="hover:bg-white/20 w-full py-6 text-lg rounded-md border"
            >
              $9.99<span className="text-sm font-thin">/mo</span>
            </button>
            <button
              id="With Ads"
              data-price="$69.99/yr"
              onClick={(e) => handlePlanSelection(e)}
              className="hover:bg-white/20 w-full flex flex-col text-lg gap-1 items-center rounded-md border"
            >
              <span className="text-sm font-semibold w-full py-1 bg-white/30">
                SAVE OVER 40%
              </span>
              <span className="flex justify-center items-center">
                $69.99<span className="text-sm font-thin">/yr</span>
              </span>
              <span className="text-sm font-semibold py-1 text-violet-400/80">
                For the first year
              </span>
            </button>
          </div>
        </div>
        <div className="w-[430px] h-[370px] flex flex-col items-center justify-between bg-gradient-to-r from-purple-900/20 to-purple-900/70  ">
          <div className="w-[80%] flex flex-col items-center justify-center pt-4">
            <h1 className="text-4xl font-bold">Ad-Free</h1>
            <p className="text-center w-[250px] py-3">
              No ads, no interruptions. Download to watch on-the-go, and stream
              in 4K UHD as available
            </p>
          </div>
          <div className=" w-[80%] flex flex-col item-center justify-center pb-8 gap-3">
            <button
              id="Without Ads"
              data-price="$14.99/mo"
              onClick={(e) => handlePlanSelection(e)}
              className="hover:bg-white/20 w-full py-6 text-lg rounded-md border"
            >
              $14.99<span className="text-sm font-thin">/mo</span>
            </button>
            <button
              id="Without Ads"
              data-price="$104.99/yr"
              onClick={(e) => handlePlanSelection(e)}
              className="hover:bg-white/20 w-full flex flex-col text-lg gap-1 items-center rounded-md border"
            >
              <span className="text-sm font-semibold w-full py-1 bg-white/30">
                SAVE OVER 40%
              </span>
              <span className="flex justify-center items-center">
                $104.99<span className="text-sm font-thin">/yr</span>
              </span>
              <span className="text-sm font-semibold py-1 text-violet-400/80">
                For the first year
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepOne;
