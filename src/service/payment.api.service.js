import {checkoutRepository} from "../repositories/paymentRepository.js"

const checkoutService = async (filter) => {
 try {
   const response = await checkoutRepository(filter);
   return response;
 } catch (error) {
   throw error;
 }
};

export{ checkoutService };
