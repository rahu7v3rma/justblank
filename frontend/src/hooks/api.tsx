import { useLoader } from "@/context/loader";
import { useToast } from "@/context/toast";

const useApi = (apiFunction: (...args: any[]) => Promise<any>) => {
  const { openLoader, closeLoader } = useLoader();
  const { triggerToast } = useToast();

  const callApi = async (...args: any[]) => {
    openLoader();
    const response = await apiFunction(...args);
    closeLoader();
    if (!response.success) {
      triggerToast(response.message, "error");
      return null;
    }
    triggerToast(response.message, "success");
    return response.data;
  };

  return { callApi };
};

export default useApi;