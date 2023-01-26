const DashboardCards = () => {
  const cardLayout = "block rounded-lg shadow-lg bg-white text-center relative";

  return (
    <div class="flex flex-wrap justify-center gap-5 mt-10 max">
      <div class={cardLayout}>
        <div class="p-6">
          <h5 class="text-gray-400 text-md font-light mb-2  top-2 right-1 text-center">
            Available Bikes
          </h5>
          <p class="text-gray-500 text-2xl  mb-4 text-center mt-2 ">40/51</p>
        </div>
        <div class="py-3 px-6 border-t font-light border-gray-300 text-gray-400">
          7 bikes are malfunctioning
        </div>
      </div>

      <div class={cardLayout}>
        <div class="p-6">
          <h5 class="text-gray-400 text-md font-light mb-2  top-2 right-1 text-center">
            Available Bikes
          </h5>
          <p class="text-gray-500 text-2xl  mb-4 text-center mt-2 ">40/51</p>
        </div>
        <div class="py-3 px-6 border-t font-light border-gray-300 text-gray-400">
          7 bikes are malfunctioning
        </div>
      </div>

      <div class={cardLayout}>
        <div class="p-6">
          <h5 class="text-gray-400 text-md font-light mb-2  top-2 right-1 text-center">
            Available Bikes
          </h5>
          <p class="text-gray-500 text-2xl  mb-4 text-center mt-2 ">40/51</p>
        </div>
        <div class="py-3 px-6 border-t font-light border-gray-300 text-gray-400">
          7 bikes are malfunctioning
        </div>
      </div>

      <div class={cardLayout}>
        <div class="p-6">
          <h5 class="text-gray-400 text-md font-light mb-2  top-2 right-1 text-center">
            Available Bikes
          </h5>
          <p class="text-gray-500 text-2xl  mb-4 text-center mt-2 ">40/51</p>
        </div>
        <div class="py-3 px-6 border-t font-light border-gray-300 text-gray-400">
          7 bikes are malfunctioning
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
