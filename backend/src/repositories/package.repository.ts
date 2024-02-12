import { db } from "../configs/pgdbConnection"
import { PackageSchema } from "../models/package/package.model"

export const reportRepository = {
  createPackage: async (packageFortune: PackageSchema) => {
    try {
      await db.query(
        `
            INSERT INTO PACKAGE (description, duration, price, fortunetellerId)
            VALUES($1, $2, $3, $4);
        `,
        [packageFortune.description, packageFortune.duration, packageFortune.price, packageFortune.fortunetellerId]
      )
      return true
    } catch (err) {
      return false
    }
  }
}