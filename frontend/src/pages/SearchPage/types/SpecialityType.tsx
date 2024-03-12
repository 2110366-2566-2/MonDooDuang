export enum Specialities {
  tarot = "TAROT_CARD",
  oracle = "ORACLE",
  thai = "THAI",
  number = "NUMBER",
  runes = "RUNES",
  all = ""
}
interface SpecialitiesName {
  [key: string]: string
}

export const specialitiesName: SpecialitiesName = {
  [Specialities.tarot]: "ไพ่ทาโรต์",
  [Specialities.oracle]: "ไพ่ออราเคิล",
  [Specialities.thai]: "โหราศาสตร์ไทย",
  [Specialities.number]: "ศาสตร์ตัวเลข",
  [Specialities.runes]: "ศาสตร์รูนส์",
  [Specialities.all]: "ทั้งหมด"
}
