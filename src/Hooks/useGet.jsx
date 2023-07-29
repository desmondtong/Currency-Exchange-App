const domain = import.meta.env.VITE_SERVER;

const useGet = () => {
  const getData = async (endpoint) => {
    const res = await fetch(domain + endpoint);
    const data = await res.json();
    return data;
  };

  return getData;
};

export default useGet;
