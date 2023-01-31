import { MdDirectionsBike, MdOutlineFormatListNumbered } from "react-icons/md";

const EditBikeForm = () => {
  return (
    <div className="flex justify-center w-1/2 mt-10 m-auto bg-white rounded-lg border border-gray-300 py-40 text-sm font-sm shadow-lg relative md:p-20">
      <div className="absolute flex font-bold cursor-pointer top-0 w-full py-4 bg-dark-red text-white">
        Modify: <MdOutlineFormatListNumbered className="mx-4" />{" "}
        <span className="active:translate-y-1">Bike Types</span>
        <MdDirectionsBike className="mx-4" />
        <span className="active:translate-y-1">Bikes</span>
      </div>
      <div className="w-full max-w-md flex flex-col justify-center items-start">
        <div className="mt-8">1 - Clasic</div>
        <div className="mt-8">2 - Electric </div>
        <div className="mt-8">3 - Scooter </div>
        <div className="mt-8">4 - N/A </div>
      </div>
    </div>
  );
};

export default EditBikeForm;
