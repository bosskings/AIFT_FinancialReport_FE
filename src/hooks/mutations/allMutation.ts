import { useMutation, useQueryClient } from "@tanstack/react-query";
import { post_requests } from "../helper/AxioHelper";


// ==================== CERTIFICATE HOOKS ====================


export const useGenerateReport = () => {
  const queryClient = useQueryClient()

  const generateReport = useMutation({
    mutationFn: async (data: any) => {
      const token = (await localStorage.getItem("accessToken")) || ""
      return post_requests(`fincanceRecord/generateReport`, data, token)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["generated"] })
    },
  })

  return generateReport
}