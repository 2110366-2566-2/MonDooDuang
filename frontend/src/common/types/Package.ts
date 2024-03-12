export type SpecialityType = "TAROT_CARD" | "ORACLE" | "THAI" | "NUMBER" | "RUNES"

export const specialityMapper: Record<SpecialityType, string> = {
  TAROT_CARD: "ไพ่ทาโรต์",
  THAI: "โหราศาสตร์ไทย",
  NUMBER: "ศราตร์ตัวเลข",
  ORACLE: "ไพ่ออราเคิล",
  RUNES: "ศาสตร์รูนส์"
}
