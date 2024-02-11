import { FortuneTellerSchema } from "../../models/fortuneTeller/fortuneTeller.model";
import { fortuneTellerRepository } from "../../repositories/fortuneTeller.repository";
import { packageRepository } from "../../repositories/package.repository";

export const fortuneTellerService = {
    getFortuneTellerById: async (fortuneTellerId: string) => {
        const fortuneTeller = await fortuneTellerRepository.getFortuneTellerById(fortuneTellerId)
        
        if(fortuneTeller === null) return null; 
        
        return {
            stageName: fortuneTeller.stageName,
            averageStar: fortuneTeller.totalReview === 0 ? 0 : (fortuneTeller.totalScore/fortuneTeller.totalReview),
            description: fortuneTeller.description,
            profilePicture : fortuneTeller.profilePicture
        }
    },

    getPackageByFortuneTellerId: async(fortuneTellerId: string) => {
        const result = await packageRepository.getPackageByFortuneTellerId(fortuneTellerId)

        if(result === null) return null;

        return result.map((result) => {
            return {
                speciality: result.speciality,
                description: result.description,
                duration: result.duration,
                price: result.price,
                fortuneTellerId: result.fortuneTellerId
            }
        })
    }
}