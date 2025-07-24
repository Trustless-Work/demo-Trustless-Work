import {
    useGetEscrowFromIndexerByContractIds,
  } from "@trustless-work/escrow/hooks";
  import {
    GetEscrowFromIndexerByContractIdsParams, 
  } from "@trustless-work/escrow/types";
  
  export const useGetEscrowFromIndexerByContractIdsForm = () => {
  
   /*
    *  useGetEscrowFromIndexerByContractIds
   */
   const { getEscrowByContractIds } = useGetEscrowFromIndexerByContractIds();
  
  /*
   * onSubmit function, this could be called by form button
  */
   const onSubmit = async (payload: GetEscrowFromIndexerByContractIdsParams) => {
  
      try {
        /**
         * API call by using the trustless work hooks
         * @Note:
         * - We need to pass the payload to the getEscrowByContractIds function
         * - The result will be escrows
        */
        const escrows = await getEscrowByContractIds(payload);
        
        if (!escrows) {
          throw new Error("Escrows not found");
        }
  
        /**
         * @Responses:
         * escrows !== null
         * - Escrows received successfully
         * - Show a success toast
         *
         * escrows === null
         * - Show an error toast
         */
        if (escrows) {
          toast.success("Escrows Received");
        }
      } catch (error: unknown) {
        // catch error logic
      }
    };
  }
  